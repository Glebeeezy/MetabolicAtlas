import { BiologicalReaction } from '../../../../core/metabolism/models';

export const OXPHOS_REACTIONS: BiologicalReaction[] = [
  {
    "id": "d0000006-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_ETC_CI",
    "nameRu": "Окисление НАДН Комплексом I (Транслокация 4 H⁺)",
    "nameEn": "NADH Oxidation by Complex I (4 H⁺ Translocation)",
    "pathwayCode": "PW-OXPHOS",
    "pathwayNameRu": "Дыхательная цепь (OxPhos)",
    "pathwayNameEn": "Electron Transport Chain (OxPhos)",
    "compartmentRu": "Внутренняя мембрана митохондрий",
    "compartmentEn": "Inner Mitochondrial Membrane",
    "sourceMetaboliteId": "b0000001-0000-0000-0000-000000000013",
    "targetMetaboliteId": "b0000006-0000-0000-0000-000000000001",
    "enzymeRu": "НАДН:убихинон-оксидоредуктаза (Комплекс I)",
    "enzymeEn": "NADH:ubiquinone oxidoreductase (Complex I)",
    "enzymeShort": "NDU / CI",
    "enzymeShortRu": "Комплекс I",
    "ecNumber": "7.1.1.2",
    "gene": "NDUFV1, NDUFS1, ND1-ND6",
    "uniprotId": "P19404",
    "isReversible": false,
    "deltaG0": "-69.5 кДж/моль",
    "substrates": [
      {
        "name": "НАДН",
        "nameEn": "NADH",
        "formula": "C₂₁H₂₉N₇O₁₄P₂",
        "isCo": true
      },
      {
        "name": "Кофермент Q₁₀ (Убихинон)",
        "nameEn": "Coenzyme Q10 (Ubiquinone)",
        "formula": "C₅₉H₉₀O₄",
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
        "name": "Убихинол-10",
        "nameEn": "Ubiquinol-10",
        "formula": "C₅₉H₉₂O₄"
      },
      {
        "name": "НАД⁺",
        "nameEn": "NAD⁺",
        "formula": "C₂₁H₂₇N₇O₁₄P₂",
        "isCo": true
      }
    ],
    "activatorsRu": [
      "Высокое отношение НАДН/НАД⁺",
      "АДФ",
      "Высокий спрос на АТФ"
    ],
    "activatorsEn": [
      "High NADH/NAD⁺ ratio",
      "ADP",
      "High ATP demand"
    ],
    "inhibitorsRu": [
      "Ротенон",
      "Амитал",
      "Пиерицидин А",
      "Высокий электрохимический потенциал (Δψ)"
    ],
    "inhibitorsEn": [
      "Rotenone",
      "Amytal",
      "Piericidin A",
      "High proton-motive force (Δψ)"
    ],
    "mechanismRu": "Двухэлектронное окисление НАДН флавинмононуклеотидом (FMN) с последующим туннелированием электронов через цепочку из 7 Fe-S кластеров к сайту связывания убихинона. Сопровождается конформационным перемещением поршневого штока в мембранной ножке, транслоцирующим 4 протона из матрикса в межмембранное пространство.",
    "mechanismEn": "Two-electron oxidation of NADH via FMN cofactor followed by electron tunneling through seven Fe-S centers to the ubiquinone binding channel. Coupled to a long lateral piston-like helix in the membrane domain driving translocation of 4 protons into the IMS.",
    "energyBalanceRu": "+4 H⁺ в межмембранное пространство (ΔG°′ = −69.5 кДж/моль; синтез ~2.5 АТФ)",
    "energyBalanceEn": "+4 H⁺ translocated to IMS (ΔG°′ = −69.5 kJ/mol; drives ~2.5 ATP)",
    "netAtpYieldRu": "+2.5 АТФ на 1 моль окисленного НАДН",
    "netAtpYieldEn": "+2.5 ATP per mole of NADH oxidized",
    "clinicalNoteRu": "Дефекты субъединиц Комплекса I — наиболее частая причина наследственных митохондриальных энцефаломиопатий (синдром Лея, оптическая нейропатия Лебера LHON). Ингибитор ротенон используется как модель болезни Паркинсона.",
    "clinicalNoteEn": "Complex I deficiency is the most common cause of Leigh syndrome and Leber hereditary optic neuropathy (LHON). Rotenone inhibition induces dopaminergic neurodegeneration mimicking Parkinson's disease."
  },
  {
    "id": "d0000006-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_ETC_CIII",
    "nameRu": "Окисление убихинола цитохром-bc₁-комплексом (Q-цикл)",
    "nameEn": "Ubiquinol Oxidation by Cytochrome bc₁ Complex (Q-Cycle)",
    "pathwayCode": "PW-OXPHOS",
    "pathwayNameRu": "Дыхательная цепь (OxPhos)",
    "pathwayNameEn": "Electron Transport Chain (OxPhos)",
    "compartmentRu": "Внутренняя мембрана митохондрий",
    "compartmentEn": "Inner Mitochondrial Membrane",
    "sourceMetaboliteId": "b0000006-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000006-0000-0000-0000-000000000002",
    "enzymeRu": "Коэнзим Q:цитохром c оксидоредуктаза (Комплекс III / bc₁)",
    "enzymeEn": "Coenzyme Q:cytochrome c oxidoreductase (Complex III / bc₁)",
    "enzymeShort": "Cyt bc₁ / CIII",
    "enzymeShortRu": "Комплекс III",
    "ecNumber": "7.1.1.8",
    "gene": "CYC1, CYTB, UQCRC1, UQCRFS1",
    "uniprotId": "P00156",
    "isReversible": false,
    "deltaG0": "-36.7 кДж/моль",
    "substrates": [
      {
        "name": "Убихинол-10",
        "nameEn": "Ubiquinol-10",
        "formula": "C₅₉H₉₂O₄"
      },
      {
        "name": "Цитохром c (окисленный)",
        "nameEn": "Cytochrome c (oxidized)",
        "formula": "Fe³⁺-гем c"
      }
    ],
    "products": [
      {
        "name": "Цитохром c (восстановленный)",
        "nameEn": "Cytochrome c (reduced)",
        "formula": "Fe²⁺-гем c"
      },
      {
        "name": "Кофермент Q₁₀ (Убихинон)",
        "nameEn": "Coenzyme Q10 (Ubiquinone)",
        "formula": "C₅₉H₉₀O₄",
        "isCo": true
      }
    ],
    "inhibitorsRu": [
      "Антимицин А (сайт Qi)",
      "Миксотиазол (сайт Qo)",
      "Стробилурины"
    ],
    "inhibitorsEn": [
      "Antimycin A (Qi site)",
      "Myxothiazol (Qo site)",
      "Strobilurins"
    ],
    "mechanismRu": "Двухстадийный Q-цикл Питера Митчелла: первая молекула QH₂ окисляется в сайте Qo у наружной стороны мембраны; один электрон через [2Fe-2S] белок Риске и цитохром c₁ восстанавливает цитохром c, второй электрон через гемы bL и bH восстанавливает Q в семихинон в сайте Qi. Повторение цикла суммарно откачивает 4 протона в МП на 2 окисленных цитохрома c.",
    "mechanismEn": "Two-step Mitchell Q-cycle: QH₂ oxidation at Qo site branches electrons — one goes via Rieske [2Fe-2S] and heme c₁ to soluble cytochrome c, the other via hemes bL/bH to Qi site forming semiquinone radical. Net stoichiometry pumps 4H⁺ to IMS per 2 electrons reaching cytochrome c.",
    "energyBalanceRu": "+4 H⁺ в межмембранное пространство (Q-цикл, ΔG°′ = −36.7 кДж/моль)",
    "energyBalanceEn": "+4 H⁺ translocated to IMS (Q-cycle, ΔG°′ = −36.7 kJ/mol)",
    "netAtpYieldRu": "Обеспечивает транслокацию 4H⁺ (эквивалентно ~1 АТФ)",
    "netAtpYieldEn": "Powers translocation of 4H⁺ (~1 ATP equivalent)",
    "clinicalNoteRu": "Мутации митохондриального гена MT-CYB приводят к непереносимости физических нагрузок и миопатиям. Ингибирование антимицином А вызывает мощный выброс супероксид-радикалов (АФК) в матрикс.",
    "clinicalNoteEn": "MT-CYB mutations cause exercise intolerance and multi-system mitochondrial myopathy. Antimycin A inhibition triggers explosive superoxide (ROS) production."
  },
  {
    "id": "d0000006-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_ETC_CIV",
    "nameRu": "Восстановление кислорода цитохромоксидазой (Терминальное звено)",
    "nameEn": "Oxygen Reduction by Cytochrome c Oxidase (Terminal Step)",
    "pathwayCode": "PW-OXPHOS",
    "pathwayNameRu": "Дыхательная цепь (OxPhos)",
    "pathwayNameEn": "Electron Transport Chain (OxPhos)",
    "compartmentRu": "Внутренняя мембрана митохондрий",
    "compartmentEn": "Inner Mitochondrial Membrane",
    "sourceMetaboliteId": "b0000006-0000-0000-0000-000000000002",
    "targetMetaboliteId": "b0000006-0000-0000-0000-000000000004",
    "secondarySourceId": "b0000006-0000-0000-0000-000000000003",
    "enzymeRu": "Цитохром c оксидаза (Комплекс IV / ЦОК)",
    "enzymeEn": "Cytochrome c oxidase (Complex IV / COX)",
    "enzymeShort": "COX / CIV",
    "enzymeShortRu": "Комплекс IV",
    "ecNumber": "7.1.1.9",
    "gene": "MT-CO1, MT-CO2, MT-CO3, COX4I1",
    "uniprotId": "P00395",
    "isReversible": false,
    "deltaG0": "-112.0 кДж/моль",
    "substrates": [
      {
        "name": "Цитохром c (восстановленный)",
        "nameEn": "Cytochrome c (reduced)",
        "formula": "Fe²⁺-гем c"
      },
      {
        "name": "Кислород (O₂)",
        "nameEn": "Oxygen (O₂)",
        "formula": "O₂"
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
        "name": "Метаболическая вода (H₂O)",
        "nameEn": "Metabolic Water (H₂O)",
        "formula": "H₂O"
      },
      {
        "name": "Цитохром c (окисленный)",
        "nameEn": "Cytochrome c (oxidized)",
        "formula": "Fe³⁺-гем c",
        "isCo": true
      }
    ],
    "inhibitorsRu": [
      "Цианиды (CN⁻)",
      "Монооксид углерода (CO)",
      "Азид натрия (NaN₃)",
      "Сероводород (H₂S)"
    ],
    "inhibitorsEn": [
      "Cyanide (CN⁻)",
      "Carbon monoxide (CO)",
      "Sodium azide (NaN₃)",
      "Hydrogen sulfide (H₂S)"
    ],
    "mechanismRu": "Четыре последовательных одноэлектронных переноса от 4 молекул цитохрома c через диядерный медный центр CuA и гем a к биядерному каталитическому центру гем a3–CuB. Связанная молекула O₂ полностью восстанавливается в 2 молекулы воды без высвобождения токсичных интермедиатов перекиси. Реакция потребляет 4 «химических» протона из матрикса и откачивает 4 протона (2H⁺ на пару электронов) в МП.",
    "mechanismEn": "Sequential 4-electron delivery from four cytochrome c molecules through CuA binuclear site and heme a to the heme a3-CuB catalytic core, where O₂ is safely reduced to two H₂O without premature reactive oxygen release. Drives pumping of 2H⁺ into IMS per electron pair.",
    "energyBalanceRu": "+2 H⁺ в МП на 2e⁻ + поглощение 4H⁺ из матрикса на моль O₂ (ΔG°′ = −112 кДж/моль)",
    "energyBalanceEn": "+2 H⁺ pumped per 2e⁻ + 4 matrix H⁺ consumed per O₂ (ΔG°′ = −112 kJ/mol)",
    "netAtpYieldRu": "Финальный акцептор электронов; завершает генерацию протонного градиента",
    "netAtpYieldEn": "Terminal sink of electron flow completing proton-motive force",
    "clinicalNoteRu": "Блокада цианидами или CO вызывает мгновенную остановку клеточного дыхания и острую тканевую гипоксию при нормальной сатурации гемоглобина. Врождённые дефекты сборки COX (SURF1) вызывают фатальный подострый некротизирующий энцефаломиелит (синдром Лея).",
    "clinicalNoteEn": "Cyanide and CO irreversibly bind ferric/ferrous heme a3, freezing respiratory flux within seconds. SURF1 assembly mutations cause classic Leigh syndrome."
  },
  {
    "id": "d0000006-0000-0000-0000-000000000004",
    "stepNumber": 4,
    "code": "R_ETC_CV",
    "nameRu": "Синтез АТФ роторной F₀F₁-АТФ-синтазой (Ротационный катализ)",
    "nameEn": "ATP Synthesis by F₀F₁ ATP Synthase (Rotational Catalysis)",
    "pathwayCode": "PW-OXPHOS",
    "pathwayNameRu": "Окислительное фосфорилирование (OxPhos)",
    "pathwayNameEn": "Oxidative Phosphorylation (OxPhos)",
    "compartmentRu": "Внутренняя мембрана митохондрий",
    "compartmentEn": "Inner Mitochondrial Membrane",
    "sourceMetaboliteId": "c0000001-0000-0000-0000-000000000013",
    "targetMetaboliteId": "c0000001-0000-0000-0000-000000000012",
    "enzymeRu": "Митохондриальная АТФ-синтаза (Комплекс V / F₀F₁)",
    "enzymeEn": "Mitochondrial ATP synthase (Complex V / F₀F₁)",
    "enzymeShort": "ATP Synthase / CV",
    "enzymeShortRu": "АТФ-синтаза",
    "ecNumber": "7.1.2.2",
    "gene": "ATP5F1A, ATP5F1B, MT-ATP6, MT-ATP8",
    "uniprotId": "P25705",
    "isReversible": true,
    "deltaG0": "+30.5 кДж/моль (компенсируется притоком 4 H⁺)",
    "substrates": [
      {
        "name": "Аденозиндифосфат",
        "nameEn": "ADP",
        "formula": "C₁₀H₁₂N₅O₁₀P₂³⁻",
        "isCo": true
      },
      {
        "name": "Неорганический фосфат (Фᵢ)",
        "nameEn": "Inorganic phosphate (Pᵢ)",
        "formula": "HPO₄²⁻",
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
        "name": "Аденозинтрифосфат",
        "nameEn": "ATP",
        "formula": "C₁₀H₁₂N₅O₁₃P₃⁴⁻",
        "isCo": true
      },
      {
        "name": "Вода (H₂O)",
        "nameEn": "Water (H₂O)",
        "formula": "H₂O",
        "isCo": true
      }
    ],
    "activatorsRu": [
      "Высокий электрохимический градиент (Δψ)",
      "Высокая концентрация АДФ и Фᵢ"
    ],
    "activatorsEn": [
      "Proton-motive force (Δψ)",
      "High ADP and Pᵢ concentrations"
    ],
    "inhibitorsRu": [
      "Олигомицин (блокатор F₀-канала)",
      "Ауривертин (сайт F₁)",
      "Разобщители (DNP, FCCP, термогенин UCP1)"
    ],
    "inhibitorsEn": [
      "Oligomycin (blocks F₀ c-ring)",
      "Aurovertin",
      "Uncouplers (DNP, FCCP, UCP1 thermogenin)"
    ],
    "mechanismRu": "Механизм изменения связывания Пола Бойера: трансмембранный поток протонов через F₀-канал заставляет c-кольцо и асимметричный γ-стержень вращаться со скоростью до 8000 об/мин. Вращение γ-субъединицы поочередно переводит три каталитических димера αβ головки F₁ через три конформации: O (открытая/loose) → L (связывающая/tight) → T (каталитический синтез АТФ).",
    "mechanismEn": "Paul Boyer binding-change mechanism: downhill H⁺ flux through F₀ stator-rotor interface drives rotation of central γ/ε stalk inside stationary α₃β₃ head. Rotational torque sequentially cycles catalytic sites through Open, Loose, and Tight conformations, synthesizing 3 ATP per 360° turn.",
    "energyBalanceRu": "Расход ~4 протона на синтез 1 АТФ (3 H⁺ вращают ротор + 1 H⁺ для симпорта фосфата SLC25A3)",
    "energyBalanceEn": "4 protons consumed per ATP (3 H⁺ via c-ring rotation + 1 H⁺ via phosphate/H⁺ symport)",
    "netAtpYieldRu": "+28–32 АТФ суммарный выход аэробного окисления 1 молекулы глюкозы",
    "netAtpYieldEn": "+28–32 ATP net yield per fully oxidized glucose molecule",
    "clinicalNoteRu": "Мутации гена MT-ATP6 вызывают синдром NARP (нейропатия, атаксия, пигментный ретинит). Бурый жир использует белок термогенин (UCP1) для разобщения градиента с выделением тепла без синтеза АТФ.",
    "clinicalNoteEn": "MT-ATP6 mutations disrupt F₀ proton channel causing NARP and MILS syndromes. Brown adipose tissue thermogenin (UCP1) dissipates PMF directly into non-shivering thermogenesis."
  }
];
