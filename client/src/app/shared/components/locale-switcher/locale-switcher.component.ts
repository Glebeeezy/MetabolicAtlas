import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleService } from '../../../core/services/locale.service';

/**
 * Control for toggling user language between Russian (RU) and English (EN).
 */
@Component({
  selector: 'ma-locale-switcher',
  templateUrl: './locale-switcher.component.html',
  styleUrl: './locale-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleSwitcherComponent {
  protected readonly localeService = inject(LocaleService);

  toggle(): void {
    this.localeService.toggleLocale();
  }
}
