import { BiologicalReaction } from '../../../../core/metabolism/models';

export const FRUCTOSE_REACTIONS: BiologicalReaction[] = [
  {
    "id": "d0000004-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_KHK",
    "nameRu": "Быстрое фосфорилирование D-фруктозы кетогексокиназой",
    "nameEn": "Ketohexokinase phosphorylation of D-fructose",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз (Печень)",
    "pathwayNameEn": "Fructolysis (Liver)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000004-0000-0000-0000-000000000002",
    "enzymeRu": "Кетогексокиназа (Фруктокиназа)",
    "enzymeEn": "Ketohexokinase (Fructokinase)",
    "enzymeShort": "KHK",
    "enzymeShortRu": "Фруктокиназа",
    "ecNumber": "2.7.1.3",
    "gene": "KHK",
    "uniprotId": "P50053",
    "isReversible": false,
    "deltaG0": "-18.4 кДж/моль",
    "substrates": [
      {
        "name": "D-Фруктоза",
        "nameEn": "D-Fructose",
        "formula": "C₆H₁₂O₆"
      },
      {
        "name": "Аденозинтрифосфат",
        "nameEn": "ATP",
        "formula": "C₁₀H₁₂N₅O₁₃P₃⁴⁻",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "Фруктозо-1-фосфат",
        "nameEn": "Fructose 1-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      },
      {
        "name": "Аденозиндифосфат",
        "nameEn": "ADP",
        "formula": "C₁₀H₁₂N₅O₁₀P₂³⁻",
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
      "Ионы Mg²⁺ / K⁺",
      "Высокая активность изоформы KHK-C в печени"
    ],
    "activatorsEn": [
      "Mg²⁺ / K⁺ ions",
      "High Vmax hepatic KHK-C isoform"
    ],
    "inhibitorsRu": [
      "Практически лишена аллостерического торможения (истощает АТФ при болюсе фруктозы)"
    ],
    "inhibitorsEn": [
      "No allosteric ATP/citrate feedback (rapidly depletes hepatic ATP on fructose bolus)"
    ],
    "mechanismRu": "Высокоактивная печёночная изоформа KHK-C мгновенно переносит γ-фосфат АТФ на C1 D-фруктозы (вместо C6). Поскольку продукт F1P сразу уходит на расщепление альдолазой B, поток полностью обходит главный тормоз гликолиза — PFK-1.",
    "mechanismEn": "Hepatic KHK-C phosphorylates C1 of D-fructose at high Vmax without allosteric braking, funneling fructose carbons below PFK-1.",
    "energyBalanceRu": "Расход: -1 АТФ (обход PFK-1)",
    "energyBalanceEn": "Investment: -1 ATP (bypasses PFK-1)",
    "netAtpYieldRu": "Перед лимитирующим расщеплением ALDOB: -1 АТФ",
    "netAtpYieldEn": "Pre-cleavage balance: -1 ATP",
    "clinicalNoteRu": "Доброкачественный дефицит KHK (эссенциальная фруктозурия) протекает бессимптомно с экскрецией фруктозы с мочой. Напротив, избыточная активация KHK-C вызывает резкое падение АТФ/Pi в гепатоцитах, распад АМФ до мочевой кислоты (гиперурикемия) и de novo липогенез."
  },
  {
    "id": "d0000004-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_ALDOB",
    "nameRu": "Расщепление Ф1Ф альдолазой B на ДАФ и D-глицеральдегид",
    "nameEn": "Aldolase B cleavage of F1P into DHAP and D-glyceraldehyde",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз (Печень)",
    "pathwayNameEn": "Fructolysis (Liver)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000002",
    "targetMetaboliteId": "b0000004-0000-0000-0000-000000000003",
    "secondaryTargetId": "b0000002-0000-0000-0000-000000000005",
    "enzymeRu": "Альдолаза B (Печёночная)",
    "enzymeEn": "Aldolase B (Hepatic)",
    "enzymeShort": "ALDOB",
    "enzymeShortRu": "АЛДО-B",
    "ecNumber": "4.1.2.13",
    "gene": "ALDOB",
    "uniprotId": "P05062",
    "isReversible": true,
    "deltaG0": "+15.0 кДж/моль",
    "substrates": [
      {
        "name": "Фруктозо-1-фосфат",
        "nameEn": "Fructose 1-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      }
    ],
    "products": [
      {
        "name": "D-Глицеральдегид",
        "nameEn": "D-Glyceraldehyde",
        "formula": "C₃H₆O₃"
      },
      {
        "name": "Дигидроксиацетонфосфат",
        "nameEn": "Dihydroxyacetone phosphate",
        "formula": "C₃H₅O₆P²⁻"
      }
    ],
    "activatorsRu": [
      "Отток триоз (ДАФ в гликолиз/липогенез, ГА в TKFC)"
    ],
    "activatorsEn": [
      "Triose pull toward glycolysis, GNG, and TKFC"
    ],
    "inhibitorsRu": [
      "Фруктозо-1,6-бисфосфат (конкурентный субстрат ALDOB)"
    ],
    "inhibitorsEn": [
      "Fructose 1,6-bisphosphate (competing substrate)"
    ],
    "mechanismRu": "Печёночная альдолаза B расщепляет фруктозо-1-фосфат через ковалентное основание Шиффа с лизином на фосфорилированный ДАФ (сразу в ствол гликолиза или вверх в синтез глюкозы!) и нефосфорилированный D-глицеральдегид. В отличие от KHK, активность ALDOB ниже, делая этот шаг узким местом фруктолиза.",
    "mechanismEn": "Class I Schiff-base aldol cleavage of F1P yielding glycolytic DHAP (already phosphorylated) plus free D-glyceraldehyde. Serves as the rate-limiting step of hepatic fructolysis.",
    "energyBalanceRu": "Расщепление в обход PFK-1: 1 триоза с фосфатом (ДАФ) + 1 без (ГА)",
    "energyBalanceEn": "PFK-1 bypass cleavage: phosphorylated DHAP + free GA",
    "netAtpYieldRu": "Удвоение потока C₃: далее ГА (через TKFC) и ДАФ дают +4 АТФ (итого +2 АТФ нетто)",
    "netAtpYieldEn": "Trioses feed payoff phase (+4 ATP gross, +2 ATP net total)",
    "clinicalNoteRu": "Наследственная непереносимость фруктозы (HFI, аутосомно-рецессивный дефицит ALDOB): при приёме фруктозы или сахарозы Ф1Ф необратимо запирает неорганический фосфат (Pi), тормозит гликогенолиз (фосфорилазу) и глюконеогенез, вызывая тяжёлую гипогликемию, лактатацидоз и печёночную недостаточность."
  },
  {
    "id": "d0000004-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_TKFC",
    "nameRu": "Фосфорилирование D-глицеральдегида триокиназой в ГАФ",
    "nameEn": "Triokinase phosphorylation of D-glyceraldehyde into G3P",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз (Печень)",
    "pathwayNameEn": "Fructolysis (Liver)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000003",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000006",
    "enzymeRu": "Триокиназа (TKFC)",
    "enzymeEn": "Triokinase / FMN cyclase",
    "enzymeShort": "TKFC",
    "enzymeShortRu": "Триокиназа",
    "ecNumber": "2.7.1.28",
    "gene": "TKFC",
    "uniprotId": "Q3LXA3",
    "isReversible": false,
    "deltaG0": "-19.2 кДж/моль",
    "substrates": [
      {
        "name": "D-Глицеральдегид",
        "nameEn": "D-Glyceraldehyde",
        "formula": "C₃H₆O₃"
      },
      {
        "name": "Аденозинтрифосфат",
        "nameEn": "ATP",
        "formula": "C₁₀H₁₂N₅O₁₃P₃⁴⁻",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "Глицеральдегид-3-фосфат",
        "nameEn": "Glyceraldehyde 3-phosphate",
        "formula": "C₃H₅O₆P²⁻"
      },
      {
        "name": "Аденозиндифосфат",
        "nameEn": "ADP",
        "formula": "C₁₀H₁₂N₅O₁₀P₂³⁻",
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
      "Ионы Mg²⁺"
    ],
    "activatorsEn": [
      "Mg²⁺ ions"
    ],
    "inhibitorsRu": [
      "Накопление АДФ"
    ],
    "inhibitorsEn": [
      "ADP accumulation"
    ],
    "mechanismRu": "Необратимо фосфорилирует C3-гидроксил D-глицеральдегида за счёт второй молекулы АТФ, уравнивая энергетическую цену входа фруктозы с глюкозой (-2 АТФ). В печени полученные ГАФ и ДАФ могут как идти вниз в гликолиз (+4 АТФ ➔ +2 АТФ нетто до пирувата), так и вверх через обратную альдолазу (ALDO) ➔ F1,6BP ➔ FBP1 ➔ GPI ➔ G6PC1 для синтеза свободной D-глюкозы.",
    "mechanismEn": "Irreversibly phosphorylates D-glyceraldehyde at C3 consuming the second ATP (-2 ATP total matching glycolysis). In liver, G3P + DHAP feed downstream ATP payoff (+2 net ATP) or condense upward via gluconeogenesis to blood glucose.",
    "energyBalanceRu": "Расход второй АТФ (-1 АТФ; всего -2 АТФ как в гликолизе)",
    "energyBalanceEn": "Second ATP spent (-1 ATP; cumulative -2 ATP matching glycolysis)",
    "netAtpYieldRu": "Итог от Фруктозы ➔ Пируват: +2 АТФ нетто; в печени: путь синтеза Глюкозы (➔ G6P ➔ G6PC1)",
    "netAtpYieldEn": "Fructose ➔ Pyruvate total: +2 net ATP; or hepatic gluconeogenesis to glucose",
    "clinicalNoteRu": "Недостаточность TKFC вызывает редкую триокиназную недостаточность (TKFCD) с неврологическими расстройствами, гипогликемией и катарактой; при здоровом ферменте предупреждает восстановление глицеральдегида в токсичный глицерол или оксалат."
  },
  {
    "id": "d0000004-0000-0000-0000-000000000004",
    "stepNumber": 4,
    "code": "R_HK_FRU",
    "nameRu": "Внепечёночное фосфорилирование фруктозы во Ф6Ф",
    "nameEn": "Extrahepatic hexokinase phosphorylation of fructose to F6P",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз (Мышцы / Адипоциты)",
    "pathwayNameEn": "Fructolysis (Muscle / Adipose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000003",
    "enzymeRu": "Гексокиназа 1 / 2",
    "enzymeEn": "Hexokinase 1 / 2",
    "enzymeShort": "HK1 / HK2",
    "enzymeShortRu": "Гексокиназа 1/2",
    "ecNumber": "2.7.1.1",
    "gene": "HK1, HK2",
    "uniprotId": "P19367",
    "isReversible": false,
    "deltaG0": "-16.7 кДж/моль",
    "substrates": [
      {
        "name": "D-Фруктоза",
        "nameEn": "D-Fructose",
        "formula": "C₆H₁₂O₆"
      },
      {
        "name": "Аденозинтрифосфат",
        "nameEn": "ATP",
        "formula": "C₁₀H₁₂N₅O₁₃P₃⁴⁻",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "Фруктозо-6-фосфат",
        "nameEn": "Fructose 6-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      },
      {
        "name": "Аденозиндифосфат",
        "nameEn": "ADP",
        "formula": "C₁₀H₁₂N₅O₁₀P₂³⁻",
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
      "Ионы Mg²⁺"
    ],
    "activatorsEn": [
      "Mg²⁺ ions"
    ],
    "inhibitorsRu": [
      "D-Глюкоза (более высокое сродство к HK)",
      "Глюкозо-6-фосфат (аллостерическое торможение)"
    ],
    "inhibitorsEn": [
      "D-Glucose (much lower Km outcompetes fructose)",
      "Glucose 6-phosphate feedback"
    ],
    "mechanismRu": "В скелетных мышцах, почках и жировой ткани, где отсутствует печёночная фруктокиназа KHK-C, неспецифическая гексокиназа медленно фосфорилирует фруктозу прямо в положение C6, давая Ф6Ф — субстрат PFK-1 и фосфоглюкоизомеразы (GPI).",
    "mechanismEn": "In skeletal muscle and adipose tissue lacking KHK-C, hexokinase phosphorylates fructose directly at C6 into F6P, feeding PFK-1 under full energy regulation.",
    "energyBalanceRu": "Расход: -1 АТФ (далее ещё -1 АТФ на PFK-1 ➔ всего -2 АТФ)",
    "energyBalanceEn": "Investment: -1 ATP (plus -1 ATP at PFK-1 ➔ -2 ATP total)",
    "netAtpYieldRu": "Итог по стволу гликолиза: +2 АТФ нетто (аэробно ~30–32 АТФ)",
    "netAtpYieldEn": "Via main glycolysis payoff: +2 net ATP (~30–32 ATP aerobic)",
    "clinicalNoteRu": "Этот запасной путь объясняет появление фруктозурии при сохранной общей утилизации фруктозы в мышцах, а также защищённость внепечёночных тканей от резкого истощения АТФ, характерного для печёночной KHK."
  },
  {
    "id": "d0000004-0000-0000-0000-000000000005",
    "stepNumber": 0,
    "code": "R_SI",
    "nameRu": "Гидролиз сахарозы в D-фруктозу и D-глюкозу",
    "nameEn": "Sucrase hydrolysis of sucrose into D-fructose and D-glucose",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз",
    "pathwayNameEn": "Fructolysis",
    "compartmentRu": "Щёточная каёмка энтероцита / Цитозоль",
    "compartmentEn": "Intestinal Brush Border / Cytosol",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000005",
    "targetMetaboliteId": "b0000004-0000-0000-0000-000000000001",
    "secondaryTargetId": "b0000002-0000-0000-0000-000000000001",
    "enzymeRu": "Сахараза-изомальтаза",
    "enzymeEn": "Sucrase-isomaltase",
    "enzymeShort": "SI",
    "enzymeShortRu": "Сахараза",
    "ecNumber": "3.2.1.48",
    "gene": "SI",
    "uniprotId": "P14410",
    "isReversible": false,
    "deltaG0": "-29.3 кДж/моль",
    "substrates": [
      {
        "name": "Сахароза",
        "nameEn": "Sucrose",
        "formula": "C₁₂H₂₂O₁₁"
      },
      {
        "name": "Вода (H₂O)",
        "nameEn": "Water (H₂O)",
        "formula": "H₂O",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "D-Фруктоза",
        "nameEn": "D-Fructose",
        "formula": "C₆H₁₂O₆"
      },
      {
        "name": "D-Глюкоза",
        "nameEn": "D-Glucose",
        "formula": "C₆H₁₂O₆"
      }
    ],
    "inhibitorsRu": [
      "Дефицит сахаразы-изомальтазы (врождённая непереносимость сахарозы)"
    ],
    "inhibitorsEn": [
      "Congenital sucrase-isomaltase deficiency (CSID)"
    ],
    "mechanismRu": "Сахаразная субъединица комплекса SI расщепляет α-D-глюкопиранозил-(1↔2)-β-D-фруктофуранозидную связь сахарозы в тонком кишечнике: высвобожденная глюкоза поступает в SGLT1/GLUT2, а фруктоза — в GLUT5 (в печень через воротную вену).",
    "mechanismEn": "The sucrase domain of intestinal SI hydrolyzes sucrose α-(1↔2)-β linkage, feeding liberated D-glucose via SGLT1/GLUT2 and D-fructose via GLUT5 toward hepatic KHK.",
    "energyBalanceRu": "0 АТФ (высокоэкзергонический гидролиз, ΔG°′ = −29.3 кДж/моль)",
    "energyBalanceEn": "0 ATP (highly exergonic disaccharide hydrolysis, ΔG°′ = −29.3 kJ/mol)",
    "netAtpYieldRu": "2 моль гексоз (Глю + Фру) ➔ суммарно +4 АТФ в гликолизе (~62–64 АТФ аэробно)",
    "netAtpYieldEn": "Releases 2 hexoses (Glc + Fru) yielding +4 glycolytic ATP (~62–64 ATP aerobic)",
    "clinicalNoteRu": "В отличие от свободной глюкозы, фруктоза из избытка сахарозы минует PFK-1 в печени; при врождённом дефиците SI (CSID) или непереносимости фруктозы (HFI, дефицит ALDOB) употребление сахарозы противопоказано."
  }
];
