import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'g[ma-polar-grid]',
  standalone: true,
  templateUrl: './atlas-polar-grid.component.html',
  styleUrl: './atlas-polar-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasPolarGridComponent {}
