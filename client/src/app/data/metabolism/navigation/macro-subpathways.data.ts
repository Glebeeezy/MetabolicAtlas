import { MacroSubpathwayAnchor } from '../../../core/metabolism';

export const MACRO_SUBPATHWAYS: readonly MacroSubpathwayAnchor[] = [
  {
    pathwayId: 'PW-GALACTOSE',
    titleRu: 'Лактоза ➔ Путь Лелуара',
    titleEn: 'Lactose ➔ Leloir Pathway',
    subtitleRu: 'Гал ➔ Гал-1-Ф ⇄ Г1Ф ➔ Г6Ф',
    subtitleEn: 'Gal ➔ Gal-1-P ⇄ G1P ➔ G6P',
    color: '#A855F7',
    x: 940,
    y: -190,
  },
  {
    pathwayId: 'PW-GLYCOGEN',
    titleRu: 'Метаболизм гликогена',
    titleEn: 'Glycogen Metabolism',
    subtitleRu: 'Г1Ф ➔ УДФ-Глю ⇄ Гликоген',
    subtitleEn: 'G1P ➔ UDP-Glc ⇄ Glycogen',
    color: '#06B6D4',
    x: 1320,
    y: -455,
  },
  {
    pathwayId: 'PW-FRUCTOSE',
    titleRu: 'Сахароза ➔ Фруктолиз',
    titleEn: 'Sucrose ➔ Fructolysis',
    subtitleRu: 'Фру ➔ Ф1Ф ➔ ДАФ + ГА',
    subtitleEn: 'Fru ➔ F1P ➔ DHAP + GA',
    color: '#F97316',
    x: 2145,
    y: 240,
  },
  {
    pathwayId: 'PW-UREA-CYCLE',
    titleRu: 'Цикл мочевины и азот',
    titleEn: 'Urea Cycle & Nitrogen',
    subtitleRu: 'NH₄⁺ ➔ Цитруллин ➔ Мочевина',
    subtitleEn: 'NH₄⁺ ➔ Citrulline ➔ Urea',
    color: '#E11D48',
    x: 2900,
    y: 1150,
  },
] as const;
