import { BiologicalReaction } from '../../../../core/metabolism/models';

export const PYRUVATE_TRANSPORT_REACTIONS: BiologicalReaction[] = [
  {
    "id": "d0000002-0000-0000-0000-000000000011",
    "stepNumber": 1,
    "code": "R_MPC",
    "nameRu": "Транспорт пирувата через митохондриальный переносчик (MPC1/2)",
    "nameEn": "Mitochondrial pyruvate carrier translocase (MPC1/MPC2)",
    "pathwayCode": "PW-MPC",
    "pathwayNameRu": "Митохондриальный транспорт пирувата",
    "pathwayNameEn": "Mitochondrial Pyruvate Transport",
    "compartmentRu": "Внутренняя мембрана митохондрий (ВММ)",
    "compartmentEn": "Inner Mitochondrial Membrane (IMM)",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000011",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000012",
    "enzymeRu": "Митохондриальный пируватный переносчик",
    "enzymeEn": "Mitochondrial pyruvate carrier complex",
    "enzymeShort": "MPC1 / MPC2",
    "enzymeShortRu": "МПЦ1 / МПЦ2",
    "ecNumber": "Transporter (SLC54)",
    "gene": "MPC1, MPC2",
    "uniprotId": "Q9Y5U8",
    "isReversible": true,
    "deltaG0": "-8.4 кДж/моль",
    "substrates": [
      {
        "name": "Пируват (Цитозоль)",
        "nameEn": "Pyruvate (Cytosolic)",
        "formula": "C₃H₃O₃⁻"
      }
    ],
    "products": [
      {
        "name": "Пируват (Матрикс)",
        "nameEn": "Pyruvate (Mitochondrial)",
        "formula": "C₃H₃O₃⁻"
      }
    ],
    "mechanismRu": "Симпорт пирувата с протоном H⁺ через внутреннюю мембрану митохондрий, движимый электрохимическим градиентом дыхательной цепи.",
    "mechanismEn": "Proton-symport translocase across inner mitochondrial membrane driven by proton-motive force.",
    "energyBalanceRu": "Протон-зависимый транспорт (H⁺-симпорт)",
    "energyBalanceEn": "Proton-coupled symport into matrix",
    "netAtpYieldRu": "Вход в митохондриальный матрикс",
    "netAtpYieldEn": "Matrix entry step",
    "clinicalNoteRu": "Дефицит MPC вызывает тяжелый неонатальный лактатацидоз и задержку психомоторного развития; фармакологическое ингибирование MPC исследуется при диабете 2 типа."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000012",
    "stepNumber": 1,
    "code": "R_PDH",
    "nameRu": "Окислительное декарбоксилирование пирувата в Ацетил-КоА (ПДХ)",
    "nameEn": "Pyruvate dehydrogenase complex conversion of pyruvate to Acetyl-CoA",
    "pathwayCode": "PW-PDH",
    "pathwayNameRu": "Пируватдегидрогеназный комплекс (ПДХ)",
    "pathwayNameEn": "Pyruvate Dehydrogenase Complex (PDH)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000012",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000002",
    "enzymeRu": "Пируватдегидрогеназный мультиферментный комплекс",
    "enzymeEn": "Pyruvate dehydrogenase multienzyme complex (E1-E2-E3)",
    "enzymeShort": "PDH",
    "enzymeShortRu": "ПДХ",
    "ecNumber": "1.2.4.1 / 2.3.1.12 / 1.8.1.4",
    "gene": "PDHA1, DLAT, DLD, PDHX",
    "uniprotId": "P08559",
    "isReversible": false,
    "deltaG0": "-33.4 кДж/моль",
    "substrates": [
      {
        "name": "Пируват (Матрикс)",
        "nameEn": "Pyruvate (Mitochondrial)",
        "formula": "C₃H₃O₃⁻"
      },
      {
        "name": "НАД⁺",
        "nameEn": "NAD⁺",
        "formula": "C₂₁H₂₆N₇O₁₄P₂⁺",
        "isCo": true
      },
      {
        "name": "Кофермент A (КоА-SH)",
        "nameEn": "Coenzyme A (CoA-SH)",
        "formula": "C₂₁H₃₆N₇O₁₆P₃S",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "Ацетил-КоА",
        "nameEn": "Acetyl-CoA",
        "formula": "C₂₃H₃₄N₇O₁₇P₃S⁴⁻"
      },
      {
        "name": "НАДН",
        "nameEn": "NADH",
        "formula": "C₂₁H₂₇N₇O₁₄P₂²⁻",
        "isCo": true
      },
      {
        "name": "Диоксид углерода (CO₂)",
        "nameEn": "Carbon dioxide (CO₂)",
        "formula": "CO₂",
        "isCo": true
      },
      {
        "name": "Протон (H⁺)",
        "nameEn": "Proton (H⁺)",
        "formula": "H⁺",
        "isCo": true
      }
    ],
    "activatorsRu": [
      "НАД⁺",
      "КоА-SH",
      "АДФ",
      "Ионы Ca²⁺",
      "Инсулин (через фосфатазу PDP1)"
    ],
    "activatorsEn": [
      "NAD⁺",
      "CoA-SH",
      "ADP",
      "Ca2+",
      "Insulin (via PDP1 phosphatase)"
    ],
    "inhibitorsRu": [
      "Ацетил-КоА",
      "НАДН",
      "АТФ (через киназу PDK1-4)"
    ],
    "inhibitorsEn": [
      "Acetyl-CoA",
      "NADH",
      "ATP (via PDK1-4 kinase)"
    ],
    "mechanismRu": "Трехэтапный координированный катализ мультиферментного кластера: 1) Декарбоксилирование пирувата на тиаминдифосфате (E1 / TPP); 2) Окисление гидроксиэтильной группы с переносом на липоевую кислоту и образование ацетил-КоА (E2); 3) Регенерация липоамида через ФАД с восстановлением НАД⁺ в НАДН (E3 / DLD).",
    "mechanismEn": "Sequential multi-enzyme decarboxylation (E1-TPP), transacetylation to lipoamide and CoA-SH (E2), and flavoprotein reoxidation yielding NADH (E3).",
    "energyBalanceRu": "Выход: +2 НАДН + 2 Ацетил-КоА + 2 CO₂ (на глюкозу)",
    "energyBalanceEn": "Yield: +2 NADH + 2 Acetyl-CoA + 2 CO₂ (per glucose)",
    "netAtpYieldRu": "Дыхательный потенциал: +5 АТФ в ДЦ (на 2 пирувата)",
    "netAtpYieldEn": "Respiratory potential: +5 ATP via ETC (per 2 pyruvates)",
    "clinicalNoteRu": "Дефицит E1-альфа (PDHA1) — наиболее частая причина наследственного синдрома Ли (подострой некротизирующей энцефаломиелопатии); дефицит тиамина (витамина B1) нарушает работу E1, вызывая болезнь Бери-бери."
  }
];
