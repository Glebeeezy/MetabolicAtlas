import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathwaySuperHighway } from '../../atlas-data';

@Component({
  selector: 'g[ma-superhighway]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atlas-superhighway.component.html',
  styleUrl: './atlas-superhighway.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasSuperhighwayComponent {
  readonly hw = input.required<PathwaySuperHighway>();
  readonly isSelected = input<boolean>(false);
  readonly isHovered = input<boolean>(false);
  readonly isAnimated = input<boolean>(false);
  readonly locale = input<string>('ru');

  readonly highwayClick = output<PathwaySuperHighway>();
  readonly highwayHover = output<PathwaySuperHighway>();
  readonly highwayLeave = output<void>();

  onSelect(event: MouseEvent): void {
    event.stopPropagation();
    this.highwayClick.emit(this.hw());
  }
}
