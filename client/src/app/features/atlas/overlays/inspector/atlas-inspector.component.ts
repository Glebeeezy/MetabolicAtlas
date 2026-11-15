import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanMetaboliteNode, HumanReactionArrow } from '../../atlas-data';
import { getPathwayStepLabel } from './inspector.utils';

@Component({
  selector: 'ma-atlas-inspector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atlas-inspector.component.html',
  styleUrl: './atlas-inspector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasInspectorComponent {
  readonly selectedReaction = input<HumanReactionArrow | null>(null);
  readonly selectedMetabolite = input<HumanMetaboliteNode | null>(null);
  readonly locale = input<string>('ru');
  readonly copyFeedback = input<string | null>(null);

  readonly closeInspector = output<void>();

  getPathwayStepLabel(rx: HumanReactionArrow): string {
    return getPathwayStepLabel(rx, this.locale());
  }
}
