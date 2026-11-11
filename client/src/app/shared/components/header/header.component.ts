import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { LocaleSwitcherComponent } from '../locale-switcher/locale-switcher.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { LocaleService } from '../../../core/services/locale.service';

/**
 * Top application header containing sidebar toggle, brand badge,
 * and language / animated theme controls on the right.
 */
@Component({
  selector: 'ma-header',
  standalone: true,
  imports: [ThemeSwitcherComponent, LocaleSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly localeService = inject(LocaleService);
}
