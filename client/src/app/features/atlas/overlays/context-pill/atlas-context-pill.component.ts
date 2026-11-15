import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathwayMeta } from '../../../../core/services/atlas-state.service';

@Component({
  selector: 'ma-atlas-context-pill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atlas-context-pill.component.html',
  styleUrl: './atlas-context-pill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasContextPillComponent {
  readonly selectedPathway = input<PathwayMeta | null>(null);
  readonly selectedPathwayId = input<string>('ALL');
  readonly locale = input<string>('ru');
  readonly lodLevel = input<number>(1);

  readonly pathwayId = computed(() => {
    return this.selectedPathwayId() || this.selectedPathway()?.id || 'ALL';
  });
}
