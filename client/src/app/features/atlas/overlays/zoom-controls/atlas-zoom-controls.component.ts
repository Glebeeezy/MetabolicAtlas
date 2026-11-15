import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ma-atlas-zoom-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atlas-zoom-controls.component.html',
  styleUrl: './atlas-zoom-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasZoomControlsComponent {
  readonly zoom = input.required<number>();
  readonly locale = input<string>('ru');

  readonly zoomIn = output<void>();
  readonly zoomOut = output<void>();
  readonly resetZoom = output<void>();
  readonly zoomToMacro = output<void>();
}
