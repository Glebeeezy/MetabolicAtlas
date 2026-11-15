import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanMetaboliteNode, HumanReactionArrow, PathwayParticipation } from '../../../atlas-data';
import { ChemicalStructureComponent } from '../../../../../shared';

@Component({
  selector: 'ma-metabolite-inspector',
  standalone: true,
  imports: [CommonModule, ChemicalStructureComponent],
  templateUrl: './metabolite-inspector.component.html',
  styleUrl: './metabolite-inspector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaboliteInspectorComponent {
  readonly metabolite = input.required<HumanMetaboliteNode>();
  readonly locale = input<string>('ru');
  readonly activePathwayId = input<string>('ALL');
  readonly relatedReactions = input<{ rx: HumanReactionArrow; role: 'substrate' | 'product' }[]>([]);

  readonly reactionClick = output<HumanReactionArrow>();
  readonly reactionCodeClick = output<string>();
  readonly copyText = output<{ text: string; label: string }>();

  getSortedPathways(met: HumanMetaboliteNode): { current: PathwayParticipation[]; others: PathwayParticipation[] } {
    const current: PathwayParticipation[] = [];
    const others: PathwayParticipation[] = [];
    const list = met.pathwaysRu || [];
    const activeId = this.activePathwayId();

    for (const p of list) {
      const matchesActive =
        (activeId === 'PW-GLYCOLISIS' && p.pathwayCode === 'PW-GLYCOLISIS') ||
        (activeId === 'PW-GALACTOSE' && (p.pathwayCode === 'PW-GALACTOSE' || p.pathwayCode === 'PWY_LELOIR')) ||
        (activeId === 'PW-GLYCOGEN' && (p.pathwayCode === 'PW-GLYCOGEN' || p.pathwayCode === 'PWY_GLYCOGEN')) ||
        (activeId === 'PW-FRUCTOSE' && (p.pathwayCode === 'PW-FRUCTOSE' || p.pathwayCode === 'PWY_FRUCTOLYSIS')) ||
        (activeId === 'PW-PDH' && (p.pathwayCode === 'PW-PDH' || p.pathwayCode === 'PW-MPC')) ||
        (activeId === 'PW-TCA-CYCLE' && (p.pathwayCode === 'PW-TCA-CYCLE' || p.pathwayCode === 'PWY_TCA')) ||
        (activeId === 'PW-OXPHOS' && (p.pathwayCode === 'PW-OXPHOS' || p.pathwayCode === 'PWY_ETC' || p.pathwayCode === 'PWY_OXPHOS'));

      if (matchesActive || (activeId === 'ALL' && p.isCurrentPathway)) {
        current.push(p);
      } else {
        others.push(p);
      }
    }

    if (current.length === 0 && list.length > 0) {
      current.push(...list.filter((p) => p.isCurrentPathway));
      others.length = 0;
      others.push(...list.filter((p) => !p.isCurrentPathway));
    }

    return { current, others };
  }

  getRoleName(role: string): string {
    const isEn = this.locale() === 'en';
    switch (role) {
      case 'substrate':
        return isEn ? 'Substrate (Input)' : 'Субстрат (Вход)';
      case 'product':
        return isEn ? 'Product (Output)' : 'Продукт (Выход)';
      case 'cofactor':
        return isEn ? 'Coenzyme / Cofactor' : 'Кофермент / Кофактор';
      case 'intermediate':
        return isEn ? 'Intermediate' : 'Интермедиат';
      default:
        return isEn ? 'Participant' : 'Участник';
    }
  }

  triggerCopy(text: string, label: string): void {
    this.copyText.emit({ text, label });
  }
}
