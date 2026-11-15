import { computed, Injectable, OnDestroy, signal } from '@angular/core';
import { HumanMetaboliteNode, SectorLayoutConfig } from '../../../core/metabolism';

@Injectable({
  providedIn: 'root',
})
export class AtlasViewportService implements OnDestroy {
  readonly zoom = signal<number>(100);
  readonly panX = signal<number>(0);
  readonly panY = signal<number>(0);
  readonly isDragging = signal<boolean>(false);

  // LOD Level: 1 (Macro 15-45%), 2 (Meso 45-90%), 3 (Micro 90-250%)
  readonly lodLevel = computed<1 | 2 | 3>(() => {
    const z = this.zoom();
    if (z < 45) return 1;
    if (z < 90) return 2;
    return 3;
  });

  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartClientX = 0;
  private dragStartClientY = 0;
  hasMovedDrag = false;

  private pendingPanX = 0;
  private pendingPanY = 0;
  private rafPanId: number | null = null;
  private onWindowMouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  private onWindowMouseUpHandler: (() => void) | null = null;

  constructor() {
    this.setupGlobalPanListeners();
  }

  ngOnDestroy(): void {
    this.removeGlobalPanListeners();
  }

  setupGlobalPanListeners(): void {
    if (typeof window === 'undefined') return;

    this.onWindowMouseMoveHandler = (e: MouseEvent) => {
      if (this.isDragging()) {
        const dx = Math.abs(e.clientX - this.dragStartClientX);
        const dy = Math.abs(e.clientY - this.dragStartClientY);
        if (dx > 4 || dy > 4) {
          this.hasMovedDrag = true;
        }
        this.pendingPanX = e.clientX - this.dragStartX;
        this.pendingPanY = e.clientY - this.dragStartY;

        if (typeof requestAnimationFrame === 'function') {
          if (this.rafPanId === null) {
            this.rafPanId = requestAnimationFrame(() => {
              this.panX.set(this.pendingPanX);
              this.panY.set(this.pendingPanY);
              this.rafPanId = null;
            });
          }
        } else {
          this.panX.set(this.pendingPanX);
          this.panY.set(this.pendingPanY);
        }
      }
    };

    this.onWindowMouseUpHandler = () => {
      if (this.isDragging()) {
        this.isDragging.set(false);
        if (this.rafPanId !== null && typeof cancelAnimationFrame === 'function') {
          cancelAnimationFrame(this.rafPanId);
          this.rafPanId = null;
          this.panX.set(this.pendingPanX);
          this.panY.set(this.pendingPanY);
        }
      }
    };

    window.addEventListener('mousemove', this.onWindowMouseMoveHandler);
    window.addEventListener('mouseup', this.onWindowMouseUpHandler);
  }

  removeGlobalPanListeners(): void {
    if (typeof window === 'undefined') return;
    if (this.onWindowMouseMoveHandler) {
      window.removeEventListener('mousemove', this.onWindowMouseMoveHandler);
      this.onWindowMouseMoveHandler = null;
    }
    if (this.onWindowMouseUpHandler) {
      window.removeEventListener('mouseup', this.onWindowMouseUpHandler);
      this.onWindowMouseUpHandler = null;
    }
    if (this.rafPanId !== null && typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(this.rafPanId);
      this.rafPanId = null;
    }
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
    const target = event.target as HTMLElement | null;
    // Only suppress map zoom when hovering over the right inspector panel to allow its native text scrolling
    if (target?.closest?.('.context-inspector')) {
      return;
    }
    event.preventDefault();

    const zoomDelta = event.deltaY < 0 ? 10 : -10;
    const oldZoom = this.zoom();
    const newZoom = Math.max(15, Math.min(250, oldZoom + zoomDelta));
    if (newZoom === oldZoom) return;

    const s1 = oldZoom / 100;
    const s2 = newZoom / 100;

    // Find the canvas-viewport to get mouse cursor relative to container
    const viewport =
      (event.currentTarget as HTMLElement | null) ??
      target?.closest?.('.canvas-viewport') ??
      null;

    if (viewport && typeof viewport.getBoundingClientRect === 'function') {
      const rect = viewport.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && typeof event.clientX === 'number') {
        const Cx = event.clientX - rect.left;
        const Cy = event.clientY - rect.top;
        const Ox = rect.width / 2;
        const Oy = rect.height / 2;

        const panX1 = this.panX();
        const panY1 = this.panY();

        const scaleDiff = s2 / s1 - 1;
        const panX2 = panX1 - (Cx - Ox - panX1) * scaleDiff;
        const panY2 = panY1 - (Cy - Oy - panY1) * scaleDiff;

        this.panX.set(Math.round(panX2));
        this.panY.set(Math.round(panY2));
        this.zoom.set(newZoom);
        return;
      }
    }

    // Fallback if viewport geometry is not available (e.g. headless tests)
    this.zoom.set(newZoom);
  }

  applyScreenCentricZoom(zoomDelta: number): void {
    const oldZoom = this.zoom();
    const newZoom = Math.max(15, Math.min(250, oldZoom + zoomDelta));
    if (newZoom === oldZoom) return;

    const ratio = newZoom / oldZoom;
    this.panX.update((x) => Math.round(x * ratio));
    this.panY.update((y) => Math.round(y * ratio));
    this.zoom.set(newZoom);
  }

  zoomIn(): void {
    this.applyScreenCentricZoom(15);
  }

  zoomOut(): void {
    this.applyScreenCentricZoom(-15);
  }

  resetZoom(): void {
    this.zoom.set(100);
    this.panX.set(0);
    this.panY.set(0);
  }

  zoomToMacro(): void {
    this.zoom.set(38);
    this.panX.set(0);
    this.panY.set(0);
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

  focusOnPdh(): void {
    this.zoom.set(95);
    this.panX.set(0);
    this.panY.set(Math.round((1600 - 1490) * 0.95));
  }

  focusOnGalactose(): void {
    this.zoom.set(80);
    this.panX.set(Math.round((1600 - 1100) * 0.8));
    this.panY.set(Math.round((1600 - -240) * 0.8));
  }

  focusOnGlycogen(): void {
    this.zoom.set(85);
    this.panX.set(Math.round((1600 - 1320) * 0.85));
    this.panY.set(Math.round((1600 - -260) * 0.85));
  }

  focusOnFructose(): void {
    this.zoom.set(80);
    this.panX.set(Math.round((1600 - 1990) * 0.8));
    this.panY.set(Math.round((1600 - 260) * 0.8));
  }
}
