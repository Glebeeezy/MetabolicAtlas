import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { LocaleSwitcherComponent } from '../locale-switcher/locale-switcher.component';

/**
 * Top application header containing branding, primary navigation links,
 * and global theme/locale controls.
 */
@Component({
  selector: 'ma-header',
  imports: [RouterLink, RouterLinkActive, ThemeSwitcherComponent, LocaleSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
