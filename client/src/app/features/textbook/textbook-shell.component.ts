import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';
import { ChemicalStructureComponent } from '../../shared';

export interface TextbookChapter {
  id: string;
  number: number;
  titleRu: string;
  titleEn: string;
  descriptionRu: string;
  descriptionEn: string;
  pathwayId: string;
  sampleSmiles?: string;
}

export const TEXTBOOK_CHAPTERS: TextbookChapter[] = [
  {
    id: 'ch-intro',
    number: 1,
    titleRu: 'Введение в метаболизм и биоэнергетика',
    titleEn: 'Introduction to Metabolism & Bioenergetics',
    descriptionRu: 'Термодинамика метаболических путей, высокоэнергетические фосфаты, роль АТФ и универсальных переносчиков электронов (НАД⁺, ФАД).',
    descriptionEn: 'Thermodynamics of metabolic pathways, high-energy phosphates, role of ATP and universal electron carriers (NAD⁺, FAD).',
    pathwayId: 'ALL',
  },
  {
    id: 'ch-glycolysis',
    number: 2,
    titleRu: 'Углеводный обмен: Гликолиз и ПДХ',
    titleEn: 'Carbohydrate Metabolism: Glycolysis & PDH',
    descriptionRu: '10 стадий превращения D-глюкозы в пируват в цитоплазме, энергетический баланс, регуляторные ферменты (HK, PFK-1, PK) и переход в митохондрии.',
    descriptionEn: '10 stages of D-glucose conversion to pyruvate in the cytoplasm, energy balance, key enzymes (HK, PFK-1, PK) and mitochondrial entry.',
    pathwayId: 'PW-GLYCOLISIS',
  },
  {
    id: 'ch-tca',
    number: 3,
    titleRu: 'Цикл трикарбоновых кислот (ЦТК Кребса)',
    titleEn: 'Tricarboxylic Acid Cycle (Krebs TCA)',
    descriptionRu: 'Центральный хаб окисления углеродных скелетов в митохондриальном матриксе. 8 реакций, стехиометрия, анаплеротические пути и аллостерический контроль.',
    descriptionEn: 'Central hub of carbon oxidation in the mitochondrial matrix. 8 reactions, stoichiometry, anaplerotic flux and allosteric regulation.',
    pathwayId: 'PW-TCA-CYCLE',
  },
  {
    id: 'ch-oxphos',
    number: 4,
    titleRu: 'Окислительное фосфорилирование и дыхательная цепь',
    titleEn: 'Oxidative Phosphorylation & ETC Complexes',
    descriptionRu: 'Митохондриальные комплексы I–IV, транслокация протонов через внутреннюю мембрану, электрохимический градиент и роторная механика АТФ-синтазы (V).',
    descriptionEn: 'Mitochondrial complexes I–IV, proton translocation across inner membrane, electrochemical gradient and rotary mechanics of ATP synthase (V).',
    pathwayId: 'PW-OXPHOS',
  },
  {
    id: 'ch-amino-acids',
    number: 5,
    titleRu: 'Белковый обмен: Аминокислоты и цикл мочевины',
    titleEn: 'Protein Metabolism: Amino Acids & Urea Cycle',
    descriptionRu: 'Катаболизм белков, трансаминирование (АлАТ, АсАТ), глутаматный азотистый коллектор (GLUD1) и цикл мочевины Кребса-Гензелейта с шунтом фумарата в ЦТК.',
    descriptionEn: 'Protein degradation, transamination network (ALT, AST), glutamate dehydrogenase (GLUD1), and the Krebs-Henseleit urea cycle linked to TCA via fumarate.',
    pathwayId: 'PW-UREA-CYCLE',
  },
];

@Component({
  selector: 'ma-textbook-shell',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './textbook-shell.component.html',
  styleUrl: './textbook-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextbookShellComponent {
  protected readonly localeService = inject(LocaleService);
  readonly chapterId = input<string>('');
  readonly chapters = TEXTBOOK_CHAPTERS;
}
