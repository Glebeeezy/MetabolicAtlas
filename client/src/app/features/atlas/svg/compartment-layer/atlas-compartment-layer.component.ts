import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'g[ma-compartment-layer]',
  standalone: true,
  templateUrl: './atlas-compartment-layer.component.html',
  styleUrl: './atlas-compartment-layer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCompartmentLayerComponent {
  readonly locale = input<'ru' | 'en'>('ru');
}
