import { BiologicalReaction } from '../../../../core/metabolism/models';

export const GALACTOSE_REACTIONS: BiologicalReaction[] = [
  {
    "id": "d0000003-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_GALK1",
    "nameRu": "Фосфорилирование D-галактозы галактокиназой",
    "nameEn": "Galactokinase C1 phosphorylation of D-galactose",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000002",
    "enzymeRu": "Галактокиназа 1",
    "enzymeEn": "Galactokinase 1",
    "enzymeShort": "GALK1",
    "enzymeShortRu": "Галактокиназа",
    "ecNumber": "2.7.1.6",
    "gene": "GALK1",
    "uniprotId": "P51570",
    "isReversible": false,
    "deltaG0": "-18.0 кДж/моль",
    "substrates": [
      {
        "name": "D-Галактоза",
        "nameEn": "D-Galactose",
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
        "name": "Галактозо-1-фосфат",
        "nameEn": "Galactose 1-phosphate",
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
      "Высокая концентрация Гал-1-Ф",
      "Продуктовое ингибирование АДФ"
    ],
    "inhibitorsEn": [
      "Excess Gal-1-P",
      "Product inhibition by ADP"
    ],
    "mechanismRu": "Необратимый Mg²⁺-зависимый перенос γ-фосфата с АТФ на полуацетальный гидроксил C1 α-D-галактозы. Единственный этап пути Лелуара с затратой АТФ — эквивалент реакции гексокиназы в гликолизе.",
    "mechanismEn": "Irreversible Mg2+-dependent transfer of ATP gamma-phosphate onto C1-OH of alpha-D-galactose. Single ATP investment step in Leloir conversion to G6P.",
    "energyBalanceRu": "Расход: -1 АТФ",
    "energyBalanceEn": "Investment: -1 ATP",
    "netAtpYieldRu": "Итог входа в гликолиз: +2 АТФ нетто (как от глюкозы)",
    "netAtpYieldEn": "Glycolytic net total: +2 net ATP (equivalent to glucose)",
    "clinicalNoteRu": "Дефицит GALK1 вызывает галактоземию II типа: ранняя двусторонняя катаракта у младенцев из-за восстановления избытка галактозы альдозоредуктазой хрусталика в осмотически активный галактитол (дулцитол), без тяжёлого поражения печени."
  },
  {
    "id": "d0000003-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_GALT",
    "nameRu": "Уридилилтрансферазный обмен (Гал-1-Ф + УДФ-Глю ⇄ УДФ-Гал + Г1Ф)",
    "nameEn": "Uridylyltransferase exchange (Gal-1-P + UDP-Glc ⇄ UDP-Gal + G1P)",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000002",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000003",
    "secondarySourceId": "b0000003-0000-0000-0000-000000000005",
    "secondaryTargetId": "b0000003-0000-0000-0000-000000000004",
    "enzymeRu": "Галактозо-1-фосфатуридилтрансфераза",
    "enzymeEn": "Galactose-1-phosphate uridylyltransferase",
    "enzymeShort": "GALT",
    "enzymeShortRu": "ГАЛТ",
    "ecNumber": "2.7.7.12",
    "gene": "GALT",
    "uniprotId": "P07902",
    "isReversible": true,
    "deltaG0": "0.0 кДж/моль",
    "substrates": [
      {
        "name": "Галактозо-1-фосфат",
        "nameEn": "Galactose 1-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      },
      {
        "name": "УДФ-глюкоза",
        "nameEn": "UDP-glucose",
        "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻"
      }
    ],
    "products": [
      {
        "name": "Глюкозо-1-фосфат",
        "nameEn": "Glucose 1-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      },
      {
        "name": "УДФ-галактоза",
        "nameEn": "UDP-galactose",
        "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻"
      }
    ],
    "activatorsRu": [
      "Структурные ионы Zn²⁺ / Fe²⁺"
    ],
    "activatorsEn": [
      "Structural Zn²⁺ / Fe²⁺ cofactors"
    ],
    "inhibitorsRu": [
      "Высокое соотношение Г1Ф / Гал-1-Ф (обратная реакция)"
    ],
    "inhibitorsEn": [
      "High G1P / Gal-1-P ratio"
    ],
    "mechanismRu": "Двухэтапный пинг-понг катализ через ковалентный интермедиат уридил-гистидина (His166): УДФ-глюкоза переносит УМФ-группу на фермент, освобождая глюкозо-1-фосфат, после чего галактозо-1-фосфат акцептирует УМФ с образованием УДФ-галактозы.",
    "mechanismEn": "Ping-pong bi-bi catalysis via covalent His166-UMP enzyme intermediate swapping nucleotide activation from glucose to galactose.",
    "energyBalanceRu": "Обмен УМФ без затраты АТФ (ΔG° ≈ 0)",
    "energyBalanceEn": "ATP-neutral UMP group exchange (ΔG° ≈ 0)",
    "netAtpYieldRu": "Освобождает C6 скелет в виде Г1Ф без расхода УТФ",
    "netAtpYieldEn": "Releases G1P without net UTP consumption",
    "clinicalNoteRu": "Мутации GALT вызывают классическую галактоземию I типа — тяжелейшее неонатальное состояние с желтухой, гепатомегалией, сепсисом E. coli, катарактой и энцефалопатией при накоплении Гал-1-Ф и галактитола."
  },
  {
    "id": "d0000003-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_GALE",
    "nameRu": "C4-эпимеризация УДФ-галактозы в УДФ-глюкозу",
    "nameEn": "UDP-galactose 4-epimerase isomerization to UDP-glucose",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000004",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000005",
    "enzymeRu": "УДФ-глюкоза-4-эпимераза",
    "enzymeEn": "UDP-glucose 4-epimerase",
    "enzymeShort": "GALE",
    "enzymeShortRu": "Эпимераза",
    "ecNumber": "5.1.3.2",
    "gene": "GALE",
    "uniprotId": "Q14376",
    "isReversible": true,
    "deltaG0": "-2.9 кДж/моль",
    "substrates": [
      {
        "name": "УДФ-галактоза",
        "nameEn": "UDP-galactose",
        "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻"
      }
    ],
    "products": [
      {
        "name": "УДФ-глюкоза",
        "nameEn": "UDP-glucose",
        "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻"
      }
    ],
    "activatorsRu": [
      "Прочно связанный простетический кофактор НАД⁺ в активном центре"
    ],
    "activatorsEn": [
      "Tightly enzyme-bound catalytic NAD⁺ cofactor"
    ],
    "inhibitorsRu": [
      "УДФ / УМФ (конкурентное ингибирование)"
    ],
    "inhibitorsEn": [
      "UDP / UMP competitive feedback"
    ],
    "mechanismRu": "Катализатор содержит прочно связанный в активном центре НАД⁺: сначала атом C4-OH галактозы окисляется до симметричного 4-кетопиранозного интермедиата (НАДН остаётся внутри фермента), сахар поворачивается в кармане на 180° и восстанавливается обратно в противоположной конфигурации глюкозы.",
    "mechanismEn": "Uses an internally recycled bound NAD+ cofactor: oxidizes C4-OH to a 4-keto intermediate, rotates the hexose ring inside the pocket, and stereospecifically reduces it to UDP-glucose.",
    "energyBalanceRu": "Внутреннее замыкание цикла УДФ-сахаров (0 АТФ)",
    "energyBalanceEn": "Internal UDP-sugar regeneration (0 ATP)",
    "netAtpYieldRu": "Возвращает УДФ-глюкозу для следующего цикла GALT",
    "netAtpYieldEn": "Replenishes UDP-glucose for continuous GALT turnover",
    "clinicalNoteRu": "Дефицит GALE (галактоземия III типа) нарушает регенерацию УДФ-глюкозы и биосинтез гликопротеинов/гликолипидов. Обратимость реакции позволяет клеткам без поступления галактозы с пищей синтезировать УДФ-галактозу из глюкозы для мембран мозга."
  },
  {
    "id": "d0000003-0000-0000-0000-000000000004",
    "stepNumber": 4,
    "code": "R_PGM1",
    "nameRu": "Взаимопревращение глюкозо-1-фосфата и Г6Ф (вход в гликолиз и синтез глюкозы)",
    "nameEn": "Phosphoglucomutase isomerization of G1P to G6P",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000003",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000002",
    "enzymeRu": "Фосфоглюкомутаза 1",
    "enzymeEn": "Phosphoglucomutase 1",
    "enzymeShort": "PGM1",
    "enzymeShortRu": "Фосфоглюкомутаза",
    "ecNumber": "5.4.2.2",
    "gene": "PGM1",
    "uniprotId": "P36871",
    "isReversible": true,
    "deltaG0": "-7.3 кДж/моль",
    "substrates": [
      {
        "name": "Глюкозо-1-фосфат",
        "nameEn": "Glucose 1-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      }
    ],
    "products": [
      {
        "name": "Глюкозо-6-фосфат",
        "nameEn": "Glucose 6-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      }
    ],
    "activatorsRu": [
      "Ионы Mg²⁺",
      "Глюкозо-1,6-бисфосфат (активатор-кофактор)"
    ],
    "activatorsEn": [
      "Mg²⁺ ions",
      "Glucose 1,6-bisphosphate primer"
    ],
    "inhibitorsRu": [
      "Избыток неорганического фосфата"
    ],
    "inhibitorsEn": [
      "High inorganic phosphate"
    ],
    "mechanismRu": "Фосфорилированный серин (Ser117-P) активного центра отдаёт фосфат в положение C6 субстрата Г1Ф с образованием интермедиата глюкозо-1,6-бисфосфата, затем забирает фосфат с C1, высвобождая готовый Г6Ф — общую точку входа в гликолиз (минус вторая АТФ на PFK-1 ➔ +2 АТФ нетто в цитозоле или ~30–32 АТФ с митохондриями) и печёночный синтез D-глюкозы (Г6Ф ➔ глюкоза через G6PC1).",
    "mechanismEn": "Phospho-Ser117 donates phosphate to C6 forming a glucose-1,6-bisphosphate intermediate and retrieves the C1 phosphate to release G6P, feeding glycolysis (+2 net ATP cytosolic) or hepatic glucose export (G6PC1).",
    "energyBalanceRu": "Изомеризация без АТФ; обход гексокиназы (экономит 1 АТФ от Г1Ф)",
    "energyBalanceEn": "ATP-free isomerization; merges directly at G6P",
    "netAtpYieldRu": "От Галактозы до Пирувата: +2 АТФ нетто (аэробно до ~32 АТФ); либо ➔ Глюкоза (G6PC1)",
    "netAtpYieldEn": "Galactose ➔ Pyruvate yields +2 net ATP (~32 ATP aerobic); or ➔ Blood Glucose (G6PC1)",
    "clinicalNoteRu": "Дефицит PGM1 относится к врождённым нарушениям гликозилирования (PGM1-CDG) и гликогенозу XIV типа с гепатопатией, миопатией и гипогликемией. Ключевой узел превращения галактозы молока в свободную глюкозу крови в печени (совместно с G6PC1)."
  },
  {
    "id": "d0000003-0000-0000-0000-000000000005",
    "stepNumber": 0,
    "code": "R_LCT",
    "nameRu": "Гидролиз лактозы в D-галактозу и D-глюкозу",
    "nameEn": "Lactase hydrolysis of lactose into D-galactose and D-glucose",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Щёточная каёмка энтероцита / Цитозоль",
    "compartmentEn": "Intestinal Brush Border / Cytosol",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000006",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000001",
    "secondaryTargetId": "b0000002-0000-0000-0000-000000000001",
    "enzymeRu": "Лактаза-флоризингидролаза",
    "enzymeEn": "Lactase-phlorizin hydrolase",
    "enzymeShort": "LCT",
    "enzymeShortRu": "Лактаза",
    "ecNumber": "3.2.1.108",
    "gene": "LCT",
    "uniprotId": "P09848",
    "isReversible": false,
    "deltaG0": "-16.0 кДж/моль",
    "substrates": [
      {
        "name": "Лактоза",
        "nameEn": "Lactose",
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
        "name": "D-Галактоза",
        "nameEn": "D-Galactose",
        "formula": "C₆H₁₂O₆"
      },
      {
        "name": "D-Глюкоза",
        "nameEn": "D-Glucose",
        "formula": "C₆H₁₂O₆"
      }
    ],
    "inhibitorsRu": [
      "Возрастное снижение транскрипции гена LCT (лактазная недостаточность взрослых)"
    ],
    "inhibitorsEn": [
      "Adult-type lactase non-persistence (MCM6 regulatory down-regulation)"
    ],
    "mechanismRu": "β-Галактозидаза щёточной каёмки тонкой кишки гидролизует β-(1→4) гликозидную связь лактозы через ковалентный галактозил-ферментный интермедиат с освобождением D-глюкозы и D-галактозы для всасывания через SGLT1/GLUT2.",
    "mechanismEn": "Brush-border β-galactosidase cleaves lactose β-(1→4) linkage via a covalent galactosyl-enzyme intermediate, freeing D-glucose and D-galactose for intestinal absorption.",
    "energyBalanceRu": "0 АТФ (гидролитическое расщепление дисахарида)",
    "energyBalanceEn": "0 ATP (brush-border disaccharide hydrolysis)",
    "netAtpYieldRu": "2 моль гексоз (Гал + Глю) ➔ суммарно +4 АТФ в гликолизе (~62–64 АТФ аэробно)",
    "netAtpYieldEn": "Releases 2 hexoses (Gal + Glc) yielding +4 glycolytic ATP (~62–64 ATP aerobic)",
    "clinicalNoteRu": "Недостаточность лактазы (гиполактазия) приводит к осмотической задержке воды в просвете кишечника и ферментации лактозы микробиотой с метеоризмом, спазмами и диареей."
  }
];
