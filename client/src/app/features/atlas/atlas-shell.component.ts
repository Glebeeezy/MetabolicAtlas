import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';

/**
 * Shell viewport component for the interactive metabolic atlas canvas.
 */
@Component({
  selector: 'ma-atlas-shell',
  templateUrl: './atlas-shell.component.html',
  styleUrl: './atlas-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasShellComponent {
  protected readonly localeService = inject(LocaleService);

  readonly zoom = signal<number>(100);

  zoomIn(): void {
    this.zoom.update((z) => Math.min(z + 15, 250));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(z - 15, 30));
  }

  resetZoom(): void {
    this.zoom.set(100);
  }
}
