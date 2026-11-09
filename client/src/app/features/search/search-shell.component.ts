import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';

/**
 * Shell placeholder component for full-text and trigram entity search.
 */
@Component({
  selector: 'ma-search-shell',
  templateUrl: './search-shell.component.html',
  styleUrl: './search-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchShellComponent {
  protected readonly localeService = inject(LocaleService);
}

