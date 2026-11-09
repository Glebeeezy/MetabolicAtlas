import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Shell placeholder component for the interactive metabolic atlas canvas.
 */
@Component({
  selector: 'ma-atlas-shell',
  templateUrl: './atlas-shell.component.html',
  styleUrl: './atlas-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasShellComponent {}
