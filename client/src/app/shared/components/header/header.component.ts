import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { LocaleSwitcherComponent } from '../locale-switcher/locale-switcher.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { LocaleService } from '../../../core/services/locale.service';

/**
 * Top application header containing sidebar toggle, navigation pills,
 * and language / animated theme controls.
 */
@Component({
  selector: 'ma-header',
  imports: [RouterLink, RouterLinkActive, ThemeSwitcherComponent, LocaleSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly localeService = inject(LocaleService);
}
