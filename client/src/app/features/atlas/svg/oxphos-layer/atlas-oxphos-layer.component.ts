import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'g[ma-oxphos-layer]',
  standalone: true,
  templateUrl: './atlas-oxphos-layer.component.html',
  styleUrl: './atlas-oxphos-layer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasOxPhosLayerComponent {
  readonly locale = input<'ru' | 'en'>('ru');
}
