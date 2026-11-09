import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { LocaleService } from '../../core/services/locale.service';
import {
  MapLayoutDetail,
  MapElement,
  MetaboliteDetail,
  ReactionDetail,
} from '../../core/models';

export type InspectorTab = 'reaction' | 'molecule';

export interface HumanMetaboliteNode {
  id: string;
  code: string;
  nameRu: string;
  nameEn: string;
  abbrevRu: string;
  abbrevEn: string;
  formula: string;
  carbons: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  smiles: string;
  chebi: string;
  inchiKey: string;
  descriptionRu: string;
  synonymsRu: string[];
  // SVG 2D skeletal representation points/lines
  skeletalSvg: string;
}

export interface HumanReactionArrow {
  id: string;
  stepNumber: number;
  code: string;
  nameRu: string;
  nameEn: string;
  sourceMetaboliteId: string;
  targetMetaboliteId: string;
  secondarySourceId?: string;
  pathData: string;
  // Tooltip coordinates
  tooltipX: number;
  tooltipY: number;
  // Enzyme scientific details
  enzymeRu: string;
  enzymeEn: string;
  enzymeShort: string;
  ecNumber: string;
  gene: string;
  uniprotId: string;
  isReversible: boolean;
  deltaG0: string;
  // Participants breakdown for "Субстрат -> Продукт" cards
  substrates: { name: string; formula: string; isCo?: boolean }[];
  products: { name: string; formula: string; isCo?: boolean }[];
  cofactorArc?: {
    path: string;
    inText?: string;
    inX?: number;
    inY?: number;
    inAnchor?: 'start' | 'middle' | 'end';
    outText?: string;
    outX?: number;
    outY?: number;
    outAnchor?: 'start' | 'middle' | 'end';
    isEnergy?: boolean;
    isGtp?: boolean;
  };
  activatorsRu?: string[];
  inhibitorsRu?: string[];
  mechanismRu: string;
  clinicalNoteRu?: string;
}

export const HUMAN_METABOLITES: HumanMetaboliteNode[] = [
  {
    id: 'b0000001-0000-0000-0000-000000000003',
    code: 'MET_OAA',
    nameRu: 'Оксалоацетат',
    nameEn: 'Oxaloacetate',
    abbrevRu: 'ОАО',
    abbrevEn: 'OAA',
    formula: 'C₄H₂O₅²⁻',
    carbons: '4C',
    x: 640,
    y: 80,
    width: 150,
    height: 72,
    color: '#8B5CF6',
    smiles: 'C(C(=O)C(=O)[O-])C(=O)[O-]',
    chebi: 'CHEBI:16452',
    inchiKey: 'KHPXUQMNIQBQEV-UHFFFAOYSA-L',
    descriptionRu: 'Четырехуглеродный акцептор ацетильной группы в первой реакции цикла. Регенерируется на последней стадии. Также является субстратом для глюконеогенеза.',
    synonymsRu: ['Оксалоацетат', 'ОАО', 'Щавелевоуксусная кислота', '2-оксобутандиоат'],
    skeletalSvg: '<path d="M 12 18 L 22 24 L 32 18 L 42 24" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="18" r="3" fill="#EF4444"/><circle cx="42" cy="24" r="3" fill="#EF4444"/><circle cx="22" cy="12" r="2.5" fill="#EF4444"/><line x1="22" y1="24" x2="22" y2="12" stroke="currentColor" stroke-width="1.6"/>',
  },
  {
    id: 'b0000001-0000-0000-0000-000000000004',
    code: 'MET_CITRATE',
    nameRu: 'Цитрат',
    nameEn: 'Citrate',
    abbrevRu: 'ЦИТ',
    abbrevEn: 'CIT',
    formula: 'C₆H₅O₇³⁻',
    carbons: '6C',
    x: 1040,
    y: 190,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(C(=O)[O-])C(CC(=O)[O-])(C(=O)[O-])O',
    chebi: 'CHEBI:16947',
    inchiKey: 'KRKNYBCHXYNGOX-UHFFFAOYSA-K',
    descriptionRu: 'Шестиуглеродная трикарбоновая кислота, первый промежуточный продукт цикла. Может транспортироваться в цитозоль для синтеза жирных кислот.',
    synonymsRu: ['Цитрат', 'ЦИТ', 'Лимонная кислота', '2-гидроксипропан-1,2,3-трикарбоксилат'],
    skeletalSvg: '<path d="M 10 20 L 22 26 L 34 20 L 46 26" stroke="currentColor" stroke-width="1.6" fill="none"/><line x1="22" y1="26" x2="22" y2="10" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="20" r="3" fill="#EF4444"/><circle cx="46" cy="26" r="3" fill="#EF4444"/><circle cx="22" cy="10" r="3" fill="#EF4444"/>',
  },
  {
    id: 'b0000001-0000-0000-0000-000000000005',
    code: 'MET_ISOCITRATE',
    nameRu: 'Изоцитрат',
    nameEn: 'Isocitrate',
    abbrevRu: 'ИЗО',
    abbrevEn: 'ICT',
    formula: 'C₆H₅O₇³⁻',
    carbons: '6C',
    x: 1140,
    y: 480,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(C(C(=O)[O-])O)(CC(=O)[O-])C(=O)[O-]',
    chebi: 'CHEBI:16087',
    inchiKey: 'ODBLHEXUDAPZAU-UHFFFAOYSA-N',
    descriptionRu: 'Изомер цитрата с вторичной гидроксильной группой, подготовленный для окислительного декарбоксилирования.',
    synonymsRu: ['Изоцитрат', 'ИЗО', 'Изолимонная кислота', '1-гидроксипропан-1,2,3-трикарбоксилат'],
    skeletalSvg: '<path d="M 10 24 L 22 18 L 34 24 L 46 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="24" r="3" fill="#EF4444"/><circle cx="46" cy="18" r="3" fill="#EF4444"/><circle cx="34" cy="32" r="3" fill="#EF4444"/><line x1="34" y1="24" x2="34" y2="32" stroke="currentColor" stroke-width="1.6"/>',
  },
  {
    id: 'b0000001-0000-0000-0000-000000000006',
    code: 'MET_AKG',
    nameRu: 'α-Кетоглутарат',
    nameEn: 'α-Ketoglutarate',
    abbrevRu: 'α-КГ',
    abbrevEn: 'α-KG',
    formula: 'C₅H₄O₅²⁻',
    carbons: '5C',
    x: 1000,
    y: 770,
    width: 150,
    height: 72,
    color: '#6366F1',
    smiles: 'C(CC(=O)[O-])C(=O)C(=O)[O-]',
    chebi: 'CHEBI:16810',
    inchiKey: 'KPGXRSRHYNQIFN-UHFFFAOYSA-L',
    descriptionRu: 'Пятиуглеродный интермедиат. Ключевой перекресток обмена аминокислот (глутамат, глутамин) и азотистого катаболизма.',
    synonymsRu: ['α-Кетоглутарат', '2-оксоглутарат', 'α-КГ', '2-оксопентандиоат'],
    skeletalSvg: '<path d="M 10 20 L 22 26 L 34 18 L 46 24" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="20" r="3" fill="#EF4444"/><circle cx="46" cy="24" r="3" fill="#EF4444"/><circle cx="34" cy="10" r="2.5" fill="#EF4444"/><line x1="34" y1="18" x2="34" y2="10" stroke="currentColor" stroke-width="1.6"/>',
  },
  {
    id: 'b0000001-0000-0000-0000-000000000007',
    code: 'MET_SUCCINYL_COA',
    nameRu: 'Сукцинил-КоА',
    nameEn: 'Succinyl-CoA',
    abbrevRu: 'Сук-КоА',
    abbrevEn: 'Suc-CoA',
    formula: 'C₂₅H₃₆N₇O₁₉P₃S⁵⁻',
    carbons: '4C',
    x: 640,
    y: 880,
    width: 150,
    height: 72,
    color: '#6366F1',
    smiles: 'CC(C)(COP(=O)([O-])OP(=O)([O-])OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)([O-])[O-])C(C(=O)NCCC(=O)NCCSC(=O)CCC(=O)[O-])O',
    chebi: 'CHEBI:57292',
    inchiKey: 'HCOWTJKLQGBQSQ-UHFFFAOYSA-N',
    descriptionRu: 'Макроэргический тиоэфир сукцината и кофермента A. Используется для синтеза порфиринов (гемоглобина) и кетолиза в мозге.',
    synonymsRu: ['Сукцинил-КоА', 'Сукцинил-коэнзим А', 'Сук-КоА'],
    skeletalSvg: '<path d="M 10 24 L 20 18 L 30 24 L 40 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="24" r="3" fill="#EF4444"/><circle cx="40" cy="18" r="3" fill="#10B981"/>',
  },
  {
    id: 'b0000001-0000-0000-0000-000000000008',
    code: 'MET_SUCCINATE',
    nameRu: 'Сукцинат',
    nameEn: 'Succinate',
    abbrevRu: 'СУК',
    abbrevEn: 'SUC',
    formula: 'C₄H₄O₄²⁻',
    carbons: '4C',
    x: 290,
    y: 770,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(CC(=O)[O-])C(=O)[O-]',
    chebi: 'CHEBI:15741',
    inchiKey: 'KDYFGRWQOYBRFD-UHFFFAOYSA-L',
    descriptionRu: 'Четырехуглеродная дикарбоновая кислота. Окисляется непосредственно Комплексом II внутренней мембраны митохондрий.',
    synonymsRu: ['Сукцинат', 'СУК', 'Янтарная кислота', 'Бутандиоат'],
    skeletalSvg: '<path d="M 10 20 L 22 26 L 34 18 L 46 24" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="20" r="3" fill="#EF4444"/><circle cx="46" cy="24" r="3" fill="#EF4444"/>',
  },
  {
    id: 'b0000001-0000-0000-0000-000000000009',
    code: 'MET_FUMARATE',
    nameRu: 'Фумарат',
    nameEn: 'Fumarate',
    abbrevRu: 'ФУМ',
    abbrevEn: 'FUM',
    formula: 'C₄H₂O₄²⁻',
    carbons: '4C',
    x: 160,
    y: 480,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(=CC(=O)[O-])C(=O)[O-]',
    chebi: 'CHEBI:29806',
    inchiKey: 'VZCYOOQTPOCHFL-UHFFFAOYSA-L',
    descriptionRu: 'Транс-ненасыщенная дикарбоновая кислота. Продукт действия сукцинатдегидрогеназы. Связывает ЦТК с циклом мочевины.',
    synonymsRu: ['Фумарат', 'ФУМ', 'Фумаровая кислота', 'транс-бутендиоат'],
    skeletalSvg: '<path d="M 10 24 L 20 18 L 32 24 L 44 18" stroke="currentColor" stroke-width="1.6" fill="none"/><line x1="20" y1="21" x2="32" y2="27" stroke="currentColor" stroke-width="1.2"/><circle cx="10" cy="24" r="3" fill="#EF4444"/><circle cx="44" cy="18" r="3" fill="#EF4444"/>',
  },
  {
    id: 'b0000001-0000-0000-0000-000000000010',
    code: 'MET_MALATE',
    nameRu: 'L-Малат',
    nameEn: 'L-Malate',
    abbrevRu: 'МАЛ',
    abbrevEn: 'MAL',
    formula: 'C₄H₄O₅²⁻',
    carbons: '4C',
    x: 290,
    y: 190,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(C(C(=O)[O-])O)C(=O)[O-]',
    chebi: 'CHEBI:15588',
    inchiKey: 'BJEPYKJPYRNKOW-UHFFFAOYSA-L',
    descriptionRu: 'Гидроксидикарбоновая кислота. Участвует в малат-аспартатном челночном механизме переноса электронов в митохондрию.',
    synonymsRu: ['L-Малат', 'МАЛ', 'Яблочная кислота', '(2S)-2-гидроксибутандиоат'],
    skeletalSvg: '<path d="M 10 24 L 22 18 L 34 24 L 46 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="24" r="3" fill="#EF4444"/><circle cx="46" cy="18" r="3" fill="#EF4444"/><circle cx="22" cy="10" r="2.5" fill="#EF4444"/><line x1="22" y1="18" x2="22" y2="10" stroke="currentColor" stroke-width="1.6"/>',
  },
  {
    id: 'b0000001-0000-0000-0000-000000000002',
    code: 'MET_ACETYL_COA',
    nameRu: 'Ацетил-КоА',
    nameEn: 'Acetyl-CoA',
    abbrevRu: 'Ац-КоА',
    abbrevEn: 'Ac-CoA',
    formula: 'C₂₃H₃₄N₇O₁₇P₃S⁴⁻',
    carbons: '2C',
    x: 430,
    y: 80,
    width: 140,
    height: 72,
    color: '#10B981',
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)([O-])OP(=O)([O-])OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)([O-])[O-])O',
    chebi: 'CHEBI:57288',
    inchiKey: 'ZSLZBFCDCINBEF-UHFFFAOYSA-N',
    descriptionRu: 'Центральный метаболит человека. Образуется из углеводов (через ПДХ), жирных кислот (β-окисление) и аминокислот. Поставщик ацетильной группы (2C).',
    synonymsRu: ['Ацетил-КоА', 'Ацетил-коэнзим А', 'Ац-КоА'],
    skeletalSvg: '<path d="M 12 18 L 24 24 L 36 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="18" r="3" fill="#10B981"/><circle cx="36" cy="18" r="3" fill="#EF4444"/>',
  },
];

export const HUMAN_REACTIONS: HumanReactionArrow[] = [
  {
    id: 'd0000001-0000-0000-0000-000000000001',
    stepNumber: 1,
    code: 'R_CS',
    nameRu: 'Конденсация оксалоацетата и ацетил-КоА',
    nameEn: 'Citrate synthase condensation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000003', // OAA
    secondarySourceId: 'b0000001-0000-0000-0000-000000000002', // Acetyl-CoA
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000004', // Citrate
    pathData: 'M 790 125 C 890 125, 980 160, 1040 205',
    tooltipX: 915,
    tooltipY: 145,
    enzymeRu: 'Цитратсинтаза',
    enzymeEn: 'Citrate synthase',
    enzymeShort: 'CS',
    ecNumber: '2.3.3.1',
    gene: 'CS',
    uniprotId: 'O75390',
    isReversible: false,
    deltaG0: '-31.5 кДж/моль',
    substrates: [
      { name: 'Оксалоацетат', formula: 'C₄H₂O₅²⁻' },
      { name: 'Ацетил-КоА', formula: 'C₂₃H₃₄N₇O₁₇P₃S⁴⁻', isCo: true },
      { name: 'Вода (H₂O)', formula: 'H₂O', isCo: true },
    ],
    products: [
      { name: 'Цитрат', formula: 'C₆H₅O₇³⁻' },
      { name: 'Кофермент A (КоА-SH)', formula: 'C₂₁H₃₆N₇O₁₆P₃S', isCo: true },
      { name: 'Протон (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      inText: '+ H₂O',
      inX: 885,
      inY: 76,
      inAnchor: 'middle',
      path: 'M 885 84 C 890 145, 940 150, 955 98',
      outText: 'КоА-SH',
      outX: 965,
      outY: 88,
      outAnchor: 'start',
    },
    inhibitorsRu: ['АТФ', 'НАДН', 'Сукцинил-КоА', 'Цитрат'],
    mechanismRu: 'Конденсация метильной группы ацетил-КоА с карбонильным углеродом оксалоацетата с образованием цитрил-КоА, гидролиз которого высвобождает энергию тиоэфирной связи.',
    clinicalNoteRu: 'Начальная стадия цикла; сильно экзергоническая реакция, делающая процесс необратимым in vivo.',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000002',
    stepNumber: 2,
    code: 'R_ACO',
    nameRu: 'Изомеризация цитрата в изоцитрат',
    nameEn: 'Aconitate hydratase isomerization',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000004', // Citrate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000005', // Isocitrate
    pathData: 'M 1110 262 C 1140 330, 1170 400, 1190 480',
    tooltipX: 1160,
    tooltipY: 370,
    enzymeRu: 'Аконитаза 2 (митохондриальная)',
    enzymeEn: 'Aconitate hydratase 2',
    enzymeShort: 'ACO2',
    ecNumber: '4.2.1.3',
    gene: 'ACO2',
    uniprotId: 'Q99798',
    isReversible: true,
    deltaG0: '+5.0 кДж/моль',
    substrates: [
      { name: 'Цитрат', formula: 'C₆H₅O₇³⁻' },
    ],
    products: [
      { name: 'Изоцитрат', formula: 'C₆H₅O₇³⁻' },
    ],
    cofactorArc: {
      inText: '− H₂O',
      inX: 1195,
      inY: 340,
      inAnchor: 'start',
      path: 'M 1190 350 C 1140 370, 1140 400, 1185 415',
      outText: '+ H₂O',
      outX: 1195,
      outY: 428,
      outAnchor: 'start',
    },
    mechanismRu: 'Стереоспецифическая дегидратация цитрата до промежуточного цис-аконитата, за которой следует гидратация с образованием изоцитрата при участии железосерного кластера [4Fe-4S].',
    clinicalNoteRu: 'Ингибируется фторацетатом (образующим фторцитрат — токсический яд).',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000003',
    stepNumber: 3,
    code: 'R_IDH',
    nameRu: 'Окислительное декарбоксилирование изоцитрата',
    nameEn: 'Isocitrate oxidative decarboxylation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000005', // Isocitrate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000006', // aKG
    pathData: 'M 1180 552 C 1160 640, 1120 710, 1080 770',
    tooltipX: 1145,
    tooltipY: 660,
    enzymeRu: 'Изоцитратдегидрогеназа 3 (НАД⁺)',
    enzymeEn: 'Isocitrate dehydrogenase 3',
    enzymeShort: 'IDH3',
    ecNumber: '1.1.1.41',
    gene: 'IDH3A',
    uniprotId: 'P50213',
    isReversible: false,
    deltaG0: '-21.0 кДж/моль',
    substrates: [
      { name: 'Изоцитрат', formula: 'C₆H₅O₇³⁻' },
      { name: 'НАД⁺', formula: 'C₂₁H₂₇N₇O₁₄P₂', isCo: true },
    ],
    products: [
      { name: 'α-Кетоглутарат', formula: 'C₅H₄O₅²⁻' },
      { name: 'НАДН', formula: 'C₂₁H₂₉N₇O₁₄P₂', isCo: true },
      { name: 'Углекислый газ (CO₂ ↑)', formula: 'CO₂', isCo: true },
      { name: 'Протон (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      inText: 'НАД⁺',
      inX: 1215,
      inY: 615,
      inAnchor: 'start',
      path: 'M 1210 625 C 1140 645, 1140 685, 1205 700',
      outText: 'НАДН + CO₂ ↑',
      outX: 1215,
      outY: 712,
      outAnchor: 'start',
      isEnergy: true,
    },
    activatorsRu: ['АДФ', 'Ca²⁺'],
    inhibitorsRu: ['АТФ', 'НАДН'],
    mechanismRu: 'Окисление гидроксильной группы изоцитрата до кетогруппы (оксалосукцинат), за которым следует необратимое декарбоксилирование с выделением первой молекулы CO₂.',
    clinicalNoteRu: 'Главный регуляторный переключатель скорости клеточного дыхания у человека. Активируется при энергодефиците (высокий АДФ).',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000004',
    stepNumber: 4,
    code: 'R_KGDH',
    nameRu: 'Окислительное декарбоксилирование α-кетоглутарата',
    nameEn: 'α-Ketoglutarate dehydrogenase',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000006', // aKG
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000007', // Succinyl-CoA
    pathData: 'M 1000 825 C 930 870, 830 895, 790 905',
    tooltipX: 890,
    tooltipY: 880,
    enzymeRu: 'α-Кетоглутаратдегидрогеназный комплекс',
    enzymeEn: 'α-Ketoglutarate dehydrogenase complex',
    enzymeShort: 'OGDH',
    ecNumber: '1.2.4.2',
    gene: 'OGDH',
    uniprotId: 'Q02218',
    isReversible: false,
    deltaG0: '-33.5 кДж/моль',
    substrates: [
      { name: 'α-Кетоглутарат', formula: 'C₅H₄O₅²⁻' },
      { name: 'НАД⁺', formula: 'C₂₁H₂₇N₇O₁₄P₂', isCo: true },
      { name: 'Кофермент A (КоА-SH)', formula: 'C₂₁H₃₆N₇O₁₆P₃S', isCo: true },
    ],
    products: [
      { name: 'Сукцинил-КоА', formula: 'C₂₅H₃₆N₇O₁₉P₃S⁵⁻' },
      { name: 'НАДН', formula: 'C₂₁H₂₉N₇O₁₄P₂', isCo: true },
      { name: 'Углекислый газ (CO₂ ↑)', formula: 'CO₂', isCo: true },
      { name: 'Протон (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      inText: 'НАД⁺ + КоА',
      inX: 955,
      inY: 895,
      inAnchor: 'start',
      path: 'M 945 905 C 910 855, 870 870, 850 935',
      outText: 'НАДН + CO₂ ↑',
      outX: 840,
      outY: 955,
      outAnchor: 'end',
      isEnergy: true,
    },
    activatorsRu: ['Ca²⁺'],
    inhibitorsRu: ['Сукцинил-КоА', 'НАДН', 'АТФ'],
    mechanismRu: 'Мультиферментный комплекс (E1, E2, E3), аналогичный пируватдегидрогеназному. Требует 5 коферментов: тиаминпирофосфат (B₁), липоат, КоА (B₅), ФАД (B₂), НАД⁺ (B₃).',
    clinicalNoteRu: 'Дефицит витамина B₁ (тиамина) при алкоголизме (синдром Вернике-Корсакова) или бери-бери блокирует эту реакцию, вызывая энергетический коллапс ЦНС.',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000005',
    stepNumber: 5,
    code: 'R_SCS',
    nameRu: 'Субстратное фосфорилирование (Синтез ГТФ / АТФ)',
    nameEn: 'Succinate-CoA ligase (substrate-level phosphorylation)',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000007', // Succinyl-CoA
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000008', // Succinate
    pathData: 'M 640 910 C 530 910, 440 870, 390 842',
    tooltipX: 510,
    tooltipY: 890,
    enzymeRu: 'Сукцинил-КоА-синтетаза (Сукцинат-КоА-лигаза)',
    enzymeEn: 'Succinyl-CoA synthetase',
    enzymeShort: 'SUCLG2',
    ecNumber: '6.2.1.4',
    gene: 'SUCLG2 / SUCLA2',
    uniprotId: 'Q96I99',
    isReversible: true,
    deltaG0: '-2.9 кДж/моль',
    substrates: [
      { name: 'Сукцинил-КоА', formula: 'C₂₅H₃₆N₇O₁₉P₃S⁵⁻' },
      { name: 'ГДФ (или АДФ)', formula: 'C₁₀H₁₅N₅O₁₁P₂', isCo: true },
      { name: 'Неорганический фосфат (Фᵢ)', formula: 'HPO₄²⁻', isCo: true },
    ],
    products: [
      { name: 'Сукцинат', formula: 'C₄H₄O₄²⁻' },
      { name: 'ГТФ (или АТФ)', formula: 'C₁₀H₁₆N₅O₁₄P₃', isCo: true },
      { name: 'Кофермент A (КоА-SH)', formula: 'C₂₁H₃₆N₇O₁₆P₃S', isCo: true },
    ],
    cofactorArc: {
      inText: 'ГДФ + Фᵢ',
      inX: 585,
      inY: 968,
      inAnchor: 'middle',
      path: 'M 575 948 C 555 912, 485 912, 465 948',
      outText: 'ГТФ + КоА',
      outX: 435,
      outY: 968,
      outAnchor: 'middle',
      isGtp: true,
    },
    mechanismRu: 'Разрыв богатой энергией тиоэфирной связи сукцинил-КоА сопряжен с фосфорилированием гуанозиндифосфата (ГДФ) до ГТФ через фосфогистидиновый интермедиат фермента.',
    clinicalNoteRu: 'Тканевая специфичность человека: в печени и почках преобладает ГТФ-специфичная изоформа (ген SUCLG2, необходима для глюконеогенеза), в сердце и мозге — АТФ-специфичная (ген SUCLA2).',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000006',
    stepNumber: 6,
    code: 'R_SDH',
    nameRu: 'Окисление сукцината в фумарат',
    nameEn: 'Succinate dehydrogenase oxidation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000008', // Succinate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000009', // Fumarate
    pathData: 'M 320 770 C 270 700, 220 620, 210 552',
    tooltipX: 250,
    tooltipY: 660,
    enzymeRu: 'Сукцинатдегидрогеназа / Комплекс II',
    enzymeEn: 'Succinate dehydrogenase / Complex II',
    enzymeShort: 'SDH',
    ecNumber: '1.3.5.1',
    gene: 'SDHA-D',
    uniprotId: 'P31040',
    isReversible: true,
    deltaG0: '0.0 кДж/моль',
    substrates: [
      { name: 'Сукцинат', formula: 'C₄H₄O₄²⁻' },
      { name: 'ФАД (связанный)', formula: 'C₂₇H₃₃N₉O₁₅P₂', isCo: true },
    ],
    products: [
      { name: 'Фумарат', formula: 'C₄H₂O₄²⁻' },
      { name: 'ФАДН₂ (в пул Кофермента Q₁₀)', formula: 'C₂₇H₃₅N₉O₁₅P₂', isCo: true },
    ],
    cofactorArc: {
      inText: 'ФАД',
      inX: 180,
      inY: 695,
      inAnchor: 'end',
      path: 'M 185 685 C 255 665, 255 635, 195 620',
      outText: 'ФАДН₂ ➔ Q₁₀',
      outX: 180,
      outY: 610,
      outAnchor: 'end',
      isEnergy: true,
    },
    inhibitorsRu: ['Малонат (конкурентный)', 'Оксалоацетат'],
    mechanismRu: 'Стереоспецифическое транс-дегидрирование сукцината. Единственный фермент цикла, встроенный во внутреннюю мембрану митохондрий и напрямую передающий электроны в убихинон (Кофермент Q₁₀).',
    clinicalNoteRu: 'Генетические мутации в субъединицах SDH человека приводят к параганглиомам и феохромоцитомам (накопление сукцината стабилизирует онкогенный фактор HIF-1α).',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000007',
    stepNumber: 7,
    code: 'R_FUM',
    nameRu: 'Гидратация фумарата в L-малат',
    nameEn: 'Fumarate hydratase trans-hydration',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000009', // Fumarate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000010', // Malate
    pathData: 'M 220 480 C 240 400, 270 330, 310 262',
    tooltipX: 255,
    tooltipY: 370,
    enzymeRu: 'Фумараза (митохондриальная фумаратгидратаза)',
    enzymeEn: 'Fumarate hydratase',
    enzymeShort: 'FH',
    ecNumber: '4.2.1.2',
    gene: 'FH',
    uniprotId: 'P07954',
    isReversible: true,
    deltaG0: '-3.8 кДж/моль',
    substrates: [
      { name: 'Фумарат', formula: 'C₄H₂O₄²⁻' },
      { name: 'Вода (H₂O)', formula: 'H₂O', isCo: true },
    ],
    products: [
      { name: 'L-Малат', formula: 'C₄H₄O₅²⁻' },
    ],
    cofactorArc: {
      inText: '+ H₂O',
      inX: 175,
      inY: 375,
      inAnchor: 'end',
      path: 'M 185 372 Q 225 372 255 372',
      isEnergy: false,
    },
    mechanismRu: 'Стереоспецифическое транс-присоединение молекулы воды по двойной углерод-углеродной связи фумарата с образованием исключительно L-изомера яблочной кислоты.',
    clinicalNoteRu: 'Классический опухолевый супрессор человека. Герминальные мутации гена FH вызывают наследственный лейомиоматоз и почечно-клеточный рак (синдром HLRCC).',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000008',
    stepNumber: 8,
    code: 'R_MDH',
    nameRu: 'Окисление L-малата в оксалоацетат',
    nameEn: 'Malate dehydrogenase oxidation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000010', // Malate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000003', // OAA
    pathData: 'M 390 190 C 470 140, 560 120, 640 115',
    tooltipX: 520,
    tooltipY: 135,
    enzymeRu: 'Малатдегидрогеназа 2 (митохондриальная)',
    enzymeEn: 'Malate dehydrogenase 2',
    enzymeShort: 'MDH2',
    ecNumber: '1.1.1.37',
    gene: 'MDH2',
    uniprotId: 'P40926',
    isReversible: true,
    deltaG0: '+29.7 кДж/моль',
    substrates: [
      { name: 'L-Малат', formula: 'C₄H₄O₅²⁻' },
      { name: 'НАД⁺', formula: 'C₂₁H₂₇N₇O₁₄P₂', isCo: true },
    ],
    products: [
      { name: 'Оксалоацетат', formula: 'C₄H₂O₅²⁻' },
      { name: 'НАДН', formula: 'C₂₁H₂₉N₇O₁₄P₂', isCo: true },
      { name: 'Протон (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      inText: 'НАД⁺',
      inX: 475,
      inY: 85,
      inAnchor: 'middle',
      path: 'M 480 94 C 495 145, 555 145, 570 94',
      outText: 'НАДН + H⁺',
      outX: 580,
      outY: 85,
      outAnchor: 'middle',
      isEnergy: true,
    },
    inhibitorsRu: ['Высокие концентрации оксалоацетата'],
    mechanismRu: 'Окисление вторичной спиртовой группы малата до кетогруппы с регенерацией оксалоацетата и образованием третьей молекулы НАДН цикла.',
    clinicalNoteRu: 'Термодинамически неблагоприятная реакция (ΔG°\' = +29.7 кДж/моль), сдвигаемая вправо постоянным и быстрым расходом оксалоацетата цитратсинтазой.',
  },
];

export interface MetabolicCrossroad {
  id: string;
  nameRu: string;
  direction: 'in' | 'out';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  textX: number;
  textY: number;
}

export const HUMAN_CROSSROADS: MetabolicCrossroad[] = [
  {
    id: 'cr-pdh-in',
    nameRu: 'Гликолиз ➔ Пируват ➔ ПДХ (3C ➔ 2C)',
    direction: 'in',
    startX: 200,
    startY: 116,
    endX: 420,
    endY: 116,
    textX: 205,
    textY: 100,
  },
  {
    id: 'cr-cit-out',
    nameRu: 'Выход: Цитратный челнок ➔ Синтез липидов',
    direction: 'out',
    startX: 1180,
    startY: 226,
    endX: 1330,
    endY: 226,
    textX: 1185,
    textY: 212,
  },
  {
    id: 'cr-akg-cross',
    nameRu: 'Обмен аминокислот ⇋ Глутамат',
    direction: 'out',
    startX: 1150,
    startY: 806,
    endX: 1310,
    endY: 835,
    textX: 1155,
    textY: 825,
  },
  {
    id: 'cr-heme-out',
    nameRu: 'Синтез гема (порфиринов / Hb)',
    direction: 'out',
    startX: 715,
    startY: 952,
    endX: 715,
    endY: 990,
    textX: 620,
    textY: 998,
  },
  {
    id: 'cr-gng-out',
    nameRu: 'Выход: ОАО ➔ Глюконеогенез (PEPCK-M)',
    direction: 'out',
    startX: 790,
    startY: 85,
    endX: 870,
    endY: 35,
    textX: 795,
    textY: 45,
  },
];

@Component({
  selector: 'ma-atlas-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atlas-shell.component.html',
  styleUrl: './atlas-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasShellComponent implements OnInit, OnDestroy {
  protected readonly api = inject(ApiService);
  protected readonly localeService = inject(LocaleService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly safeSvgCache = new Map<string, SafeHtml>();

  getSafeSvg(rawSvg: string): SafeHtml {
    let cached = this.safeSvgCache.get(rawSvg);
    if (!cached) {
      cached = this.sanitizer.bypassSecurityTrustHtml(rawSvg);
      this.safeSvgCache.set(rawSvg, cached);
    }
    return cached;
  }

  readonly zoom = signal<number>(100);
  readonly panX = signal<number>(0);
  readonly panY = signal<number>(0);
  readonly isDragging = signal<boolean>(false);

  private dragStartX = 0;
  private dragStartY = 0;

  // Static datasets
  readonly metabolites = HUMAN_METABOLITES;
  readonly reactions = HUMAN_REACTIONS;
  readonly crossroads = HUMAN_CROSSROADS;

  // Active selections
  readonly selectedReaction = signal<HumanReactionArrow | null>(null);
  readonly selectedMetabolite = signal<HumanMetaboliteNode | null>(null);
  readonly activeTab = signal<InspectorTab>('reaction');
  readonly hoveredReaction = signal<HumanReactionArrow | null>(null);
  readonly hoveredMetabolite = signal<HumanMetaboliteNode | null>(null);

  // Global pan handlers
  private onWindowMouseMoveHandler?: (e: MouseEvent) => void;
  private onWindowMouseUpHandler?: (e: MouseEvent) => void;

  // Fast ID dictionaries
  readonly metaboliteMap = computed(() => {
    const map = new Map<string, HumanMetaboliteNode>();
    for (const m of this.metabolites) {
      map.set(m.id, m);
    }
    return map;
  });

  readonly reactionMap = computed(() => {
    const map = new Map<string, HumanReactionArrow>();
    for (const r of this.reactions) {
      map.set(r.id, r);
    }
    return map;
  });

  // Highlight check helpers
  isSubstrateOfSelected(nodeId: string): boolean {
    const r = this.selectedReaction();
    if (!r) return false;
    return r.sourceMetaboliteId === nodeId || r.secondarySourceId === nodeId;
  }

  isProductOfSelected(nodeId: string): boolean {
    const r = this.selectedReaction();
    if (!r) return false;
    return r.targetMetaboliteId === nodeId;
  }

  isNodeDimmed(nodeId: string): boolean {
    const selR = this.selectedReaction();
    if (selR) {
      return !this.isSubstrateOfSelected(nodeId) && !this.isProductOfSelected(nodeId);
    }
    const selM = this.selectedMetabolite();
    if (selM) {
      return selM.id !== nodeId;
    }
    return false;
  }

  isReactionDimmed(reactionId: string): boolean {
    const selR = this.selectedReaction();
    if (selR) {
      return selR.id !== reactionId;
    }
    const selM = this.selectedMetabolite();
    if (selM) {
      const r = this.reactionMap().get(reactionId);
      if (!r) return true;
      return r.sourceMetaboliteId !== selM.id && r.targetMetaboliteId !== selM.id;
    }
    return false;
  }

  ngOnInit(): void {
    this.setupGlobalPanListeners();
    // Default selection: Step 1 (Citrate Synthase) so the user sees rich details immediately!
    this.onReactionClick(this.reactions[0]);
  }

  ngOnDestroy(): void {
    this.removeGlobalPanListeners();
  }

  private setupGlobalPanListeners(): void {
    if (typeof window === 'undefined') return;

    this.onWindowMouseMoveHandler = (e: MouseEvent) => {
      if (this.isDragging()) {
        this.panX.set(e.clientX - this.dragStartX);
        this.panY.set(e.clientY - this.dragStartY);
      }
    };

    this.onWindowMouseUpHandler = () => {
      if (this.isDragging()) {
        this.isDragging.set(false);
      }
    };

    window.addEventListener('mousemove', this.onWindowMouseMoveHandler);
    window.addEventListener('mouseup', this.onWindowMouseUpHandler);
  }

  private removeGlobalPanListeners(): void {
    if (typeof window === 'undefined') return;
    if (this.onWindowMouseMoveHandler) {
      window.removeEventListener('mousemove', this.onWindowMouseMoveHandler);
    }
    if (this.onWindowMouseUpHandler) {
      window.removeEventListener('mouseup', this.onWindowMouseUpHandler);
    }
  }

  onReactionClick(reaction: HumanReactionArrow): void {
    this.selectedReaction.set(reaction);
    this.selectedMetabolite.set(null);
    this.activeTab.set('reaction');
  }

  onMetaboliteClick(metabolite: HumanMetaboliteNode): void {
    this.selectedMetabolite.set(metabolite);
    this.selectedReaction.set(null);
    this.activeTab.set('molecule');
  }

  findMetaboliteByName(name: string): HumanMetaboliteNode | undefined {
    if (!name) return undefined;
    const clean = name.trim().toLowerCase();
    return this.metabolites.find((m) => {
      const ru = m.nameRu.toLowerCase();
      const en = m.nameEn.toLowerCase();
      if (ru === clean || en === clean) return true;
      if (clean.startsWith(ru) || clean.startsWith(en)) return true;
      return m.synonymsRu.some((s) => s.toLowerCase() === clean || clean.startsWith(s.toLowerCase()));
    });
  }

  getReactionsForMetabolite(metId: string): { rx: HumanReactionArrow; role: 'substrate' | 'product' }[] {
    const list: { rx: HumanReactionArrow; role: 'substrate' | 'product' }[] = [];
    for (const r of this.reactions) {
      if (r.sourceMetaboliteId === metId || r.secondarySourceId === metId) {
        list.push({ rx: r, role: 'substrate' });
      } else if (r.targetMetaboliteId === metId) {
        list.push({ rx: r, role: 'product' });
      }
    }
    return list;
  }

  closeInspector(): void {
    this.selectedReaction.set(null);
    this.selectedMetabolite.set(null);
  }

  setActiveTab(tab: InspectorTab): void {
    this.activeTab.set(tab);
  }

  onViewportMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest('[data-interactive="true"]')) return;

    this.isDragging.set(true);
    this.dragStartX = event.clientX - this.panX();
    this.dragStartY = event.clientY - this.panY();
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const zoomDelta = event.deltaY < 0 ? 12 : -12;
    this.zoom.update((z) => Math.max(30, Math.min(250, z + zoomDelta)));
  }

  zoomIn(): void {
    this.zoom.update((z) => Math.min(z + 15, 250));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(z - 15, 30));
  }

  resetZoom(): void {
    this.zoom.set(100);
    this.panX.set(0);
    this.panY.set(0);
  }
}
