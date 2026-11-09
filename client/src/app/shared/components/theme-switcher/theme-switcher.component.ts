import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { LocaleService } from '../../../core/services/locale.service';

/**
 * Control for toggling between light and dark color themes.
 */
@Component({
  selector: 'ma-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly localeService = inject(LocaleService);

  toggle(): void {
    this.themeService.toggleTheme();
  }
}

