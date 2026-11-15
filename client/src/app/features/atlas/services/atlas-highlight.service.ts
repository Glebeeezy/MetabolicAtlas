import { computed, inject, Injectable, signal } from '@angular/core';
import { AtlasStateService } from '../../../core/services/atlas-state.service';
import {
  HumanMetaboliteNode,
  HumanReactionArrow,
  MetabolismService,
  PathwayParticipation,
  PathwaySuperHighway,
  SectorLayoutConfig,
} from '../../../core/metabolism';

export type InspectorTab = 'reaction' | 'molecule';
export type CarrierFilter = 'NADH' | 'FADH2' | 'GTP' | 'ATP';

@Injectable({
  providedIn: 'root',
})
export class AtlasHighlightService {
  private readonly atlasStateService = inject(AtlasStateService);
  private readonly metabolismService = inject(MetabolismService);

  readonly canvasMetabolites = this.metabolismService.canvasMetabolites;
  readonly allMetabolites = this.metabolismService.allMetabolites;
  readonly reactions = this.metabolismService.reactions;

  // Active selections (Mutex)
  readonly selectedReaction = signal<HumanReactionArrow | null>(null);
  readonly selectedMetabolite = signal<HumanMetaboliteNode | null>(null);
  readonly activeTab = signal<InspectorTab>('reaction');
  readonly hoveredReaction = signal<HumanReactionArrow | null>(null);
  readonly hoveredMetabolite = signal<HumanMetaboliteNode | null>(null);
  readonly hoveredSector = signal<SectorLayoutConfig | null>(null);
  readonly hoveredHighway = signal<PathwaySuperHighway | null>(null);
  readonly selectedHighway = signal<PathwaySuperHighway | null>(null);
  readonly activeCarrierFilter = signal<CarrierFilter | null>(null);

  readonly selectedCofactorName = computed(() => {
    const met = this.selectedMetabolite();
    if (met && met.isCofactor) {
      return met.nameRu;
    }
    return null;
  });

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

  // O(1) Reactive computed sets for highlight checks
  readonly selectedSubstrateIds = computed<Set<string>>(() => {
    const r = this.selectedReaction();
    if (!r) return new Set();
    const set = new Set<string>();
    if (r.sourceMetaboliteId) set.add(r.sourceMetaboliteId);
    if (r.secondarySourceId) set.add(r.secondarySourceId);
    return set;
  });

  readonly selectedProductIds = computed<Set<string>>(() => {
    const r = this.selectedReaction();
    if (!r) return new Set();
    const set = new Set<string>();
    if (r.targetMetaboliteId) set.add(r.targetMetaboliteId);
    if (r.secondaryTargetId) set.add(r.secondaryTargetId);
    return set;
  });

  readonly matchingQueryNodeIds = computed<Set<string> | null>(() => {
    const query = this.atlasStateService.searchQuery().toLowerCase();
    if (!query) return null;
    const matched = new Set<string>();
    for (const met of this.canvasMetabolites) {
      if (
        met.nameRu.toLowerCase().includes(query) ||
        met.nameEn.toLowerCase().includes(query) ||
        met.code.toLowerCase().includes(query) ||
        met.formula.toLowerCase().includes(query) ||
        met.synonymsRu.some((s) => s.toLowerCase().includes(query))
      ) {
        matched.add(met.id);
      }
    }
    return matched;
  });

  readonly matchingQueryReactionIds = computed<Set<string> | null>(() => {
    const query = this.atlasStateService.searchQuery().toLowerCase();
    if (!query) return null;
    const matched = new Set<string>();
    for (const rx of this.reactions) {
      if (
        rx.nameRu.toLowerCase().includes(query) ||
        rx.nameEn.toLowerCase().includes(query) ||
        rx.enzymeRu.toLowerCase().includes(query) ||
        rx.code.toLowerCase().includes(query) ||
        rx.substrates.some((s) => s.name.toLowerCase().includes(query)) ||
        rx.products.some((p) => p.name.toLowerCase().includes(query))
      ) {
        matched.add(rx.id);
      }
    }
    return matched;
  });

  readonly activeCarrierMatchingReactionIds = computed<Set<string> | null>(() => {
    const filter = this.activeCarrierFilter();
    if (!filter) return null;
    const matched = new Set<string>();
    for (const rx of this.reactions) {
      if (this.isReactionMatchesFilter(rx, filter)) {
        matched.add(rx.id);
      }
    }
    return matched;
  });

  readonly activeCarrierMatchingNodeIds = computed<Set<string> | null>(() => {
    const rxIds = this.activeCarrierMatchingReactionIds();
    if (!rxIds) return null;
    const matched = new Set<string>();
    for (const rx of this.reactions) {
      if (rxIds.has(rx.id)) {
        matched.add(rx.sourceMetaboliteId);
        if (rx.secondarySourceId) matched.add(rx.secondarySourceId);
        matched.add(rx.targetMetaboliteId);
        if (rx.secondaryTargetId) matched.add(rx.secondaryTargetId);
      }
    }
    return matched;
  });

  readonly selectedMetaboliteInvolvedReactionIds = computed<Set<string> | null>(() => {
    const selM = this.selectedMetabolite();
    if (!selM) return null;
    const matched = new Set<string>();
    for (const rx of this.reactions) {
      if (this.doesReactionInvolveMetabolite(rx, selM)) {
        matched.add(rx.id);
      }
    }
    return matched;
  });

  readonly dimmedNodeIds = computed<Set<string>>(() => {
    const set = new Set<string>();
    const queryMatches = this.matchingQueryNodeIds();
    const carrierNodes = this.activeCarrierMatchingNodeIds();
    const selR = this.selectedReaction();
    const subIds = this.selectedSubstrateIds();
    const prodIds = this.selectedProductIds();

    for (const met of this.canvasMetabolites) {
      if (queryMatches !== null && !queryMatches.has(met.id)) {
        set.add(met.id);
        continue;
      }
      if (carrierNodes !== null) {
        if (!carrierNodes.has(met.id)) {
          set.add(met.id);
        }
        continue;
      }
      if (selR) {
        if (!subIds.has(met.id) && !prodIds.has(met.id)) {
          set.add(met.id);
        }
      }
    }
    return set;
  });

  readonly dimmedReactionIds = computed<Set<string>>(() => {
    const set = new Set<string>();
    const queryMatches = this.matchingQueryReactionIds();
    const carrierRxs = this.activeCarrierMatchingReactionIds();
    const selR = this.selectedReaction();
    const selMRxs = this.selectedMetaboliteInvolvedReactionIds();

    for (const rx of this.reactions) {
      if (queryMatches !== null && !queryMatches.has(rx.id)) {
        set.add(rx.id);
        continue;
      }
      if (carrierRxs !== null) {
        if (!carrierRxs.has(rx.id)) {
          set.add(rx.id);
        }
        continue;
      }
      if (selR) {
        if (selR.id !== rx.id) {
          set.add(rx.id);
        }
        continue;
      }
      if (selMRxs !== null) {
        if (!selMRxs.has(rx.id)) {
          set.add(rx.id);
        }
      }
    }
    return set;
  });

  // Highlight check helpers (O(1) using computed sets)
  isSubstrateOfSelected(nodeId: string): boolean {
    return this.selectedSubstrateIds().has(nodeId);
  }

  isProductOfSelected(nodeId: string): boolean {
    return this.selectedProductIds().has(nodeId);
  }

  isNodeDimmed(nodeId: string): boolean {
    return this.dimmedNodeIds().has(nodeId);
  }

  isReactionDimmed(reactionId: string): boolean {
    return this.dimmedReactionIds().has(reactionId);
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
  doesCofactorMatchCandidate(met: HumanMetaboliteNode, candidate: string): boolean {
    if (!candidate) return false;
    const normCandidate = AtlasHighlightService.normalizeCofactorToken(candidate);
    if (!normCandidate) return false;

    const aliases = [
      met.nameRu,
      met.nameEn,
      met.abbrevRu,
      met.abbrevEn,
      ...(met.synonymsRu ?? []),
      ...(met.synonymsEn ?? []),
    ]
      .map((alias) => AtlasHighlightService.normalizeCofactorToken(alias))
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

  private static readonly CARRIER_PATTERNS: Record<CarrierFilter, RegExp> = {
    NADH: /\b(?:nadh|nad\+)\b|надн|над⁺|nad⁺/i,
    FADH2: /\b(?:fadh2?|fad)\b|фадн|фад/i,
    GTP: /\b(?:gtp|gdp)\b|гтф|гдф/i,
    ATP: /\b(?:atp|adp)\b|атф|адф/i,
  };

  isReactionMatchesFilter(rx: HumanReactionArrow, filter: CarrierFilter): boolean {
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
    return AtlasHighlightService.CARRIER_PATTERNS[filter].test(tokens.join(' '));
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

  selectMetaboliteByCode(code: string): void {
    const met = this.allMetabolites.find((m) => m.code === code);
    if (met) {
      this.onMetaboliteClick(met);
    }
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

  closeInspector(): void {
    this.selectedReaction.set(null);
    this.selectedMetabolite.set(null);
  }

  setActiveTab(tab: InspectorTab): void {
    this.activeTab.set(tab);
  }
}
