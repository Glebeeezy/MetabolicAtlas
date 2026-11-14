import { BiologicalReaction } from '../../../../core/metabolism/models';

export const GLYCOLYSIS_REACTIONS: BiologicalReaction[] = [
  {
    "id": "d0000002-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_HK",
    "nameRu": "Фосфорилирование глюкозы гексокиназой",
    "nameEn": "Hexokinase phosphorylation of glucose",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000002",
    "enzymeRu": "Гексокиназа 1 / Глюкокиназа",
    "enzymeEn": "Hexokinase 1 / Glucokinase",
    "enzymeShort": "HK1 / GCK",
    "enzymeShortRu": "Гексокиназа",
    "ecNumber": "2.7.1.1",
    "gene": "HK1, HK2, GCK",
    "uniprotId": "P19367",
    "isReversible": false,
    "deltaG0": "-16.7 кДж/моль",
    "substrates": [
      {
        "name": "D-Глюкоза",
        "nameEn": "D-Glucose",
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
        "name": "Глюкозо-6-фосфат",
        "nameEn": "Glucose 6-phosphate",
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
    "inhibitorsRu": [
      "Глюкозо-6-фосфат (для HK1-3)",
      "АТФ (конкурентно)"
    ],
    "inhibitorsEn": [
      "Glucose 6-phosphate (for HK1-3)",
      "ATP"
    ],
    "mechanismRu": "Перенос γ-фосфатной группы АТФ на гидроксил 6-го углерода глюкозы с образованием отрицательно заряженного эфира, захватывающего глюкозу внутри клетки.",
    "mechanismEn": "Transfer of gamma-phosphate group from Mg-ATP complex to C6 hydroxyl of glucose.",
    "energyBalanceRu": "Расход: -1 АТФ (инвестиция)",
    "energyBalanceEn": "Cost: -1 ATP (investment)",
    "netAtpYieldRu": "Баланс: -1 АТФ (фаза затрат)",
    "netAtpYieldEn": "Cumulative: -1 ATP (investment phase)",
    "clinicalNoteRu": "Мутации в гене глюкокиназы (GCK) вызывают MODY2 диабет; повышенная экспрессия HK2 характерна для злокачественных опухолей (эффект Варбурга)."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_GPI",
    "nameRu": "Изомеризация глюкозо-6-фосфата во фруктозо-6-фосфат",
    "nameEn": "Phosphoglucose isomerase conversion of G6P to F6P",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000002",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000003",
    "enzymeRu": "Глюкозо-6-фосфатизомераза",
    "enzymeEn": "Glucose-6-phosphate isomerase",
    "enzymeShort": "GPI",
    "enzymeShortRu": "Г6Ф-изомераза",
    "ecNumber": "5.3.1.9",
    "gene": "GPI",
    "uniprotId": "P06744",
    "isReversible": true,
    "deltaG0": "+1.7 кДж/моль",
    "substrates": [
      {
        "name": "Глюкозо-6-фосфат",
        "nameEn": "Glucose 6-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      }
    ],
    "products": [
      {
        "name": "Фруктозо-6-фосфат",
        "nameEn": "Fructose 6-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      }
    ],
    "mechanismRu": "Обратимая альдо-кето изомеризация через ендиольный интермедиат с раскрытием пиранозного кольца и замыканием пятичленного фуранозного цикла.",
    "mechanismEn": "Reversible isomerization of aldohexose to ketohexose via cis-enediolate intermediate.",
    "energyBalanceRu": "Энергонейтрально (изомеризация)",
    "energyBalanceEn": "Isoenergetic (isomerization)",
    "netAtpYieldRu": "Баланс: -1 АТФ",
    "netAtpYieldEn": "Cumulative: -1 ATP",
    "clinicalNoteRu": "Дефицит GPI — редкая причина наследственной несефероцитарной гемолитической анемии (2-е место среди гликолитических энзимопатий)."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_PFK1",
    "nameRu": "Фосфорилирование фруктозо-6-фосфата (PFK-1)",
    "nameEn": "Phosphofructokinase-1 phosphorylation of F6P",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000003",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000004",
    "enzymeRu": "Фосфофруктокиназа-1",
    "enzymeEn": "Phosphofructokinase-1",
    "enzymeShort": "PFK-1",
    "enzymeShortRu": "ФФК-1",
    "ecNumber": "2.7.1.11",
    "gene": "PFKM, PFKL, PFKP",
    "uniprotId": "P08237",
    "isReversible": false,
    "deltaG0": "-14.2 кДж/моль",
    "substrates": [
      {
        "name": "Фруктозо-6-фосфат",
        "nameEn": "Fructose 6-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
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
        "name": "Фруктозо-1,6-бисфосфат",
        "nameEn": "Fructose 1,6-bisphosphate",
        "formula": "C₆H₁₀O₁₂P₂⁴⁻"
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
      "Фруктозо-2,6-бисфосфат (самый мощный)",
      "АМФ",
      "АДФ"
    ],
    "activatorsEn": [
      "Fructose 2,6-bisphosphate",
      "AMP",
      "ADP"
    ],
    "inhibitorsRu": [
      "АТФ (аллостерический ингибитор)",
      "Цитрат (сигнал ЦТК)",
      "Ионы H⁺ / Лактат"
    ],
    "inhibitorsEn": [
      "ATP (allosteric)",
      "Citrate",
      "Protons (H⁺) / Acidosis"
    ],
    "mechanismRu": "Главный пейсмейкерный шлюз гликолиза. Необратимое фосфорилирование C1 гидроксила фруктозо-6-фосфата с затратой второй молекулы АТФ.",
    "mechanismEn": "Rate-limiting commitment step of glycolysis. Strongly allosterically activated by F2,6BP and AMP, inhibited by high ATP and citrate.",
    "energyBalanceRu": "Расход: -1 АТФ (вторая инвестиция)",
    "energyBalanceEn": "Cost: -1 ATP (second investment)",
    "netAtpYieldRu": "Баланс: -2 АТФ (конец фазы инвестиций)",
    "netAtpYieldEn": "Cumulative: -2 ATP (investment phase end)",
    "clinicalNoteRu": "Болезнь Таруи (гликогеноз VII типа) — дефицит PFKM в мышцах, приводящий к миопатии и непереносимости физических нагрузок."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000004",
    "stepNumber": 4,
    "code": "R_ALDO",
    "nameRu": "Альдолазное расщепление на две триозы (ГАФ и ДАФ)",
    "nameEn": "Aldolase cleavage of F1,6BP into GAP and DHAP",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000004",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000006",
    "secondaryTargetId": "b0000002-0000-0000-0000-000000000005",
    "enzymeRu": "Фруктозобисфосфатальдолаза",
    "enzymeEn": "Fructose-bisphosphate aldolase",
    "enzymeShort": "ALDOA",
    "enzymeShortRu": "АЛДО-A",
    "ecNumber": "4.1.2.13",
    "gene": "ALDOA, ALDOB, ALDOC",
    "uniprotId": "P04075",
    "isReversible": true,
    "deltaG0": "+23.8 кДж/моль",
    "substrates": [
      {
        "name": "Фруктозо-1,6-бисфосфат",
        "nameEn": "Fructose 1,6-bisphosphate",
        "formula": "C₆H₁₀O₁₂P₂⁴⁻"
      }
    ],
    "products": [
      {
        "name": "Глицеральдегид-3-фосфат",
        "nameEn": "Glyceraldehyde 3-phosphate",
        "formula": "C₃H₅O₆P²⁻"
      },
      {
        "name": "Дигидроксиацетонфосфат",
        "nameEn": "Dihydroxyacetone phosphate",
        "formula": "C₃H₅O₆P²⁻"
      }
    ],
    "mechanismRu": "Обратимый ретроальдольный распад гексозобисфосфата через образование основания Шиффа между лизином фермента и карбонилом C2 субстрата.",
    "mechanismEn": "Class I aldolase mechanism forming a covalent Schiff base intermediate with active site lysine residue.",
    "energyBalanceRu": "Расщепление C₆ ➔ 2×C₃",
    "energyBalanceEn": "Cleavage C₆ ➔ 2×C₃",
    "netAtpYieldRu": "Баланс: -2 АТФ (удвоение последующего потока)",
    "netAtpYieldEn": "Cumulative: -2 ATP (subsequent flux doubled)",
    "clinicalNoteRu": "Мутации ALDOB в печени вызывают наследственную непереносимость фруктозы (HFI) с накоплением фруктозо-1-фосфата и гипогликемией."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000005",
    "stepNumber": 5,
    "code": "R_TPI",
    "nameRu": "Изомеризация дигидроксиацетонфосфата в ГАФ",
    "nameEn": "Triosephosphate isomerase conversion of DHAP to GAP",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000005",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000006",
    "enzymeRu": "Триозофосфатизомераза",
    "enzymeEn": "Triosephosphate isomerase",
    "enzymeShort": "TPI1",
    "enzymeShortRu": "ТПИ-1",
    "ecNumber": "5.3.1.1",
    "gene": "TPI1",
    "uniprotId": "P60174",
    "isReversible": true,
    "deltaG0": "+7.5 кДж/моль",
    "substrates": [
      {
        "name": "Дигидроксиацетонфосфат",
        "nameEn": "Dihydroxyacetone phosphate",
        "formula": "C₃H₅O₆P²⁻"
      }
    ],
    "products": [
      {
        "name": "Глицеральдегид-3-фосфат",
        "nameEn": "Glyceraldehyde 3-phosphate",
        "formula": "C₃H₅O₆P²⁻"
      }
    ],
    "mechanismRu": "«Каталитически совершенный» фермент, скорость которого ограничена лишь диффузией субстрата. Переносит протон через стереоспецифичный ендиолатный интермедиат.",
    "mechanismEn": "Diffusion-limited \"kinetically perfect\" enzyme converting DHAP to GAP with diffusion-controlled kcat/Km.",
    "energyBalanceRu": "Конверсия ДАФ ➔ ГАФ",
    "energyBalanceEn": "Conversion DHAP ➔ GAP",
    "netAtpYieldRu": "Баланс: -2 АТФ (обе триозы готовы к фазе отдачи)",
    "netAtpYieldEn": "Cumulative: -2 ATP (both trioses enter payoff phase)",
    "clinicalNoteRu": "Дефицит TPI1 — тяжелейшая гликолитическая энзимопатия с летальным исходом в детстве из-за прогрессирующей нейродегенерации и гемолиза."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000006",
    "stepNumber": 6,
    "code": "R_GAPDH",
    "nameRu": "Окисление ГАФ с генерацией НАДН (GAPDH)",
    "nameEn": "GAPDH oxidation and phosphorylation to 1,3-BPG",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000006",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000007",
    "enzymeRu": "Глицеральдегид-3-фосфатдегидрогеназа",
    "enzymeEn": "Glyceraldehyde-3-phosphate dehydrogenase",
    "enzymeShort": "GAPDH",
    "enzymeShortRu": "ГАФД",
    "ecNumber": "1.2.1.12",
    "gene": "GAPDH",
    "uniprotId": "P04406",
    "isReversible": true,
    "deltaG0": "+6.3 кДж/моль",
    "substrates": [
      {
        "name": "Глицеральдегид-3-фосфат",
        "nameEn": "Glyceraldehyde 3-phosphate",
        "formula": "C₃H₅O₆P²⁻"
      },
      {
        "name": "Неорганический фосфат (Фᵢ)",
        "nameEn": "Inorganic phosphate",
        "formula": "HPO₄²⁻",
        "isCo": true
      },
      {
        "name": "НАД⁺",
        "nameEn": "NAD⁺",
        "formula": "C₂₁H₂₆N₇O₁₄P₂⁺",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "1,3-Бисфосфоглицерат",
        "nameEn": "1,3-Bisphosphoglycerate",
        "formula": "C₃H₄O₁₀P₂⁴⁻"
      },
      {
        "name": "НАДН",
        "nameEn": "NADH",
        "formula": "C₂₁H₂₇N₇O₁₄P₂²⁻",
        "isCo": true
      },
      {
        "name": "Протон (H⁺)",
        "nameEn": "Proton (H⁺)",
        "formula": "H⁺",
        "isCo": true
      }
    ],
    "inhibitorsRu": [
      "Йодацетат (алкилирует Cys152)",
      "Мышьяк / Арсенат (разобщает фосфорилирование)"
    ],
    "inhibitorsEn": [
      "Iodoacetate",
      "Arsenate"
    ],
    "mechanismRu": "Окислительно-восстановительная реакция с образованием ковалентного тиополуацетального интермедиата с Cys152 активного центра и последующим фосфоролизом неорганическим фосфатом.",
    "mechanismEn": "Coupled oxidation of aldehyde to acyl-enzyme thioester with NAD+ reduction, followed by phosphorolysis to acyl-phosphate.",
    "energyBalanceRu": "Выход: +2 НАДН на молекулу глюкозы",
    "energyBalanceEn": "Yield: +2 NADH per glucose",
    "netAtpYieldRu": "Дыхательный потенциал: +3...5 АТФ в ДЦ (аэробно)",
    "netAtpYieldEn": "Respiratory potential: +3...5 ATP via ETC (aerobic)",
    "clinicalNoteRu": "Арсенат заменяет неорганический фосфат, образуя нестабильный 1-арсено-3-фосфоглицерат, который гидролизуется в обход синтеза АТФ (токсичность мышьяка)."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000007",
    "stepNumber": 7,
    "code": "R_PGK",
    "nameRu": "Субстратное фосфорилирование АТФ (PGK1)",
    "nameEn": "Phosphoglycerate kinase substrate-level ATP generation",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000007",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000008",
    "enzymeRu": "Фосфоглицераткиназа 1",
    "enzymeEn": "Phosphoglycerate kinase 1",
    "enzymeShort": "PGK1",
    "enzymeShortRu": "ФГК-1",
    "ecNumber": "2.7.2.3",
    "gene": "PGK1",
    "uniprotId": "P00558",
    "isReversible": true,
    "deltaG0": "-18.5 кДж/моль",
    "substrates": [
      {
        "name": "1,3-Бисфосфоглицерат",
        "nameEn": "1,3-Bisphosphoglycerate",
        "formula": "C₃H₄O₁₀P₂⁴⁻"
      },
      {
        "name": "Аденозиндифосфат",
        "nameEn": "ADP",
        "formula": "C₁₀H₁₂N₅O₁₀P₂³⁻",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "3-Фосфоглицерат",
        "nameEn": "3-Phosphoglycerate",
        "formula": "C₃H₄O₇P³⁻"
      },
      {
        "name": "Аденозинтрифосфат",
        "nameEn": "ATP",
        "formula": "C₁₀H₁₂N₅O₁₃P₃⁴⁻",
        "isCo": true
      }
    ],
    "mechanismRu": "Первая стадия гликолиза, окупающая затраты энергии. Перенос высокоэнергетического 1-ацилфосфата с 1,3-БФГ на АДФ с генерацией 2 молекул АТФ на глюкозу.",
    "mechanismEn": "First substrate-level phosphorylation reaction compensating for preparatory phase ATP consumption.",
    "energyBalanceRu": "Выход: +2 АТФ субстратно (2 триозы)",
    "energyBalanceEn": "Yield: +2 ATP substrate-level (2 trioses)",
    "netAtpYieldRu": "Баланс: 0 АТФ (точка безубыточности / возврат инвестиций)",
    "netAtpYieldEn": "Cumulative: 0 ATP (break-even point reached)",
    "clinicalNoteRu": "Дефицит сцепленной с X-хромосомой PGK1 проявляется гемолитической анемией и миопатией с рабдомиолизом при нагрузках."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000008",
    "stepNumber": 8,
    "code": "R_PGAM",
    "nameRu": "Изомеризация 3-PG в 2-PG (мутазная реакция)",
    "nameEn": "Phosphoglycerate mutase conversion of 3-PG to 2-PG",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000008",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000009",
    "enzymeRu": "Фосфоглицератмутаза 1",
    "enzymeEn": "Phosphoglycerate mutase 1",
    "enzymeShort": "PGAM1",
    "enzymeShortRu": "ФГ-мутаза",
    "ecNumber": "5.4.2.11",
    "gene": "PGAM1, PGAM2",
    "uniprotId": "P18669",
    "isReversible": true,
    "deltaG0": "+4.4 кДж/моль",
    "substrates": [
      {
        "name": "3-Фосфоглицерат",
        "nameEn": "3-Phosphoglycerate",
        "formula": "C₃H₄O₇P³⁻"
      }
    ],
    "products": [
      {
        "name": "2-Фосфоглицерат",
        "nameEn": "2-Phosphoglycerate",
        "formula": "C₃H₄O₇P³⁻"
      }
    ],
    "mechanismRu": "Внутримолекулярный перенос фосфата с C3 на C2 через 2,3-бисфосфоглицератный (2,3-БФГ) интермедиат с фосфорилированным остатком гистидина фермента.",
    "mechanismEn": "Histidine-dependent mutase mechanism via transient 2,3-bisphosphoglycerate enzyme-bound intermediate.",
    "energyBalanceRu": "Изомеризация 3-PG ➔ 2-PG",
    "energyBalanceEn": "Isomerization 3-PG ➔ 2-PG",
    "netAtpYieldRu": "Баланс: 0 АТФ",
    "netAtpYieldEn": "Cumulative: 0 ATP",
    "clinicalNoteRu": "Гликогеноз X типа — дефицит мышечной PGAM2 с непереносимостью физической активности и спазмами."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000009",
    "stepNumber": 9,
    "code": "R_ENO",
    "nameRu": "Дегидратация 2-PG енолазой с образованием ФЕП",
    "nameEn": "Enolase dehydration of 2-PG to phosphoenolpyruvate",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000009",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000010",
    "enzymeRu": "Енолаза",
    "enzymeEn": "Enolase (Phosphopyruvate hydratase)",
    "enzymeShort": "ENO1",
    "enzymeShortRu": "Енолаза",
    "ecNumber": "4.2.1.11",
    "gene": "ENO1, ENO2, ENO3",
    "uniprotId": "P06733",
    "isReversible": true,
    "deltaG0": "+7.5 кДж/моль",
    "substrates": [
      {
        "name": "2-Фосфоглицерат",
        "nameEn": "2-Phosphoglycerate",
        "formula": "C₃H₄O₇P³⁻"
      }
    ],
    "products": [
      {
        "name": "Фосфоенолпируват",
        "nameEn": "Phosphoenolpyruvate",
        "formula": "C₃H₂O₆P³⁻"
      },
      {
        "name": "Вода (H₂O)",
        "nameEn": "Water (H₂O)",
        "formula": "H₂O",
        "isCo": true
      }
    ],
    "inhibitorsRu": [
      "Фторид-ионы (F⁻ в присутствии фосфата и Mg²⁺)"
    ],
    "inhibitorsEn": [
      "Fluoride ion (complex with Mg2+ and phosphate)"
    ],
    "mechanismRu": "Элиминирование молекулы воды с образованием нестабильного енольного эфира, фиксирующего высокую энергию гидролиза фосфатной связи.",
    "mechanismEn": "Elimination of H2O creating high-energy enol-phosphate bond trapped in the enol tautomer.",
    "energyBalanceRu": "Синтез макроэрга ФЕП (-2 H₂O)",
    "energyBalanceEn": "Synthesis of high-energy PEP (-2 H₂O)",
    "netAtpYieldRu": "Баланс: 0 АТФ (накопление свободной энергии)",
    "netAtpYieldEn": "Cumulative: 0 ATP (free energy trapped in PEP)",
    "clinicalNoteRu": "Фторид натрия добавляется в клинические пробирки для забора крови на сахар для ингибирования енолазы и остановки спонтанного гликолиза in vitro."
  },
  {
    "id": "d0000002-0000-0000-0000-000000000010",
    "stepNumber": 10,
    "code": "R_PK",
    "nameRu": "Синтез пирувата пируваткиназой (PKM)",
    "nameEn": "Pyruvate kinase conversion of PEP to pyruvate with ATP yield",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000010",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000011",
    "enzymeRu": "Пируваткиназа M1/M2 / L/R",
    "enzymeEn": "Pyruvate kinase",
    "enzymeShort": "PKM / PKLR",
    "enzymeShortRu": "Пируваткиназа",
    "ecNumber": "2.7.1.40",
    "gene": "PKM, PKLR",
    "uniprotId": "P14618",
    "isReversible": false,
    "deltaG0": "-31.4 кДж/моль",
    "substrates": [
      {
        "name": "Фосфоенолпируват",
        "nameEn": "Phosphoenolpyruvate",
        "formula": "C₃H₂O₆P³⁻"
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
    "products": [
      {
        "name": "Пируват (Цитозоль)",
        "nameEn": "Pyruvate (Cytosolic)",
        "formula": "C₃H₃O₃⁻"
      },
      {
        "name": "Аденозинтрифосфат",
        "nameEn": "ATP",
        "formula": "C₁₀H₁₂N₅O₁₃P₃⁴⁻",
        "isCo": true
      }
    ],
    "activatorsRu": [
      "Фруктозо-1,6-бисфосфат (feedforward активация)"
    ],
    "activatorsEn": [
      "Fructose 1,6-bisphosphate (feedforward)"
    ],
    "inhibitorsRu": [
      "АТФ (аллостерический)",
      "Ацетил-КоА",
      "L-Аланин"
    ],
    "inhibitorsEn": [
      "ATP",
      "Acetyl-CoA",
      "L-Alanine"
    ],
    "mechanismRu": "Сильно экзергоническая реакция переноса фосфата с енолфосфата на АДФ. Необратимость обеспечивается мгновенной спонтанной кетоенольной таутомеризацией енолпирувата в устойчивую кетоформу.",
    "mechanismEn": "Substrate-level phosphorylation driven by extremely favorable tautomerization of enolpyruvate into ketopyruvate.",
    "energyBalanceRu": "Выход: +2 АТФ субстратно (2 триозы)",
    "energyBalanceEn": "Yield: +2 ATP substrate-level (2 trioses)",
    "netAtpYieldRu": "ЧИСТАЯ ПРИБЫЛЬ: +2 АТФ (чистый анаэробный итог гликолиза)",
    "netAtpYieldEn": "NET PROFIT: +2 ATP (net anaerobic glycolytic yield)",
    "clinicalNoteRu": "Дефицит эритроцитарной PKLR — самая частая причина наследственной гемолитической анемии, вызванной ферментопатиями гликолиза."
  }
];
