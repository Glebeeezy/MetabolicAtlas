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
    'Центральный метаболический узел аэробного клеточного дыхания у человека. Протекает в матриксе митохондрий. За один оборот цикла: окисляется 1 молекула ацетил-КоА, высвобождаются 2 молекулы CO₂, генерируются 3 NADH, 1 FADH₂ и 1 GTP (или ATP в зависимости от ткани).',
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
}
