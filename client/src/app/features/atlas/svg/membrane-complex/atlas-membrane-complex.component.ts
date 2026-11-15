import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type MembraneComplexId = 'I' | 'II' | 'III' | 'IV' | 'V';

@Component({
  selector: 'g[ma-membrane-complex]',
  standalone: true,
  templateUrl: './atlas-membrane-complex.component.html',
  styleUrl: './atlas-membrane-complex.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasMembraneComplexComponent {
  readonly complexId = input.required<MembraneComplexId>();
  readonly x = input.required<number>();
  readonly y = input.required<number>();
  readonly locale = input<'ru' | 'en'>('ru');
}
