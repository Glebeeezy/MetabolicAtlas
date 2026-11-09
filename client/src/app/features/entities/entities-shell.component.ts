import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';

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
  protected readonly localeService = inject(LocaleService);
  readonly type = input<string>('entity');
  readonly id = input<string>('');
}

