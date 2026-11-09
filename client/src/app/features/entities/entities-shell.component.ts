import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shell placeholder component for entity detail sheets (Metabolite, Reaction, Enzyme).
 */
@Component({
  selector: 'ma-entities-shell',
  templateUrl: './entities-shell.component.html',
  styleUrl: './entities-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesShellComponent {
  readonly type = input<string>('entity');
  readonly id = input<string>('');
}

