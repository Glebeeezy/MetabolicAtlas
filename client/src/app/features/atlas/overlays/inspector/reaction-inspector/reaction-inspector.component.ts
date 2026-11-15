import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanMetaboliteNode, HumanReactionArrow } from '../../../atlas-data';
import { getPathwayStepLabel } from '../inspector.utils';

@Component({
  selector: 'ma-reaction-inspector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reaction-inspector.component.html',
  styleUrl: './reaction-inspector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactionInspectorComponent {
  readonly reaction = input.required<HumanReactionArrow>();
  readonly locale = input<string>('ru');
  readonly metabolites = input<readonly HumanMetaboliteNode[]>([]);

  readonly metaboliteClick = output<HumanMetaboliteNode>();
  readonly cofactorClick = output<string>();

  getPathwayStepLabel(rx: HumanReactionArrow): string {
    return getPathwayStepLabel(rx, this.locale());
  }

  findMetabolite(nameRu?: string, nameEn?: string): HumanMetaboliteNode | undefined {
    if (nameRu) {
      const found = this.findMetaboliteByName(nameRu);
      if (found) return found;
    }
    if (nameEn) {
      const found = this.findMetaboliteByName(nameEn);
      if (found) return found;
    }
    return undefined;
  }

  findMetaboliteByName(name: string): HumanMetaboliteNode | undefined {
    if (!name) return undefined;
    const clean = name.trim().toLowerCase();
    const withoutParen = clean.replace(/\s*\([^)]*\)/g, '').trim();
    const list = this.metabolites();

    // 1. Exact match on official names, code, or exact abbreviations
    const exact = list.find((m) => {
      const ru = m.nameRu.toLowerCase();
      const en = m.nameEn.toLowerCase();
      const abbrevRu = m.abbrevRu.toLowerCase();
      const abbrevEn = m.abbrevEn.toLowerCase();
      const code = m.code.toLowerCase();
      return (
        ru === clean ||
        en === clean ||
        code === clean ||
        abbrevRu === clean ||
        abbrevEn === clean ||
        (withoutParen.length > 0 && (ru === withoutParen || en === withoutParen))
      );
    });
    if (exact) return exact;

    // 2. Exact match on synonyms
    const exactSyn = list.find((m) => {
      const matchSyn = (syn: string) => {
        const s = syn.toLowerCase();
        return s === clean || (withoutParen.length > 0 && s === withoutParen);
      };
      return m.synonymsRu?.some(matchSyn) || m.synonymsEn?.some(matchSyn);
    });
    if (exactSyn) return exactSyn;

    // 3. Prefix match ONLY on full names (length >= 4), never on short abbreviations
    return list.find((m) => {
      const ru = m.nameRu.toLowerCase();
      const en = m.nameEn.toLowerCase();
      if (ru.length >= 4 && (clean.startsWith(ru) || ru.startsWith(clean))) return true;
      if (en.length >= 4 && (clean.startsWith(en) || en.startsWith(clean))) return true;
      if (m.synonymsRu?.some((s) => s.length >= 4 && (clean.startsWith(s.toLowerCase()) || s.toLowerCase().startsWith(clean)))) return true;
      if (m.synonymsEn?.some((s) => s.length >= 4 && (clean.startsWith(s.toLowerCase()) || s.toLowerCase().startsWith(clean)))) return true;
      return false;
    });
  }
}
