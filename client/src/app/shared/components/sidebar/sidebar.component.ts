import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { LocaleService } from '../../../core/services/locale.service';

interface MainSectionItem {
  route: string;
  nameRu: string;
  nameEn: string;
  icon: string;
}

interface PathwayItem {
  id: string;
  nameEn: string;
  nameRu: string;
  code: string;
  dotColor: string;
}

@Component({
  selector: 'ma-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  protected readonly sidebarService = inject(SidebarService);
  protected readonly localeService = inject(LocaleService);

  protected readonly mainSections: MainSectionItem[] = [
    {
      route: '/atlas',
      nameRu: 'Интерактивный атлас',
      nameEn: 'Interactive Atlas',
      icon: 'atlas',
    },
    {
      route: '/pathways',
      nameRu: 'Каталог путей',
      nameEn: 'Pathways Catalog',
      icon: 'pathways',
    },
    {
      route: '/search',
      nameRu: 'Поиск метаболитов',
      nameEn: 'Metabolite Search',
      icon: 'search',
    },
    {
      route: '/articles',
      nameRu: 'Статьи и биохимия',
      nameEn: 'Articles & Guides',
      icon: 'articles',
    },
  ];

  protected readonly keyPathways: PathwayItem[] = [
    {
      id: 'PW-TCA-CYCLE',
      nameEn: 'Citric Acid Cycle (TCA)',
      nameRu: 'Цикл трикарбоновых кислот',
      code: 'TCA',
      dotColor: '#10B981',
    },
    {
      id: 'PW-GLYCOLISIS',
      nameEn: 'Glycolysis',
      nameRu: 'Гликолиз',
      code: 'GLY',
      dotColor: 'var(--bio-substrate)',
    },
    {
      id: 'PW-OXPHOS',
      nameEn: 'Oxidative Phosphorylation',
      nameRu: 'Окислительное фосфорилирование',
      code: 'ETC',
      dotColor: 'var(--bio-product)',
    },
    {
      id: 'PW-BETA-OXIDATION',
      nameEn: 'Fatty Acid β-Oxidation',
      nameRu: 'β-Окисление жирных кислот',
      code: 'FAO',
      dotColor: 'var(--bio-cofactor)',
    },
    {
      id: 'PW-GLUCONEOGENESIS',
      nameEn: 'Gluconeogenesis',
      nameRu: 'Глюконеогенез',
      code: 'GNG',
      dotColor: 'var(--bio-substrate)',
    },
    {
      id: 'PW-UREA-CYCLE',
      nameEn: 'Urea Cycle',
      nameRu: 'Орнитиновый цикл',
      code: 'URC',
      dotColor: 'var(--bio-enzyme)',
    },
  ];

  closeOnMobile(): void {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      this.sidebarService.setOpen(false);
    }
  }
}
