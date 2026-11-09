import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';

/**
 * Shell placeholder component for educational biochemical articles and guides.
 */
@Component({
  selector: 'ma-articles-shell',
  templateUrl: './articles-shell.component.html',
  styleUrl: './articles-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesShellComponent {
  protected readonly localeService = inject(LocaleService);
  readonly slug = input<string>('');
}

