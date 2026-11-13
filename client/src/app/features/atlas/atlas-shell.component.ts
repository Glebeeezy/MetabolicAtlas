import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { LocaleService } from '../../core/services/locale.service';
import { AtlasStateService } from '../../core/services/atlas-state.service';
import {
  ALL_METABOLITES,
  COFACTOR_METABOLITES,
  HUMAN_CROSSROADS,
  HUMAN_METABOLITES,
  HUMAN_REACTIONS,
  HumanMetaboliteNode,
  HumanReactionArrow,
  MetabolicCrossroad,
  PathwayParticipation,
  PATHWAY_SUPER_HIGHWAYS,
  PathwaySuperHighway,
  SECTOR_LAYOUT_CONFIGS,
  SectorLayoutConfig,
  GlobalMetabolicCanvasState,
} from './atlas-data';
import { ReactionArrowComponent } from './components/reaction-arrow/reaction-arrow.component';
import { ChemicalStructureComponent } from './components/chemical-structure/chemical-structure.component';

export type InspectorTab = 'reaction' | 'molecule';
export type CarrierFilter = 'NADH' | 'FADH2' | 'GTP' | 'ATP';

// Re-export data models and datasets for backward compatibility with tests and callers
export {
  HUMAN_METABOLITES,
  COFACTOR_METABOLITES,
  ALL_METABOLITES,
  HUMAN_REACTIONS,
  HUMAN_CROSSROADS,
  SECTOR_LAYOUT_CONFIGS,
  PATHWAY_SUPER_HIGHWAYS,
};

export type {
  HumanMetaboliteNode,
  HumanReactionArrow,
  MetabolicCrossroad,
  PathwayParticipation,
  SectorLayoutConfig,
  PathwaySuperHighway,
  GlobalMetabolicCanvasState,
};

@Component({
  selector: 'ma-atlas-shell',
  standalone: true,
  imports: [CommonModule, ReactionArrowComponent, ChemicalStructureComponent],
  templateUrl: './atlas-shell.component.html',
  styleUrl: './atlas-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasShellComponent implements OnInit, OnDestroy {
  protected readonly api = inject(ApiService);
  protected readonly localeService = inject(LocaleService);
  protected readonly atlasStateService = inject(AtlasStateService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly safeSvgCache = new Map<string, SafeHtml>();

  getSafeSvg(rawSvg: string): SafeHtml {
    let cached = this.safeSvgCache.get(rawSvg);
    if (!cached) {
      cached = this.sanitizer.bypassSecurityTrustHtml(rawSvg);
      this.safeSvgCache.set(rawSvg, cached);
    }
    return cached;
  }

  readonly zoom = signal<number>(100);
  readonly panX = signal<number>(0);
  readonly panY = signal<number>(0);
  readonly isDragging = signal<boolean>(false);

  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartClientX = 0;
  private dragStartClientY = 0;
  private hasMovedDrag = false;

  // Static datasets
  readonly canvasMetabolites = HUMAN_METABOLITES; // Tile nodes on canvas
  readonly allMetabolites = ALL_METABOLITES;       // Includes all cofactors
  readonly reactions = HUMAN_REACTIONS;
  readonly crossroads = HUMAN_CROSSROADS;
  readonly sectorConfigs = SECTOR_LAYOUT_CONFIGS;
  readonly macroSubpathways = [
    {
      pathwayId: 'PW-GALACTOSE',
      titleRu: 'Лактоза ➔ Путь Лелуара',
      titleEn: 'Lactose ➔ Leloir Pathway',
      subtitleRu: 'Гал ➔ Гал-1-Ф ⇄ Г1Ф ➔ Г6Ф',
      subtitleEn: 'Gal ➔ Gal-1-P ⇄ G1P ➔ G6P',
      color: '#A855F7',
      x: 940,
      y: -190,
    },
    {
      pathwayId: 'PW-GLYCOGEN',
      titleRu: 'Метаболизм гликогена',
      titleEn: 'Glycogen Metabolism',
      subtitleRu: 'Г1Ф ➔ УДФ-Глю ⇄ Гликоген',
      subtitleEn: 'G1P ➔ UDP-Glc ⇄ Glycogen',
      color: '#06B6D4',
      x: 1320,
      y: -455,
    },
    {
      pathwayId: 'PW-FRUCTOSE',
      titleRu: 'Сахароза ➔ Фруктолиз',
      titleEn: 'Sucrose ➔ Fructolysis',
      subtitleRu: 'Фру ➔ Ф1Ф ➔ ДАФ + ГА',
      subtitleEn: 'Fru ➔ F1P ➔ DHAP + GA',
      color: '#F97316',
      x: 2145,
      y: 240,
    },
  ] as const;
  private static readonly COVERED_CORRIDOR_HIGHWAYS = new Set(['hw-gly-pdh', 'hw-hub-tca']);

  readonly superHighways = PATHWAY_SUPER_HIGHWAYS;
  readonly visibleSuperHighways = computed(() =>
    this.lodLevel() >= 2
      ? this.superHighways.filter((hw) => !AtlasShellComponent.COVERED_CORRIDOR_HIGHWAYS.has(hw.id))
      : this.superHighways
  );

  // Active selections (Mutex)
  readonly selectedReaction = signal<HumanReactionArrow | null>(null);
  readonly selectedMetabolite = signal<HumanMetaboliteNode | null>(null);
  readonly activeTab = signal<InspectorTab>('reaction');
  readonly hoveredReaction = signal<HumanReactionArrow | null>(null);
  readonly hoveredMetabolite = signal<HumanMetaboliteNode | null>(null);
  readonly hoveredSector = signal<SectorLayoutConfig | null>(null);
  readonly hoveredHighway = signal<PathwaySuperHighway | null>(null);
  readonly selectedHighway = signal<PathwaySuperHighway | null>(null);

  // LOD Level: 1 (Macro 15-45%), 2 (Meso 45-90%), 3 (Micro 90-250%)
  readonly lodLevel = computed<1 | 2 | 3>(() => {
    const z = this.zoom();
    if (z < 45) return 1;
    if (z < 90) return 2;
    return 3;
  });

  // Interactivity signals
  readonly isFluxAnimated = this.atlasStateService.isFluxAnimated;
  readonly activeCarrierFilter = signal<CarrierFilter | null>(null);
  readonly copyFeedback = signal<string | null>(null);
  private copyTimeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const focus = this.atlasStateService.mapFocusTarget();
      if (!focus) return;

      if (focus.pathwayId === 'ALL') {
        this.zoomToMacro();
        this.closeInspector();
        return;
      }

      if (focus.pathwayId === 'PW-TCA-CYCLE') {
        this.focusOnTca();
        const defaultRx = this.reactions.find((r) => r.code === 'R_CS') || this.reactions[0];
        if (defaultRx) this.onReactionClick(defaultRx);
        return;
      }

      if (focus.pathwayId === 'PW-GLYCOLISIS') {
        const sector = this.sectorConfigs.find((s) => s.targetPathwayId === 'PW-GLYCOLISIS');
        if (sector) this.focusOnSector(sector);
        const hk = this.reactions.find((r) => r.code === 'R_HK');
        if (hk) this.onReactionClick(hk);
        return;
      }

      if (focus.pathwayId === 'PW-PDH') {
        this.zoom.set(95);
        this.panX.set(0);
        this.panY.set(Math.round((1600 - 1490) * 0.95));
        const pdh = this.reactions.find((r) => r.code === 'R_PDH');
        if (pdh) this.onReactionClick(pdh);
        return;
      }

      if (focus.pathwayId === 'PW-GALACTOSE') {
        this.zoom.set(80);
        this.panX.set(Math.round((1600 - 1100) * 0.8));
        this.panY.set(Math.round((1600 - -240) * 0.8));
        const galk1 = this.reactions.find((r) => r.code === 'R_GALK1');
        if (galk1) this.onReactionClick(galk1);
        return;
      }

      if (focus.pathwayId === 'PW-GLYCOGEN') {
        this.zoom.set(85);
        this.panX.set(Math.round((1600 - 1320) * 0.85));
        this.panY.set(Math.round((1600 - -260) * 0.85));
        const gys = this.reactions.find((r) => r.code === 'R_GYS');
        if (gys) this.onReactionClick(gys);
        return;
      }

      if (focus.pathwayId === 'PW-FRUCTOSE') {
        this.zoom.set(80);
        this.panX.set(Math.round((1600 - 1990) * 0.8));
        this.panY.set(Math.round((1600 - 260) * 0.8));
        const khk = this.reactions.find((r) => r.code === 'R_KHK');
        if (khk) this.onReactionClick(khk);
        return;
      }

      if (focus.pathwayId === 'PW-OXPHOS') {
        this.focusOnOxphos();
        const ci = this.reactions.find((r) => r.code === 'R_ETC_CI');
        if (ci) this.onReactionClick(ci);
        return;
      }

      const sector = this.sectorConfigs.find((s) => s.targetPathwayId === focus.pathwayId);
      if (sector) {
        this.focusOnSector(sector);
        return;
      }

      if (focus.targetCode) {
        const node = this.allMetabolites.find((m) => m.code === focus.targetCode);
        if (node) {
          this.focusOnNode(node);
          this.onMetaboliteClick(node);
        }
      }
    });
  }

  focusOnNode(node: HumanMetaboliteNode): void {
    const centerX = node.x + node.width / 2;
    const centerY = node.y + node.height / 2;
    this.zoom.set(115);
    this.panX.set(Math.round((1600 - centerX) * 1.15));
    this.panY.set(Math.round((1600 - centerY) * 1.15));
  }

  focusOnTca(): void {
    this.zoom.set(85);
    this.panX.set(0);
    this.panY.set(Math.round((1600 - 2190) * 0.85));
  }

  focusOnOxphos(): void {
    this.zoom.set(75);
    this.panX.set(0);
    this.panY.set(Math.round((1600 - 3020) * 0.75));
  }

  focusOnSector(sector: SectorLayoutConfig): void {
    this.zoom.set(65);
    this.panX.set(Math.round((1600 - sector.centerX) * 0.65));
    this.panY.set(Math.round((1600 - sector.centerY) * 0.65));
  }

  zoomToMacro(): void {
    this.zoom.set(38);
    this.panX.set(0);
    this.panY.set(0);
  }

  getPolyPoints(poly: { x: number; y: number }[]): string {
    return poly.map((p) => `${p.x},${p.y}`).join(' ');
  }

  getCrossroadBadgeWidth(text: string): number {
    return Math.max(180, Math.round(text.length * 5.8 + 18));
  }

  onSectorClick(sector: SectorLayoutConfig): void {
    if (this.hasMovedDrag) return;
    this.atlasStateService.selectPathway(sector.targetPathwayId);
  }

  onHighwayClick(hw: PathwaySuperHighway): void {
    if (this.hasMovedDrag) return;
    this.selectedHighway.set(this.selectedHighway()?.id === hw.id ? null : hw);
  }

  readonly selectedCofactorName = computed(() => {
    const met = this.selectedMetabolite();
    if (met && met.isCofactor) {
      return met.nameRu;
    }
    return null;
  });

  // Global pan handlers
  private onWindowMouseMoveHandler?: (e: MouseEvent) => void;
  private onWindowMouseUpHandler?: (e: MouseEvent) => void;

  // Fast ID dictionaries
  readonly metaboliteMap = computed(() => {
    const map = new Map<string, HumanMetaboliteNode>();
    for (const m of this.allMetabolites) {
      map.set(m.id, m);
    }
    return map;
  });

  readonly reactionMap = computed(() => {
    const map = new Map<string, HumanReactionArrow>();
    for (const r of this.reactions) {
      map.set(r.id, r);
    }
    return map;
  });

  // Highlight check helpers
  isSubstrateOfSelected(nodeId: string): boolean {
    const r = this.selectedReaction();
    if (!r) return false;
    return r.sourceMetaboliteId === nodeId || r.secondarySourceId === nodeId;
  }

  isProductOfSelected(nodeId: string): boolean {
    const r = this.selectedReaction();
    if (!r) return false;
    return r.targetMetaboliteId === nodeId || r.secondaryTargetId === nodeId;
  }

  private static normalizeCofactorToken(raw: string): string {
    return raw
      .trim()
      .toLowerCase()
      .replace(/ᵢ/g, 'i')
      .replace(/₂/g, '2')
      .replace(/⁺/g, '+')
      .replace(/′/g, "'");
  }

  /**
   * Matches cofactor alias/token without substring collisions (e.g. UDP vs UDP-Glc, Pi vs PPi).
   */
  private doesCofactorMatchCandidate(met: HumanMetaboliteNode, candidate: string): boolean {
    if (!candidate) return false;
    const normCandidate = AtlasShellComponent.normalizeCofactorToken(candidate);
    if (!normCandidate) return false;

    const aliases = [
      met.nameRu,
      met.nameEn,
      met.abbrevRu,
      met.abbrevEn,
      ...(met.synonymsRu ?? []),
      ...(met.synonymsEn ?? []),
    ]
      .map((alias) => AtlasShellComponent.normalizeCofactorToken(alias))
      .filter((alias) => alias.length > 0);

    const candidateNoParen = normCandidate.replace(/\s*\([^)]*\)/g, '').trim();
    const tokens = normCandidate
      .split(/[\s()+/,➔→]+/)
      .map((t) => t.replace(/^[+−\-]+|[+−\-]+$/g, ''))
      .filter(Boolean);

    return aliases.some(
      (alias) =>
        normCandidate === alias ||
        (candidateNoParen.length > 0 && candidateNoParen === alias) ||
        tokens.includes(alias)
    );
  }

  doesReactionInvolveMetabolite(rx: HumanReactionArrow, met: HumanMetaboliteNode): boolean {
    if (
      rx.sourceMetaboliteId === met.id ||
      rx.secondarySourceId === met.id ||
      rx.targetMetaboliteId === met.id ||
      rx.secondaryTargetId === met.id
    ) {
      return true;
    }
    if (!met.isCofactor) {
      return false;
    }
    const matches = (candidate: string) => this.doesCofactorMatchCandidate(met, candidate);

    if (rx.substrates.some((s) => matches(s.name) || (s.nameEn && matches(s.nameEn)))) return true;
    if (rx.products.some((p) => matches(p.name) || (p.nameEn && matches(p.nameEn)))) return true;

    if (rx.cofactorArc) {
      const arc = rx.cofactorArc;
      if (arc.inCofactor && matches(arc.inCofactor)) return true;
      if (arc.inCofactorEn && matches(arc.inCofactorEn)) return true;
      if (arc.outCofactor && matches(arc.outCofactor)) return true;
      if (arc.outCofactorEn && matches(arc.outCofactorEn)) return true;
      if (arc.inItems?.some((i) => matches(i.name) || (i.nameEn && matches(i.nameEn)) || matches(i.text) || (i.textEn && matches(i.textEn)))) return true;
      if (arc.outItems?.some((i) => matches(i.name) || (i.nameEn && matches(i.nameEn)) || matches(i.text) || (i.textEn && matches(i.textEn)))) return true;
    }
    return false;
  }

  isNodeDimmed(nodeId: string): boolean {
    const query = this.atlasStateService.searchQuery().toLowerCase();
    if (query) {
      const met = this.metaboliteMap().get(nodeId);
      if (!met) return true;
      const match =
        met.nameRu.toLowerCase().includes(query) ||
        met.nameEn.toLowerCase().includes(query) ||
        met.code.toLowerCase().includes(query) ||
        met.formula.toLowerCase().includes(query) ||
        met.synonymsRu.some((s) => s.toLowerCase().includes(query));
      if (!match) return true;
    }

    const filter = this.activeCarrierFilter();
    if (filter) {
      // Keep nodes participating in filtered reactions bright
      const rxMatches = this.reactions.filter((r) => this.isReactionMatchesFilter(r, filter));
      const hasNode = rxMatches.some(
        (r) =>
          r.sourceMetaboliteId === nodeId ||
          r.secondarySourceId === nodeId ||
          r.targetMetaboliteId === nodeId ||
          r.secondaryTargetId === nodeId
      );
      return !hasNode;
    }

    const selR = this.selectedReaction();
    if (selR) {
      return !this.isSubstrateOfSelected(nodeId) && !this.isProductOfSelected(nodeId);
    }
    return false;
  }

  isReactionDimmed(reactionId: string): boolean {
    const query = this.atlasStateService.searchQuery().toLowerCase();
    if (query) {
      const rx = this.reactionMap().get(reactionId);
      if (!rx) return true;
      const match =
        rx.nameRu.toLowerCase().includes(query) ||
        rx.nameEn.toLowerCase().includes(query) ||
        rx.enzymeRu.toLowerCase().includes(query) ||
        rx.code.toLowerCase().includes(query) ||
        rx.substrates.some((s) => s.name.toLowerCase().includes(query)) ||
        rx.products.some((p) => p.name.toLowerCase().includes(query));
      if (!match) return true;
    }

    const filter = this.activeCarrierFilter();
    if (filter) {
      const r = this.reactionMap().get(reactionId);
      return !r || !this.isReactionMatchesFilter(r, filter);
    }

    const selR = this.selectedReaction();
    if (selR) {
      return selR.id !== reactionId;
    }
    const selM = this.selectedMetabolite();
    if (selM) {
      const r = this.reactionMap().get(reactionId);
      if (!r) return true;
      return !this.doesReactionInvolveMetabolite(r, selM);
    }
    return false;
  }

  private static readonly CARRIER_PATTERNS: Record<CarrierFilter, RegExp> = {
    NADH: /\b(?:nadh|nad\+)\b|надн|над⁺|nad⁺/i,
    FADH2: /\b(?:fadh2?|fad)\b|фадн|фад/i,
    GTP: /\b(?:gtp|gdp)\b|гтф|гдф/i,
    ATP: /\b(?:atp|adp)\b|атф|адф/i,
  };

  private isReactionMatchesFilter(rx: HumanReactionArrow, filter: CarrierFilter): boolean {
    const tokens: string[] = [];
    for (const s of rx.substrates) {
      tokens.push(s.name, s.nameEn ?? '');
    }
    for (const p of rx.products) {
      tokens.push(p.name, p.nameEn ?? '');
    }
    const arc = rx.cofactorArc;
    if (arc) {
      tokens.push(
        arc.inCofactor ?? '',
        arc.inCofactorEn ?? '',
        arc.outCofactor ?? '',
        arc.outCofactorEn ?? '',
        arc.inText ?? '',
        arc.outText ?? ''
      );
      for (const item of [...(arc.inItems ?? []), ...(arc.outItems ?? [])]) {
        tokens.push(item.name, item.nameEn ?? '', item.text, item.textEn ?? '');
      }
    }
    return AtlasShellComponent.CARRIER_PATTERNS[filter].test(tokens.join(' '));
  }

  ngOnInit(): void {
    this.setupGlobalPanListeners();
    // Default selection: Step 1 (Citrate Synthase) so the user sees rich details immediately!
    const defaultRx = this.reactions.find((r) => r.code === 'R_CS') || this.reactions[0];
    if (defaultRx) {
      this.onReactionClick(defaultRx);
    }
  }

  ngOnDestroy(): void {
    this.removeGlobalPanListeners();
    if (this.copyTimeoutId) {
      clearTimeout(this.copyTimeoutId);
    }
  }

  private setupGlobalPanListeners(): void {
    if (typeof window === 'undefined') return;

    this.onWindowMouseMoveHandler = (e: MouseEvent) => {
      if (this.isDragging()) {
        const dx = Math.abs(e.clientX - this.dragStartClientX);
        const dy = Math.abs(e.clientY - this.dragStartClientY);
        if (dx > 4 || dy > 4) {
          this.hasMovedDrag = true;
        }
        this.panX.set(e.clientX - this.dragStartX);
        this.panY.set(e.clientY - this.dragStartY);
      }
    };

    this.onWindowMouseUpHandler = () => {
      if (this.isDragging()) {
        this.isDragging.set(false);
      }
    };

    window.addEventListener('mousemove', this.onWindowMouseMoveHandler);
    window.addEventListener('mouseup', this.onWindowMouseUpHandler);
  }

  private removeGlobalPanListeners(): void {
    if (typeof window === 'undefined') return;
    if (this.onWindowMouseMoveHandler) {
      window.removeEventListener('mousemove', this.onWindowMouseMoveHandler);
    }
    if (this.onWindowMouseUpHandler) {
      window.removeEventListener('mouseup', this.onWindowMouseUpHandler);
    }
  }

  onReactionClick(reaction: HumanReactionArrow): void {
    if (this.hasMovedDrag) return;
    this.selectedReaction.set(reaction);
    this.selectedMetabolite.set(null);
    this.activeTab.set('reaction');
  }

  onMetaboliteClick(metabolite: HumanMetaboliteNode): void {
    if (this.hasMovedDrag) return;
    this.selectedMetabolite.set(metabolite);
    this.selectedReaction.set(null);
    this.activeTab.set('molecule');
  }

  onCofactorClick(cofactorName: string): void {
    const met = this.findMetaboliteByName(cofactorName);
    if (met) {
      this.onMetaboliteClick(met);
    }
  }

  onMacroSubpathwayClick(pathwayId: string, event: Event): void {
    event.stopPropagation();
    this.atlasStateService.selectPathway(pathwayId);
  }

  selectReactionByCode(code: string): void {
    const rx = this.reactions.find((r) => r.code === code);
    if (rx) {
      this.onReactionClick(rx);
    }
  }

  toggleFluxAnimation(): void {
    this.atlasStateService.toggleFlux();
  }

  toggleEnergyFilter(carrier: CarrierFilter): void {
    if (this.activeCarrierFilter() === carrier) {
      this.activeCarrierFilter.set(null);
    } else {
      this.activeCarrierFilter.set(carrier);
      // Auto-select the first reaction matching this carrier
      const firstMatch = this.reactions.find((r) => this.isReactionMatchesFilter(r, carrier));
      if (firstMatch) {
        this.onReactionClick(firstMatch);
      }
    }
  }

  getPathwayStepLabel(rx: HumanReactionArrow): string {
    const isEn = this.localeService.locale() === 'en';
    if (rx.code === 'R_LCT') {
      return isEn
        ? 'Leloir Pathway • Dietary Lactose Entry'
        : 'Путь Лелуара • Вход (Гидролиз лактозы)';
    }
    if (rx.code === 'R_SI') {
      return isEn
        ? 'Fructolysis • Dietary Sucrose Entry'
        : 'Фруктолиз • Вход (Гидролиз сахарозы)';
    }
    const labels: Record<string, { ru: string; en: string }> = {
      'PW-GLYCOLISIS': {
        ru: `Гликолиз • Стадия ${rx.stepNumber} из 10`,
        en: `Glycolysis • Step ${rx.stepNumber} of 10`,
      },
      'PW-GALACTOSE': {
        ru: `Путь Лелуара (Галактоза) • Стадия ${rx.stepNumber} из 4`,
        en: `Leloir Pathway (Galactose) • Step ${rx.stepNumber} of 4`,
      },
      'PW-GLYCOGEN': {
        ru: `Метаболизм гликогена • Стадия ${rx.stepNumber} из 3`,
        en: `Glycogen Metabolism • Step ${rx.stepNumber} of 3`,
      },
      'PW-FRUCTOSE': {
        ru: `Фруктолиз • Стадия ${rx.stepNumber} из 4`,
        en: `Fructolysis • Step ${rx.stepNumber} of 4`,
      },
      'PW-MPC': {
        ru: 'Мембранный транспорт • MPC1/2',
        en: 'Membrane Transport • MPC1/2',
      },
      'PW-PDH': {
        ru: 'ПДХ-комплекс (E1–E2–E3)',
        en: 'PDH Complex (E1–E2–E3)',
      },
      'PW-TCA-CYCLE': {
        ru: `Цикл Кребса (ЦТК) • Стадия ${rx.stepNumber} из 8`,
        en: `TCA Cycle • Step ${rx.stepNumber} of 8`,
      },
      'PW-OXPHOS': {
        ru: `Дыхательная цепь (OxPhos) • Стадия ${rx.stepNumber} из 4`,
        en: `OxPhos / ETC • Step ${rx.stepNumber} of 4`,
      },
    };
    const match = rx.pathwayCode ? labels[rx.pathwayCode] : undefined;
    if (match) {
      return isEn ? match.en : match.ru;
    }
    return isEn ? rx.nameEn : rx.nameRu;
  }

  findMetabolite(nameRu?: string, nameEn?: string): HumanMetaboliteNode | undefined {
    if (nameRu) {
      const found = this.findMetaboliteByName(nameRu);
      if (found) return found;
    }
    if (nameEn) {
      const found = this.findMetaboliteByName(nameEn);
      if (found) return found;
    }
    return undefined;
  }

  findMetaboliteByName(name: string): HumanMetaboliteNode | undefined {
    if (!name) return undefined;
    const clean = name.trim().toLowerCase();
    const withoutParen = clean.replace(/\s*\([^)]*\)/g, '').trim();

    // 1. Exact match on official names, code, or exact abbreviations
    const exact = this.allMetabolites.find((m) => {
      const ru = m.nameRu.toLowerCase();
      const en = m.nameEn.toLowerCase();
      const abbrevRu = m.abbrevRu.toLowerCase();
      const abbrevEn = m.abbrevEn.toLowerCase();
      const code = m.code.toLowerCase();
      return (
        ru === clean ||
        en === clean ||
        code === clean ||
        abbrevRu === clean ||
        abbrevEn === clean ||
        (withoutParen.length > 0 && (ru === withoutParen || en === withoutParen))
      );
    });
    if (exact) return exact;

    // 2. Exact match on synonyms
    const exactSyn = this.allMetabolites.find((m) => {
      const matchSyn = (syn: string) => {
        const s = syn.toLowerCase();
        return s === clean || (withoutParen.length > 0 && s === withoutParen);
      };
      return m.synonymsRu?.some(matchSyn) || m.synonymsEn?.some(matchSyn);
    });
    if (exactSyn) return exactSyn;

    // 3. Prefix match ONLY on full names (length >= 4), never on short abbreviations
    return this.allMetabolites.find((m) => {
      const ru = m.nameRu.toLowerCase();
      const en = m.nameEn.toLowerCase();
      if (ru.length >= 4 && (clean.startsWith(ru) || ru.startsWith(clean))) return true;
      if (en.length >= 4 && (clean.startsWith(en) || en.startsWith(clean))) return true;
      if (m.synonymsRu?.some((s) => s.length >= 4 && (clean.startsWith(s.toLowerCase()) || s.toLowerCase().startsWith(clean)))) return true;
      if (m.synonymsEn?.some((s) => s.length >= 4 && (clean.startsWith(s.toLowerCase()) || s.toLowerCase().startsWith(clean)))) return true;
      return false;
    });
  }

  getReactionsForMetabolite(metId: string): { rx: HumanReactionArrow; role: 'substrate' | 'product' }[] {
    const list: { rx: HumanReactionArrow; role: 'substrate' | 'product' }[] = [];
    const targetMet = this.allMetabolites.find((m) => m.id === metId);

    for (const r of this.reactions) {
      if (r.sourceMetaboliteId === metId || r.secondarySourceId === metId) {
        list.push({ rx: r, role: 'substrate' });
      } else if (r.targetMetaboliteId === metId || r.secondaryTargetId === metId) {
        list.push({ rx: r, role: 'product' });
      } else if (targetMet && targetMet.isCofactor) {
        const matches = (candidate: string) => this.doesCofactorMatchCandidate(targetMet, candidate);

        const isSub =
          r.substrates.some((s) => matches(s.name) || (s.nameEn && matches(s.nameEn))) ||
          r.cofactorArc?.inItems?.some((i) => matches(i.name) || (i.nameEn && matches(i.nameEn)) || matches(i.text) || (i.textEn && matches(i.textEn))) ||
          (r.cofactorArc?.inCofactor && matches(r.cofactorArc.inCofactor)) ||
          (r.cofactorArc?.inCofactorEn && matches(r.cofactorArc.inCofactorEn));

        const isProd =
          r.products.some((p) => matches(p.name) || (p.nameEn && matches(p.nameEn))) ||
          r.cofactorArc?.outItems?.some((i) => matches(i.name) || (i.nameEn && matches(i.nameEn)) || matches(i.text) || (i.textEn && matches(i.textEn))) ||
          (r.cofactorArc?.outCofactor && matches(r.cofactorArc.outCofactor)) ||
          (r.cofactorArc?.outCofactorEn && matches(r.cofactorArc.outCofactorEn));

        if (isProd) {
          list.push({ rx: r, role: 'product' });
        } else if (isSub) {
          list.push({ rx: r, role: 'substrate' });
        }
      }
    }
    return list;
  }

  getSortedPathways(met: HumanMetaboliteNode): { current: PathwayParticipation[]; others: PathwayParticipation[] } {
    const current: PathwayParticipation[] = [];
    const others: PathwayParticipation[] = [];
    const list = met.pathwaysRu || [];
    const activePathwayId = this.atlasStateService.selectedPathwayId();

    for (const p of list) {
      const matchesActive =
        (activePathwayId === 'PW-GLYCOLISIS' && p.pathwayCode === 'PW-GLYCOLISIS') ||
        (activePathwayId === 'PW-GALACTOSE' && (p.pathwayCode === 'PW-GALACTOSE' || p.pathwayCode === 'PWY_LELOIR')) ||
        (activePathwayId === 'PW-GLYCOGEN' && (p.pathwayCode === 'PW-GLYCOGEN' || p.pathwayCode === 'PWY_GLYCOGEN')) ||
        (activePathwayId === 'PW-FRUCTOSE' && (p.pathwayCode === 'PW-FRUCTOSE' || p.pathwayCode === 'PWY_FRUCTOLYSIS')) ||
        (activePathwayId === 'PW-PDH' && (p.pathwayCode === 'PW-PDH' || p.pathwayCode === 'PW-MPC')) ||
        (activePathwayId === 'PW-TCA-CYCLE' && (p.pathwayCode === 'PW-TCA-CYCLE' || p.pathwayCode === 'PWY_TCA')) ||
        (activePathwayId === 'PW-OXPHOS' && (p.pathwayCode === 'PW-OXPHOS' || p.pathwayCode === 'PWY_ETC' || p.pathwayCode === 'PWY_OXPHOS'));

      if (matchesActive || (activePathwayId === 'ALL' && p.isCurrentPathway)) {
        current.push(p);
      } else {
        others.push(p);
      }
    }

    if (current.length === 0 && list.length > 0) {
      current.push(...list.filter((p) => p.isCurrentPathway));
      others.length = 0;
      others.push(...list.filter((p) => !p.isCurrentPathway));
    }

    return { current, others };
  }

  getRoleName(role: string): string {
    const isEn = this.localeService.locale() === 'en';
    switch (role) {
      case 'substrate':
        return isEn ? 'Substrate (Input)' : 'Субстрат (Вход)';
      case 'product':
        return isEn ? 'Product (Output)' : 'Продукт (Выход)';
      case 'cofactor':
        return isEn ? 'Coenzyme / Cofactor' : 'Кофермент / Кофактор';
      case 'intermediate':
        return isEn ? 'Intermediate' : 'Интермедиат';
      default:
        return isEn ? 'Participant' : 'Участник';
    }
  }

  getRoleNameRu(role: string): string {
    return this.getRoleName(role);
  }

  copyText(text: string, label: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        const isEn = this.localeService.locale() === 'en';
        this.copyFeedback.set(isEn ? `${label} copied to clipboard!` : `${label} скопирован в буфер!`);
        if (this.copyTimeoutId) clearTimeout(this.copyTimeoutId);
        this.copyTimeoutId = setTimeout(() => this.copyFeedback.set(null), 2400);
      });
    }
  }

  closeInspector(): void {
    this.selectedReaction.set(null);
    this.selectedMetabolite.set(null);
  }

  setActiveTab(tab: InspectorTab): void {
    this.activeTab.set(tab);
  }

  onViewportMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    // Do not initiate map dragging when clicking inside the inspector panel or HUD control buttons
    if (
      target.closest('.context-inspector') ||
      target.closest('.hud-panel') ||
      target.closest('.context-pill')
    ) {
      return;
    }

    this.isDragging.set(true);
    this.hasMovedDrag = false;
    this.dragStartX = event.clientX - this.panX();
    this.dragStartY = event.clientY - this.panY();
    this.dragStartClientX = event.clientX;
    this.dragStartClientY = event.clientY;
  }

  onWheel(event: WheelEvent): void {
    const target = event.target as HTMLElement;
    // Only suppress map zoom when hovering over the right inspector panel to allow its native text scrolling
    if (target.closest('.context-inspector')) {
      return;
    }
    event.preventDefault();
    const zoomDelta = event.deltaY < 0 ? 10 : -10;
    this.zoom.update((z) => Math.max(15, Math.min(250, z + zoomDelta)));
  }

  zoomIn(): void {
    this.zoom.update((z) => Math.min(z + 15, 250));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(z - 15, 15));
  }

  resetZoom(): void {
    this.zoom.set(100);
    this.panX.set(0);
    this.panY.set(0);
  }
}
