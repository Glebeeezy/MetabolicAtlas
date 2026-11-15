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
import { ApiService } from '../../core/services/api.service';
import { LocaleService } from '../../core/services/locale.service';
import { AtlasStateService } from '../../core/services/atlas-state.service';
import { MetabolismService } from '../../core/metabolism';
import { AtlasViewportService } from './services/atlas-viewport.service';
import {
  AtlasHighlightService,
  CarrierFilter,
  InspectorTab,
} from './services/atlas-highlight.service';
import { MACRO_SUBPATHWAYS } from '../../data/metabolism/navigation';
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
import { AtlasZoomControlsComponent } from './overlays/zoom-controls/atlas-zoom-controls.component';
import { AtlasContextPillComponent } from './overlays/context-pill/atlas-context-pill.component';
import { AtlasInspectorComponent } from './overlays/inspector/atlas-inspector.component';
import { ReactionInspectorComponent } from './overlays/inspector/reaction-inspector/reaction-inspector.component';
import { MetaboliteInspectorComponent } from './overlays/inspector/metabolite-inspector/metabolite-inspector.component';
import { AtlasPolarGridComponent } from './svg/polar-grid/atlas-polar-grid.component';
import { AtlasSectorComponent } from './svg/sector-continent/atlas-sector.component';
import { AtlasSuperhighwayComponent } from './svg/superhighway/atlas-superhighway.component';
import { AtlasCentralBeaconComponent } from './svg/central-beacon/atlas-central-beacon.component';
import { AtlasCrossroadsLayerComponent } from './svg/crossroads-layer/atlas-crossroads-layer.component';
import { AtlasCompartmentLayerComponent } from './svg/compartment-layer/atlas-compartment-layer.component';
import { AtlasOxPhosLayerComponent } from './svg/oxphos-layer/atlas-oxphos-layer.component';
import { AtlasMembraneComplexComponent } from './svg/membrane-complex/atlas-membrane-complex.component';
import { AtlasAtpTerminalComponent } from './svg/atp-terminal/atlas-atp-terminal.component';
import { AtlasMetaboliteTileComponent } from './svg/metabolite-tile/atlas-metabolite-tile.component';

export type { InspectorTab, CarrierFilter };

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
  imports: [
    CommonModule,
    ReactionArrowComponent,
    AtlasZoomControlsComponent,
    AtlasContextPillComponent,
    AtlasInspectorComponent,
    ReactionInspectorComponent,
    MetaboliteInspectorComponent,
    AtlasPolarGridComponent,
    AtlasSectorComponent,
    AtlasSuperhighwayComponent,
    AtlasCentralBeaconComponent,
    AtlasCrossroadsLayerComponent,
    AtlasCompartmentLayerComponent,
    AtlasOxPhosLayerComponent,
    AtlasMembraneComplexComponent,
    AtlasAtpTerminalComponent,
    AtlasMetaboliteTileComponent,
  ],
  templateUrl: './atlas-shell.component.html',
  styleUrl: './atlas-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasShellComponent implements OnInit, OnDestroy {
  protected readonly api = inject(ApiService);
  protected readonly localeService = inject(LocaleService);
  protected readonly atlasStateService = inject(AtlasStateService);
  protected readonly metabolismService = inject(MetabolismService);
  protected readonly viewport = inject(AtlasViewportService);
  protected readonly highlight = inject(AtlasHighlightService);

  // Viewport & Zoom signals (delegated to AtlasViewportService)
  readonly zoom = this.viewport.zoom;
  readonly panX = this.viewport.panX;
  readonly panY = this.viewport.panY;
  readonly isDragging = this.viewport.isDragging;
  readonly lodLevel = this.viewport.lodLevel;

  // Datasets provided via MetabolismService (Data Access Layer)
  readonly canvasMetabolites = this.metabolismService.canvasMetabolites;
  readonly allMetabolites = this.metabolismService.allMetabolites;
  readonly reactions = this.metabolismService.reactions;
  readonly crossroads = this.metabolismService.crossroads;
  readonly sectorConfigs = this.metabolismService.sectorConfigs;
  readonly macroSubpathways = MACRO_SUBPATHWAYS;
  private static readonly COVERED_CORRIDOR_HIGHWAYS = new Set(['hw-gly-pdh', 'hw-hub-tca']);

  readonly superHighways = this.metabolismService.superHighways;
  readonly visibleSuperHighways = computed(() =>
    this.lodLevel() >= 2
      ? this.superHighways.filter((hw) => !AtlasShellComponent.COVERED_CORRIDOR_HIGHWAYS.has(hw.id))
      : this.superHighways
  );

  // Active selections & highlights (delegated to AtlasHighlightService)
  readonly selectedReaction = this.highlight.selectedReaction;
  readonly selectedMetabolite = this.highlight.selectedMetabolite;
  readonly activeTab = this.highlight.activeTab;
  readonly hoveredReaction = this.highlight.hoveredReaction;
  readonly hoveredMetabolite = this.highlight.hoveredMetabolite;
  readonly hoveredSector = this.highlight.hoveredSector;
  readonly hoveredHighway = this.highlight.hoveredHighway;
  readonly selectedHighway = this.highlight.selectedHighway;
  readonly activeCarrierFilter = this.highlight.activeCarrierFilter;
  readonly selectedCofactorName = this.highlight.selectedCofactorName;

  readonly metaboliteMap = this.highlight.metaboliteMap;
  readonly reactionMap = this.highlight.reactionMap;
  readonly selectedSubstrateIds = this.highlight.selectedSubstrateIds;
  readonly selectedProductIds = this.highlight.selectedProductIds;
  readonly matchingQueryNodeIds = this.highlight.matchingQueryNodeIds;
  readonly matchingQueryReactionIds = this.highlight.matchingQueryReactionIds;
  readonly activeCarrierMatchingReactionIds = this.highlight.activeCarrierMatchingReactionIds;
  readonly activeCarrierMatchingNodeIds = this.highlight.activeCarrierMatchingNodeIds;
  readonly selectedMetaboliteInvolvedReactionIds = this.highlight.selectedMetaboliteInvolvedReactionIds;
  readonly dimmedNodeIds = this.highlight.dimmedNodeIds;
  readonly dimmedReactionIds = this.highlight.dimmedReactionIds;

  // Interactivity signals
  readonly isFluxAnimated = this.atlasStateService.isFluxAnimated;
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
        this.viewport.focusOnPdh();
        const pdh = this.reactions.find((r) => r.code === 'R_PDH');
        if (pdh) this.onReactionClick(pdh);
        return;
      }

      if (focus.pathwayId === 'PW-GALACTOSE') {
        this.viewport.focusOnGalactose();
        const galk1 = this.reactions.find((r) => r.code === 'R_GALK1');
        if (galk1) this.onReactionClick(galk1);
        return;
      }

      if (focus.pathwayId === 'PW-GLYCOGEN') {
        this.viewport.focusOnGlycogen();
        const gys = this.reactions.find((r) => r.code === 'R_GYS');
        if (gys) this.onReactionClick(gys);
        return;
      }

      if (focus.pathwayId === 'PW-FRUCTOSE') {
        this.viewport.focusOnFructose();
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

      if (focus.pathwayId === 'PW-UREA-CYCLE') {
        this.focusOnUreaCycle();
        const cps1 = this.reactions.find((r) => r.code === 'R_CPS1');
        if (cps1) this.onReactionClick(cps1);
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

  get hasMovedDrag(): boolean {
    return this.viewport.hasMovedDrag;
  }

  // Viewport navigation methods (delegated to AtlasViewportService)
  focusOnNode(node: HumanMetaboliteNode): void {
    this.viewport.focusOnNode(node);
  }

  focusOnTca(): void {
    this.viewport.focusOnTca();
  }

  focusOnOxphos(): void {
    this.viewport.focusOnOxphos();
  }

  focusOnUreaCycle(): void {
    this.viewport.focusOnUreaCycle();
  }

  focusOnSector(sector: SectorLayoutConfig): void {
    this.viewport.focusOnSector(sector);
  }

  zoomToMacro(): void {
    this.viewport.zoomToMacro();
  }

  zoomIn(): void {
    this.viewport.zoomIn();
  }

  zoomOut(): void {
    this.viewport.zoomOut();
  }

  resetZoom(): void {
    this.viewport.resetZoom();
  }

  onViewportMouseDown(event: MouseEvent): void {
    this.viewport.onViewportMouseDown(event);
  }

  onWheel(event: WheelEvent): void {
    this.viewport.onWheel(event);
  }

  onSectorClick(sector: SectorLayoutConfig): void {
    if (this.hasMovedDrag) return;
    this.atlasStateService.selectPathway(sector.targetPathwayId);
  }

  onHighwayClick(hw: PathwaySuperHighway): void {
    if (this.hasMovedDrag) return;
    this.selectedHighway.set(this.selectedHighway()?.id === hw.id ? null : hw);
  }

  // Highlight check helpers (delegated to AtlasHighlightService)
  isSubstrateOfSelected(nodeId: string): boolean {
    return this.highlight.isSubstrateOfSelected(nodeId);
  }

  isProductOfSelected(nodeId: string): boolean {
    return this.highlight.isProductOfSelected(nodeId);
  }

  isNodeDimmed(nodeId: string): boolean {
    return this.highlight.isNodeDimmed(nodeId);
  }

  isReactionDimmed(reactionId: string): boolean {
    return this.highlight.isReactionDimmed(reactionId);
  }

  ngOnInit(): void {
    // Default selection: Step 1 (Citrate Synthase) so the user sees rich details immediately!
    const defaultRx = this.reactions.find((r) => r.code === 'R_CS') || this.reactions[0];
    if (defaultRx) {
      this.onReactionClick(defaultRx);
    }
  }

  ngOnDestroy(): void {
    if (this.copyTimeoutId) {
      clearTimeout(this.copyTimeoutId);
    }
  }

  onReactionClick(reaction: HumanReactionArrow): void {
    if (this.hasMovedDrag) return;
    this.highlight.onReactionClick(reaction);
  }

  onMetaboliteClick(metabolite: HumanMetaboliteNode): void {
    if (this.hasMovedDrag) return;
    this.highlight.onMetaboliteClick(metabolite);
  }

  onCofactorClick(cofactorName: string): void {
    this.highlight.onCofactorClick(cofactorName);
  }

  onMacroSubpathwayClick(pathwayId: string, event: Event): void {
    event.stopPropagation();
    this.atlasStateService.selectPathway(pathwayId);
  }

  selectReactionByCode(code: string): void {
    this.highlight.selectReactionByCode(code);
  }

  selectMetaboliteByCode(code: string): void {
    this.highlight.selectMetaboliteByCode(code);
  }

  toggleFluxAnimation(): void {
    this.atlasStateService.toggleFlux();
  }

  toggleEnergyFilter(carrier: CarrierFilter): void {
    this.highlight.toggleEnergyFilter(carrier);
  }

  findMetabolite(nameRu?: string, nameEn?: string): HumanMetaboliteNode | undefined {
    return this.highlight.findMetabolite(nameRu, nameEn);
  }

  findMetaboliteByName(name: string): HumanMetaboliteNode | undefined {
    return this.highlight.findMetaboliteByName(name);
  }

  getReactionsForMetabolite(metId: string): { rx: HumanReactionArrow; role: 'substrate' | 'product' }[] {
    return this.highlight.getReactionsForMetabolite(metId);
  }

  getSortedPathways(met: HumanMetaboliteNode): { current: PathwayParticipation[]; others: PathwayParticipation[] } {
    return this.highlight.getSortedPathways(met);
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
    this.highlight.closeInspector();
  }

  setActiveTab(tab: InspectorTab): void {
    this.highlight.setActiveTab(tab);
  }
}
