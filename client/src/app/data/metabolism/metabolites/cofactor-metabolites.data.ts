import { BiologicalMetabolite } from '../../../core/metabolism/models';

export const BIOLOGICAL_COFACTOR_METABOLITES: BiologicalMetabolite[] = [
  {
    "id": "c0000001-0000-0000-0000-000000000012",
    "code": "MET_ATP",
    "nameRu": "Аденозинтрифосфат",
    "nameEn": "Adenosine triphosphate",
    "abbrevRu": "АТФ",
    "abbrevEn": "ATP",
    "formula": "C₁₀H₁₂N₅O₁₃P₃⁴⁻",
    "carbons": "10C",
    "carbonsEn": "10C",
    "smiles": "C1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)([O-])OP(=O)([O-])OP(=O)([O-])[O-]",
    "chebi": "CHEBI:30616",
    "inchiKey": "ZKHQWZAMYRWXGA-KQYNXXCUSA-J",
    "descriptionRu": "Универсальная энергетическая валюта клетки. Содержит две высокоэнергетические фосфоангидридные связи (ΔG°' гидролиза ≈ -30.5 кДж/моль). Расходуется на стадиях 1 (HK) и 3 (PFK-1), регенерируется на стадиях 7 (PGK) и 10 (PK).",
    "descriptionEn": "Universal energy currency of human cellular metabolism. Consumed in preparatory phase of glycolysis, generated in payoff phase.",
    "synonymsRu": [
      "АТФ",
      "Аденозинтрифосфат"
    ],
    "synonymsEn": [
      "ATP",
      "Adenosine triphosphate"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз",
        "pathwayNameEn": "Glycolysis",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Генерируется на стадиях 7 (PGK) и 10 (PK) субстратным фосфорилированием (+4 брутто, +2 нетто АТФ / глюкозу).",
        "detailsEn": "Generated in steps 7 (PGK) and 10 (PK) via substrate-level phosphorylation (net +2 ATP / glucose)."
      }
    ]
  },
  {
    "id": "c0000001-0000-0000-0000-000000000013",
    "code": "MET_ADP",
    "nameRu": "Аденозиндифосфат",
    "nameEn": "Adenosine diphosphate",
    "abbrevRu": "АДФ",
    "abbrevEn": "ADP",
    "formula": "C₁₀H₁₂N₅O₁₀P₂³⁻",
    "carbons": "10C",
    "carbonsEn": "10C",
    "smiles": "C1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)([O-])OP(=O)([O-])[O-]",
    "chebi": "CHEBI:456216",
    "inchiKey": "XTWYTFMLZFPYCI-KQYNXXCUSA-K",
    "descriptionRu": "Продукт дефосфорилирования АТФ; акцептор фосфатной группы при субстратном фосфорилировании в гликолизе.",
    "descriptionEn": "Adenosine diphosphate, phosphate acceptor during glycolytic substrate-level phosphorylation.",
    "synonymsRu": [
      "АДФ",
      "Аденозиндифосфат"
    ],
    "synonymsEn": [
      "ADP",
      "Adenosine diphosphate"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз",
        "pathwayNameEn": "Glycolysis",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Фосфорилируется в АТФ на стадиях 7 (PGK) и 10 (PK).",
        "detailsEn": "Phosphorylated to ATP in steps 7 and 10."
      }
    ]
  },
  {
    "id": "c0000001-0000-0000-0000-000000000014",
    "code": "MET_PROTON",
    "nameRu": "Протон (H⁺)",
    "nameEn": "Proton (H⁺)",
    "abbrevRu": "H⁺",
    "abbrevEn": "H⁺",
    "formula": "H⁺",
    "carbons": "0C",
    "carbonsEn": "0C",
    "smiles": "[H+]",
    "chebi": "CHEBI:15378",
    "inchiKey": "GPRLSGONYQIRFK-UHFFFAOYSA-N",
    "descriptionRu": "Ион водорода (гидрон), ключевой регулятор кислотно-основного гомеостаза клетки и субстрат/продукт дегидрогеназных и киназных реакций.",
    "descriptionEn": "Hydron cation / proton participating in acid-base equilibrium and dehydrogenase coenzyme cycles.",
    "synonymsRu": [
      "Протон",
      "Ион водорода",
      "H+"
    ],
    "synonymsEn": [
      "Proton",
      "Hydrogen ion",
      "H+"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз",
        "pathwayNameEn": "Glycolysis",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Выделяется при фосфорилировании гексоз и окислении НАД+; расходуется пируваткиназой.",
        "detailsEn": "Product of hexose kinase reactions and GAPDH; consumed by pyruvate kinase."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000012",
    "code": "MET_NAD_PLUS",
    "nameRu": "НАД⁺",
    "nameEn": "NAD⁺",
    "abbrevRu": "НАД⁺",
    "abbrevEn": "NAD⁺",
    "formula": "C₂₁H₂₇N₇O₁₄P₂",
    "carbons": "Кофермент (B₃)",
    "carbonsEn": "Coenzyme (B₃)",
    "smiles": "NC(=O)C1=CN(C=CC1)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)OC[C@H]2O[C@H]([C@@H](O)[C@@H]2O)N2C=NC3=C(N)N=CN=C23)[C@@H](O)[C@@H]1O",
    "chebi": "CHEBI:15846",
    "inchiKey": "BAWFJGJZGIEFAR-UHFFFAOYSA-N",
    "descriptionRu": "Главный окислительный кофермент дегидрогеназ человека. Образуется из витамина B₃ (ниацина). В цикле Кребса акцептирует электроны в реакциях 3, 4 и 8, восстанавливаясь до НАДН.",
    "descriptionEn": "Primary oxidizing coenzyme of human dehydrogenases derived from vitamin B₃ (niacin). In the TCA cycle, accepts electrons in steps 3, 4, and 8, becoming reduced to NADH.",
    "synonymsRu": [
      "НАД⁺",
      "Окисленный никотинамидадениндинуклеотид",
      "NAD⁺",
      "Кофермент дегидрогеназ"
    ],
    "synonymsEn": [
      "NAD⁺",
      "Oxidized nicotinamide adenine dinucleotide",
      "Dehydrogenase coenzyme"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "cofactor",
        "detailsRu": "Окислительный кофермент изоцитрат- (ст. 3), α-кетоглутарат- (ст. 4) и малатдегидрогеназы (ст. 8).",
        "detailsEn": "Oxidizing coenzyme for isocitrate (step 3), α-ketoglutarate (step 4), and malate dehydrogenases (step 8)."
      },
      {
        "pathwayCode": "PWY_GLYCOLYSIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Окисление глицеральдегид-3-фосфата (ГАФДГ); требует непрерывной челночной регенерации.",
        "detailsEn": "Oxidation of glyceraldehyde-3-phosphate (GAPDH); requires continuous shuttle regeneration."
      },
      {
        "pathwayCode": "PWY_PDH",
        "pathwayNameRu": "Пируватдегидрогеназный комплекс",
        "pathwayNameEn": "Pyruvate Dehydrogenase Complex",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Окисление дигидролипоата ферментом E3 (дигидролипоилдегидрогеназой).",
        "detailsEn": "Reoxidizes dihydrolipoamide via subunit E3 (dihydrolipoyl dehydrogenase)."
      },
      {
        "pathwayCode": "PWY_ETC",
        "pathwayNameRu": "Дыхательная цепь (Комплекс I)",
        "pathwayNameEn": "Electron Transport Chain (Complex I)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Регенерируется из НАДН Комплексом I дыхательной цепи с переносом протонов в межмембранное пространство.",
        "detailsEn": "Regenerated from NADH by Complex I with concomitant proton translocation into intermembrane space."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000013",
    "code": "MET_NADH",
    "nameRu": "НАДН",
    "nameEn": "NADH",
    "abbrevRu": "НАДН",
    "abbrevEn": "NADH",
    "formula": "C₂₁H₂₉N₇O₁₄P₂",
    "carbons": "Энергоноситель (~2.5 АТФ)",
    "carbonsEn": "Energy carrier (~2.5 ATP)",
    "smiles": "NC(=O)C1=CN([C@@H]2O[C@H](COP(=O)(O)OP(=O)(O)OC[C@H]3O[C@H]([C@@H](O)[C@@H]3O)N3C=NC4=C(N)N=CN=C43)[C@@H](O)[C@@H]2O)CC=C1",
    "chebi": "CHEBI:16908",
    "inchiKey": "BOPGDPNILDQYTO-UHFFFAOYSA-N",
    "descriptionRu": "Главный энергоемкий восстановительный эквивалент клеточного дыхания. В цикле Кребса генерируются 3 молекулы НАДН на 1 ацетил-КоА, обеспечивающие синтез ~7.5 молекул АТФ в дыхательной цепи.",
    "descriptionEn": "Primary energy-rich reducing equivalent of cellular respiration. The TCA cycle generates 3 NADH molecules per Acetyl-CoA, yielding ~7.5 ATP via oxidative phosphorylation.",
    "synonymsRu": [
      "НАДН",
      "NADH",
      "Восстановленный никотинамидадениндинуклеотид",
      "DPNH"
    ],
    "synonymsEn": [
      "NADH",
      "Reduced nicotinamide adenine dinucleotide",
      "DPNH"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Образуется на стадиях 3 (ИДГ3), 4 (ОГДГ) и 8 (МДГ2) — суммарно 3 НАДН за оборот цикла.",
        "detailsEn": "Formed in steps 3 (IDH3), 4 (α-KGDH), and 8 (MDH2) — total of 3 NADH per cycle turn."
      },
      {
        "pathwayCode": "PWY_ETC",
        "pathwayNameRu": "Дыхательная цепь (Комплекс I)",
        "pathwayNameEn": "Electron Transport Chain (Complex I)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Главный донор электронов в Комплекс I; окисление дает выход ~2.5 АТФ на молекулу.",
        "detailsEn": "Primary electron donor to Complex I; oxidation yields ~2.5 ATP per molecule."
      },
      {
        "pathwayCode": "PWY_PDH",
        "pathwayNameRu": "ПДХ комплекс",
        "pathwayNameEn": "PDH Complex",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Генерируется при окислении пирувата до ацетил-КоА.",
        "detailsEn": "Generated during oxidative decarboxylation of pyruvate to Acetyl-CoA."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000014",
    "code": "MET_FAD",
    "nameRu": "ФАД",
    "nameEn": "FAD",
    "abbrevRu": "ФАД",
    "abbrevEn": "FAD",
    "formula": "C₂₇H₃₃N₉O₁₅P₂",
    "carbons": "Простетическая группа (B₂)",
    "carbonsEn": "Prosthetic group (B₂)",
    "smiles": "CC1=CC2=C(C=C1C)N(C3=NC(=O)NC(=O)C3=N2)CC(C(C(COP(=O)(O)OP(=O)(O)OCC4C(C(C(O4)N5C=NC6=C5N=CN=C6N)O)O)O)O)O",
    "chebi": "CHEBI:16238",
    "inchiKey": "VZZFIPVCIKBDJD-UHFFFAOYSA-N",
    "descriptionRu": "Ковалентно связанная простетическая группа сукцинатдегидрогеназы (Комплекс II). Ковалентно соединен с остатком гистидина His-B44 субъединицы SDHA.",
    "descriptionEn": "Covalently bound prosthetic group of Complex II (succinate dehydrogenase), linked to His-B44 of the SDHA subunit.",
    "synonymsRu": [
      "ФАД",
      "Флавинадениндинуклеотид",
      "FAD",
      "Витамин B2 кофермент"
    ],
    "synonymsEn": [
      "FAD",
      "Flavin adenine dinucleotide",
      "Vitamin B2 coenzyme"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "cofactor",
        "detailsRu": "Стадия 6 (СДГ): акцептор пары протонов и электронов при окислении сукцината в фумарат.",
        "detailsEn": "Step 6 (SDH): two-electron acceptor in the oxidation of succinate to fumarate."
      },
      {
        "pathwayCode": "PWY_BETA_OX",
        "pathwayNameRu": "β-Окисление жирных кислот",
        "pathwayNameEn": "Fatty Acid β-Oxidation",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Кофермент ацил-КоА-дегидрогеназ окисления липидов.",
        "detailsEn": "Coenzyme for acyl-CoA dehydrogenases in mitochondrial lipid breakdown."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000015",
    "code": "MET_FADH2",
    "nameRu": "ФАДН₂",
    "nameEn": "FADH₂",
    "abbrevRu": "ФАДН₂",
    "abbrevEn": "FADH₂",
    "formula": "C₂₇H₃₅N₉O₁₅P₂",
    "carbons": "Энергоноситель (~1.5 АТФ)",
    "carbonsEn": "Energy carrier (~1.5 ATP)",
    "smiles": "CC1=CC2=C(C=C1C)NC3C(=O)NC(=O)NC3=N2",
    "chebi": "CHEBI:17877",
    "inchiKey": "YPZRHBJRZVGUNU-UHFFFAOYSA-N",
    "descriptionRu": "Восстановленная форма флавинадениндинуклеотида Комплекса II. Передает электроны через железосерные кластеры напрямую в мембранный пул убихинона (Q₁₀).",
    "descriptionEn": "Reduced flavin adenine dinucleotide of Complex II. Transfers electrons through Fe-S clusters directly into the membrane ubiquinone (Q₁₀) pool.",
    "synonymsRu": [
      "ФАДН₂",
      "FADH₂",
      "Восстановленный флавинадениндинуклеотид"
    ],
    "synonymsEn": [
      "FADH₂",
      "Reduced flavin adenine dinucleotide"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Образуется на стадии 6 сукцинатдегидрогеназой; дает ~1.5 АТФ при передаче электронов в убихинон.",
        "detailsEn": "Formed in step 6 by succinate dehydrogenase; yields ~1.5 ATP upon electron transfer to ubiquinone."
      },
      {
        "pathwayCode": "PWY_ETC",
        "pathwayNameRu": "Дыхательная цепь (Комплекс II)",
        "pathwayNameEn": "Electron Transport Chain (Complex II)",
        "isCurrentPathway": false,
        "role": "intermediate",
        "detailsRu": "Восстанавливает убихинон до убихинола (QH₂) во внутренней мембране.",
        "detailsEn": "Reduces ubiquinone to ubiquinol (QH₂) within the inner mitochondrial membrane."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000016",
    "code": "MET_GDP",
    "nameRu": "ГДФ",
    "nameEn": "GDP",
    "abbrevRu": "ГДФ",
    "abbrevEn": "GDP",
    "formula": "C₁₀H₁₅N₅O₁₁P₂",
    "carbons": "Нуклеотид",
    "carbonsEn": "Nucleotide (GDP)",
    "smiles": "NC1=NC(=O)C2=C(N1)N(C=N2)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@@H]1O",
    "chebi": "CHEBI:17552",
    "inchiKey": "QGWNDRXFNXRZMB-UHFFFAOYSA-N",
    "descriptionRu": "Пуриновый рибонуклеозиддифосфат. Акцептор неорганического фосфата в реакции субстратного фосфорилирования сукцинил-КоА-синтетазой.",
    "descriptionEn": "Purine ribonucleoside diphosphate. Inorganic phosphate acceptor in the substrate-level phosphorylation reaction catalyzed by succinyl-CoA synthetase.",
    "synonymsRu": [
      "ГДФ",
      "Гуанозин-5′-дифосфат",
      "GDP"
    ],
    "synonymsEn": [
      "GDP",
      "Guanosine 5′-diphosphate"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "cofactor",
        "detailsRu": "Стадия 5: фосфорилируется до ГТФ за счет энергии тиоэфирной связи сукцинил-КоА.",
        "detailsEn": "Step 5: phosphorylated to GTP driven by high-energy thioester bond cleavage of succinyl-CoA."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000017",
    "code": "MET_GTP",
    "nameRu": "ГТФ",
    "nameEn": "GTP",
    "abbrevRu": "ГТФ",
    "abbrevEn": "GTP",
    "formula": "C₁₀H₁₆N₅O₁₄P₃",
    "carbons": "Макроэрг (1 АТФ)",
    "carbonsEn": "Macroergic nucleotide (1 ATP)",
    "smiles": "NC1=NC(=O)C2=C(N1)N(C=N2)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@@H]1O",
    "chebi": "CHEBI:15996",
    "inchiKey": "XKMLYBNGHNGKST-UHFFFAOYSA-N",
    "descriptionRu": "Высокоэнергетический нуклеотидтрифосфат. Единственный продукт цикла Кребса, образующийся путем субстратного фосфорилирования без прямого участия дыхательной цепи.",
    "descriptionEn": "High-energy nucleoside triphosphate. The sole high-energy phosphate produced directly by substrate-level phosphorylation in the citric acid cycle.",
    "synonymsRu": [
      "ГТФ",
      "Гуанозин-5′-трифосфат",
      "GTP"
    ],
    "synonymsEn": [
      "GTP",
      "Guanosine 5′-triphosphate"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 5: прямой макроэргический выход одного оборота цикла (сукцинил-КоА-синтетаза).",
        "detailsEn": "Step 5: direct macroergic output of one cycle revolution (succinyl-CoA synthetase)."
      },
      {
        "pathwayCode": "PWY_GNG",
        "pathwayNameRu": "Глюконеогенез",
        "pathwayNameEn": "Gluconeogenesis",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Донор фосфата для митохондриальной фосфоенолпируваткарбоксикиназы (PEPCK-M).",
        "detailsEn": "Phosphate donor for mitochondrial phosphoenolpyruvate carboxykinase (PEPCK-M)."
      },
      {
        "pathwayCode": "PWY_PROTEIN_SYN",
        "pathwayNameRu": "Биосинтез белка (Трансляция)",
        "pathwayNameEn": "Protein Biosynthesis (Translation)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Энергетическое обеспечение факторов инициации и элонгации рибосомального синтеза.",
        "detailsEn": "Supplies energy for ribosomal initiation, elongation, and translocation factors."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000011",
    "code": "MET_COA",
    "nameRu": "Кофермент A (КоА-SH)",
    "nameEn": "Coenzyme A (CoA-SH)",
    "abbrevRu": "КоА-SH",
    "abbrevEn": "CoA-SH",
    "formula": "C₂₁H₃₆N₇O₁₆P₃S",
    "carbons": "Кофермент (B₅)",
    "carbonsEn": "Coenzyme (B₅)",
    "smiles": "CC(C)(COP(=O)(O)OP(=O)(O)OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)C(C(=O)NCCC(=O)NCCS)O",
    "chebi": "CHEBI:15346",
    "inchiKey": "RGJOEKWQDUBAIZ-UHFFFAOYSA-N",
    "descriptionRu": "Универсальный клеточный переносчик ацильных и ацетильных остатков. Включает пантотеновую кислоту (витамин B₅) и концевую тиольную (-SH) группу.",
    "descriptionEn": "Universal cellular acyl and acetyl carrier. Composed of pantothenic acid (vitamin B₅) and a terminal reactive thiol (-SH) group.",
    "synonymsRu": [
      "Кофермент A (КоА-SH)",
      "Кофермент A",
      "Коэнзим А",
      "КоА-SH",
      "КоА",
      "CoA",
      "CoA-SH"
    ],
    "synonymsEn": [
      "Coenzyme A (CoA-SH)",
      "Coenzyme A",
      "CoA-SH",
      "CoA",
      "HS-CoA"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "cofactor",
        "detailsRu": "Освобождается на стадиях 1 и 5, связывается на стадии 4 с образованием сукцинил-КоА.",
        "detailsEn": "Released in steps 1 and 5, condensed in step 4 to form succinyl-CoA."
      },
      {
        "pathwayCode": "PWY_PDH",
        "pathwayNameRu": "ПДХ комплекс",
        "pathwayNameEn": "PDH Complex",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Принимает ацетильную группу от E2 ➔ Ацетил-КоА.",
        "detailsEn": "Accepts acetyl group from E2 subunit yielding Acetyl-CoA."
      },
      {
        "pathwayCode": "PWY_BETA_OX",
        "pathwayNameRu": "β-Окисление липидов",
        "pathwayNameEn": "Fatty Acid β-Oxidation",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Образование ацил-КоА и тиолитическое отщепление ацетил-КоА.",
        "detailsEn": "Formation of fatty acyl-CoA and thiolytic release of Acetyl-CoA."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000019",
    "code": "MET_PI",
    "nameRu": "Неорганический фосфат (Фᵢ)",
    "nameEn": "Phosphate (Pᵢ)",
    "abbrevRu": "Фᵢ",
    "abbrevEn": "Pᵢ",
    "formula": "HPO₄²⁻",
    "carbons": "Фосфат",
    "carbonsEn": "Inorganic anion (Pᵢ)",
    "smiles": "OP(=O)(O)[O-]",
    "chebi": "CHEBI:43474",
    "inchiKey": "NBIIXXVUZAFLBC-UHFFFAOYSA-L",
    "descriptionRu": "Неорганический ортофосфат-анион. Транспортируется в матрикс фосфатным переносчиком (PiC / SLC25A3) симпортом с H⁺.",
    "descriptionEn": "Inorganic orthophosphate anion. Transported into matrix by the phosphate carrier (PiC / SLC25A3) in symport with H⁺.",
    "synonymsRu": [
      "Фосфат неорганический",
      "Фᵢ",
      "Pᵢ",
      "Ортофосфат"
    ],
    "synonymsEn": [
      "Inorganic phosphate",
      "Pᵢ",
      "Orthophosphate",
      "Phosphate ion"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "cofactor",
        "detailsRu": "Стадия 5: субстрат сукцинил-КоА-синтетазы (образование фосфогистидинового интермедиата).",
        "detailsEn": "Step 5: substrate for succinyl-CoA synthetase forming phosphohistidine enzyme intermediate."
      },
      {
        "pathwayCode": "PWY_OXPHOS",
        "pathwayNameRu": "Окислительное фосфорилирование",
        "pathwayNameEn": "Oxidative Phosphorylation",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Субстрат митохондриальной АТФ-синтазы (Комплекс V): АДФ + Фᵢ ➔ АТФ.",
        "detailsEn": "Substrate for mitochondrial ATP synthase (Complex V): ADP + Pᵢ ➔ ATP."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000018",
    "code": "MET_CO2",
    "nameRu": "Диоксид углерода (CO₂)",
    "nameEn": "Carbon dioxide (CO₂)",
    "abbrevRu": "CO₂",
    "abbrevEn": "CO₂",
    "formula": "CO₂",
    "carbons": "1C",
    "carbonsEn": "1C",
    "smiles": "O=C=O",
    "chebi": "CHEBI:16526",
    "inchiKey": "CURLTTPVMYMDTN-UHFFFAOYSA-N",
    "descriptionRu": "Конечный продукт декарбоксилирования. В ЦТК выделяются 2 молекулы CO₂ (стадии 3 и 4), что соответствует полному сгоранию 2 углеродов ацетильной группы.",
    "descriptionEn": "End-product of oxidative decarboxylation. Two CO₂ molecules are released per cycle revolution (steps 3 and 4), corresponding to complete oxidation of the two acetyl carbons.",
    "synonymsRu": [
      "Диоксид углерода",
      "Углекислый газ",
      "CO₂",
      "Двуокись углерода",
      "Угольный ангидрид"
    ],
    "synonymsEn": [
      "Carbon dioxide",
      "CO₂",
      "Carbonic anhydride",
      "Carbonic acid gas"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PW-PDH",
        "pathwayNameRu": "Комплекс ПДХ (Матрикс)",
        "pathwayNameEn": "PDH Complex (Matrix)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Окислительное декарбоксилирование пирувата: выделение 1 молекулы CO₂ на молекулу пирувата (2 CO₂ на глюкозу).",
        "detailsEn": "Oxidative decarboxylation of pyruvate: release of 1 CO₂ per pyruvate (2 CO₂ per glucose).",
        "stepNumber": 1,
        "reactionCode": "R_PDH"
      },
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадии 3 (ИДГ3) и 4 (ОГДГ): выделение двух молекул CO₂ за оборот.",
        "detailsEn": "Steps 3 (IDH3) and 4 (α-KGDH): release of two CO₂ molecules per cycle turn."
      },
      {
        "pathwayCode": "PWY_UREA",
        "pathwayNameRu": "Цикл мочевины",
        "pathwayNameEn": "Urea Cycle",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Субстрат карбамоилфосфатсинтетазы I (в форме бикарбоната HCO₃⁻).",
        "detailsEn": "Substrate for carbamoyl phosphate synthetase I (as bicarbonate HCO₃⁻)."
      },
      {
        "pathwayCode": "PWY_GNG",
        "pathwayNameRu": "Глюконеогенез (Анаплероз)",
        "pathwayNameEn": "Gluconeogenesis (Anaplerosis)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Карбоксилирование пирувата в оксалоацетат пируваткарбоксилазой (ПК).",
        "detailsEn": "Carboxylation of pyruvate to oxaloacetate by pyruvate carboxylase (PC)."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000021",
    "code": "MET_COQ10",
    "nameRu": "Кофермент Q₁₀ (Убихинон)",
    "nameEn": "Coenzyme Q₁₀",
    "abbrevRu": "Q₁₀",
    "abbrevEn": "CoQ₁₀",
    "formula": "C₅₉H₉₀O₄",
    "carbons": "Бензохинон",
    "carbonsEn": "Lipophilic carrier",
    "smiles": "CC1=C(C(=O)C(=C(C1=O)OC)OC)CC=C(C)CCC=C(C)C",
    "chebi": "CHEBI:46245`",
    "inchiKey": "QYSPLQLAKJAUJT-UHFFFAOYSA-N",
    "descriptionRu": "Жирорастворимый подвижный переносчик электронов в липидном бислое внутренней мембраны митохондрий. Принимает электроны от Комплекса I и Комплекса II (СДГ).",
    "descriptionEn": "Lipophilic mobile electron carrier in the inner mitochondrial membrane bilayer. Accepts electrons from Complexes I and II (SDH).",
    "synonymsRu": [
      "Убихинон",
      "Коэнзим Q10",
      "CoQ10",
      "Q10"
    ],
    "synonymsEn": [
      "Ubiquinone",
      "Coenzyme Q10",
      "CoQ10",
      "Q10"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "cofactor",
        "detailsRu": "Стадия 6 (СДГ): акцептор электронов от FADH₂ с образованием убихинола (QH₂).",
        "detailsEn": "Step 6 (SDH): terminal electron acceptor from FADH₂ forming ubiquinol (QH₂)."
      },
      {
        "pathwayCode": "PWY_ETC",
        "pathwayNameRu": "Дыхательная цепь",
        "pathwayNameEn": "Electron Transport Chain",
        "isCurrentPathway": false,
        "role": "intermediate",
        "detailsRu": "Переносчик электронов от Комплексов I и II к Комплексу III.",
        "detailsEn": "Mobile electron shuttle linking Complexes I & II to Complex III."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000020",
    "code": "MET_WATER",
    "nameRu": "Вода (H₂O)",
    "nameEn": "Water (H₂O)",
    "abbrevRu": "H₂O",
    "abbrevEn": "H₂O",
    "formula": "H₂O",
    "carbons": "Растворитель",
    "carbonsEn": "Solvent (H₂O)",
    "smiles": "O",
    "chebi": "CHEBI:15377",
    "inchiKey": "XLYOFNOQVPJJNP-UHFFFAOYSA-N",
    "descriptionRu": "Полярный клеточный растворитель и субстрат гидролитических и гидратационных реакций клеточного метаболизма.",
    "descriptionEn": "Polar cellular solvent and reactive substrate in hydrolytic and hydration reactions of cellular metabolism.",
    "synonymsRu": [
      "Вода",
      "H2O",
      "Оксид водорода"
    ],
    "synonymsEn": [
      "Water",
      "H2O",
      "Dihydrogen monoxide"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "cofactor",
        "detailsRu": "Стадии 1 (гидролиз цитрил-КоА), 2 (гидратация цис-аконитата) и 7 (гидратация фумарата).",
        "detailsEn": "Steps 1 (citryl-CoA hydrolysis), 2 (cis-aconitate hydration), and 7 (fumarate hydration)."
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Гидролиз лактозы (Лактаза LCT)",
        "pathwayNameEn": "Lactose Hydrolysis (Lactase LCT)",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Расщепляет β-1,4-гликозидную связь лактозы на D-галактозу и D-глюкозу.",
        "detailsEn": "Hydrolyzes lactose β-1,4 glycosidic bond into D-galactose and D-glucose."
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Гидролиз сахарозы (Сахараза SI)",
        "pathwayNameEn": "Sucrose Hydrolysis (Sucrase SI)",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Расщепляет α-1↔2-β связь сахарозы на D-фруктозу и D-глюкозу.",
        "detailsEn": "Hydrolyzes sucrose α-1↔2-β glycosidic bond into D-fructose and D-glucose."
      }
    ]
  },
  {
    "id": "b0000005-0000-0000-0000-000000000010",
    "code": "MET_UTP",
    "nameRu": "Уридинтрифосфат (УТФ)",
    "nameEn": "Uridine triphosphate (UTP)",
    "abbrevRu": "УТФ",
    "abbrevEn": "UTP",
    "formula": "C₉H₁₁N₂O₁₅P₃⁴⁻",
    "carbons": "Нуклеотид (пиримидин)",
    "carbonsEn": "Pyrimidine nucleotide triphosphate",
    "smiles": "O=c1ccn([C@@H]2O[C@H](COP(=O)([O-])OP(=O)([O-])OP(=O)([O-])[O-])[C@@H](O)[C@H]2O)c(=O)[nH]1",
    "chebi": "CHEBI:15713",
    "inchiKey": "PGAVKHMUGHYSFO-XVFCMESISA-J",
    "descriptionRu": "Высокоэнергетический пиримидиновый нуклеотидтрифосфат — специфический энергетический донор активации моносахаридов (Г1Ф + УТФ ➔ УДФ-глюкоза + ФФᵢ) перед синтезом гликогена и реакциями пути Лелуара.",
    "descriptionEn": "High-energy pyrimidine nucleoside triphosphate used specifically to activate hexose-1-phosphates into UDP-sugars (G1P + UTP ➔ UDP-glucose + PPᵢ) for glycogenesis.",
    "synonymsRu": [
      "Уридинтрифосфат",
      "УТФ",
      "UTP",
      "Уридин-5′-трифосфат"
    ],
    "synonymsEn": [
      "Uridine triphosphate",
      "UTP",
      "Uridine 5'-triphosphate"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Синтез)",
        "pathwayNameEn": "Glycogen Metabolism (Glycogenesis)",
        "isCurrentPathway": true,
        "role": "cofactor",
        "detailsRu": "Стадия 1 (UGP2): отдаёт УМФ-фрагмент на Г1Ф для образования УДФ-глюкозы с выходом ФФᵢ.",
        "detailsEn": "Step 1 (UGP2): transfers UMP onto G1P releasing PPᵢ to form UDP-glucose."
      }
    ]
  },
  {
    "id": "b0000005-0000-0000-0000-000000000011",
    "code": "MET_UDP",
    "nameRu": "Уридиндифосфат (УДФ)",
    "nameEn": "Uridine diphosphate (UDP)",
    "abbrevRu": "УДФ",
    "abbrevEn": "UDP",
    "formula": "C₉H₁₁N₂O₁₂P₂³⁻",
    "carbons": "Нуклеотид (пиримидин)",
    "carbonsEn": "Pyrimidine nucleotide diphosphate",
    "smiles": "O=c1ccn([C@@H]2O[C@H](COP(=O)([O-])OP(=O)([O-])[O-])[C@@H](O)[C@H]2O)c(=O)[nH]1",
    "chebi": "CHEBI:17659",
    "inchiKey": "XCCTYIAWTASOJW-XVFCMESISA-K",
    "descriptionRu": "Пиримидиннуклеозиддифосфат — уходящая группа в реакции гликогенсинтазы (GYS) и гликозилтрансфераз; затем регенерируется в УТФ нуклеозиддифосфаткиназой за счёт 1 АТФ.",
    "descriptionEn": "Pyrimidine nucleoside diphosphate released by glycogen synthase (GYS) upon glucosyl transfer; phosphorylated back to UTP by nucleoside diphosphate kinase using 1 ATP.",
    "synonymsRu": [
      "Уридиндифосфат",
      "УДФ",
      "UDP",
      "Уридин-5′-дифосфат"
    ],
    "synonymsEn": [
      "Uridine diphosphate",
      "UDP",
      "Uridine 5'-diphosphate"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Синтез)",
        "pathwayNameEn": "Glycogen Metabolism (Glycogenesis)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 2 (GYS): освобождается при переносе остатка глюкозы с УДФ-глюкозы на гликоген (регенерация УДФ + АТФ ➔ УТФ + АДФ).",
        "detailsEn": "Step 2 (GYS): released upon glucosyl transfer from UDP-glucose onto glycogen (regenerated to UTP using 1 ATP)."
      }
    ]
  },
  {
    "id": "b0000005-0000-0000-0000-000000000012",
    "code": "MET_PPI",
    "nameRu": "Пирофосфат (ФФᵢ)",
    "nameEn": "Pyrophosphate (PPᵢ)",
    "abbrevRu": "ФФᵢ",
    "abbrevEn": "PPᵢ",
    "formula": "P₂O₇⁴⁻",
    "carbons": "Дифосфат",
    "carbonsEn": "Inorganic diphosphate (PPᵢ)",
    "smiles": "O=P([O-])([O-])OP(=O)([O-])[O-]",
    "chebi": "CHEBI:29888",
    "inchiKey": "XPPKVPWEQAFLFU-UHFFFAOYSA-J",
    "descriptionRu": "Неорганический дифосфат (пирофосфат). Быстрый необратимый гидролиз ФФᵢ + H₂O ➔ 2 Фᵢ неорганической пирофосфатазой (PPA1, ΔG°′ = −19 кДж/моль) делает синтез УДФ-глюкозы термодинамически однонаправленным.",
    "descriptionEn": "Inorganic diphosphate (pyrophosphate). Rapid exergonic hydrolysis (PPᵢ + H₂O ➔ 2 Pᵢ, ΔG°′ = −19 kJ/mol) by inorganic pyrophosphatase PPA1 renders UDP-glucose formation irreversible in vivo.",
    "synonymsRu": [
      "Пирофосфат",
      "Неорганический пирофосфат",
      "ФФᵢ",
      "PPᵢ",
      "PPi"
    ],
    "synonymsEn": [
      "Pyrophosphate",
      "Inorganic pyrophosphate",
      "PPᵢ",
      "PPi"
    ],
    "isCofactor": true,
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Синтез)",
        "pathwayNameEn": "Glycogen Metabolism (Glycogenesis)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 1 (UGP2): образуется при атаке Г1Ф на α-фосфат УТФ и немедленно расщепляется пирофосфатазой (PPA1), сдвигая реакцию к УДФ-глюкозе.",
        "detailsEn": "Step 1 (UGP2): expelled during UDP-glucose formation and rapidly hydrolyzed by PPA1 to pull glycogenesis forward."
      }
    ]
  }
];
