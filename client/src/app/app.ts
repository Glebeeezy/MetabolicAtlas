import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent, SidebarComponent } from './layout';
import { ThemeService } from './core/services/theme.service';
import { LocaleService } from './core/services/locale.service';

/**
 * Root application component for Metabolic Atlas shell.
 */
@Component({
  selector: 'ma-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Inject services to ensure theme and locale effects are initialized at bootstrap
  protected readonly themeService = inject(ThemeService);
  protected readonly localeService = inject(LocaleService);
  protected readonly title = signal('Metabolic Atlas');
}
