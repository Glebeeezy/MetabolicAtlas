import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { LocaleService } from '../../core/services/locale.service';
import {
  MapLayoutDetail,
  MapElement,
  MapEdge,
  MetaboliteDetail,
  ReactionDetail,
} from '../../core/models';

/**
 * Fallback layout definition for Human TCA Cycle ensuring reliable rendering
 * even if the network or local backend is briefly unavailable during boot.
 */
const FALLBACK_TCA_LAYOUT: MapLayoutDetail = {
  id: '10000001-0000-0000-0000-000000000001',
  code: 'MAP_TCA_V1',
  name: 'Human TCA Cycle — Mitochondrial Matrix Hub',
  version: '1.0.0',
  width: 1400,
  height: 1000,
  pathwayId: 'f0000001-0000-0000-0000-000000000002',
  elements: [
    { id: 'el-oaa', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000003', x: 700, y: 70, width: 140, height: 46, label: 'Oxaloacetate\n(OAA)', colorHex: '#8B5CF6' },
    { id: 'el-cit', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000004', x: 1060, y: 190, width: 130, height: 44, label: 'Citrate', colorHex: '#6366F1' },
    { id: 'el-iso', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000005', x: 1160, y: 480, width: 130, height: 44, label: 'Isocitrate', colorHex: '#6366F1' },
    { id: 'el-akg', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000006', x: 1000, y: 760, width: 140, height: 44, label: 'α-Ketoglutarate', colorHex: '#6366F1' },
    { id: 'el-sco', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000007', x: 640, y: 870, width: 130, height: 44, label: 'Succinyl-CoA', colorHex: '#6366F1' },
    { id: 'el-suc', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000008', x: 300, y: 760, width: 130, height: 44, label: 'Succinate', colorHex: '#6366F1' },
    { id: 'el-fum', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000009', x: 160, y: 480, width: 130, height: 44, label: 'Fumarate', colorHex: '#6366F1' },
    { id: 'el-mal', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000010', x: 340, y: 190, width: 130, height: 44, label: 'Malate', colorHex: '#6366F1' },
    { id: 'el-acoa', elementType: 1, elementTypeName: 'Metabolite', entityId: 'b0000001-0000-0000-0000-000000000002', x: 400, y: 70, width: 130, height: 44, label: 'Acetyl-CoA', colorHex: '#10B981' },

    { id: 'el-r1', elementType: 2, elementTypeName: 'Reaction', entityId: 'd0000001-0000-0000-0000-000000000001', x: 880, y: 110, width: 44, height: 44, label: 'CS' },
    { id: 'el-r2', elementType: 2, elementTypeName: 'Reaction', entityId: 'd0000001-0000-0000-0000-000000000002', x: 1130, y: 330, width: 44, height: 44, label: 'ACO2' },
    { id: 'el-r3', elementType: 2, elementTypeName: 'Reaction', entityId: 'd0000001-0000-0000-0000-000000000003', x: 1110, y: 620, width: 44, height: 44, label: 'IDH3' },
    { id: 'el-r4', elementType: 2, elementTypeName: 'Reaction', entityId: 'd0000001-0000-0000-0000-000000000004', x: 840, y: 830, width: 44, height: 44, label: 'OGDH' },
    { id: 'el-r5', elementType: 2, elementTypeName: 'Reaction', entityId: 'd0000001-0000-0000-0000-000000000005', x: 480, y: 870, width: 44, height: 44, label: 'SUCLG2' },
    { id: 'el-r6', elementType: 2, elementTypeName: 'Reaction', entityId: 'd0000001-0000-0000-0000-000000000006', x: 230, y: 620, width: 44, height: 44, label: 'SDH' },
    { id: 'el-r7', elementType: 2, elementTypeName: 'Reaction', entityId: 'd0000001-0000-0000-0000-000000000007', x: 240, y: 330, width: 44, height: 44, label: 'FH' },
    { id: 'el-r8', elementType: 2, elementTypeName: 'Reaction', entityId: 'd0000001-0000-0000-0000-000000000008', x: 520, y: 110, width: 44, height: 44, label: 'MDH2' },
  ],
  edges: [
    { id: 'e-acoa-r1', sourceElementId: 'el-acoa', targetElementId: 'el-r1', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-oaa-r1', sourceElementId: 'el-oaa', targetElementId: 'el-r1', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-r1-cit', sourceElementId: 'el-r1', targetElementId: 'el-cit', edgeType: 2, edgeTypeName: 'ReactionToProduct', arrowhead: 'triangle' },

    { id: 'e-cit-r2', sourceElementId: 'el-cit', targetElementId: 'el-r2', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-r2-iso', sourceElementId: 'el-r2', targetElementId: 'el-iso', edgeType: 2, edgeTypeName: 'ReactionToProduct', arrowhead: 'triangle' },

    { id: 'e-iso-r3', sourceElementId: 'el-iso', targetElementId: 'el-r3', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-r3-akg', sourceElementId: 'el-r3', targetElementId: 'el-akg', edgeType: 2, edgeTypeName: 'ReactionToProduct', arrowhead: 'triangle' },

    { id: 'e-akg-r4', sourceElementId: 'el-akg', targetElementId: 'el-r4', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-r4-sco', sourceElementId: 'el-r4', targetElementId: 'el-sco', edgeType: 2, edgeTypeName: 'ReactionToProduct', arrowhead: 'triangle' },

    { id: 'e-sco-r5', sourceElementId: 'el-sco', targetElementId: 'el-r5', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-r5-suc', sourceElementId: 'el-r5', targetElementId: 'el-suc', edgeType: 2, edgeTypeName: 'ReactionToProduct', arrowhead: 'triangle' },

    { id: 'e-suc-r6', sourceElementId: 'el-suc', targetElementId: 'el-r6', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-r6-fum', sourceElementId: 'el-r6', targetElementId: 'el-fum', edgeType: 2, edgeTypeName: 'ReactionToProduct', arrowhead: 'triangle' },

    { id: 'e-fum-r7', sourceElementId: 'el-fum', targetElementId: 'el-r7', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-r7-mal', sourceElementId: 'el-r7', targetElementId: 'el-mal', edgeType: 2, edgeTypeName: 'ReactionToProduct', arrowhead: 'triangle' },

    { id: 'e-mal-r8', sourceElementId: 'el-mal', targetElementId: 'el-r8', edgeType: 1, edgeTypeName: 'SubstrateToReaction', arrowhead: 'triangle' },
    { id: 'e-r8-oaa', sourceElementId: 'el-r8', targetElementId: 'el-oaa', edgeType: 2, edgeTypeName: 'ReactionToProduct', arrowhead: 'triangle' },
  ],
};

@Component({
  selector: 'ma-atlas-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atlas-shell.component.html',
  styleUrl: './atlas-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasShellComponent implements OnInit {
  protected readonly api = inject(ApiService);
  protected readonly localeService = inject(LocaleService);

  readonly zoom = signal<number>(100);
  readonly panX = signal<number>(0);
  readonly panY = signal<number>(0);
  readonly isDragging = signal<boolean>(false);
  private dragStartX = 0;
  private dragStartY = 0;

  readonly layout = signal<MapLayoutDetail>(FALLBACK_TCA_LAYOUT);
  readonly isLoading = signal<boolean>(false);
  readonly isLiveLoaded = signal<boolean>(false);

  readonly hoveredElementId = signal<string | null>(null);
  readonly selectedElement = signal<MapElement | null>(null);

  readonly selectedMetabolite = signal<MetaboliteDetail | null>(null);
  readonly selectedReaction = signal<ReactionDetail | null>(null);
  readonly isDetailLoading = signal<boolean>(false);

  // Fast dictionary mapping element IDs to MapElement objects
  readonly elementMap = computed(() => {
    const map = new Map<string, MapElement>();
    const currentLayout = this.layout();
    if (currentLayout?.elements) {
      for (const el of currentLayout.elements) {
        map.set(el.id, el);
        if (el.entityId) {
          map.set(el.entityId, el);
        }
      }
    }
    return map;
  });

  // Cached SVG edge connectors
  readonly renderedEdges = computed(() => {
    const currentLayout = this.layout();
    const map = this.elementMap();
    if (!currentLayout?.edges) return [];

    return currentLayout.edges.map((edge) => {
      const source = map.get(edge.sourceElementId);
      const target = map.get(edge.targetElementId);

      if (!source || !target) {
        return {
          edge,
          path: '',
          isValid: false,
        };
      }

      const x1 = source.x + source.width / 2;
      const y1 = source.y + source.height / 2;
      const x2 = target.x + target.width / 2;
      const y2 = target.y + target.height / 2;

      // Calculate path with gentle curve towards center
      const dx = x2 - x1;
      const dy = y2 - y1;
      const cx = (x1 + x2) / 2 - dy * 0.08;
      const cy = (y1 + y2) / 2 + dx * 0.08;

      const path = edge.pathData || `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

      return {
        edge,
        path,
        isValid: true,
        sourceId: source.id,
        targetId: target.id,
      };
    });
  });

  ngOnInit(): void {
    this.loadTcaLayout();
  }

  loadTcaLayout(): void {
    this.isLoading.set(true);
    this.api.getLayoutByCode('MAP_TCA_V1').subscribe({
      next: (data) => {
        if (data && data.elements && data.elements.length > 0) {
          this.layout.set(data);
          this.isLiveLoaded.set(true);
        }
        this.isLoading.set(false);
      },
      error: () => {
        // Fallback already assigned, mark loading done
        this.isLoading.set(false);
      },
    });
  }

  onElementClick(element: MapElement): void {
    this.selectedElement.set(element);
    this.selectedMetabolite.set(null);
    this.selectedReaction.set(null);

    if (!element.entityId) return;

    this.isDetailLoading.set(true);
    const lang = this.localeService.locale();

    if (element.elementTypeName === 'Metabolite') {
      this.api.getMetabolite(element.entityId, lang).subscribe({
        next: (data) => {
          this.selectedMetabolite.set(data);
          this.isDetailLoading.set(false);
        },
        error: () => {
          this.isDetailLoading.set(false);
        },
      });
    } else if (element.elementTypeName === 'Reaction') {
      this.api.getReaction(element.entityId, lang).subscribe({
        next: (data) => {
          this.selectedReaction.set(data);
          this.isDetailLoading.set(false);
        },
        error: () => {
          this.isDetailLoading.set(false);
        },
      });
    }
  }

  closeDetail(): void {
    this.selectedElement.set(null);
    this.selectedMetabolite.set(null);
    this.selectedReaction.set(null);
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

  onMouseDown(event: MouseEvent): void {
    if (event.button === 0 && (event.target as HTMLElement).tagName === 'svg') {
      this.isDragging.set(true);
      this.dragStartX = event.clientX - this.panX();
      this.dragStartY = event.clientY - this.panY();
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging()) {
      this.panX.set(event.clientX - this.dragStartX);
      this.panY.set(event.clientY - this.dragStartY);
    }
  }

  onMouseUp(): void {
    this.isDragging.set(false);
  }
}
