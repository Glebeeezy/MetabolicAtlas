import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Shell placeholder component for detailed metabolic pathway schemes.
 */
@Component({
  selector: 'ma-pathways-shell',
  templateUrl: './pathways-shell.component.html',
  styleUrl: './pathways-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathwaysShellComponent {}

