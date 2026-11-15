import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'g[ma-central-beacon]',
  standalone: true,
  templateUrl: './atlas-central-beacon.component.html',
  styleUrl: './atlas-central-beacon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasCentralBeaconComponent {}
