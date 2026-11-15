import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorLayoutConfig } from '../../atlas-data';

@Component({
  selector: 'g[ma-sector]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atlas-sector.component.html',
  styleUrl: './atlas-sector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasSectorComponent {
  readonly sector = input.required<SectorLayoutConfig>();
  readonly isActive = input<boolean>(false);
  readonly isHovered = input<boolean>(false);
  readonly lodLevel = input<number>(1);
  readonly locale = input<string>('ru');

  readonly sectorClick = output<SectorLayoutConfig>();
  readonly sectorHover = output<SectorLayoutConfig>();
  readonly sectorLeave = output<void>();

  readonly polyPoints = computed(() => {
    return this.sector().boundingPoly.map((p) => `${p.x},${p.y}`).join(' ');
  });

  onSelect(event: MouseEvent): void {
    event.stopPropagation();
    this.sectorClick.emit(this.sector());
  }
}
