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
} from './atlas-data';
import { ReactionArrowComponent } from './components/reaction-arrow/reaction-arrow.component';
import { ChemicalStructureComponent } from './components/chemical-structure/chemical-structure.component';

export type InspectorTab = 'reaction' | 'molecule';

// Re-export data models and datasets for backward compatibility with tests and callers
export {
  HUMAN_METABOLITES,
  COFACTOR_METABOLITES,
  ALL_METABOLITES,
  HUMAN_REACTIONS,
  HUMAN_CROSSROADS,
};

export type {
  HumanMetaboliteNode,
  HumanReactionArrow,
  MetabolicCrossroad,
  PathwayParticipation,
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

  // Static datasets
  readonly canvasMetabolites = HUMAN_METABOLITES; // Tile nodes on canvas
  readonly allMetabolites = ALL_METABOLITES;       // Includes all cofactors
  readonly reactions = HUMAN_REACTIONS;
  readonly crossroads = HUMAN_CROSSROADS;

  // Active selections (Mutex)
  readonly selectedReaction = signal<HumanReactionArrow | null>(null);
  readonly selectedMetabolite = signal<HumanMetaboliteNode | null>(null);
  readonly activeTab = signal<InspectorTab>('reaction');
  readonly hoveredReaction = signal<HumanReactionArrow | null>(null);
  readonly hoveredMetabolite = signal<HumanMetaboliteNode | null>(null);

  // Interactivity signals
  readonly isFluxAnimated = this.atlasStateService.isFluxAnimated;
  readonly activeCarrierFilter = signal<'NADH' | 'FADH2' | 'GTP' | null>(null);
  readonly copyFeedback = signal<string | null>(null);
  private copyTimeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const focus = this.atlasStateService.mapFocusTarget();
      if (!focus) return;

      if (focus.pathwayId === 'ALL') {
        this.resetZoom();
        this.closeInspector();
        return;
      }

      if (focus.pathwayId === 'PW-TCA-CYCLE') {
        this.resetZoom();
        this.onReactionClick(this.reactions[0]);
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
    this.panX.set(Math.round((700 - centerX) * 0.7));
    this.panY.set(Math.round((510 - centerY) * 0.7));
    this.zoom.set(115);
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
    return r.targetMetaboliteId === nodeId;
  }

  doesReactionInvolveMetabolite(rx: HumanReactionArrow, met: HumanMetaboliteNode): boolean {
    if (rx.sourceMetaboliteId === met.id || rx.secondarySourceId === met.id || rx.targetMetaboliteId === met.id) {
      return true;
    }
    if (!met.isCofactor) {
      return false;
    }
    const matches = (candidate: string) => {
      if (!candidate) return false;
      const c = candidate.toLowerCase();
      const ru = met.nameRu.toLowerCase();
      const en = met.nameEn.toLowerCase();
      const abbrevRu = met.abbrevRu.toLowerCase();
      const abbrevEn = met.abbrevEn.toLowerCase();
      if (c.includes(ru) || c.includes(en) || c.includes(abbrevRu) || c.includes(abbrevEn) || ru.includes(c) || en.includes(c) || abbrevRu.includes(c) || abbrevEn.includes(c)) return true;
      if (met.synonymsRu.some((syn) => {
        const s = syn.toLowerCase();
        return c.includes(s) || s.includes(c);
      })) return true;
      if (met.synonymsEn && met.synonymsEn.some((syn) => {
        const s = syn.toLowerCase();
        return c.includes(s) || s.includes(c);
      })) return true;
      return false;
    };

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
        (r) => r.sourceMetaboliteId === nodeId || r.secondarySourceId === nodeId || r.targetMetaboliteId === nodeId
      );
      if (!hasNode) return true;
    }

    const selR = this.selectedReaction();
    if (selR) {
      return !this.isSubstrateOfSelected(nodeId) && !this.isProductOfSelected(nodeId);
    }
    const selM = this.selectedMetabolite();
    if (selM) {
      if (selM.isCofactor) {
        // Keep bright if this node participates in any reaction involving this cofactor
        const activeRxs = this.reactions.filter((r) => this.doesReactionInvolveMetabolite(r, selM));
        const isInvolved = activeRxs.some(
          (r) => r.sourceMetaboliteId === nodeId || r.secondarySourceId === nodeId || r.targetMetaboliteId === nodeId
        );
        return !isInvolved;
      }
      return selM.id !== nodeId;
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
      if (!r || !this.isReactionMatchesFilter(r, filter)) {
        return true;
      }
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

  private isReactionMatchesFilter(rx: HumanReactionArrow, filter: 'NADH' | 'FADH2' | 'GTP'): boolean {
    if (filter === 'NADH') {
      return rx.stepNumber === 3 || rx.stepNumber === 4 || rx.stepNumber === 8;
    }
    if (filter === 'FADH2') {
      return rx.stepNumber === 6;
    }
    if (filter === 'GTP') {
      return rx.stepNumber === 5;
    }
    return false;
  }

  ngOnInit(): void {
    this.setupGlobalPanListeners();
    // Default selection: Step 1 (Citrate Synthase) so the user sees rich details immediately!
    this.onReactionClick(this.reactions[0]);
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
    this.selectedReaction.set(reaction);
    this.selectedMetabolite.set(null);
    this.activeTab.set('reaction');
  }

  onMetaboliteClick(metabolite: HumanMetaboliteNode): void {
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

  selectReactionByCode(code: string): void {
    const rx = this.reactions.find((r) => r.code === code);
    if (rx) {
      this.onReactionClick(rx);
    }
  }

  toggleFluxAnimation(): void {
    this.atlasStateService.toggleFlux();
  }

  toggleEnergyFilter(carrier: 'NADH' | 'FADH2' | 'GTP'): void {
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

  findMetaboliteByName(name: string): HumanMetaboliteNode | undefined {
    if (!name) return undefined;
    const clean = name.trim().toLowerCase();
    return this.allMetabolites.find((m) => {
      const ru = m.nameRu.toLowerCase();
      const en = m.nameEn.toLowerCase();
      const abbrevRu = m.abbrevRu.toLowerCase();
      const abbrevEn = m.abbrevEn.toLowerCase();
      if (ru === clean || en === clean || abbrevRu === clean || abbrevEn === clean) return true;
      if (clean.startsWith(ru) || clean.startsWith(en) || clean.startsWith(abbrevRu) || clean.startsWith(abbrevEn)) return true;
      if (m.synonymsRu.some((s) => {
        const sClean = s.toLowerCase();
        return sClean === clean || clean.startsWith(sClean) || sClean.startsWith(clean);
      })) return true;
      if (m.synonymsEn && m.synonymsEn.some((s) => {
        const sClean = s.toLowerCase();
        return sClean === clean || clean.startsWith(sClean) || sClean.startsWith(clean);
      })) return true;
      return false;
    });
  }

  getReactionsForMetabolite(metId: string): { rx: HumanReactionArrow; role: 'substrate' | 'product' }[] {
    const list: { rx: HumanReactionArrow; role: 'substrate' | 'product' }[] = [];
    const targetMet = this.allMetabolites.find((m) => m.id === metId);

    for (const r of this.reactions) {
      if (r.sourceMetaboliteId === metId || r.secondarySourceId === metId) {
        list.push({ rx: r, role: 'substrate' });
      } else if (r.targetMetaboliteId === metId) {
        list.push({ rx: r, role: 'product' });
      } else if (targetMet && targetMet.isCofactor) {
        const matches = (candidate: string) => {
          if (!candidate) return false;
          const c = candidate.toLowerCase();
          const ru = targetMet.nameRu.toLowerCase();
          const en = targetMet.nameEn.toLowerCase();
          const abbrevRu = targetMet.abbrevRu.toLowerCase();
          const abbrevEn = targetMet.abbrevEn.toLowerCase();
          if (c.includes(ru) || c.includes(en) || c.includes(abbrevRu) || c.includes(abbrevEn) || ru.includes(c) || en.includes(c) || abbrevRu.includes(c) || abbrevEn.includes(c)) return true;
          if (targetMet.synonymsRu.some((syn) => {
            const s = syn.toLowerCase();
            return c.includes(s) || s.includes(c);
          })) return true;
          if (targetMet.synonymsEn && targetMet.synonymsEn.some((syn) => {
            const s = syn.toLowerCase();
            return c.includes(s) || s.includes(c);
          })) return true;
          return false;
        };

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

    for (const p of list) {
      if (p.isCurrentPathway) {
        current.push(p);
      } else {
        others.push(p);
      }
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
    if (target.closest('[data-interactive="true"]')) return;

    this.isDragging.set(true);
    this.dragStartX = event.clientX - this.panX();
    this.dragStartY = event.clientY - this.panY();
  }

  onWheel(event: WheelEvent): void {
    const target = event.target as HTMLElement;
    // When hovering over the right inspector panel or any interactive card, let native scrolling work smoothly!
    if (target.closest('.context-inspector') || target.closest('[data-interactive="true"]')) {
      return;
    }
    event.preventDefault();
    const zoomDelta = event.deltaY < 0 ? 12 : -12;
    this.zoom.update((z) => Math.max(30, Math.min(250, z + zoomDelta)));
  }

  zoomIn(): void {
    this.zoom.update((z) => Math.min(z + 15, 250));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(z - 15, 30));
  }

  resetZoom(): void {
    this.zoom.set(100);
    this.panX.set(0);
    this.panY.set(0);
  }
}
