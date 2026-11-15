import { HumanReactionArrow } from '../../atlas-data';

export function getPathwayStepLabel(rx: HumanReactionArrow, locale: string): string {
  const isEn = locale === 'en';
  if (rx.code === 'R_LCT') {
    return isEn
      ? 'Leloir Pathway • Dietary Lactose Entry'
      : 'Путь Лелуара • Вход (Гидролиз лактозы)';
  }
  if (rx.code === 'R_SI') {
    return isEn
      ? 'Fructolysis • Dietary Sucrose Entry'
      : 'Фруктолиз • Вход (Гидролиз сахарозы)';
  }
  const labels: Record<string, { ru: string; en: string }> = {
    'PW-GLYCOLISIS': {
      ru: `Гликолиз • Стадия ${rx.stepNumber} из 10`,
      en: `Glycolysis • Step ${rx.stepNumber} of 10`,
    },
    'PW-GALACTOSE': {
      ru: `Путь Лелуара (Галактоза) • Стадия ${rx.stepNumber} из 4`,
      en: `Leloir Pathway (Galactose) • Step ${rx.stepNumber} of 4`,
    },
    'PW-GLYCOGEN': {
      ru: `Метаболизм гликогена • Стадия ${rx.stepNumber} из 3`,
      en: `Glycogen Metabolism • Step ${rx.stepNumber} of 3`,
    },
    'PW-FRUCTOSE': {
      ru: `Фруктолиз • Стадия ${rx.stepNumber} из 4`,
      en: `Fructolysis • Step ${rx.stepNumber} of 4`,
    },
    'PW-MPC': {
      ru: 'Мембранный транспорт • MPC1/2',
      en: 'Membrane Transport • MPC1/2',
    },
    'PW-PDH': {
      ru: 'ПДХ-комплекс (E1–E2–E3)',
      en: 'PDH Complex (E1–E2–E3)',
    },
    'PW-TCA-CYCLE': {
      ru: `Цикл Кребса (ЦТК) • Стадия ${rx.stepNumber} из 8`,
      en: `TCA Cycle • Step ${rx.stepNumber} of 8`,
    },
    'PW-OXPHOS': {
      ru: `Дыхательная цепь (OxPhos) • Стадия ${rx.stepNumber} из 4`,
      en: `OxPhos / ETC • Step ${rx.stepNumber} of 4`,
    },
  };
  const match = rx.pathwayCode ? labels[rx.pathwayCode] : undefined;
  if (match) {
    return isEn ? match.en : match.ru;
  }
  return isEn ? rx.nameEn : rx.nameRu;
}
