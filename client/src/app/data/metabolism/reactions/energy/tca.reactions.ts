import { BiologicalReaction } from '../../../../core/metabolism/models';

export const TCA_REACTIONS: BiologicalReaction[] = [
  {
    "id": "d0000001-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_CS",
    "nameRu": "Конденсация оксалоацетата и ацетил-КоА",
    "nameEn": "Citrate synthase condensation",
    "pathwayCode": "PW-TCA-CYCLE",
    "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
    "pathwayNameEn": "Citric Acid Cycle (TCA)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000003",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000004",
    "secondarySourceId": "b0000001-0000-0000-0000-000000000002",
    "enzymeRu": "Цитратсинтаза",
    "enzymeEn": "Citrate synthase",
    "enzymeShort": "CS",
    "enzymeShortRu": "ЦС",
    "ecNumber": "2.3.3.1",
    "gene": "CS",
    "uniprotId": "O75390",
    "isReversible": false,
    "deltaG0": "-31.5 кДж/моль",
    "substrates": [
      {
        "name": "Оксалоацетат",
        "nameEn": "Oxaloacetate",
        "formula": "C₄H₂O₅²⁻"
      },
      {
        "name": "Ацетил-КоА",
        "nameEn": "Acetyl-CoA",
        "formula": "C₂₃H₃₄N₇O₁₇P₃S⁴⁻",
        "isCo": true
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
        "name": "Цитрат",
        "nameEn": "Citrate",
        "formula": "C₆H₅O₇³⁻"
      },
      {
        "name": "Кофермент A (КоА-SH)",
        "nameEn": "Coenzyme A (CoA-SH)",
        "formula": "C₂₁H₃₆N₇O₁₆P₃S",
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
      "АТФ",
      "НАДН",
      "Сукцинил-КоА",
      "Цитрат"
    ],
    "inhibitorsEn": [
      "ATP",
      "NADH",
      "Succinyl-CoA",
      "Citrate"
    ],
    "mechanismRu": "Конденсация метильной группы ацетил-КоА с карбонильным углеродом оксалоацетата с образованием цитрил-КоА, гидролиз которого высвобождает энергию тиоэфирной связи.",
    "mechanismEn": "Condensation of acetyl-CoA methyl carbon with oxaloacetate carbonyl carbon to form citryl-CoA, followed by thioester hydrolysis driving the reaction forward.",
    "energyBalanceRu": "0 АТФ (конденсация)",
    "energyBalanceEn": "0 ATP (condensation)",
    "netAtpYieldRu": "+7 АТФ (с учетом гликолиза и ПДХ)",
    "netAtpYieldEn": "+7 ATP (cumulative with glycolysis and PDH)",
    "clinicalNoteRu": "Начальная стадия цикла; сильно экзергоническая реакция, делающая процесс необратимым in vivo.",
    "clinicalNoteEn": "Initial committed step; strongly exergonic reaction driving cycle unidirectionality in vivo."
  },
  {
    "id": "d0000001-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_ACO",
    "nameRu": "Изомеризация цитрата в изоцитрат",
    "nameEn": "Aconitate hydratase isomerization",
    "pathwayCode": "PW-TCA-CYCLE",
    "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
    "pathwayNameEn": "Citric Acid Cycle (TCA)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000004",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000005",
    "enzymeRu": "Аконитаза 2 (митохондриальная)",
    "enzymeEn": "Aconitate hydratase 2",
    "enzymeShort": "ACO2",
    "enzymeShortRu": "Аконитаза",
    "ecNumber": "4.2.1.3",
    "gene": "ACO2",
    "uniprotId": "Q99798",
    "isReversible": true,
    "deltaG0": "+5.0 кДж/моль",
    "substrates": [
      {
        "name": "Цитрат",
        "nameEn": "Citrate",
        "formula": "C₆H₅O₇³⁻"
      }
    ],
    "products": [
      {
        "name": "Изоцитрат",
        "nameEn": "Isocitrate",
        "formula": "C₆H₅O₇³⁻"
      }
    ],
    "mechanismRu": "Стереоспецифическая дегидратация цитрата до промежуточного цис-аконитата, за которой следует гидратация с образованием изоцитрата при участии железосерного кластера [4Fe-4S].",
    "mechanismEn": "Stereospecific dehydration of citrate to cis-aconitate intermediate, followed by rehydration to isocitrate coordinated by a [4Fe-4S] iron-sulfur cluster.",
    "energyBalanceRu": "0 АТФ (изомеризация)",
    "energyBalanceEn": "0 ATP (isomerization)",
    "netAtpYieldRu": "+7 АТФ",
    "netAtpYieldEn": "+7 ATP",
    "clinicalNoteRu": "Ингибируется фторацетатом (образующим фторцитрат — токсический яд).",
    "clinicalNoteEn": "Inhibited by fluoroacetate (which is converted into fluorocitrate, a potent suicide inhibitor)."
  },
  {
    "id": "d0000001-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_IDH",
    "nameRu": "Окислительное декарбоксилирование изоцитрата",
    "nameEn": "Isocitrate oxidative decarboxylation",
    "pathwayCode": "PW-TCA-CYCLE",
    "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
    "pathwayNameEn": "Citric Acid Cycle (TCA)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000005",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000006",
    "enzymeRu": "Изоцитратдегидрогеназа 3 (НАД⁺)",
    "enzymeEn": "Isocitrate dehydrogenase 3 (NAD⁺)",
    "enzymeShort": "IDH3",
    "enzymeShortRu": "ИДГ-3",
    "ecNumber": "1.1.1.41",
    "gene": "IDH3A",
    "uniprotId": "P50213",
    "isReversible": false,
    "deltaG0": "-21.0 кДж/моль",
    "substrates": [
      {
        "name": "Изоцитрат",
        "nameEn": "Isocitrate",
        "formula": "C₆H₅O₇³⁻"
      },
      {
        "name": "НАД⁺",
        "nameEn": "NAD⁺",
        "formula": "C₂₁H₂₇N₇O₁₄P₂",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "α-Кетоглутарат",
        "nameEn": "α-Ketoglutarate",
        "formula": "C₅H₄O₅²⁻"
      },
      {
        "name": "НАДН",
        "nameEn": "NADH",
        "formula": "C₂₁H₂₉N₇O₁₄P₂",
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
      "АДФ",
      "Ca²⁺"
    ],
    "activatorsEn": [
      "ADP",
      "Ca²⁺"
    ],
    "inhibitorsRu": [
      "АТФ",
      "НАДН"
    ],
    "inhibitorsEn": [
      "ATP",
      "NADH"
    ],
    "mechanismRu": "Окисление гидроксильной группы изоцитрата до кетогруппы (оксалосукцинат), за которым следует необратимое декарбоксилирование с выделением первой молекулы CO₂.",
    "mechanismEn": "Oxidation of the secondary alcohol to oxalosuccinate, followed by irreversible decarboxylation yielding α-ketoglutarate and the first CO₂.",
    "energyBalanceRu": "+2 НАДН (5 АТФ) + 2 CO₂ (за 2 оборота)",
    "energyBalanceEn": "+2 NADH (5 ATP) + 2 CO₂ (2 turns)",
    "netAtpYieldRu": "+12 АТФ",
    "netAtpYieldEn": "+12 ATP",
    "clinicalNoteRu": "Главный регуляторный переключатель скорости клеточного дыхания у человека. Активируется при энергодефиците (высокий АДФ).",
    "clinicalNoteEn": "Primary rate-limiting control point of respiration. Strongly activated allosterically by ADP during energy demand."
  },
  {
    "id": "d0000001-0000-0000-0000-000000000004",
    "stepNumber": 4,
    "code": "R_KGDH",
    "nameRu": "Окислительное декарбоксилирование α-кетоглутарата",
    "nameEn": "α-Ketoglutarate dehydrogenase",
    "pathwayCode": "PW-TCA-CYCLE",
    "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
    "pathwayNameEn": "Citric Acid Cycle (TCA)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000006",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000007",
    "enzymeRu": "α-Кетоглутаратдегидрогеназный комплекс",
    "enzymeEn": "α-Ketoglutarate dehydrogenase complex",
    "enzymeShort": "OGDH",
    "enzymeShortRu": "α-КГДГ",
    "ecNumber": "1.2.4.2",
    "gene": "OGDH",
    "uniprotId": "Q02218",
    "isReversible": false,
    "deltaG0": "-33.5 кДж/моль",
    "substrates": [
      {
        "name": "α-Кетоглутарат",
        "nameEn": "α-Ketoglutarate",
        "formula": "C₅H₄O₅²⁻"
      },
      {
        "name": "НАД⁺",
        "nameEn": "NAD⁺",
        "formula": "C₂₁H₂₇N₇O₁₄P₂",
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
        "name": "Сукцинил-КоА",
        "nameEn": "Succinyl-CoA",
        "formula": "C₂₅H₃₆N₇O₁₉P₃S⁵⁻"
      },
      {
        "name": "НАДН",
        "nameEn": "NADH",
        "formula": "C₂₁H₂₉N₇O₁₄P₂",
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
      "Ca²⁺"
    ],
    "activatorsEn": [
      "Ca²⁺"
    ],
    "inhibitorsRu": [
      "Сукцинил-КоА",
      "НАДН",
      "АТФ"
    ],
    "inhibitorsEn": [
      "Succinyl-CoA",
      "NADH",
      "ATP"
    ],
    "mechanismRu": "Мультиферментный комплекс (E1, E2, E3), аналогичный пируватдегидрогеназному. Требует 5 коферментов: тиаминпирофосфат (B₁), липоат, КоА (B₅), ФАД (B₂), НАД⁺ (B₃).",
    "mechanismEn": "Multi-enzyme complex (E1, E2, E3) homologous to PDH. Requires 5 coenzymes: thiamine pyrophosphate (TPP), lipoate, CoA (B₅), FAD (B₂), NAD⁺ (B₃).",
    "energyBalanceRu": "+2 НАДН (5 АТФ) + 2 CO₂ (за 2 оборота)",
    "energyBalanceEn": "+2 NADH (5 ATP) + 2 CO₂ (2 turns)",
    "netAtpYieldRu": "+17 АТФ",
    "netAtpYieldEn": "+17 ATP",
    "clinicalNoteRu": "Дефицит витамина B₁ (тиамина) при алкоголизме (синдром Вернике-Корсакова) или бери-бери блокирует эту реакцию, вызывая энергетический коллапс ЦНС.",
    "clinicalNoteEn": "Thiamine (vitamin B₁) deficiency (Wernicke-Korsakoff syndrome, beriberi) impairs complex function, precipitating neuroenergetic failure."
  },
  {
    "id": "d0000001-0000-0000-0000-000000000005",
    "stepNumber": 5,
    "code": "R_SCS",
    "nameRu": "Субстратное фосфорилирование (Синтез ГТФ / АТФ)",
    "nameEn": "Succinate-CoA ligase (substrate-level phosphorylation)",
    "pathwayCode": "PW-TCA-CYCLE",
    "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
    "pathwayNameEn": "Citric Acid Cycle (TCA)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000007",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000008",
    "enzymeRu": "Сукцинил-КоА-синтетаза (Сукцинат-КоА-лигаза)",
    "enzymeEn": "Succinyl-CoA synthetase",
    "enzymeShort": "SUCLG2",
    "enzymeShortRu": "Сукц.-КоА синт.",
    "ecNumber": "6.2.1.4",
    "gene": "SUCLG2 / SUCLA2",
    "uniprotId": "Q96I99",
    "isReversible": true,
    "deltaG0": "-2.9 кДж/моль",
    "substrates": [
      {
        "name": "Сукцинил-КоА",
        "nameEn": "Succinyl-CoA",
        "formula": "C₂₅H₃₆N₇O₁₉P₃S⁵⁻"
      },
      {
        "name": "ГДФ (или АДФ)",
        "nameEn": "GDP (or ADP)",
        "formula": "C₁₀H₁₅N₅O₁₁P₂",
        "isCo": true
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
        "name": "Сукцинат",
        "nameEn": "Succinate",
        "formula": "C₄H₄O₄²⁻"
      },
      {
        "name": "ГТФ (или АТФ)",
        "nameEn": "GTP (or ATP)",
        "formula": "C₁₀H₁₆N₅O₁₄P₃",
        "isCo": true
      },
      {
        "name": "Кофермент A (КоА-SH)",
        "nameEn": "Coenzyme A (CoA-SH)",
        "formula": "C₂₁H₃₆N₇O₁₆P₃S",
        "isCo": true
      }
    ],
    "mechanismRu": "Разрыв богатой энергией тиоэфирной связи сукцинил-КоА сопряжен с фосфорилированием гуанозиндифосфата (ГДФ) до ГТФ через фосфогистидиновый интермедиат фермента.",
    "mechanismEn": "Energy from high-energy thioester bond cleavage is coupled to GDP phosphorylation into GTP via an active-site phosphohistidine intermediate.",
    "energyBalanceRu": "+2 ГТФ (2 АТФ субстратно за 2 оборота)",
    "energyBalanceEn": "+2 GTP (2 ATP substrate-level per 2 turns)",
    "netAtpYieldRu": "+19 АТФ",
    "netAtpYieldEn": "+19 ATP",
    "clinicalNoteRu": "Тканевая специфичность человека: в печени и почках преобладает ГТФ-специфичная изоформа (ген SUCLG2, необходима для глюконеогенеза), в сердце и мозге — АТФ-специфичная (ген SUCLA2).",
    "clinicalNoteEn": "Human tissue specificity: liver/kidney express GTP-specific isoform (SUCLG2, linked to gluconeogenesis), whereas heart/brain express ATP-specific (SUCLA2)."
  },
  {
    "id": "d0000001-0000-0000-0000-000000000006",
    "stepNumber": 6,
    "code": "R_SDH",
    "nameRu": "Окисление сукцината в фумарат",
    "nameEn": "Succinate dehydrogenase oxidation",
    "pathwayCode": "PW-TCA-CYCLE",
    "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
    "pathwayNameEn": "Citric Acid Cycle (TCA)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000008",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000009",
    "enzymeRu": "Сукцинатдегидрогеназа / Комплекс II",
    "enzymeEn": "Succinate dehydrogenase / Complex II",
    "enzymeShort": "SDH",
    "enzymeShortRu": "СДГ",
    "ecNumber": "1.3.5.1",
    "gene": "SDHA-D",
    "uniprotId": "P31040",
    "isReversible": true,
    "deltaG0": "0.0 кДж/моль",
    "substrates": [
      {
        "name": "Сукцинат",
        "nameEn": "Succinate",
        "formula": "C₄H₄O₄²⁻"
      },
      {
        "name": "ФАД (связанный)",
        "nameEn": "FAD (covalently bound)",
        "formula": "C₂₇H₃₃N₉O₁₅P₂",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "Фумарат",
        "nameEn": "Fumarate",
        "formula": "C₄H₂O₄²⁻"
      },
      {
        "name": "ФАДН₂ (в пул Кофермента Q₁₀)",
        "nameEn": "FADH₂ (into Coenzyme Q₁₀ pool)",
        "formula": "C₂₇H₃₅N₉O₁₅P₂",
        "isCo": true
      }
    ],
    "inhibitorsRu": [
      "Малонат (конкурентный)",
      "Оксалоацетат"
    ],
    "inhibitorsEn": [
      "Malonate (competitive inhibitor)",
      "Oxaloacetate"
    ],
    "mechanismRu": "Стереоспецифическое транс-дегидрирование сукцината. Единственный фермент цикла, встроенный во внутреннюю мембрану митохондрий и напрямую передающий электроны в убихинон (Кофермент Q₁₀).",
    "mechanismEn": "Stereospecific trans-dehydrogenation of succinate. Sole cycle enzyme embedded in the inner mitochondrial membrane, transferring electrons directly to ubiquinone (CoQ₁₀).",
    "energyBalanceRu": "+2 ФАДH₂ (3 АТФ через комплекс II)",
    "energyBalanceEn": "+2 FADH₂ (3 ATP via complex II)",
    "netAtpYieldRu": "+22 АТФ",
    "netAtpYieldEn": "+22 ATP",
    "clinicalNoteRu": "Генетические мутации в субъединицах SDH человека приводят к параганглиомам и феохромоцитомам (накопление сукцината стабилизирует онкогенный фактор HIF-1α).",
    "clinicalNoteEn": "SDH subunit germline mutations cause paragangliomas and pheochromocytomas (succinate accumulation inhibits prolyl hydroxylases and stabilizes HIF-1α)."
  },
  {
    "id": "d0000001-0000-0000-0000-000000000007",
    "stepNumber": 7,
    "code": "R_FUM",
    "nameRu": "Гидратация фумарата в L-малат",
    "nameEn": "Fumarate hydratase trans-hydration",
    "pathwayCode": "PW-TCA-CYCLE",
    "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
    "pathwayNameEn": "Citric Acid Cycle (TCA)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000009",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000010",
    "enzymeRu": "Фумараза (митохондриальная фумаратгидратаза)",
    "enzymeEn": "Fumarate hydratase",
    "enzymeShort": "FH",
    "enzymeShortRu": "Фумараза",
    "ecNumber": "4.2.1.2",
    "gene": "FH",
    "uniprotId": "P07954",
    "isReversible": true,
    "deltaG0": "-3.8 кДж/моль",
    "substrates": [
      {
        "name": "Фумарат",
        "nameEn": "Fumarate",
        "formula": "C₄H₂O₄²⁻"
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
        "name": "L-Малат",
        "nameEn": "L-Malate",
        "formula": "C₄H₄O₅²⁻"
      }
    ],
    "mechanismRu": "Стереоспецифическое транс-присоединение молекулы воды по двойной углерод-углеродной связи фумарата с образованием исключительно L-изомера яблочной кислоты.",
    "mechanismEn": "Stereospecific trans-addition of water across the carbon-carbon double bond of fumarate, yielding solely L-malate.",
    "energyBalanceRu": "0 АТФ (гидратация)",
    "energyBalanceEn": "0 ATP (hydration)",
    "netAtpYieldRu": "+22 АТФ",
    "netAtpYieldEn": "+22 ATP",
    "clinicalNoteRu": "Классический опухолевый супрессор человека. Герминальные мутации гена FH вызывают наследственный лейомиоматоз и почечно-клеточный рак (синдром HLRCC).",
    "clinicalNoteEn": "Tumor suppressor; germline mutations in FH cause hereditary leiomyomatosis and renal cell cancer (HLRCC syndrome)."
  },
  {
    "id": "d0000001-0000-0000-0000-000000000008",
    "stepNumber": 8,
    "code": "R_MDH",
    "nameRu": "Окисление L-малата в оксалоацетат",
    "nameEn": "Malate dehydrogenase oxidation",
    "pathwayCode": "PW-TCA-CYCLE",
    "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
    "pathwayNameEn": "Citric Acid Cycle (TCA)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000010",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000003",
    "enzymeRu": "Малатдегидрогеназа 2 (митохондриальная)",
    "enzymeEn": "Malate dehydrogenase 2",
    "enzymeShort": "MDH2",
    "enzymeShortRu": "МДГ-2",
    "ecNumber": "1.1.1.37",
    "gene": "MDH2",
    "uniprotId": "P40926",
    "isReversible": true,
    "deltaG0": "+29.7 кДж/моль",
    "substrates": [
      {
        "name": "L-Малат",
        "nameEn": "L-Malate",
        "formula": "C₄H₄O₅²⁻"
      },
      {
        "name": "НАД⁺",
        "nameEn": "NAD⁺",
        "formula": "C₂₁H₂₇N₇O₁₄P₂",
        "isCo": true
      }
    ],
    "products": [
      {
        "name": "Оксалоацетат",
        "nameEn": "Oxaloacetate",
        "formula": "C₄H₂O₅²⁻"
      },
      {
        "name": "НАДН",
        "nameEn": "NADH",
        "formula": "C₂₁H₂₉N₇O₁₄P₂",
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
      "Высокие концентрации оксалоацетата"
    ],
    "inhibitorsEn": [
      "High concentrations of oxaloacetate"
    ],
    "mechanismRu": "Окисление вторичной спиртовой группы малата до кетогруппы с регенерацией оксалоацетата и образованием третьей молекулы НАДН цикла.",
    "mechanismEn": "Reversible oxidation of L-malate secondary hydroxyl group to regenerate oxaloacetate and produce the third NADH of the cycle.",
    "energyBalanceRu": "+2 НАДН (5 АТФ через комплекс I)",
    "energyBalanceEn": "+2 NADH (5 ATP via complex I)",
    "netAtpYieldRu": "+30...32 АТФ (полное сгорание глюкозы)",
    "netAtpYieldEn": "+30...32 ATP (full glucose oxidation)",
    "clinicalNoteRu": "Термодинамически неблагоприятная реакция (ΔG°' = +29.7 кДж/моль), сдвигаемая вправо постоянным и быстрым расходом оксалоацетата цитратсинтазой.",
    "clinicalNoteEn": "Thermodynamically endergonic (ΔG°' = +29.7 kJ/mol), driven forward in vivo by rapid removal of oxaloacetate by citrate synthase."
  }
];
