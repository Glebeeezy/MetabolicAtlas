import { BiologicalReaction } from '../../../../core/metabolism/models';

export const GLYCOGEN_REACTIONS: BiologicalReaction[] = [
  {
    "id": "d0000005-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_UGP2",
    "nameRu": "Активация глюкозо-1-фосфата в УДФ-глюкозу",
    "nameEn": "UDP-glucose pyrophosphorylase activation of G1P",
    "pathwayCode": "PW-GLYCOGEN",
    "pathwayNameRu": "Метаболизм гликогена",
    "pathwayNameEn": "Glycogen Metabolism",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000003",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000005",
    "enzymeRu": "УДФ-глюкоза-пирофосфорилаза 2",
    "enzymeEn": "UDP-glucose pyrophosphorylase 2",
    "enzymeShort": "UGP2",
    "enzymeShortRu": "УДФГ-пироф.",
    "ecNumber": "2.7.7.9",
    "gene": "UGP2",
    "uniprotId": "Q16851",
    "isReversible": false,
    "deltaG0": "~0 кДж/моль (в клетке необратима из-за гидролиза ФФᵢ)",
    "substrates": [
      {
        "name": "Глюкозо-1-фосфат",
        "nameEn": "Glucose 1-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      },
      {
        "name": "Уридинтрифосфат (УТФ)",
        "nameEn": "Uridine triphosphate (UTP)",
        "formula": "C₉H₁₁N₂O₁₅P₃⁴⁻",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "УДФ-глюкоза",
        "nameEn": "UDP-glucose",
        "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻"
      },
      {
        "name": "Пирофосфат (ФФᵢ)",
        "nameEn": "Pyrophosphate (PPᵢ)",
        "formula": "P₂O₇⁴⁻",
        "isCo": true
      }
    ],
    "activatorsRu": [
      "Ионы Mg²⁺",
      "Быстрый гидролиз ФФᵢ неорганической пирофосфатазой (PPA1)"
    ],
    "activatorsEn": [
      "Mg²⁺ ions",
      "Rapid PPᵢ hydrolysis by inorganic pyrophosphatase PPA1"
    ],
    "inhibitorsRu": [
      "Избыток УДФ-глюкозы (торможение по типу продукта in vitro)"
    ],
    "inhibitorsEn": [
      "High UDP-glucose concentration (in vitro product inhibition)"
    ],
    "mechanismRu": "Кислород фосфатной группы при C1 глюкозо-1-фосфата нуклеофильно атакует α-фосфат УТФ, образуя УДФ-глюкозу и пирофосфат (ФФᵢ). Немедленный гидролиз ФФᵢ пирофосфатазой (PPA1 ➔ 2 Фᵢ, −19 кДж/моль) делает активацию практически необратимой in vivo.",
    "mechanismEn": "Nucleophilic attack by the C1-phosphate oxygen of G1P on the α-phosphate of UTP yields UDP-glucose and PPᵢ; immediate PPᵢ cleavage by PPA1 drives activation irreversibly forward in vivo.",
    "energyBalanceRu": "Расход 1 высокоэнергетической связи УТФ (экв. 1 АТФ; далее УДФ + АТФ ➔ УТФ)",
    "energyBalanceEn": "Consumes 1 UTP high-energy bond (~1 ATP eq; UDP + ATP regenerates UTP)",
    "netAtpYieldRu": "Подготовка донора для удлинения гликогена (0 прямого АТФ; чистая цена хранения ~2 АТФ от глюкозы)",
    "netAtpYieldEn": "Activates glucosyl donor for glycogen synthase (~2 ATP net storage cost from free glucose)",
    "clinicalNoteRu": "Общий биосинтетический шаг не только для гликогена, но и для синтеза гликопротеинов, протеогликанов и лактозы; редкие биаллельные мутации UGP2 вызывают тяжёлую эпилептическую энцефалопатию развития."
  },
  {
    "id": "d0000005-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_GYS",
    "nameRu": "Синтез и ветвление гранул гликогена",
    "nameEn": "Glycogen synthase elongation and branching",
    "pathwayCode": "PW-GLYCOGEN",
    "pathwayNameRu": "Метаболизм гликогена",
    "pathwayNameEn": "Glycogen Metabolism",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000005",
    "targetMetaboliteId": "b0000005-0000-0000-0000-000000000001",
    "enzymeRu": "Гликогенсинтаза 1/2 и ветвящий фермент (GYS1/2 + GBE1)",
    "enzymeEn": "Glycogen synthase & branching enzyme (GYS1/2 + GBE1)",
    "enzymeShort": "GYS1/2 + GBE1",
    "enzymeShortRu": "Гликогенсинтаза",
    "ecNumber": "2.4.1.11 / 2.4.1.18",
    "gene": "GYS1 / GYS2 / GBE1",
    "uniprotId": "P13807",
    "isReversible": false,
    "deltaG0": "-13.4 кДж/моль",
    "substrates": [
      {
        "name": "УДФ-глюкоза",
        "nameEn": "UDP-glucose",
        "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻"
      }
    ],
    "products": [
      {
        "name": "Гликоген",
        "nameEn": "Glycogen",
        "formula": "(C₆H₁₀O₅)ₙ"
      },
      {
        "name": "Уридиндифосфат (УДФ)",
        "nameEn": "Uridine diphosphate (UDP)",
        "formula": "C₉H₁₁N₂O₁₂P₂³⁻",
        "isCo": true
      }
    ],
    "activatorsRu": [
      "Глюкозо-6-фосфат (мощный аллостерический активатор b-формы)",
      "Инсулин ➔ протеинфосфатаза 1 (PP1, дефосфорилирование в активную a-форму)"
    ],
    "activatorsEn": [
      "Glucose 6-phosphate (potent allosteric activator of b-form)",
      "Insulin signaling ➔ PP1 dephosphorylation to active GYS-a form"
    ],
    "inhibitorsRu": [
      "Глюкагон и адреналин (цАМФ ➔ ПКА фосфорилирует GYS в неактивную b-форму)",
      "Киназа GSK-3 и Са²⁺/кальмодулин-зависимые киназы (реципрокно с PYG)"
    ],
    "inhibitorsEn": [
      "Glucagon & Epinephrine (cAMP/PKA phosphorylation into inactive b-form)",
      "GSK-3 phosphorylation (reciprocal regulation opposing PYG)"
    ],
    "mechanismRu": "После затравки гликогенином гликогенсинтаза переносит глюкозильный остаток с УДФ-глюкозы на нередуцирующий C4-OH конец цепи (образуя α-1→4 связь с выходом УДФ). Когда цепь достигает ~11 остатков, ветвящий фермент (GBE1) переносит фрагмент из 7 остатков на C6-OH группу, формируя α-1→6 ветвь.",
    "mechanismEn": "After glycogenin priming, GYS transfers glucose from UDP-glucose onto non-reducing C4-OH chain ends (α-1→4 bonds, releasing UDP); GBE1 transfers 7-residue blocks to C6-OH hydroxyls creating α-1→6 branches.",
    "energyBalanceRu": "Экзергонический перенос (ΔG°′ = −13.4 кДж/моль), освобождает УДФ",
    "energyBalanceEn": "Exergonic glycosyl transfer (ΔG°′ = −13.4 kJ/mol), releases UDP",
    "netAtpYieldRu": "Суммарно на включение 1 глюкозы в гликоген: −2 АТФ эквивалента (1 АТФ на ГК + 1 АТФ на регенерацию УДФ➔УТФ)",
    "netAtpYieldEn": "Total storage investment: 2 ATP eq per glucose stored (HK + UDP→UTP regeneration)",
    "clinicalNoteRu": "Дефицит печёночной гликогенсинтазы (GYS2) вызывает гликогеноз 0 типа с постпрандиальной гипергликемией и тощаковой гипокетотической гипогликемией; дефицит ветвящего фермента GBE1 вызывает болезнь Андерсена (гликогеноз IV типа)."
  },
  {
    "id": "d0000005-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_PYG",
    "nameRu": "Фосфоролитическое расщепление гликогена (гликогенолиз)",
    "nameEn": "Glycogen phosphorylase and debranching phosphorolysis",
    "pathwayCode": "PW-GLYCOGEN",
    "pathwayNameRu": "Метаболизм гликогена",
    "pathwayNameEn": "Glycogen Metabolism",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "sourceMetaboliteId": "b0000005-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000003",
    "enzymeRu": "Гликогенфосфорилаза и деветвящий фермент (PYGL/PYGM + AGL)",
    "enzymeEn": "Glycogen phosphorylase & debranching enzyme (PYGL/M + AGL)",
    "enzymeShort": "PYGL/M + AGL",
    "enzymeShortRu": "Гликогенфосфор.",
    "ecNumber": "2.4.1.1 / 3.2.1.33",
    "gene": "PYGL / PYGM / AGL",
    "uniprotId": "P06737",
    "isReversible": false,
    "deltaG0": "-6.0 кДж/моль (при избытке цитозольного Фᵢ)",
    "substrates": [
      {
        "name": "Гликоген",
        "nameEn": "Glycogen",
        "formula": "(C₆H₁₀O₅)ₙ"
      },
      {
        "name": "Неорганический фосфат (Фᵢ)",
        "nameEn": "Inorganic phosphate (Pᵢ)",
        "formula": "HPO₄²⁻",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "Глюкозо-1-фосфат",
        "nameEn": "Glucose 1-phosphate",
        "formula": "C₆H₁₁O₉P²⁻"
      }
    ],
    "activatorsRu": [
      "Глюкагон и адреналин (цАМФ ➔ киназа фосфорилазы переводит b ➔ активную a-форму)",
      "АМФ (аллостерическая активация мышечной PYGM-b) и ионы Ca²⁺ при сокращении мышц"
    ],
    "activatorsEn": [
      "Glucagon & Epinephrine (cAMP ➔ phosphorylase kinase activates PYG-b ➔ PYG-a)",
      "AMP (allosteric activation of muscle PYGM-b) and Ca²⁺ during contraction"
    ],
    "inhibitorsRu": [
      "Инсулин (через PP1 дефосфорилирует PYG-a в неактивную b-форму)",
      "АТФ и глюкозо-6-фосфат (аллостерическое торможение T-состояния); свободная глюкоза в печени"
    ],
    "inhibitorsEn": [
      "Insulin (via PP1 dephosphorylation to inactive b-form)",
      "ATP & G6P (stabilize inactive T-state); free glucose in hepatocytes"
    ],
    "mechanismRu": "Гликогенфосфорилаза (кофактор пиридоксальфосфат — витамин B₆) разрывает α-1→4 связи с помощью неорганического ортофосфата (Фᵢ) без затраты АТФ, выпуская Г1Ф (который PGM1 переводит в Г6Ф). За 4 остатка до ветви деветвящий фермент AGL переносит триозу и отщепляет точку ветвления α-1→6 в виде свободной глюкозы (~8–10%).",
    "mechanismEn": "PLP-dependent glycogen phosphorylase uses inorganic phosphate (Pᵢ) to cleave α-1→4 linkages into G1P at zero ATP cost (before PGM1 isomerizes G1P to G6P); AGL resolves α-1→6 branch points.",
    "energyBalanceRu": "Фосфоролиз экономит 1 АТФ (Г1Ф ➔ Г6Ф минует гексокиназу!)",
    "energyBalanceEn": "Phosphorolysis saves 1 ATP (G1P ➔ G6P bypasses hexokinase!)",
    "netAtpYieldRu": "В гликолизе из гликогена: +3 АТФ нетто (вместо +2 от свободной глюкозы)",
    "netAtpYieldEn": "Glycolysis from glycogen yields +3 net ATP (vs +2 from free glucose)",
    "clinicalNoteRu": "Дефицит мышечной PYGM вызывает болезнь Мак-Ардла (гликогеноз V типа: непереносимость нагрузок, миоглобинурия, «второе дыхание»); дефицит печёночной PYGL — болезнь Херса (GSD VI); дефицит AGL — болезнь Кори (GSD III)."
  }
];
