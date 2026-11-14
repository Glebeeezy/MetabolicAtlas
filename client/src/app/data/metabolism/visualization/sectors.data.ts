import { SectorLayoutConfig } from '../../../core/metabolism/models';

export const SECTOR_LAYOUT_CONFIGS: SectorLayoutConfig[] = [
  {
    "sectorId": "PW-GLYCOLISIS",
    "nameRu": "Углеводный сектор (Гликолиз / ПДХ)",
    "nameEn": "Carbohydrate Sector (Glycolysis / PDH)",
    "categoryRu": "Углеводный обмен",
    "categoryEn": "Carbohydrate Metabolism",
    "centerAngleRad": -1.5707963267948966,
    "radiusMin": 350,
    "radiusMax": 1400,
    "themeColor": "#F59E0B",
    "gradientColors": [
      "rgba(245, 158, 11, 0.14)",
      "rgba(245, 158, 11, 0.01)"
    ],
    "centerX": 1600,
    "centerY": 460,
    "boundingPoly": [
      {
        "x": 560,
        "y": -640
      },
      {
        "x": 2560,
        "y": -640
      },
      {
        "x": 2560,
        "y": 1255
      },
      {
        "x": 560,
        "y": 1255
      }
    ],
    "descriptionRu": "Расщепление глюкозы, лактозы/галактозы (путь Лелуара), гликогена и сахарозы/фруктозы (фруктолиз) с переходом в ПДХ и Ацетил-КоА.",
    "descriptionEn": "Metabolism of glucose, lactose/galactose (Leloir pathway), glycogen stores, and sucrose/fructose feeding glycolysis and Acetyl-CoA.",
    "connectedHubCode": "MET_ACETYL_COA",
    "targetPathwayId": "PW-GLYCOLISIS"
  },
  {
    "sectorId": "PW-BETA-OXIDATION",
    "nameRu": "Липидный сектор (β-Окисление / Липиды)",
    "nameEn": "Lipid Sector (β-Oxidation / Lipids)",
    "categoryRu": "Липидный обмен",
    "categoryEn": "Lipid Metabolism",
    "centerAngleRad": 3.141592653589793,
    "radiusMin": 350,
    "radiusMax": 1400,
    "themeColor": "#8B5CF6",
    "gradientColors": [
      "rgba(139, 92, 246, 0.14)",
      "rgba(139, 92, 246, 0.01)"
    ],
    "centerX": 525,
    "centerY": 1750,
    "boundingPoly": [
      {
        "x": 150,
        "y": 1300
      },
      {
        "x": 900,
        "y": 1300
      },
      {
        "x": 900,
        "y": 2250
      },
      {
        "x": 150,
        "y": 2250
      }
    ],
    "descriptionRu": "Катаболизм жирных кислот (β-окисление), генерация ацетил-КоА, кетогенез и цитозольный липогенез через цитратный челнок.",
    "descriptionEn": "Fatty acid breakdown via beta-oxidation, acetyl-CoA yield, ketogenesis and fatty acid synthesis via citrate shuttle.",
    "connectedHubCode": "MET_ACETYL_COA",
    "targetPathwayId": "PW-BETA-OXIDATION"
  },
  {
    "sectorId": "PW-TCA-CYCLE",
    "nameRu": "Цикл трикарбоновых кислот (ЦТК / Кребс)",
    "nameEn": "Citric Acid Cycle (TCA / Krebs Cycle)",
    "categoryRu": "Энергетический цикл",
    "categoryEn": "Energy Cycle",
    "centerAngleRad": 0,
    "radiusMin": 0,
    "radiusMax": 650,
    "themeColor": "#10B981",
    "gradientColors": [
      "rgba(16, 185, 129, 0.14)",
      "rgba(16, 185, 129, 0.01)"
    ],
    "centerX": 1600,
    "centerY": 2190,
    "boundingPoly": [
      {
        "x": 950,
        "y": 1680
      },
      {
        "x": 2250,
        "y": 1680
      },
      {
        "x": 2250,
        "y": 2745
      },
      {
        "x": 950,
        "y": 2745
      }
    ],
    "descriptionRu": "Центральный окислительный 8-стадийный цикл клетки в матриксе митохондрий, поставляющий НАДН и ФАДН₂ для АТФ-синтазы.",
    "descriptionEn": "Central 8-step catalytic mitochondrial matrix engine generating reducing equivalents NADH & FADH₂.",
    "connectedHubCode": "MET_ACETYL_COA",
    "targetPathwayId": "PW-TCA-CYCLE"
  },
  {
    "sectorId": "PW-UREA-CYCLE",
    "nameRu": "Белковый сектор (Аминокислоты / Мочевина)",
    "nameEn": "Amino Acid Sector (Amino Acids / Urea)",
    "categoryRu": "Аминокислотный обмен",
    "categoryEn": "Amino Acid Metabolism",
    "centerAngleRad": 0,
    "radiusMin": 350,
    "radiusMax": 1400,
    "themeColor": "#E11D48",
    "gradientColors": [
      "rgba(225, 29, 72, 0.14)",
      "rgba(225, 29, 72, 0.01)"
    ],
    "centerX": 2675,
    "centerY": 1750,
    "boundingPoly": [
      {
        "x": 2300,
        "y": 1300
      },
      {
        "x": 3050,
        "y": 1300
      },
      {
        "x": 3050,
        "y": 2250
      },
      {
        "x": 2300,
        "y": 2250
      }
    ],
    "descriptionRu": "Катаболизм аминокислот, трансаминирование (АлАТ, АсАТ) и орнитиновый цикл мочевины с фумаратным шунтом к ЦТК.",
    "descriptionEn": "Amino acid transamination, nitrogen disposal via urea cycle, and Krebs bicycle linking through fumarate.",
    "connectedHubCode": "MET_AKG",
    "targetPathwayId": "PW-UREA-CYCLE"
  },
  {
    "sectorId": "PW-OXPHOS",
    "nameRu": "Дыхательная цепь (OxPhos / АТФ)",
    "nameEn": "Oxidative Phosphorylation (OxPhos / ATP)",
    "categoryRu": "Биоэнергетика",
    "categoryEn": "Bioenergetics",
    "centerAngleRad": 1.5707963267948966,
    "radiusMin": 350,
    "radiusMax": 1400,
    "themeColor": "#0EA5E9",
    "gradientColors": [
      "rgba(14, 165, 233, 0.14)",
      "rgba(14, 165, 233, 0.01)"
    ],
    "centerX": 1600,
    "centerY": 3020,
    "boundingPoly": [
      {
        "x": 920,
        "y": 2710
      },
      {
        "x": 2280,
        "y": 2710
      },
      {
        "x": 2280,
        "y": 3340
      },
      {
        "x": 920,
        "y": 3340
      }
    ],
    "descriptionRu": "Электронно-транспортная цепь (Комплексы I, III, IV) и АТФ-синтаза (Комплекс V) на кристах митохондрий (28–32 АТФ на глюкозу).",
    "descriptionEn": "Mitochondrial cristae electron transport chain complexes I, III, IV and ATP synthase driving aerobic phosphorylation.",
    "connectedHubCode": "MET_QH2",
    "targetPathwayId": "PW-OXPHOS"
  }
];
