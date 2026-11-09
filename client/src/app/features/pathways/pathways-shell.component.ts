import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LocaleService } from '../../core/services/locale.service';
import { PathwayDetail, PathwaySummary } from '../../core/models';

const FALLBACK_TCA_PATHWAY: PathwayDetail = {
  id: 'f0000001-0000-0000-0000-000000000002',
  code: 'PWY_TCA',
  name: 'TCA cycle',
  description:
    'Центральный метаболический узел аэробного клеточного дыхания у человека. Протекает в матриксе митохондрий. За один оборот цикла: окисляется 1 молекула ацетил-КоА, высвобождаются 2 молекулы CO₂, генерируются 3 НАДН, 1 ФАДН₂ и 1 ГТФ (или АТФ в зависимости от ткани).',
  category: 'Energy metabolism',
  reactions: [
    { reactionId: 'd0000001-0000-0000-0000-000000000001', reactionCode: 'R_CS', reactionName: 'Конденсация оксалоацетата и ацетил-КоА (Цитратсинтаза)', ordinal: 1 },
    { reactionId: 'd0000001-0000-0000-0000-000000000002', reactionCode: 'R_ACO', reactionName: 'Изомеризация цитрата в изоцитрат (Аконитаза 2)', ordinal: 2 },
    { reactionId: 'd0000001-0000-0000-0000-000000000003', reactionCode: 'R_IDH', reactionName: 'Окислительное декарбоксилирование изоцитрата (Изоцитратдегидрогеназа 3)', ordinal: 3 },
    { reactionId: 'd0000001-0000-0000-0000-000000000004', reactionCode: 'R_KGDH', reactionName: 'Окислительное декарбоксилирование α-кетоглутарата (α-КГДГ)', ordinal: 4 },
    { reactionId: 'd0000001-0000-0000-0000-000000000005', reactionCode: 'R_SCS', reactionName: 'Субстратное фосфорилирование (Сукцинил-КоА-синтетаза)', ordinal: 5 },
    { reactionId: 'd0000001-0000-0000-0000-000000000006', reactionCode: 'R_SDH', reactionName: 'Окисление сукцината в фумарат (Сукцинатдегидрогеназа / Комплекс II)', ordinal: 6 },
    { reactionId: 'd0000001-0000-0000-0000-000000000007', reactionCode: 'R_FUM', reactionName: 'Гидратация фумарата в L-малат (Фумараза)', ordinal: 7 },
    { reactionId: 'd0000001-0000-0000-0000-000000000008', reactionCode: 'R_MDH', reactionName: 'Окисление L-малата в оксалоацетат (Малатдегидрогеназа 2)', ordinal: 8 },
  ],
};

@Component({
  selector: 'ma-pathways-shell',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pathways-shell.component.html',
  styleUrl: './pathways-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PathwaysShellComponent implements OnInit {
  protected readonly api = inject(ApiService);
  protected readonly localeService = inject(LocaleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly pathways = signal<PathwaySummary[]>([]);
  readonly selectedPathway = signal<PathwayDetail>(FALLBACK_TCA_PATHWAY);
  readonly isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadPathways();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id !== 'PW-TCA-CYCLE') {
        this.loadPathway(id);
      }
    });
  }

  loadPathways(): void {
    this.api.getPathways().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.pathways.set(data);
          const tca = data.find((p) => p.code === 'PWY_TCA') || data[0];
          this.loadPathway(tca.id);
        }
      },
      error: () => {
        // Fallback already initialized
      },
    });
  }

  loadPathway(id: string): void {
    this.isLoading.set(true);
    this.api.getPathway(id).subscribe({
      next: (data) => {
        this.selectedPathway.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  selectPathway(summary: PathwaySummary): void {
    this.router.navigate(['/pathways', summary.id]);
    this.loadPathway(summary.id);
  }

  getLocalizedCategory(category?: string | null): string {
    if (this.localeService.locale() === 'ru') {
      if (category === 'Energy metabolism' || category === 'Энергетический метаболизм') {
        return 'Энергетический метаболизм';
      }
      if (category === 'Carbohydrate metabolism') return 'Углеводный метаболизм';
      if (category === 'Lipid metabolism') return 'Липидный метаболизм';
      if (category === 'Amino acid metabolism') return 'Обмен аминокислот';
    }
    return category || 'Energy metabolism';
  }

  getLocalizedTitle(p: PathwayDetail): string {
    if (this.localeService.locale() === 'ru') {
      if (p.code === 'PWY_TCA') return 'Цикл трикарбоновых кислот (ЦТК / Цикл Кребса)';
      if (p.code === 'PWY_PDH') return 'Окислительное декарбоксилирование пирувата (ПДХ)';
      if (p.code === 'PWY_GLYCOLYSIS') return 'Гликолиз';
      if (p.code === 'PWY_GLUCONEOGENESIS') return 'Глюконеогенез';
    }
    return p.name;
  }

  getLocalizedDescription(p: PathwayDetail): string {
    if (this.localeService.locale() === 'ru') {
      if (p.code === 'PWY_TCA') {
        return 'Центральный метаболический узел аэробного клеточного дыхания у человека. Протекает в матриксе митохондрий. За один оборот цикла: окисляется 1 молекула ацетил-КоА, высвобождаются 2 молекулы CO₂, генерируются 3 НАДН, 1 ФАДН₂ и 1 ГТФ (или АТФ в зависимости от ткани).';
      }
      if (p.code === 'PWY_PDH') {
        return 'Пируватдегидрогеназный комплекс (ПДХ) превращает пируват — конечный продукт гликолиза — в ацетил-КоА, связывая распад углеводов с циклом Кребса и синтезом жирных кислот в организме человека.';
      }
    }
    return p.description || '';
  }

  getLocalizedReactionName(rx: { reactionCode: string; reactionName: string }): string {
    if (this.localeService.locale() === 'ru') {
      const ruNames: Record<string, string> = {
        'R_PDH': 'Окислительное декарбоксилирование пирувата (ПДХ)',
        'R_CS': 'Конденсация оксалоацетата и ацетил-КоА (Цитратсинтаза)',
        'R_ACO': 'Изомеризация цитрата в изоцитрат (Аконитаза 2)',
        'R_IDH': 'Окислительное декарбоксилирование изоцитрата (Изоцитратдегидрогеназа 3)',
        'R_KGDH': 'Окислительное декарбоксилирование α-кетоглутарата (α-КГДГ)',
        'R_SCS': 'Субстратное фосфорилирование (Сукцинил-КоА-синтетаза)',
        'R_SDH': 'Окисление сукцината в фумарат (Сукцинатдегидрогеназа / Комплекс II)',
        'R_FUM': 'Гидратация фумарата в L-малат (Фумараза)',
        'R_MDH': 'Окисление L-малата в оксалоацетат (Малатдегидрогеназа 2)',
      };
      return ruNames[rx.reactionCode] || rx.reactionName;
    }
    return rx.reactionName;
  }
}
