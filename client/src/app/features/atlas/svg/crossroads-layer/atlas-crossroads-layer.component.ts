import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetabolicCrossroad } from '../../atlas-data';

@Component({
  selector: 'g[ma-crossroads-layer]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atlas-crossroads-layer.component.html',
  styleUrl: './atlas-crossroads-layer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCrossroadsLayerComponent {
  readonly crossroads = input.required<readonly MetabolicCrossroad[]>();
  readonly locale = input<string>('ru');

  getBadgeWidth(text: string): number {
    return Math.max(180, Math.round(text.length * 5.8 + 18));
  }
}
