import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { LocaleSwitcherComponent } from '../locale-switcher/locale-switcher.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { LocaleService } from '../../../core/services/locale.service';

export interface HeaderPathwayItem {
  id: string;
  nameRu: string;
  nameEn: string;
  code: string;
  route: string | any[];
  dotColor: string;
  isReady?: boolean;
}

/**
 * Top application header containing sidebar toggle, quick pathway selector in the center,
 * and language / animated theme controls on the right.
 */
@Component({
  selector: 'ma-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeSwitcherComponent, LocaleSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly localeService = inject(LocaleService);

  protected readonly pathwayPills: HeaderPathwayItem[] = [
    {
      id: 'PW-TCA-CYCLE',
      nameRu: 'ЦТК (Кребс)',
      nameEn: 'TCA Cycle',
      code: 'TCA',
      route: '/atlas',
      dotColor: '#10B981',
      isReady: true,
    },
    {
      id: 'PW-GLYCOLISIS',
      nameRu: 'Гликолиз',
      nameEn: 'Glycolysis',
      code: 'GLY',
      route: ['/pathways', 'PW-GLYCOLISIS'],
      dotColor: 'var(--bio-substrate)',
    },
    {
      id: 'PW-OXPHOS',
      nameRu: 'Окислительное фосфорилирование',
      nameEn: 'OxPhos / ETC',
      code: 'ETC',
      route: ['/pathways', 'PW-OXPHOS'],
      dotColor: 'var(--bio-product)',
    },
    {
      id: 'PW-BETA-OXIDATION',
      nameRu: 'β-Окисление',
      nameEn: 'β-Oxidation',
      code: 'FAO',
      route: ['/pathways', 'PW-BETA-OXIDATION'],
      dotColor: 'var(--bio-cofactor)',
    },
    {
      id: 'PW-GLUCONEOGENESIS',
      nameRu: 'Глюконеогенез',
      nameEn: 'Gluconeogenesis',
      code: 'GNG',
      route: ['/pathways', 'PW-GLUCONEOGENESIS'],
      dotColor: 'var(--bio-substrate)',
    },
    {
      id: 'PW-UREA-CYCLE',
      nameRu: 'Орнитиновый цикл',
      nameEn: 'Urea Cycle',
      code: 'URC',
      route: ['/pathways', 'PW-UREA-CYCLE'],
      dotColor: 'var(--bio-enzyme)',
    },
  ];
}
