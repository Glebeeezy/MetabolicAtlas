import { BiologicalMetabolite } from '../../../core/metabolism/models';

export const BIOLOGICAL_HUMAN_METABOLITES: BiologicalMetabolite[] = [
  {
    "id": "b0000002-0000-0000-0000-000000000001",
    "code": "MET_GLUCOSE",
    "nameRu": "D-Глюкоза",
    "nameEn": "D-Glucose",
    "abbrevRu": "Глю",
    "abbrevEn": "Glc",
    "formula": "C₆H₁₂O₆",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C(C1C(C(C(C(O1)O)O)O)O)O",
    "chebi": "CHEBI:17234",
    "inchiKey": "WQZGKKKJIJFFOK-GASJEMHNSA-N",
    "descriptionRu": "Главный первичный моносахарид энергетического обмена человека. Поступает из крови в цитозоль клеток через переносчики семейства GLUT (SLC2A). Служит исходным субстратом гликолиза, пентозофосфатного пути и синтеза гликогена.",
    "descriptionEn": "Primary hexose monosaccharide and ubiquitous cellular fuel of human metabolism. Enters cells from blood plasma via facilitative glucose transporters (GLUT1-4).",
    "synonymsRu": [
      "Глюкоза",
      "D-Глюкопираноза",
      "Декстроза",
      "Виноградный сахар"
    ],
    "synonymsEn": [
      "D-Glucose",
      "Dextrose",
      "D-Glucopyranose",
      "Blood sugar"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 1 (Гексокиназа HK): необратимо фосфорилируется с затратой 1 АТФ в глюкозо-6-фосфат (G6P).",
        "detailsEn": "Step 1 (Hexokinase HK): irreversibly phosphorylated consuming 1 ATP into glucose 6-phosphate (G6P).",
        "stepNumber": 1,
        "reactionCode": "R_HK",
        "reactionNameRu": "Фосфорилирование глюкозы гексокиназой",
        "reactionNameEn": "Hexokinase phosphorylation of glucose"
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Галактоза ➔ Г6Ф ➔ Глюкоза)",
        "pathwayNameEn": "Leloir Pathway (Galactose ➔ G6P ➔ Glucose)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Синтез глюкозы из галактозы в печени: Галактоза ➔ Gal-1-P ➔ UDP-Gal ➔ UDP-Glc ➔ G1P ➔ G6P (PGM1), затем глюкозо-6-фосфатаза (G6PC1) отщепляет фосфат, выпуская свободную D-глюкозу в кровь.",
        "detailsEn": "Hepatic glucose synthesis from galactose: Galactose ➔ Gal-1-P ➔ UDP-Gal ➔ UDP-Glc ➔ G1P ➔ G6P (PGM1), then hepatic glucose-6-phosphatase (G6PC1) releases free D-glucose into blood.",
        "stepNumber": 4,
        "reactionCode": "R_PGM1"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Фруктолиз / Печёночный синтез глюкозы",
        "pathwayNameEn": "Fructolysis / Hepatic Glucose Synthesis",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Синтез глюкозы из фруктозы в печени: Фруктоза ➔ F1P ➔ ДАФ + ГА (альдолаза B) ➔ ГАФ (ТКФК) ➔ конденсация в F1,6BP ➔ F6P (FBP1) ➔ G6P ➔ свободная D-глюкоза через глюкозо-6-фосфатазу (G6PC1).",
        "detailsEn": "Hepatic glucose synthesis from fructose: Fructose ➔ F1P ➔ DHAP + GA (ALDOB) ➔ G3P (TKFC) ➔ reverse aldolase to F1,6BP ➔ F6P (FBP1) ➔ G6P ➔ free D-glucose via G6PC1.",
        "stepNumber": 2,
        "reactionCode": "R_ALDOB"
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Гидролиз лактозы (LCT) ➔ Гал + Глю",
        "pathwayNameEn": "Lactose Hydrolysis (LCT) ➔ Gal + Glc",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Пищевой вход (Лактаза LCT): β-1,4-гидролиз дисахарида лактозы даёт 1 молекулу D-галактозы и 1 молекулу свободной D-глюкозы.",
        "detailsEn": "Dietary disaccharide entry (Lactase LCT): β-1,4 hydrolysis of lactose yields 1 D-galactose and 1 free D-glucose.",
        "stepNumber": 0,
        "reactionCode": "R_LCT"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Гидролиз сахарозы (SI) ➔ Глю + Фру",
        "pathwayNameEn": "Sucrose Hydrolysis (SI) ➔ Glc + Fru",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Пищевой вход (Сахараза-изомальтаза SI): гидролиз пищевой сахарозы даёт 1 молекулу D-фруктозы и 1 молекулу свободной D-глюкозы.",
        "detailsEn": "Dietary disaccharide entry (Sucrase-isomaltase SI): sucrose cleavage yields 1 D-fructose and 1 free D-glucose.",
        "stepNumber": 0,
        "reactionCode": "R_SI"
      },
      {
        "pathwayCode": "PWY_PPP",
        "pathwayNameRu": "Пентозофосфатный путь (ПФП)",
        "pathwayNameEn": "Pentose Phosphate Pathway",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Через G6P направляется в окислительную ветвь для синтеза НАДФН и рибозо-5-фосфата.",
        "detailsEn": "Channels via G6P into oxidative branch to generate NADPH and ribose 5-phosphate."
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000002",
    "code": "MET_G6P",
    "nameRu": "Глюкозо-6-фосфат",
    "nameEn": "Glucose 6-phosphate",
    "abbrevRu": "Г6Ф",
    "abbrevEn": "G6P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C(C1C(C(C(C(O1)O)O)O)O)OP(=O)([O-])[O-]",
    "chebi": "CHEBI:14314",
    "inchiKey": "NBSCHQHZLSJFNQ-GASJEMHNSA-L",
    "descriptionRu": "Ключевой фосфорилированный узел углеводного метаболизма («ловушка глюкозы в клетке»). Не способен диффундировать через мембрану. Перекрёсток гликолиза, гликогеногенеза, пентозофосфатного шунта и гликогенолиза.",
    "descriptionEn": "Monomeric glucose locked inside the cytoplasm via hexokinase phosphorylation. Master metabolic crossroads for glycolysis, glycogenesis, and pentose phosphate pathway.",
    "synonymsRu": [
      "Глюкозо-6-фосфат",
      "Г6Ф",
      "Эфир Робисона"
    ],
    "synonymsEn": [
      "Glucose 6-phosphate",
      "G6P",
      "Robison ester"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 1 (Гексокиназа HK): продукт фосфорилирования D-глюкозы за счет АТФ.",
        "detailsEn": "Step 1 (Hexokinase HK): product of D-glucose phosphorylation by ATP.",
        "stepNumber": 1,
        "reactionCode": "R_HK"
      },
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 2 (Фосфоглюкоизомераза GPI): обратимо изомеризуется во фруктозо-6-фосфат (F6P).",
        "detailsEn": "Step 2 (GPI): reversibly isomerized into ketose fructose 6-phosphate (F6P).",
        "stepNumber": 2,
        "reactionCode": "R_GPI"
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Узел слияния галактозы: фосфоглюкомутаза 1 (PGM1) обратимо превращает глюкозо-1-фосфат (G1P) из пути Лелуара в G6P. В печени глюкозо-6-фосфатаза (G6PC1) отщепляет фосфат с выходом свободной D-глюкозы в кровь.",
        "detailsEn": "Galactose junction: PGM1 reversibly converts G1P from Leloir pathway into G6P. In liver, G6PC1 dephosphorylates G6P to release free D-glucose into blood.",
        "stepNumber": 4,
        "reactionCode": "R_PGM1"
      },
      {
        "pathwayCode": "PWY_PPP",
        "pathwayNameRu": "Пентозофосфатный путь (ПФП)",
        "pathwayNameEn": "Pentose Phosphate Pathway",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Окисляется G6PDH с генерацией первой молекулы НАДФН для антиоксидантной защиты.",
        "detailsEn": "First committed substrate of pentose phosphate pathway producing NADPH."
      },
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Синтез и распад)",
        "pathwayNameEn": "Glycogen Metabolism (Synthesis & Breakdown)",
        "isCurrentPathway": false,
        "role": "intermediate",
        "detailsRu": "Через обратимую фосфоглюкомутазу (PGM1) Г6Ф переходит в Г1Ф для синтеза гликогена (UGP2 ➔ GYS), а при гликогенолизе принимает Г1Ф обратно в гликолиз или на экспорт в печень (G6PC1).",
        "detailsEn": "Reversibly interconverts with G1P via PGM1, linking glucose activation for glycogenesis (UGP2 ➔ GYS) and glycogenolysis flux into glycolysis or hepatic glucose export.",
        "stepNumber": 4,
        "reactionCode": "R_PGM1"
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000003",
    "code": "MET_F6P",
    "nameRu": "Фруктозо-6-фосфат",
    "nameEn": "Fructose 6-phosphate",
    "abbrevRu": "Ф6Ф",
    "abbrevEn": "F6P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C(C1(C(C(C(O1)COP(=O)([O-])[O-])O)O)O)O",
    "chebi": "CHEBI:15946",
    "inchiKey": "BGWGXPAPYGQALX-UHFFFAOYSA-L",
    "descriptionRu": "Кетогексозный фосфорилированный интермедиат. Субстрат ключевого необратимого звена гликолиза — фосфофруктокиназы-1 (PFK-1).",
    "descriptionEn": "Ketohexose phosphate intermediate in the preparatory phase of glycolysis, phosphorylated to F1,6BP.",
    "synonymsRu": [
      "Фруктозо-6-фосфат",
      "Ф6Ф",
      "Эфир Нейберга"
    ],
    "synonymsEn": [
      "Fructose 6-phosphate",
      "F6P",
      "Neuberg ester"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 2 (Фосфоглюкоизомераза GPI): образуется изомеризацией G6P.",
        "detailsEn": "Step 2 (GPI): synthesized by reversible isomerization of G6P.",
        "stepNumber": 2,
        "reactionCode": "R_GPI"
      },
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 3 (Фосфофруктокиназа-1 PFK-1): главный регуляторный перекресток; фосфорилируется с расходом второй АТФ в Ф-1,6-БФ.",
        "detailsEn": "Step 3 (PFK-1): primary rate-limiting control point; irreversibly phosphorylated consuming second ATP to form F1,6BP.",
        "stepNumber": 3,
        "reactionCode": "R_PFK1"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Фруктолиз (Мышцы / Адипоциты)",
        "pathwayNameEn": "Fructolysis (Muscle / Adipose)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Внепеченочный путь (мышцы, жировая ткань): гексокиназа (HK) напрямую фосфорилирует D-фруктозу за счёт 1 АТФ в Ф6Ф (F6P), который далее идёт либо в гликолиз (PFK-1), либо в печени изомеризуется в Г6Ф ➔ D-глюкозу (G6PC1).",
        "detailsEn": "Extrahepatic path (muscle, adipose): hexokinase (HK) directly phosphorylates D-fructose with 1 ATP into F6P, entering glycolysis (PFK-1) or isomerizing to G6P ➔ glucose.",
        "stepNumber": 4,
        "reactionCode": "R_HK_FRU"
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000004",
    "code": "MET_F16BP",
    "nameRu": "Фруктозо-1,6-бисфосфат",
    "nameEn": "Fructose 1,6-bisphosphate",
    "abbrevRu": "Ф1,6БФ",
    "abbrevEn": "F1,6BP",
    "formula": "C₆H₁₀O₁₂P₂⁴⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C(C1(C(C(C(O1)COP(=O)([O-])[O-])O)O)O)OP(=O)([O-])[O-]",
    "chebi": "CHEBI:28013",
    "inchiKey": "RNBNDBCJAYNGJH-UHFFFAOYSA-J",
    "descriptionRu": "Дважды фосфорилированный гексозный интермедиат. Продукт главной регуляторной точки гликолиза (PFK-1). Расщепляется альдолазой на две триозы (ГАФ и ДАФ). Служит прямым аллостерическим активатором пируваткиназы (прямая связь / feedforward).",
    "descriptionEn": "Bisphosphorylated hexose committed to glycolytic cleavage by aldolase into GAP and DHAP. Serves as potent feedforward activator of pyruvate kinase.",
    "synonymsRu": [
      "Фруктозо-1,6-дифосфат",
      "Ф1,6БФ",
      "Эфир Хардена-Янга"
    ],
    "synonymsEn": [
      "Fructose 1,6-bisphosphate",
      "F1,6BP",
      "Harden-Young ester"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз",
        "pathwayNameEn": "Glycolysis",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Стадия 4: расщепляется альдолазой на глицеральдегид-3-фосфат (ГАФ) и дигидроксиацетонфосфат (ДАФ).",
        "detailsEn": "Step 4: cleaved by aldolase into glyceraldehyde 3-phosphate (GAP) and dihydroxyacetone phosphate (DHAP).",
        "stepNumber": 4,
        "reactionCode": "R_ALDO"
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000005",
    "code": "MET_DHAP",
    "nameRu": "Дигидроксиацетонфосфат",
    "nameEn": "Dihydroxyacetone phosphate",
    "abbrevRu": "ДАФ",
    "abbrevEn": "DHAP",
    "formula": "C₃H₅O₆P²⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "C(C(=O)CO)OP(=O)([O-])[O-]",
    "chebi": "CHEBI:16108",
    "inchiKey": "GNGACRATGGDKBX-UHFFFAOYSA-L",
    "descriptionRu": "Кетотриозный фосфат, мост между гликолизом и липидным обменом. Восстанавливается в глицерол-3-фосфат для синтеза триглицеридов и фосфолипидов. Изомеризуется в ГАФ триозофосфатизомеразой.",
    "descriptionEn": "Ketotriose phosphate linking glycolysis with lipid biosynthesis via glycerol 3-phosphate dehydrogenase.",
    "synonymsRu": [
      "Дигидроксиацетонфосфат",
      "ДАФ",
      "Глицеронфосфат"
    ],
    "synonymsEn": [
      "Dihydroxyacetone phosphate",
      "DHAP",
      "Glycerone phosphate"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 4 (Альдолаза A): образуется при расщеплении фруктозо-1,6-бисфосфата.",
        "detailsEn": "Step 4 (Aldolase A): product formed from F1,6BP cleavage.",
        "stepNumber": 4,
        "reactionCode": "R_ALDO"
      },
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 5 (Триозофосфатизомераза TPI): конвертируется в ГАФ, увлекая поток углерода во вторую фазу гликолиза.",
        "detailsEn": "Step 5 (TPI): isomerized to GAP, routing carbon flux into payoff phase.",
        "stepNumber": 5,
        "reactionCode": "R_TPI"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Печёночный фруктолиз (обход PFK-1)",
        "pathwayNameEn": "Hepatic Fructolysis (PFK-1 Bypass)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Фруктоза в печени: KHK (-1 АТФ) даёт F1P, который альдолаза B (ALDOB) расщепляет прямо на ДАФ и глицеральдегид, обходя главный тормоз гликолиза PFK-1. ДАФ + ГАФ могут идти вниз в пируват (+2 АТФ нетто) или вверх через альдолазу + FBP1 + G6PC1 в свободную глюкозу.",
        "detailsEn": "Hepatic fructose entry: KHK (-1 ATP) forms F1P cleaved by aldolase B (ALDOB) straight into DHAP and glyceraldehyde, bypassing the PFK-1 checkpoint. DHAP + G3P fuel glycolysis (+2 net ATP) or condense upward (FBP1 ➔ G6PC1) into glucose.",
        "stepNumber": 2,
        "reactionCode": "R_ALDOB"
      },
      {
        "pathwayCode": "PWY_LIPID_SYN",
        "pathwayNameRu": "Синтез триглицеридов",
        "pathwayNameEn": "Triglyceride Synthesis",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Восстанавливается в глицерол-3-фосфат для эстерификации жирных кислот.",
        "detailsEn": "Reduced to glycerol 3-phosphate serving as the glycerol backbone for lipid synthesis."
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000006",
    "code": "MET_G3P",
    "nameRu": "Глицеральдегид-3-фосфат",
    "nameEn": "Glyceraldehyde 3-phosphate",
    "abbrevRu": "ГАФ",
    "abbrevEn": "G3P",
    "formula": "C₃H₅O₆P²⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "C(C(C=O)O)OP(=O)([O-])[O-]",
    "chebi": "CHEBI:17138",
    "inchiKey": "LIZAPCGDNGTJPI-UHFFFAOYSA-L",
    "descriptionRu": "Альдотриозный фосфат, центральный метаболит энергопроизводящей фазы гликолиза. Все дальнейшие стадии протекают в двукратном расчете на одну молекулу глюкозы (2 × 3C).",
    "descriptionEn": "Aldotriose phosphate intermediate launching the energy-payoff phase of glycolysis (2x flux per glucose).",
    "synonymsRu": [
      "Глицеральдегид-3-фосфат",
      "ГАФ",
      "3-ФГА"
    ],
    "synonymsEn": [
      "Glyceraldehyde 3-phosphate",
      "G3P",
      "GAP"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадии 4 и 5: образуется напрямую из F1,6BP (альдолаза) и изомеризацией ДАФ (TPI).",
        "detailsEn": "Steps 4 & 5: synthesized directly from F1,6BP (aldolase) and via DHAP isomerization (TPI).",
        "stepNumber": 5,
        "reactionCode": "R_TPI"
      },
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 6 (GAPDH): окислительно фосфорилируется в 1,3-БФГ с выходом +2 НАДН на молекулу глюкозы.",
        "detailsEn": "Step 6 (GAPDH): oxidatively phosphorylated to 1,3-BPG yielding +2 NADH per original glucose.",
        "stepNumber": 6,
        "reactionCode": "R_GAPDH"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Печёночный фруктолиз (Слияние в ГАФ)",
        "pathwayNameEn": "Hepatic Fructolysis (G3P Convergence)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Триокиназа (TKFC, -1 АТФ) фосфорилирует D-глицеральдегид в ГАФ. В печени пул ГАФ + ДАФ либо сгорает в гликолизе до пирувата (+2 АТФ нетто), либо конденсируется альдолазой в F1,6BP ➔ F6P ➔ G6P ➔ глюкоза.",
        "detailsEn": "Triokinase (TKFC, -1 ATP) phosphorylates D-glyceraldehyde into G3P. In liver, G3P + DHAP either descend glycolysis to pyruvate (+2 net ATP) or condense upward into F1,6BP ➔ F6P ➔ G6P ➔ glucose.",
        "stepNumber": 3,
        "reactionCode": "R_TKFC"
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000007",
    "code": "MET_13BPG",
    "nameRu": "1,3-Бисфосфоглицерат",
    "nameEn": "1,3-Bisphosphoglycerate",
    "abbrevRu": "1,3-БФГ",
    "abbrevEn": "1,3-BPG",
    "formula": "C₃H₄O₁₀P₂⁴⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "C(C(C(=O)OP(=O)([O-])[O-])O)OP(=O)([O-])[O-]",
    "chebi": "CHEBI:16001",
    "inchiKey": "XKGCLGVOLLCOOF-UHFFFAOYSA-J",
    "descriptionRu": "Высокоэнергетический ацилфосфатный интермедиат гликолиза с высоким потенциалом переноса фосфатной группы (ΔG°' гидролиза = -49.3 кДж/моль), превосходящим АТФ.",
    "descriptionEn": "High-energy mixed anhydride intermediate containing acyl-phosphate bond capable of substrate-level phosphorylation.",
    "synonymsRu": [
      "1,3-Бисфосфоглицерат",
      "1,3-БФГ",
      "1,3-Дифосфоглицерат"
    ],
    "synonymsEn": [
      "1,3-Bisphosphoglycerate",
      "1,3-BPG",
      "1,3-Diphosphoglycerate"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз",
        "pathwayNameEn": "Glycolysis",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Стадия 7: отдает фосфат на АДФ через PGK1 с образованием первой порции АТФ и 3-фосфоглицерата.",
        "detailsEn": "Step 7: donates high-energy phosphate to ADP via PGK1 generating ATP and 3-phosphoglycerate.",
        "stepNumber": 7,
        "reactionCode": "R_PGK"
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000008",
    "code": "MET_3PG",
    "nameRu": "3-Фосфоглицерат",
    "nameEn": "3-Phosphoglycerate",
    "abbrevRu": "3-ФГ",
    "abbrevEn": "3-PG",
    "formula": "C₃H₄O₇P³⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "C(C(C(=O)[O-])O)OP(=O)([O-])[O-]",
    "chebi": "CHEBI:17794",
    "inchiKey": "OSJPPGNTCRNICK-UHFFFAOYSA-K",
    "descriptionRu": "Продукт первого субстратного фосфорилирования гликолиза. Предшественник биосинтеза аминокислоты серина (через фосфогидроксипируват).",
    "descriptionEn": "Carboxylate intermediate formed in the first ATP-generating step of glycolysis; precursor for serine synthesis.",
    "synonymsRu": [
      "3-Фосфоглицерат",
      "3-ФГ",
      "D-3-Фосфоглицериновая кислота"
    ],
    "synonymsEn": [
      "3-Phosphoglycerate",
      "3-PG",
      "Glycerate 3-phosphate"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз",
        "pathwayNameEn": "Glycolysis",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Стадия 8: изомеризуется фосфоглицератмутазой (PGAM1) в 2-фосфоглицерат.",
        "detailsEn": "Step 8: isomerized into 2-phosphoglycerate by phosphoglycerate mutase 1.",
        "stepNumber": 8,
        "reactionCode": "R_PGAM"
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000009",
    "code": "MET_2PG",
    "nameRu": "2-Фосфоглицерат",
    "nameEn": "2-Phosphoglycerate",
    "abbrevRu": "2-ФГ",
    "abbrevEn": "2-PG",
    "formula": "C₃H₄O₇P³⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "C(C(C(=O)[O-])OP(=O)([O-])[O-])O",
    "chebi": "CHEBI:17835",
    "inchiKey": "GZCGUPFRVQAUEE-UHFFFAOYSA-K",
    "descriptionRu": "Интермедиат предпоследней стадии гликолиза. Подвергается дегидратации енолазой с образованием енольного высокоэнергетического фосфоенолпирувата (ФЕП).",
    "descriptionEn": "Penultimate intermediate of glycolysis, dehydrated by enolase to generate high-energy phosphoenolpyruvate.",
    "synonymsRu": [
      "2-Фосфоглицерат",
      "2-ФГ",
      "Glycerate 2-phosphate"
    ],
    "synonymsEn": [
      "2-Phosphoglycerate",
      "2-PG",
      "D-2-Phosphoglyceric acid"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз",
        "pathwayNameEn": "Glycolysis",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Стадия 9: дегидратируется енолазой (ENO1-3) в фосфоенолпируват с отщеплением H₂O.",
        "detailsEn": "Step 9: dehydrated by enolase yielding phosphoenolpyruvate and 1 water molecule.",
        "stepNumber": 9,
        "reactionCode": "R_ENO"
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000010",
    "code": "MET_PEP",
    "nameRu": "Фосфоенолпируват",
    "nameEn": "Phosphoenolpyruvate",
    "abbrevRu": "ФЕП",
    "abbrevEn": "PEP",
    "formula": "C₃H₂O₆P³⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "C=C(C(=O)[O-])OP(=O)([O-])[O-]",
    "chebi": "CHEBI:18021",
    "inchiKey": "DTBNPXWJVRWANO-UHFFFAOYSA-K",
    "descriptionRu": "Соединение с наивысшим фосфатным потенциалом в живой клетке (ΔG°' гидролиза = -61.9 кДж/моль). Субстрат пируваткиназной реакции. Центральный пункт сопряжения гликолиза и глюконеогенеза (образуется из оксалоацетата через PEPCK).",
    "descriptionEn": "Highest-energy phosphate donor in living cells (-61.9 kJ/mol). Critical crossroads connecting glycolysis and gluconeogenesis via PEPCK.",
    "synonymsRu": [
      "Фосфоенолпируват",
      "ФЕП",
      "Фосфоенолпировиноградная кислота"
    ],
    "synonymsEn": [
      "Phosphoenolpyruvate",
      "PEP",
      "2-Phosphoenolpyruvate"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 9 (Енолаза ENO): образуется при дегидратации 2-фосфоглицерата с запасанием макроэргической энергии.",
        "detailsEn": "Step 9 (Enolase ENO): synthesized via 2-PG dehydration capturing high phosphate group transfer energy.",
        "stepNumber": 9,
        "reactionCode": "R_ENO"
      },
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз (Цитозоль)",
        "pathwayNameEn": "Glycolysis (Cytosol)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 10 (Пируваткиназа PK): отдает высокоэнергетический фосфат на АДФ с генерацией АТФ и пирувата.",
        "detailsEn": "Step 10 (Pyruvate kinase PK): donates high-energy phosphate to ADP yielding ATP and pyruvate.",
        "stepNumber": 10,
        "reactionCode": "R_PK"
      },
      {
        "pathwayCode": "PW-GLUCONEOGENESIS",
        "pathwayNameRu": "Глюконеогенез",
        "pathwayNameEn": "Gluconeogenesis",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Образуется из оксалоацетата под действием PEPCK-M (PCK2) или цитозольной PEPCK-C (PCK1).",
        "detailsEn": "Formed from oxaloacetate by phosphoenolpyruvate carboxykinase (PEPCK-M/C)."
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000011",
    "code": "MET_PYRUVATE",
    "nameRu": "Пируват (Цитозоль)",
    "nameEn": "Pyruvate (Cytosolic)",
    "abbrevRu": "Пир (Цит)",
    "abbrevEn": "Pyr (Cyt)",
    "formula": "C₃H₃O₃⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "CC(=O)C(=O)[O-]",
    "chebi": "CHEBI:15361",
    "inchiKey": "LCTONWCANYUPML-UHFFFAOYSA-M",
    "descriptionRu": "Конечный продукт цитоплазматического гликолиза. Фундаментальный метаболический перекресток клетки: транспортируется в матрикс митохондрий через MPC1/2, восстанавливается в лактат (ЛДГ) при гипоксии или трансаминируется в L-аланин (АлАТ).",
    "descriptionEn": "End product of cytoplasmic glycolysis. Major cellular crossroads: transported into mitochondrial matrix via MPC1/2, converted into lactate by LDH under hypoxia, or transaminated to alanine.",
    "synonymsRu": [
      "Пируват",
      "Пировиноградная кислота",
      "2-Оксопропаноат"
    ],
    "synonymsEn": [
      "Pyruvate",
      "Pyruvic acid",
      "2-Oxopropanoate"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOLISIS",
        "pathwayNameRu": "Гликолиз",
        "pathwayNameEn": "Glycolysis",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Конечный продукт гликолиза (2 молекулы на одну глюкозу).",
        "detailsEn": "End product of glycolysis (2 molecules per 1 glucose).",
        "stepNumber": 10,
        "reactionCode": "R_PK"
      },
      {
        "pathwayCode": "PW-TCA-CYCLE",
        "pathwayNameRu": "Митохондриальный транспорт и ПДХ",
        "pathwayNameEn": "Mitochondrial Inflow & PDH",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Транспортируется в матрикс переносчиком MPC1/2 для окисления в Ацетил-КоА.",
        "detailsEn": "Transported into matrix via MPC1/2 translocase for conversion to Acetyl-CoA."
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000012",
    "code": "MET_PYR_MIT",
    "nameRu": "Пируват (Матрикс)",
    "nameEn": "Pyruvate (Mitochondrial)",
    "abbrevRu": "Пир (Мит)",
    "abbrevEn": "Pyr (Mit)",
    "formula": "C₃H₃O₃⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "CC(=O)C(=O)[O-]",
    "chebi": "CHEBI:15361",
    "inchiKey": "LCTONWCANYUPML-UHFFFAOYSA-M",
    "descriptionRu": "Интрамитохондриальный пул пирувата в матриксе митохондрий. Непосредственный субстрат мультиферментного ПДХ-комплекса (окисление в Ацетил-КоА) и пируваткарбоксилазы (карбоксилирование в оксалоацетат для анаплероза ЦТК).",
    "descriptionEn": "Intramitochondrial pool of pyruvate inside matrix. Substrate for pyruvate dehydrogenase (yielding Acetyl-CoA) and pyruvate carboxylase (anaplerotic replenishment of oxaloacetate).",
    "synonymsRu": [
      "Пируват митохондриальный",
      "Пируват матрикса"
    ],
    "synonymsEn": [
      "Mitochondrial pyruvate",
      "Matrix pyruvate"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-MPC",
        "pathwayNameRu": "Мембранный транспорт (MPC1/2)",
        "pathwayNameEn": "Membrane Transport (MPC1/2)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Шлюз MPC1/2: доставлен из цитозоля в матрикс митохондрий.",
        "detailsEn": "MPC1/2 gateway: translocated from cytosol into mitochondrial matrix.",
        "stepNumber": 1,
        "reactionCode": "R_MPC"
      },
      {
        "pathwayCode": "PW-PDH",
        "pathwayNameRu": "Комплекс ПДХ (Матрикс)",
        "pathwayNameEn": "PDH Complex (Matrix)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 1 (Комплекс ПДХ E1-E2-E3): окислительно декарбоксилируется в центральный Ацетил-КоА с выделением CO₂ и выходом НАДН.",
        "detailsEn": "Step 1 (PDH Complex E1-E2-E3): oxidatively decarboxylated into central Acetyl-CoA with CO₂ release and NADH yield.",
        "stepNumber": 1,
        "reactionCode": "R_PDH"
      }
    ]
  },
  {
    "id": "b0000003-0000-0000-0000-000000000001",
    "code": "MET_GALACTOSE",
    "nameRu": "D-Галактоза",
    "nameEn": "D-Galactose",
    "abbrevRu": "Гал",
    "abbrevEn": "Gal",
    "formula": "C₆H₁₂O₆",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C([C@@H]1[C@@H]([C@@H]([C@H]([C@H](O1)O)O)O)O)O",
    "chebi": "CHEBI:28260",
    "inchiKey": "WQZGKKKJIJFFOK-PHYPRBDBSA-N",
    "descriptionRu": "C4-эпимер D-глюкозы, поступающий с молочным сахаром (лактозой = глюкоза + галактоза). Через 4 фермента пути Лелуара (GALK1 ➔ GALT/GALE ➔ PGM1) полностью превращается в Г6Ф, давая либо энергию в гликолизе (+2 АТФ нетто, -1 АТФ на вход как в глюкозе), либо свободную D-глюкозу крови в печени через G6PC1.",
    "descriptionEn": "C4 epimer of D-glucose derived from dietary lactose hydrolysis. Converted through the 4-step Leloir pathway (GALK1 ➔ GALT/GALE ➔ PGM1) into G6P for glycolysis (+2 net ATP) or hepatic glucose export (G6PC1).",
    "synonymsRu": [
      "D-Галактоза",
      "Галактоза",
      "Молочный сахар"
    ],
    "synonymsEn": [
      "D-Galactose",
      "Galactose",
      "Gal"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Гидролиз лактозы)",
        "pathwayNameEn": "Leloir Pathway (Lactose Hydrolysis)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Пищевой вход (Лактаза LCT): освобождается вместе с D-глюкозой при гидролизе молочной лактозы.",
        "detailsEn": "Dietary entry (Lactase LCT): released alongside D-glucose upon lactose hydrolysis.",
        "stepNumber": 0,
        "reactionCode": "R_LCT"
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 1 (Галактокиназа GALK1, -1 АТФ): необратимое фосфорилирование в положение C1 с образованием галактозо-1-фосфата.",
        "detailsEn": "Step 1 (Galactokinase GALK1, -1 ATP): irreversible C1 phosphorylation yielding galactose 1-phosphate.",
        "stepNumber": 1,
        "reactionCode": "R_GALK1"
      }
    ]
  },
  {
    "id": "b0000003-0000-0000-0000-000000000002",
    "code": "MET_GAL1P",
    "nameRu": "Галактозо-1-фосфат",
    "nameEn": "Galactose 1-phosphate",
    "abbrevRu": "Гал-1-Ф",
    "abbrevEn": "Gal-1-P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C([C@@H]1[C@@H]([C@@H]([C@H]([C@H](O1)OP(=O)([O-])[O-])O)O)O)O",
    "chebi": "CHEBI:17973",
    "inchiKey": "HXXFSFRBOHSGBM-ARQDHWQXSA-L",
    "descriptionRu": "Активированный фосфат галактозы при C1 («ловушка галактозы в клетке»). При классической галактоземии (дефицит GALT) токсически накапливается в печени, почках, хрусталике и мозге.",
    "descriptionEn": "C1-phosphorylated galactose intermediate trapping galactose inside the cell. Toxic accumulation in classical galactosemia (GALT deficiency) injures liver, kidneys, lens, and brain.",
    "synonymsRu": [
      "Галактозо-1-фосфат",
      "Гал-1-Ф",
      "α-D-галактозо-1-фосфат"
    ],
    "synonymsEn": [
      "Galactose 1-phosphate",
      "Gal-1-P",
      "alpha-D-galactose 1-phosphate"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 1 (GALK1): образуется из D-галактозы за счёт 1 АТФ.",
        "detailsEn": "Step 1 (GALK1): product of D-galactose phosphorylation consuming 1 ATP.",
        "stepNumber": 1,
        "reactionCode": "R_GALK1"
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 2 (GALT): обменивается уридиловой меткой с УДФ-глюкозой с выходом Г1Ф и УДФ-галактозы.",
        "detailsEn": "Step 2 (GALT): swaps UMP moiety with UDP-glucose to produce G1P and UDP-galactose.",
        "stepNumber": 2,
        "reactionCode": "R_GALT"
      }
    ]
  },
  {
    "id": "b0000003-0000-0000-0000-000000000003",
    "code": "MET_G1P",
    "nameRu": "Глюкозо-1-фосфат",
    "nameEn": "Glucose 1-phosphate",
    "abbrevRu": "Г1Ф",
    "abbrevEn": "G1P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)OP(=O)([O-])[O-])O)O)O)O",
    "chebi": "CHEBI:16077",
    "inchiKey": "HXXFSFRBOHSGBM-VFUOTHLCSA-L",
    "descriptionRu": "Аномерный фосфат глюкозы — точка сопряжения пути Лелуара, гликогенолиза (фосфорилаза) и гликолиза. Фосфоглюкомутаза 1 (PGM1) переводит его в Г6Ф без затраты АТФ.",
    "descriptionEn": "Anomeric glucose phosphate linking the Leloir pathway, glycogenolysis, and glycolysis. Phosphoglucomutase 1 (PGM1) converts G1P directly into G6P at zero ATP cost.",
    "synonymsRu": [
      "Глюкозо-1-фосфат",
      "Г1Ф",
      "Эфир Кори"
    ],
    "synonymsEn": [
      "Glucose 1-phosphate",
      "G1P",
      "Cori ester"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 2 (GALT): высвобождается в реакции обмена с УДФ-глюкозой.",
        "detailsEn": "Step 2 (GALT): released via uridylyl transfer from UDP-glucose.",
        "stepNumber": 2,
        "reactionCode": "R_GALT"
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 4 (PGM1): обратимо изомеризуется в Г6Ф — прямой вход либо в гликолиз (+2 АТФ нетто), либо в свободную D-глюкозу через G6PC1 в печени.",
        "detailsEn": "Step 4 (PGM1): reversibly isomerized into G6P for glycolysis (+2 net ATP) or hepatic blood glucose export via G6PC1.",
        "stepNumber": 4,
        "reactionCode": "R_PGM1"
      },
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Синтез и распад)",
        "pathwayNameEn": "Glycogen Metabolism (Synthesis & Breakdown)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Стадия 1 (UGP2, -1 УТФ ➔ ФФᵢ): активируется в УДФ-глюкозу — донор звеньев для гликогенсинтазы.",
        "detailsEn": "Step 1 (UGP2, -1 UTP ➔ PPᵢ): activated to UDP-glucose for glycogen synthesis.",
        "stepNumber": 1,
        "reactionCode": "R_UGP2"
      },
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Распад)",
        "pathwayNameEn": "Glycogen Metabolism (Glycogenolysis)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Стадия 3 (Гликогенфосфорилаза PYG + Фᵢ): главный продукт фосфоролиза гликогена — сразу вступает в PGM1 ➔ Г6Ф без затраты АТФ.",
        "detailsEn": "Step 3 (Glycogen phosphorylase PYG + Pᵢ): direct phosphorolytic product entering PGM1 ➔ G6P without ATP cost.",
        "stepNumber": 3,
        "reactionCode": "R_PYG"
      }
    ]
  },
  {
    "id": "b0000003-0000-0000-0000-000000000004",
    "code": "MET_UDP_GAL",
    "nameRu": "УДФ-галактоза",
    "nameEn": "UDP-galactose",
    "abbrevRu": "УДФ-Гал",
    "abbrevEn": "UDP-Gal",
    "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻",
    "carbons": "6C+УДФ",
    "carbonsEn": "6C+UDP",
    "smiles": "O=c1ccn([C@@H]2O[C@H](COP(=O)([O-])OP(=O)([O-])O[C@H]3O[C@H](CO)[C@H](O)[C@H](O)[C@H]3O)[C@@H](O)[C@H]2O)c(=O)[nH]1",
    "chebi": "CHEBI:18307",
    "inchiKey": "HSCJVCJGDFQFHN-MLCQQTEZSA-L",
    "descriptionRu": "Активированный нуклеотид-сахар галактозы. Образуется в реакции GALT и служит донором галактозильных остатков для синтеза гликопротеинов, цереброзидов и лактозы (в лактирующей железе), либо эпимеризуется GALE обратно в УДФ-глюкозу.",
    "descriptionEn": "Activated galactose nucleotide sugar generated by GALT. Serves as galactosyl donor for glycoproteins and glycolipids, or epimerizes via GALE back into UDP-glucose.",
    "synonymsRu": [
      "УДФ-галактоза",
      "УДФ-Гал",
      "Уридиндифосфатгалактоза"
    ],
    "synonymsEn": [
      "UDP-galactose",
      "UDP-Gal",
      "Uridine diphosphate galactose"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 2 (GALT): продукт переноса УМФ с УДФ-глюкозы на галактозо-1-фосфат.",
        "detailsEn": "Step 2 (GALT): product of UMP transfer onto galactose 1-phosphate.",
        "stepNumber": 2,
        "reactionCode": "R_GALT"
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 3 (GALE): эпимеризация гидроксила при C4 замыкает цикл кофактора УДФ-глюкозы.",
        "detailsEn": "Step 3 (GALE): C4-OH epimerization regenerates the catalytic UDP-glucose carrier.",
        "stepNumber": 3,
        "reactionCode": "R_GALE"
      }
    ]
  },
  {
    "id": "b0000003-0000-0000-0000-000000000005",
    "code": "MET_UDP_GLC",
    "nameRu": "УДФ-глюкоза",
    "nameEn": "UDP-glucose",
    "abbrevRu": "УДФ-Глю",
    "abbrevEn": "UDP-Glc",
    "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻",
    "carbons": "6C+УДФ",
    "carbonsEn": "6C+UDP",
    "smiles": "O=c1ccn([C@@H]2O[C@H](COP(=O)([O-])OP(=O)([O-])O[C@H]3O[C@H](CO)[C@@H](O)[C@H](O)[C@H]3O)[C@@H](O)[C@H]2O)c(=O)[nH]1",
    "chebi": "CHEBI:18066",
    "inchiKey": "HSCJVCJGDFQFHN-LILDFLRNNA-L",
    "descriptionRu": "Активированный глюкозильный донор и регенерируемый носитель УДФ в пути Лелуара. Замыкает внутренний цикл (УДФ-Глю ⇄ УДФ-Гал), а также служит прямым субстратом гликогенсинтазы (GYS1/GYS2) для запасания гликогена в печени и мышцах.",
    "descriptionEn": "Activated glucosyl donor and catalytic UDP carrier in the Leloir pathway. Cycles between UDP-Gal and UDP-Glc via GALE and feeds glycogen synthase (GYS1/GYS2) for glycogen storage.",
    "synonymsRu": [
      "УДФ-глюкоза",
      "УДФ-Глю",
      "Уридиндифосфатглюкоза"
    ],
    "synonymsEn": [
      "UDP-glucose",
      "UDP-Glc",
      "UDPG"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 3 (GALE): регенерируется из УДФ-галактозы, поддерживая каталитический цикл переработки галактозы.",
        "detailsEn": "Step 3 (GALE): regenerated from UDP-galactose to sustain the catalytic Leloir loop.",
        "stepNumber": 3,
        "reactionCode": "R_GALE"
      },
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Путь Лелуара (Метаболизм галактозы)",
        "pathwayNameEn": "Leloir Pathway (Galactose Metabolism)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 2 (GALT): переносит УМФ на галактозо-1-фосфат, высвобождая глюкозо-1-фосфат в гликолиз и глюконеогенез.",
        "detailsEn": "Step 2 (GALT): donates UMP to galactose 1-phosphate, releasing G1P toward glycolysis and glucose synthesis.",
        "stepNumber": 2,
        "reactionCode": "R_GALT"
      },
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Синтез)",
        "pathwayNameEn": "Glycogen Metabolism (Glycogenesis)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Стадия 1 (UGP2, Г1Ф + УТФ): синтез активированной УДФ-глюкозы с последующим необратимым гидролизом ФФᵢ.",
        "detailsEn": "Step 1 (UGP2, G1P + UTP): synthesized as activated UDP-glucose donor driven by PPᵢ hydrolysis.",
        "stepNumber": 1,
        "reactionCode": "R_UGP2"
      },
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Синтез)",
        "pathwayNameEn": "Glycogen Metabolism (Glycogenesis)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Стадия 2 (Гликогенсинтаза GYS1/2): переносит глюкозильный остаток с отщеплением УДФ на растущую цепь гликогена (α-1,4 связь).",
        "detailsEn": "Step 2 (Glycogen synthase GYS1/2): donates glucosyl unit onto glycogen chain releasing UDP.",
        "stepNumber": 2,
        "reactionCode": "R_GYS"
      }
    ]
  },
  {
    "id": "b0000004-0000-0000-0000-000000000001",
    "code": "MET_FRUCTOSE",
    "nameRu": "D-Фруктоза",
    "nameEn": "D-Fructose",
    "abbrevRu": "Фру",
    "abbrevEn": "Fru",
    "formula": "C₆H₁₂O₆",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C([C@H]([C@H]([C@@H](C(=O)CO)O)O)O)O",
    "chebi": "CHEBI:15824",
    "inchiKey": "BJHIKXHVCYFVJR-KVTDHHQDSA-N",
    "descriptionRu": "Кетогексоза пищевых фруктов и сахарозы (транспорт через GLUT5). Имеет два пути: в печени кетогексокиназа KHK расщепляет её в обход регулятора PFK-1 с высоким липогенным эффектом (или синтезом глюкозы через ГАФ + ДАФ ➔ G6PC1), а в мышцах/жировой ткани гексокиназа (HK) медленно фосфорилирует её сразу в Ф6Ф.",
    "descriptionEn": "Dietary ketohexose imported via GLUT5. Catabolized primarily in liver by KHK bypassing PFK-1 (driving glycolysis, lipogenesis, or gluconeogenesis to glucose) and in muscle/adipose directly to F6P via hexokinase.",
    "synonymsRu": [
      "D-Фруктоза",
      "Фруктоза",
      "Левулёза"
    ],
    "synonymsEn": [
      "D-Fructose",
      "Fructose",
      "Levulose"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Фруктолиз (Гидролиз сахарозы)",
        "pathwayNameEn": "Fructolysis (Sucrose Hydrolysis)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Пищевой вход (Сахараза SI): освобождается вместе с D-глюкозой при расщеплении дисахарида сахарозы.",
        "detailsEn": "Dietary entry (Sucrase SI): released alongside D-glucose upon dietary sucrose hydrolysis.",
        "stepNumber": 0,
        "reactionCode": "R_SI"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Печёночный фруктолиз (KHK / ALDOB)",
        "pathwayNameEn": "Hepatic Fructolysis (KHK / ALDOB)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 1 (Кетогексокиназа KHK, -1 АТФ): быстрый перенос фосфата на C1 с образованием F1P — минует торможение АТФ/цитратом на PFK-1.",
        "detailsEn": "Step 1 (Ketohexokinase KHK, -1 ATP): rapid C1 phosphorylation to F1P bypassing allosteric PFK-1 regulation.",
        "stepNumber": 1,
        "reactionCode": "R_KHK"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Фруктолиз (Мышцы / Адипоциты)",
        "pathwayNameEn": "Fructolysis (Muscle / Adipose)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Внепечёночный шунт (Гексокиназа HK, -1 АТФ): прямое фосфорилирование в Ф6Ф (Km высокое, протекает медленнее печёночного пути).",
        "detailsEn": "Extrahepatic shunt (Hexokinase HK, -1 ATP): directly yields F6P at lower affinity than hepatic KHK.",
        "stepNumber": 4,
        "reactionCode": "R_HK_FRU"
      }
    ]
  },
  {
    "id": "b0000004-0000-0000-0000-000000000002",
    "code": "MET_F1P",
    "nameRu": "Фруктозо-1-фосфат",
    "nameEn": "Fructose 1-phosphate",
    "abbrevRu": "Ф1Ф",
    "abbrevEn": "F1P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C([C@H]([C@H]([C@@H](C(=O)COP(=O)([O-])[O-])O)O)O)O",
    "chebi": "CHEBI:18105",
    "inchiKey": "RHXHGRAANNJILG-VFUOTHLCSA-L",
    "descriptionRu": "Специфический интермедиат печёночного фруктолиза, позволяющий обойти лимитирующую стадию PFK-1. Быстрое накопление Ф1Ф при нагрузке фруктозой истощает неорганический фосфат (Pi) и АТФ, а при дефиците альдолазы B (ALDOB) вызывает наследственную непереносимость фруктозы.",
    "descriptionEn": "Hepatic fructolysis intermediate bypassing PFK-1. Rapid F1P trapping depletes hepatic Pi and ATP; ALDOB deficiency causes severe hereditary fructose intolerance (HFI).",
    "synonymsRu": [
      "Фруктозо-1-фосфат",
      "Ф1Ф"
    ],
    "synonymsEn": [
      "Fructose 1-phosphate",
      "F1P"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Печёночный фруктолиз",
        "pathwayNameEn": "Hepatic Fructolysis",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 1 (KHK, -1 АТФ): продукт быстрого фосфорилирования фруктозы без аллостерического торможения.",
        "detailsEn": "Step 1 (KHK, -1 ATP): rapid phosphorylation product unconstrained by energy charge feedback.",
        "stepNumber": 1,
        "reactionCode": "R_KHK"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Печёночный фруктолиз",
        "pathwayNameEn": "Hepatic Fructolysis",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 2 (Альдолаза B, ALDOB): обратимо расщепляется на ДАФ (готовый к гликолизу) и свободный D-глицеральдегид.",
        "detailsEn": "Step 2 (Aldolase B, ALDOB): reversibly cleaves into glycolytic DHAP and free D-glyceraldehyde.",
        "stepNumber": 2,
        "reactionCode": "R_ALDOB"
      }
    ]
  },
  {
    "id": "b0000004-0000-0000-0000-000000000003",
    "code": "MET_GLYCERALDEHYDE",
    "nameRu": "D-Глицеральдегид",
    "nameEn": "D-Glyceraldehyde",
    "abbrevRu": "ГА",
    "abbrevEn": "GA",
    "formula": "C₃H₆O₃",
    "carbons": "3C",
    "carbonsEn": "3C",
    "smiles": "C([C@H](C=O)O)O",
    "chebi": "CHEBI:17378",
    "inchiKey": "MNQZXJOMPOIZRP-BYPYZUCNSA-N",
    "descriptionRu": "Нефосфорилированная альдотриоза — второй продукт расщепления фруктозо-1-фосфата альдолазой B. Для слияния с основным стволом гликолиза требует затраты второй АТФ триокиназой (TKFC) с образованием ГАФ.",
    "descriptionEn": "Unphosphorylated aldotriose generated alongside DHAP by aldolase B. Phosphorylated by triokinase (TKFC) consuming the second ATP to enter payoff glycolysis as G3P.",
    "synonymsRu": [
      "D-Глицеральдегид",
      "Глицеральдегид",
      "ГА"
    ],
    "synonymsEn": [
      "D-Glyceraldehyde",
      "Glyceraldehyde",
      "GA"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Печёночный фруктолиз",
        "pathwayNameEn": "Hepatic Fructolysis",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 2 (ALDOB): освобождается при расщеплении F1P вместе с ДАФ.",
        "detailsEn": "Step 2 (ALDOB): released alongside DHAP from F1P cleavage.",
        "stepNumber": 2,
        "reactionCode": "R_ALDOB"
      },
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Печёночный фруктолиз",
        "pathwayNameEn": "Hepatic Fructolysis",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 3 (Триокиназа TKFC, -1 АТФ): фосфорилирование в ГАФ — суммарный расход как в гликолизе (-2 АТФ), суммарный чистый выход пирувата также +2 АТФ нетто.",
        "detailsEn": "Step 3 (Triokinase TKFC, -1 ATP): phosphorylated into G3P, matching total glucose ATP investment (-2 ATP) for +2 net ATP yield.",
        "stepNumber": 3,
        "reactionCode": "R_TKFC"
      }
    ]
  },
  {
    "id": "b0000005-0000-0000-0000-000000000001",
    "code": "MET_GLYCOGEN",
    "nameRu": "Гликоген",
    "nameEn": "Glycogen",
    "abbrevRu": "Гликоген",
    "abbrevEn": "Glycogen",
    "formula": "(C₆H₁₀O₅)ₙ",
    "carbons": "(6C)ₙ полимер",
    "carbonsEn": "(6C)ₙ polymer",
    "smiles": "OCC1OC(OC2C(O)C(O)C(OC3C(O)C(O)C(O)OC3CO)OC2CO)C(O)C(O)C1O",
    "chebi": "CHEBI:28087",
    "inchiKey": "BGFJXKXBWJQKLS-UHFFFAOYSA-N",
    "descriptionRu": "Разветвлённый полимер α-D-глюкозы с линейными α-(1→4) цепями и частыми ветвлениями α-(1→6) каждые 8–12 остатков. Главный быстромобилизуемый углеводный резерв организма (в печени поддерживает глюкозу крови между приёмами пищи, в скелетных мышцах питает собственный гликолиз при нагрузке).",
    "descriptionEn": "Branched multibranched glucose polymer linked by α-(1→4) glycosidic chains and α-(1→6) branch points every 8–12 residues. Rapidly mobilized energy reserve (liver glycogen maintains blood glucose homeostasis; muscle glycogen fuels local contraction).",
    "synonymsRu": [
      "Гликоген",
      "Животный крахмал",
      "Полиглюкозид",
      "(C₆H₁₀O₅)ₙ"
    ],
    "synonymsEn": [
      "Glycogen",
      "Animal starch",
      "Alpha-1,4/1,6-glucan"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Синтез)",
        "pathwayNameEn": "Glycogen Metabolism (Glycogenesis)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Стадия 2 (Гликогенсинтаза GYS1/2 + GBE1): достраивает α-(1→4) связи из УДФ-глюкозы и формирует α-(1→6) ветви; активируется инсулином и Г6Ф.",
        "detailsEn": "Step 2 (Glycogen synthase GYS1/2 + GBE1): elongates α-(1→4) chains from UDP-glucose and introduces α-(1→6) branches.",
        "stepNumber": 2,
        "reactionCode": "R_GYS"
      },
      {
        "pathwayCode": "PW-GLYCOGEN",
        "pathwayNameRu": "Метаболизм гликогена (Распад)",
        "pathwayNameEn": "Glycogen Metabolism (Glycogenolysis)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 3 (Гликогенфосфорилаза PYGL/PYGM + AGL): фосфоролитически отщепляет остатки в виде Г1Ф (+Фᵢ) без затраты АТФ; активируется глюкагоном, адреналином и АМФ.",
        "detailsEn": "Step 3 (Glycogen phosphorylase PYGL/M + AGL): phosphorolytically cleaves glucose residues as G1P (+Pᵢ) at zero ATP cost.",
        "stepNumber": 3,
        "reactionCode": "R_PYG"
      }
    ]
  },
  {
    "id": "b0000003-0000-0000-0000-000000000006",
    "code": "MET_LACTOSE",
    "nameRu": "Лактоза",
    "nameEn": "Lactose",
    "abbrevRu": "Лакт",
    "abbrevEn": "Lac",
    "formula": "C₁₂H₂₂O₁₁",
    "carbons": "12C (Гал+Глю)",
    "carbonsEn": "12C (Gal+Glc)",
    "smiles": "O[C@H]1[C@@H](O)[C@H](O[C@@H]2O[C@H](CO)[C@H](O)[C@H](O)[C@H]2O)[C@@H](CO)O[C@H]1O",
    "chebi": "CHEBI:17716",
    "inchiKey": "GUBGYTABKSRVRQ-XLOQQCSPSA-N",
    "descriptionRu": "Главный дисахарид молока млекопитающих (β-D-галактозил-(1→4)-D-глюкоза). Расщепляется на щёточной каёмке энтероцитов тонкой кишки ферментом лактазой (LCT) с высвобождением одной молекулы D-галактозы и одной молекулы D-глюкозы.",
    "descriptionEn": "Principal dietary disaccharide of milk (β-D-galactosyl-(1→4)-D-glucose). Hydrolyzed at the intestinal brush border by lactase (LCT) into free D-galactose and D-glucose.",
    "synonymsRu": [
      "Лактоза",
      "Молочный сахар",
      "β-D-галактозил-D-глюкоза"
    ],
    "synonymsEn": [
      "Lactose",
      "Milk sugar",
      "Gal-β(1→4)-Glc"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-GALACTOSE",
        "pathwayNameRu": "Гидролиз дисахаридов (Лактаза LCT)",
        "pathwayNameEn": "Disaccharide Hydrolysis (Lactase LCT)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Пищевой вход (Лактаза LCT + H₂O): расщепляется на D-галактозу (в путь Лелуара) и D-глюкозу (в гликолиз).",
        "detailsEn": "Dietary input (Lactase LCT + H₂O): cleaved into D-galactose (Leloir pathway) and D-glucose (glycolysis).",
        "stepNumber": 0,
        "reactionCode": "R_LCT"
      }
    ]
  },
  {
    "id": "b0000004-0000-0000-0000-000000000005",
    "code": "MET_SUCROSE",
    "nameRu": "Сахароза",
    "nameEn": "Sucrose",
    "abbrevRu": "Сах",
    "abbrevEn": "Suc",
    "formula": "C₁₂H₂₂O₁₁",
    "carbons": "12C (Глю+Фру)",
    "carbonsEn": "12C (Glc+Fru)",
    "smiles": "OC[C@H]1O[C@H](O[C@]2(CO)O[C@H](CO)[C@@H](O)[C@@H]2O)[C@H](O)[C@@H](O)[C@@H]1O",
    "chebi": "CHEBI:17992",
    "inchiKey": "CZMRCDWAGMRECN-UGDNZRGBSA-N",
    "descriptionRu": "Главный пищевой дисахарид (α-D-глюкопиранозил-(1↔2)-β-D-фруктофуранозид). Расщепляется комплексом сахараза-изомальтаза (SI) на щёточной каёмке энтероцитов с выходом эквимолярных количеств D-глюкозы и D-фруктозы.",
    "descriptionEn": "Primary dietary disaccharide (α-D-glucopyranosyl-(1↔2)-β-D-fructofuranoside). Hydrolyzed at the intestinal brush border by sucrase-isomaltase (SI) into free D-glucose and D-fructose.",
    "synonymsRu": [
      "Сахароза",
      "Тростниковый сахар",
      "Свекловичный сахар"
    ],
    "synonymsEn": [
      "Sucrose",
      "Table sugar",
      "Glc-α(1↔2)β-Fru"
    ],
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-FRUCTOSE",
        "pathwayNameRu": "Гидролиз дисахаридов (Сахараза SI)",
        "pathwayNameEn": "Disaccharide Hydrolysis (Sucrase SI)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Пищевой вход (Сахараза SI + H₂O): гидролизуется в D-фруктозу (во фруктолиз) и D-глюкозу (в гликолиз).",
        "detailsEn": "Dietary input (Sucrase SI + H₂O): cleaved into D-fructose (fructolysis) and D-glucose (glycolysis).",
        "stepNumber": 0,
        "reactionCode": "R_SI"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000003",
    "code": "MET_OAA",
    "nameRu": "Оксалоацетат",
    "nameEn": "Oxaloacetate",
    "abbrevRu": "ОАО",
    "abbrevEn": "OAA",
    "formula": "C₄H₂O₅²⁻",
    "carbons": "4C",
    "carbonsEn": "4C",
    "smiles": "C(C(=O)C(=O)[O-])C(=O)[O-]",
    "chebi": "CHEBI:16452",
    "inchiKey": "KHPXUQMNIQBQEV-UHFFFAOYSA-L",
    "descriptionRu": "Четырехуглеродный акцептор ацетильной группы в первой реакции цикла. Регенерируется на последней стадии. Служит субстратом для глюконеогенеза и малат-аспартатного челнока.",
    "descriptionEn": "Four-carbon acetyl group acceptor in the initial condensation step of the TCA cycle. Regenerated in the final step. Also serves as key substrate for gluconeogenesis and the malate-aspartate shuttle.",
    "synonymsRu": [
      "Оксалоацетат",
      "ОАО",
      "Щавелевоуксусная кислота",
      "2-оксобутандиоат"
    ],
    "synonymsEn": [
      "Oxaloacetate",
      "OAA",
      "Oxaloacetic acid",
      "2-oxobutanedioate"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 1: конденсируется с ацетил-КоА в цитрат; Стадия 8: регенерируется окислением L-малата.",
        "detailsEn": "Step 1: condenses with Acetyl-CoA into citrate; Step 8: regenerated by L-malate oxidation.",
        "stepNumber": 1,
        "reactionCode": "R_CS",
        "reactionNameRu": "Конденсация оксалоацетата и ацетил-КоА",
        "reactionNameEn": "Condensation of oxaloacetate and acetyl-CoA"
      },
      {
        "pathwayCode": "PWY_GNG",
        "pathwayNameRu": "Глюконеогенез (Синтез глюкозы)",
        "pathwayNameEn": "Gluconeogenesis (Glucose Synthesis)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Превращается в фосфоенолпируват митохондриальной фосфоенолпируваткарбоксикиназой (PEPCK-M / PCK2).",
        "detailsEn": "Converted into phosphoenolpyruvate by mitochondrial phosphoenolpyruvate carboxykinase (PEPCK-M / PCK2)."
      },
      {
        "pathwayCode": "PWY_MALATE_SHUTTLE",
        "pathwayNameRu": "Малат-аспартатный челночный механизм",
        "pathwayNameEn": "Malate-Aspartate Shuttle Mechanism",
        "isCurrentPathway": false,
        "role": "intermediate",
        "detailsRu": "Трансаминируется в L-аспартат (фермент GOT2) для переноса электронов в матрикс митохондрий.",
        "detailsEn": "Transaminated to L-aspartate by GOT2 for transferring reducing equivalents into mitochondrial matrix."
      },
      {
        "pathwayCode": "PWY_AMINO_ACID",
        "pathwayNameRu": "Синтез аминокислот",
        "pathwayNameEn": "Amino Acid Biosynthesis",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Прямой метаболический предшественник аспартата, аспарагина и пиримидиновых нуклеотидов.",
        "detailsEn": "Direct precursor to aspartate, asparagine, and pyrimidine nucleotide synthesis."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000004",
    "code": "MET_CITRATE",
    "nameRu": "Цитрат",
    "nameEn": "Citrate",
    "abbrevRu": "ЦИТ",
    "abbrevEn": "CIT",
    "formula": "C₆H₅O₇³⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C(C(=O)[O-])C(CC(=O)[O-])(C(=O)[O-])O",
    "chebi": "CHEBI:16947",
    "inchiKey": "KRKNYBCHXYNGOX-UHFFFAOYSA-K",
    "descriptionRu": "Шестиуглеродная трикарбоновая кислота, первый промежуточный продукт цикла. Может транспортироваться в цитозоль для синтеза жирных кислот и холестерина.",
    "descriptionEn": "Six-carbon tricarboxylic acid and first intermediate of the citric acid cycle. Exportable to cytosol via citrate shuttle for fatty acid and cholesterol synthesis.",
    "synonymsRu": [
      "Цитрат",
      "ЦИТ",
      "Лимонная кислота",
      "2-гидроксипропан-1,2,3-трикарбоксилат"
    ],
    "synonymsEn": [
      "Citrate",
      "CIT",
      "Citric acid",
      "2-hydroxypropane-1,2,3-tricarboxylate"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Образуется на стадии 1 (цитратсинтаза) и изомеризуется в изоцитрат на стадии 2 (аконитаза).",
        "detailsEn": "Generated in step 1 (citrate synthase) and isomerized to isocitrate in step 2 (aconitase).",
        "stepNumber": 2,
        "reactionCode": "R_ACO",
        "reactionNameRu": "Изомеризация цитрата в изоцитрат",
        "reactionNameEn": "Isomerization of citrate to isocitrate"
      },
      {
        "pathwayCode": "PWY_LIPID_SYN",
        "pathwayNameRu": "Синтез жирных кислот (Липогенез)",
        "pathwayNameEn": "Fatty Acid Synthesis (Lipogenesis)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Экспортируется в цитоплазму через цитратный челнок (SLC25A1) и расщепляется АТФ-цитратлиазой (ACLY) для синтеза липидов.",
        "detailsEn": "Exported into cytoplasm via citrate shuttle (SLC25A1) and cleaved by ATP-citrate lyase (ACLY) for lipid synthesis."
      },
      {
        "pathwayCode": "PWY_GLYCOLYSIS",
        "pathwayNameRu": "Гликолиз (Аллостерический регулятор)",
        "pathwayNameEn": "Glycolysis (Allosteric Regulator)",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Сильный аллостерический ингибитор фосфофруктокиназы-1 (ФФК-1); сигнализирует об избытке клеточной энергии.",
        "detailsEn": "Potent allosteric inhibitor of phosphofructokinase-1 (PFK-1); signals cellular energy surplus."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000005",
    "code": "MET_ISOCITRATE",
    "nameRu": "Изоцитрат",
    "nameEn": "Isocitrate",
    "abbrevRu": "ИЗО",
    "abbrevEn": "ICT",
    "formula": "C₆H₅O₇³⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "smiles": "C(C(C(=O)[O-])O)(CC(=O)[O-])C(=O)[O-]",
    "chebi": "CHEBI:16087",
    "inchiKey": "ODBLHEXUDAPZAU-UHFFFAOYSA-N",
    "descriptionRu": "Изомер цитрата с вторичной гидроксильной группой, подготовленный для окислительного декарбоксилирования.",
    "descriptionEn": "Citrate isomer with a secondary hydroxyl group, structured for oxidative decarboxylation into α-ketoglutarate.",
    "synonymsRu": [
      "Изоцитрат",
      "ИЗО",
      "Изолимонная кислота",
      "1-гидроксипропан-1,2,3-трикарбоксилат"
    ],
    "synonymsEn": [
      "Isocitrate",
      "ICT",
      "Isocitric acid",
      "1-hydroxypropane-1,2,3-tricarboxylate"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Стадия 3: субстрат главного регуляторного фермента — изоцитратдегидрогеназы 3 (IDH3).",
        "detailsEn": "Step 3: substrate for key rate-limiting enzyme isocitrate dehydrogenase 3 (IDH3).",
        "stepNumber": 3,
        "reactionCode": "R_IDH",
        "reactionNameRu": "Окислительное декарбоксилирование изоцитрата",
        "reactionNameEn": "Oxidative decarboxylation of isocitrate"
      },
      {
        "pathwayCode": "PWY_NADPH_GEN",
        "pathwayNameRu": "Цитозольная генерация НАДФН",
        "pathwayNameEn": "Cytosolic NADPH Generation",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Окисляется цитозольной IDH1 с образованием НАДФН для антиоксидантной защиты глутатиона.",
        "detailsEn": "Oxidized by cytosolic IDH1 yielding NADPH for glutathione-mediated antioxidant defense."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000006",
    "code": "MET_AKG",
    "nameRu": "α-Кетоглутарат",
    "nameEn": "α-Ketoglutarate",
    "abbrevRu": "α-КГ",
    "abbrevEn": "α-KG",
    "formula": "C₅H₄O₅²⁻",
    "carbons": "5C",
    "carbonsEn": "5C",
    "smiles": "C(CC(=O)[O-])C(=O)C(=O)[O-]",
    "chebi": "CHEBI:16810",
    "inchiKey": "KPGXRSRHYNQIFN-UHFFFAOYSA-L",
    "descriptionRu": "Пятиуглеродный интермедиат. Ключевой перекресток обмена аминокислот (глутамат, глутамин), обезвреживания аммиака и эпигенетической регуляции.",
    "descriptionEn": "Five-carbon intermediate. Critical crossroads of amino acid metabolism (glutamate, glutamine), ammonia detoxification, and epigenetic chromatin regulation.",
    "synonymsRu": [
      "α-Кетоглутарат",
      "2-оксоглутарат",
      "α-КГ",
      "2-оксопентандиоат"
    ],
    "synonymsEn": [
      "α-Ketoglutarate",
      "2-oxoglutarate",
      "α-KG",
      "2-oxopentanedioate"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Образуется на стадии 3 (ИДГ3) и окислительно декарбоксилируется на стадии 4 (α-КГДГ).",
        "detailsEn": "Produced in step 3 (IDH3) and oxidatively decarboxylated in step 4 (α-KGDH).",
        "stepNumber": 4,
        "reactionCode": "R_KGDH",
        "reactionNameRu": "Окислительное декарбоксилирование α-кетоглутарата",
        "reactionNameEn": "Oxidative decarboxylation of α-ketoglutarate"
      },
      {
        "pathwayCode": "PWY_AMINO_ACID",
        "pathwayNameRu": "Обмен аминокислот (Трансаминирование)",
        "pathwayNameEn": "Amino Acid Metabolism (Transamination)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Универсальный акцептор аминогрупп от большинства аминокислот с образованием L-глутамата (АлАТ, АсАТ).",
        "detailsEn": "Universal amino group acceptor from amino acids forming L-glutamate (ALT, AST)."
      },
      {
        "pathwayCode": "PWY_UREA",
        "pathwayNameRu": "Обезвреживание аммиака / Цикл мочевины",
        "pathwayNameEn": "Ammonia Detoxification / Urea Cycle",
        "isCurrentPathway": false,
        "role": "intermediate",
        "detailsRu": "Связывает токсичный ион аммония через глутаматдегидрогеназу (ГДГ), поставляя азот в цикл мочевины.",
        "detailsEn": "Fixes toxic ammonium via glutamate dehydrogenase (GDH), delivering nitrogen to the urea cycle."
      },
      {
        "pathwayCode": "PWY_EPIGENETICS",
        "pathwayNameRu": "Эпигенетическая регуляция хроматина",
        "pathwayNameEn": "Epigenetic Chromatin Regulation",
        "isCurrentPathway": false,
        "role": "cofactor",
        "detailsRu": "Обязательный кофактор TET-диоксигеназ деметилирования ДНК и JmjC-деметилаз гистонов.",
        "detailsEn": "Obligate cofactor for TET DNA demethylases and JmjC histone demethylases."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000007",
    "code": "MET_SUCCINYL_COA",
    "nameRu": "Сукцинил-КоА",
    "nameEn": "Succinyl-CoA",
    "abbrevRu": "Сук-КоА",
    "abbrevEn": "Suc-CoA",
    "formula": "C₂₅H₃₆N₇O₁₉P₃S⁵⁻",
    "carbons": "4C",
    "carbonsEn": "4C",
    "smiles": "CC(C)(COP(=O)([O-])OP(=O)([O-])OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)([O-])[O-])C(C(=O)NCCC(=O)NCCSC(=O)CCC(=O)[O-])O",
    "chebi": "CHEBI:57292",
    "inchiKey": "HCOWTJKLQGBQSQ-UHFFFAOYSA-N",
    "descriptionRu": "Макроэргический тиоэфир сукцината и кофермента A. Используется для синтеза порфиринов (гемоглобина) и утилизации кетоновых тел в головном мозге.",
    "descriptionEn": "High-energy thioester of succinate and coenzyme A. Serves as precursor for porphyrin/heme biosynthesis and ketone body utilization in peripheral tissues.",
    "synonymsRu": [
      "Сукцинил-КоА",
      "Сукцинил-коэнзим А",
      "Сук-КоА"
    ],
    "synonymsEn": [
      "Succinyl-CoA",
      "Succinyl-Coenzyme A",
      "Suc-CoA"
    ],
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Продукт стадии 4 (α-КГДГ) и субстрат субстратного фосфорилирования на стадии 5 (синтез ГТФ).",
        "detailsEn": "Product of step 4 (α-KGDH) and substrate for substrate-level phosphorylation in step 5 (GTP/ATP synthesis).",
        "stepNumber": 5,
        "reactionCode": "R_SCS",
        "reactionNameRu": "Субстратное фосфорилирование (Синтез ГТФ / АТФ)",
        "reactionNameEn": "Substrate-level phosphorylation (GTP / ATP synthesis)"
      },
      {
        "pathwayCode": "PWY_HEME",
        "pathwayNameRu": "Биосинтез гема и гемоглобина (Порфирины)",
        "pathwayNameEn": "Heme and Hemoglobin Biosynthesis (Porphyrins)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Конденсируется с глицином пиридоксальфосфат-зависимой АЛК-синтазой 1/2 с образованием δ-аминолевулината.",
        "detailsEn": "Condenses with glycine via pyridoxal phosphate-dependent ALAS1/2 to form δ-aminolevulinate."
      },
      {
        "pathwayCode": "PWY_KETOLYSIS",
        "pathwayNameRu": "Кетолиз (Утилизация кетоновых тел)",
        "pathwayNameEn": "Ketolysis (Ketone Body Utilization)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Активирует ацетоацетат в миокарде и нейронах мозга через сукцинил-КоА:3-кетокислота-КоА-трансферазу (SCOT).",
        "detailsEn": "Activates acetoacetate in myocardium and neurons via succinyl-CoA:3-ketoacid CoA transferase (SCOT)."
      },
      {
        "pathwayCode": "PWY_AMINO_CATABOLISM",
        "pathwayNameRu": "Катаболизм валина, изолейцина, метионина",
        "pathwayNameEn": "Valine, Isoleucine, Methionine Catabolism",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Точка входа углеродных скелетов аминокислот с разветвленной цепью через пропионил-КоА и метилмалонил-КоА.",
        "detailsEn": "Entry point for branched-chain amino acid carbon skeletons via propionyl-CoA and methylmalonyl-CoA."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000008",
    "code": "MET_SUCCINATE",
    "nameRu": "Сукцинат",
    "nameEn": "Succinate",
    "abbrevRu": "СУК",
    "abbrevEn": "SUC",
    "formula": "C₄H₄O₄²⁻",
    "carbons": "4C",
    "carbonsEn": "4C",
    "smiles": "C(CC(=O)[O-])C(=O)[O-]",
    "chebi": "CHEBI:15741",
    "inchiKey": "KDYFGRWQOYBRFD-UHFFFAOYSA-L",
    "descriptionRu": "Четырехуглеродная дикарбоновая кислота. Окисляется Комплексом II внутренней мембраны митохондрий, напрямую передавая электроны в пул убихинона.",
    "descriptionEn": "Four-carbon dicarboxylic acid. Directly oxidized by Complex II (succinate dehydrogenase) in the inner mitochondrial membrane, transferring electrons into the ubiquinone pool.",
    "synonymsRu": [
      "Сукцинат",
      "СУК",
      "Янтарная кислота",
      "Бутандиоат"
    ],
    "synonymsEn": [
      "Succinate",
      "SUC",
      "Succinic acid",
      "Butanedioate"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Образуется на стадии 5 (СКС) и окисляется на стадии 6 сукцинатдегидрогеназой (Комплекс II).",
        "detailsEn": "Formed in step 5 (SCS) and oxidized in step 6 by succinate dehydrogenase (Complex II).",
        "stepNumber": 6,
        "reactionCode": "R_SDH",
        "reactionNameRu": "Окисление сукцината в фумарат",
        "reactionNameEn": "Oxidation of succinate to fumarate"
      },
      {
        "pathwayCode": "PWY_ETC",
        "pathwayNameRu": "Дыхательная цепь (Комплекс II / SDH)",
        "pathwayNameEn": "Electron Transport Chain (Complex II / SDH)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Прямой донор электронов в мембранный пул убихинона без участия Комплекса I.",
        "detailsEn": "Direct electron donor to membrane ubiquinone pool independent of Complex I."
      },
      {
        "pathwayCode": "PWY_SIGNALING",
        "pathwayNameRu": "Клеточная сигнализация (Онкометаболит)",
        "pathwayNameEn": "Cellular Signaling (Oncometabolite)",
        "isCurrentPathway": false,
        "role": "intermediate",
        "detailsRu": "Накопление сукцината ингибирует пролилгидроксилазы (PHD), стабилизируя транскрипционный фактор гипоксии HIF-1α.",
        "detailsEn": "Succinate accumulation inhibits prolyl hydroxylases (PHDs), stabilizing hypoxia-inducible factor HIF-1α."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000009",
    "code": "MET_FUMARATE",
    "nameRu": "Фумарат",
    "nameEn": "Fumarate",
    "abbrevRu": "ФУМ",
    "abbrevEn": "FUM",
    "formula": "C₄H₂O₄²⁻",
    "carbons": "4C",
    "carbonsEn": "4C",
    "smiles": "C(=CC(=O)[O-])C(=O)[O-]",
    "chebi": "CHEBI:29806",
    "inchiKey": "VZCYOOQTPOCHFL-UHFFFAOYSA-L",
    "descriptionRu": "Транс-ненасыщенная дикарбоновая кислота. Продукт действия сукцинатдегидрогеназы. Связывает ЦТК с циклом мочевины и пуриновым нуклеотидным циклом.",
    "descriptionEn": "Trans-unsaturated dicarboxylic acid produced by succinate dehydrogenase. Couples the TCA cycle to the urea cycle and the purine nucleotide cycle.",
    "synonymsRu": [
      "Фумарат",
      "ФУМ",
      "Фумаровая кислота",
      "транс-бутендиоат"
    ],
    "synonymsEn": [
      "Fumarate",
      "FUM",
      "Fumaric acid",
      "trans-butenedioate"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Образуется на стадии 6 (СДГ) и стереоспецифически гидратируется на стадии 7 (фумараза).",
        "detailsEn": "Formed in step 6 (SDH) and stereospecifically hydrated in step 7 (fumarase).",
        "stepNumber": 7,
        "reactionCode": "R_FUM",
        "reactionNameRu": "Гидратация фумарата в L-малат",
        "reactionNameEn": "Hydration of fumarate to L-malate"
      },
      {
        "pathwayCode": "PWY_UREA",
        "pathwayNameRu": "Цикл мочевины (Кребсовский велосипед)",
        "pathwayNameEn": "Urea Cycle (Krebs Bicycle)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Побочный продукт расщепления аргининосукцината аргининосукцинатлиазой (ASL); возвращается в ЦТК.",
        "detailsEn": "Byproduct of argininosuccinate cleavage by argininosuccinate lyase (ASL); returns to the TCA cycle."
      },
      {
        "pathwayCode": "PWY_PURINE",
        "pathwayNameRu": "Пуриновый нуклеотидный цикл",
        "pathwayNameEn": "Purine Nucleotide Cycle",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Выделяется аденилосукцинатлиазой (ADSL) при регенерации АМФ в скелетных мышцах человека.",
        "detailsEn": "Released by adenylosuccinate lyase (ADSL) during AMP regeneration in skeletal muscle."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000010",
    "code": "MET_MALATE",
    "nameRu": "L-Малат",
    "nameEn": "L-Malate",
    "abbrevRu": "МАЛ",
    "abbrevEn": "MAL",
    "formula": "C₄H₄O₅²⁻",
    "carbons": "4C",
    "carbonsEn": "4C",
    "smiles": "C(C(C(=O)[O-])O)C(=O)[O-]",
    "chebi": "CHEBI:15588",
    "inchiKey": "BJEPYKJPYRNKOW-UHFFFAOYSA-L",
    "descriptionRu": "Гидроксидикарбоновая кислота. Участвует в малат-аспартатном челночном механизме переноса электронов в митохондрию и глюконеогенезе.",
    "descriptionEn": "Hydroxydicarboxylic acid intermediate. Vital participant in the malate-aspartate shuttle for NADH electron transport into mitochondria and gluconeogenic export.",
    "synonymsRu": [
      "L-Малат",
      "МАЛ",
      "Яблочная кислота",
      "(2S)-2-гидроксибутандиоат"
    ],
    "synonymsEn": [
      "L-Malate",
      "MAL",
      "Malic acid",
      "(2S)-2-hydroxybutanedioate"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Образуется на стадии 7 (фумараза) и окисляется на стадии 8 малатдегидрогеназой 2 (МДГ2) с регенерацией оксалоацетата.",
        "detailsEn": "Produced in step 7 (fumarase) and oxidized in step 8 by malate dehydrogenase 2 (MDH2) regenerating oxaloacetate.",
        "stepNumber": 8,
        "reactionCode": "R_MDH",
        "reactionNameRu": "Окисление L-малата в оксалоацетат",
        "reactionNameEn": "Oxidation of L-malate to oxaloacetate"
      },
      {
        "pathwayCode": "PWY_MALATE_SHUTTLE",
        "pathwayNameRu": "Малат-аспартатный челночный механизм",
        "pathwayNameEn": "Malate-Aspartate Shuttle Mechanism",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Транспортируется через переносчик 2-оксоглутарат/малат (SLC25A11) сквозь внутреннюю мембрану.",
        "detailsEn": "Transported across inner membrane by 2-oxoglutarate/malate carrier (SLC25A11)."
      },
      {
        "pathwayCode": "PWY_GNG",
        "pathwayNameRu": "Глюконеогенез",
        "pathwayNameEn": "Gluconeogenesis",
        "isCurrentPathway": false,
        "role": "intermediate",
        "detailsRu": "Служит челночной транспортной формой оксалоацетата из митохондрий в цитоплазму для синтеза углеводов.",
        "detailsEn": "Serves as shuttle transport vehicle for oxaloacetate equivalents from mitochondria to cytosol for glucose synthesis."
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000002",
    "code": "MET_ACETYL_COA",
    "nameRu": "Ацетил-КоА",
    "nameEn": "Acetyl-CoA",
    "abbrevRu": "Ац-КоА",
    "abbrevEn": "Ac-CoA",
    "formula": "C₂₃H₃₄N₇O₁₇P₃S⁴⁻",
    "carbons": "2C",
    "carbonsEn": "2C",
    "smiles": "CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)([O-])OP(=O)([O-])OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)([O-])[O-])O",
    "chebi": "CHEBI:57288",
    "inchiKey": "ZSLZBFCDCINBEF-UHFFFAOYSA-N",
    "descriptionRu": "Центральный метаболит организма человека. Образуется из углеводов (через ПДХ), липидов (β-окисление) и аминокислот. Поставщик двухуглеродного ацетильного остатка для сгорания в цикле Кребса.",
    "descriptionEn": "Central metabolic hub of human cellular metabolism. Derived from carbohydrates (via PDH), lipid breakdown (β-oxidation), and ketogenic amino acids. Supplies the two-carbon acetyl fuel for the citric acid cycle.",
    "synonymsRu": [
      "Ацетил-КоА",
      "Ацетил-коэнзим А",
      "Ац-КоА"
    ],
    "synonymsEn": [
      "Acetyl-CoA",
      "Acetyl-Coenzyme A",
      "Ac-CoA"
    ],
    "isHub": true,
    "compartmentRu": "Центральный хаб (Матрикс)",
    "compartmentEn": "Central Hub (Matrix)",
    "pathwaysRu": [
      {
        "pathwayCode": "ALL",
        "pathwayNameRu": "Центральный хаб метаболизма клетки",
        "pathwayNameEn": "Central Cellular Metabolic Hub",
        "isCurrentPathway": true,
        "role": "intermediate",
        "detailsRu": "Главный метаболический перекресток клетки: точка схождения катаболизма углеводов (ПДХ), липидов (β-окисление) и аминокислот.",
        "detailsEn": "Central crossroads of cellular metabolism: convergence of carbohydrate, lipid, and amino acid catabolism."
      },
      {
        "pathwayCode": "PWY_TCA",
        "pathwayNameRu": "Цикл трикарбоновых кислот (ЦТК)",
        "pathwayNameEn": "Citric Acid Cycle (TCA)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Стадия 1: внешний топливный субстрат (донор 2C-ацетила для оксалоацетата 4C). Не является регенерируемым интермедиатом самого цикла.",
        "detailsEn": "Step 1: external fuel substrate delivering 2C-acetyl to oxaloacetate 4C. Not a regenerated intermediate of the cycle itself.",
        "stepNumber": 1,
        "reactionCode": "R_CS",
        "reactionNameRu": "Конденсация оксалоацетата и ацетил-КоА",
        "reactionNameEn": "Condensation of oxaloacetate and acetyl-CoA"
      },
      {
        "pathwayCode": "PWY_PDH",
        "pathwayNameRu": "Пируватдегидрогеназный комплекс (ПДХ)",
        "pathwayNameEn": "Pyruvate Dehydrogenase Complex (PDH)",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Конечный продукт аэробного окислительного декарбоксилирования гликолитического пирувата.",
        "detailsEn": "End-product of aerobic oxidative decarboxylation of glycolytic pyruvate."
      },
      {
        "pathwayCode": "PWY_BETA_OX",
        "pathwayNameRu": "β-Окисление жирных кислот",
        "pathwayNameEn": "Fatty Acid β-Oxidation",
        "isCurrentPathway": false,
        "role": "product",
        "detailsRu": "Конечный продукт каждого цикла расщепления высших жирных кислот в матриксе митохондрий.",
        "detailsEn": "Final recurrent cleavage product of fatty acid breakdown in the mitochondrial matrix."
      },
      {
        "pathwayCode": "PWY_KETOGENESIS",
        "pathwayNameRu": "Кетогенез (Синтез кетоновых тел)",
        "pathwayNameEn": "Ketogenesis (Ketone Body Synthesis)",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Конденсируется в ацетоацетил-КоА и HMG-CoA в печени при дефиците глюкозы.",
        "detailsEn": "Condenses into acetoacetyl-CoA and HMG-CoA in hepatocytes during carbohydrate restriction."
      },
      {
        "pathwayCode": "PWY_CHOLESTEROL",
        "pathwayNameRu": "Синтез холестерина и стероидов",
        "pathwayNameEn": "Cholesterol & Steroid Biosynthesis",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Исходный мономерный предшественник мевалонатного пути биосинтеза стероидов и желчных кислот.",
        "detailsEn": "Building-block monomer for mevalonate pathway producing cholesterol, bile acids, and steroid hormones."
      }
    ]
  },
  {
    "id": "b0000006-0000-0000-0000-000000000001",
    "code": "MET_QH2",
    "nameRu": "Убихинол-10",
    "nameEn": "Ubiquinol-10",
    "abbrevRu": "QH₂",
    "abbrevEn": "QH₂",
    "formula": "C₅₉H₉₂O₄",
    "carbons": "59C (10 изопренов)",
    "carbonsEn": "59C (10 isoprenes)",
    "smiles": "CC1=C(C(=C(C(=C1O)OC)OC)O)CC=C(C)CCC=C(C)CCC=C(C)C",
    "chebi": "CHEBI:17983",
    "inchiKey": "HCAWCLDVEAZNIC-UHFFFAOYSA-N",
    "descriptionRu": "Полностью восстановленная дигидрохинольная форма кофермента Q₁₀. Несёт 2 электрона и 2 протона. Свободно диффундирует в липидном бислое внутренней мембраны митохондрий, перенося электроны от комплексов I и II (СДГ) к комплексу III.",
    "descriptionEn": "Fully reduced 1,4-benzenediol form of coenzyme Q10. Acts as a mobile, two-electron and two-proton lipid carrier diffusing in the inner mitochondrial membrane between Complexes I/II and Complex III.",
    "synonymsRu": [
      "Убихинол",
      "QH2",
      "Восстановленный кофермент Q10",
      "Дигидроубихинон"
    ],
    "synonymsEn": [
      "Ubiquinol",
      "QH2",
      "Reduced Coenzyme Q10",
      "Dihydroubiquinone"
    ],
    "compartmentRu": "Внутренняя мембрана митохондрий",
    "compartmentEn": "Inner Mitochondrial Membrane",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-OXPHOS",
        "pathwayNameRu": "Дыхательная цепь (OxPhos)",
        "pathwayNameEn": "Electron Transport Chain (OxPhos)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Продукт восстановления убихинона Комплексом I (от НАДН) и Комплексом II (от сукцината).",
        "detailsEn": "Product of ubiquinone reduction by Complex I (from NADH) and Complex II (from succinate).",
        "stepNumber": 1,
        "reactionCode": "R_ETC_CI",
        "reactionNameRu": "Окисление НАДН Комплексом I",
        "reactionNameEn": "NADH Oxidation by Complex I"
      },
      {
        "pathwayCode": "PW-OXPHOS",
        "pathwayNameRu": "Дыхательная цепь (OxPhos)",
        "pathwayNameEn": "Electron Transport Chain (OxPhos)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Субстрат Комплекса III: окисляется в Q-цикле с транслокацией 4 H⁺ в межмембранное пространство.",
        "detailsEn": "Substrate of Complex III: oxidized in Q-cycle pumping 4 H⁺ into IMS.",
        "stepNumber": 2,
        "reactionCode": "R_ETC_CIII",
        "reactionNameRu": "Окисление убихинола комплексом III",
        "reactionNameEn": "Ubiquinol oxidation by Complex III"
      }
    ]
  },
  {
    "id": "b0000006-0000-0000-0000-000000000002",
    "code": "MET_CYT_C",
    "nameRu": "Цитохром c",
    "nameEn": "Cytochrome c",
    "abbrevRu": "Цит c",
    "abbrevEn": "Cyt c",
    "formula": "Fe²⁺/Fe³⁺-гем c",
    "carbons": "Гемопротеин (104 АК)",
    "carbonsEn": "Hemoprotein (104 AA)",
    "smiles": "[Fe+2].[porphyrin]",
    "chebi": "CHEBI:18029",
    "inchiKey": "NWVLDHBAIKWPIS-UHFFFAOYSA-N",
    "descriptionRu": "Водорастворимый одноэлектронный белковый переносчик, рыхло связанный с наружной поверхностью внутренней мембраны митохондрий. Переносит электроны от Комплекса III к Комплексу IV. При апоптозе выходит в цитозоль.",
    "descriptionEn": "Small water-soluble hemoprotein loosely bound to the outer face of the IMM. Shuttles individual electrons from Complex III to Complex IV via reversible Fe³⁺/Fe²⁺ oxidation. Cytosolic release initiates apoptotic caspase cascade.",
    "synonymsRu": [
      "Цитохром c",
      "Цит c",
      "Cytochrome c",
      "Цитохром с"
    ],
    "synonymsEn": [
      "Cytochrome c",
      "Cyt c",
      "Cyto-c"
    ],
    "compartmentRu": "Межмембранное пространство / ВММ",
    "compartmentEn": "Intermembrane Space / IMM",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-OXPHOS",
        "pathwayNameRu": "Дыхательная цепь (OxPhos)",
        "pathwayNameEn": "Electron Transport Chain (OxPhos)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Восстанавливается в сайте Qo/Qi Комплекса III до Fe²⁺.",
        "detailsEn": "Reduced at Complex III to Fe²⁺.",
        "stepNumber": 2,
        "reactionCode": "R_ETC_CIII",
        "reactionNameRu": "Окисление убихинола комплексом III",
        "reactionNameEn": "Ubiquinol oxidation by Complex III"
      },
      {
        "pathwayCode": "PW-OXPHOS",
        "pathwayNameRu": "Дыхательная цепь (OxPhos)",
        "pathwayNameEn": "Electron Transport Chain (OxPhos)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Окисляется Комплексом IV, передавая электроны на биядерный центр CuA.",
        "detailsEn": "Oxidized by Complex IV donating electron to CuA.",
        "stepNumber": 3,
        "reactionCode": "R_ETC_CIV",
        "reactionNameRu": "Восстановление кислорода цитохромоксидазой",
        "reactionNameEn": "Oxygen reduction by cytochrome c oxidase"
      }
    ]
  },
  {
    "id": "b0000006-0000-0000-0000-000000000003",
    "code": "MET_O2",
    "nameRu": "Кислород (O₂)",
    "nameEn": "Molecular Oxygen (O₂)",
    "abbrevRu": "O₂",
    "abbrevEn": "O₂",
    "formula": "O₂",
    "carbons": "Газ (акцептор e⁻)",
    "carbonsEn": "Gas (e⁻ acceptor)",
    "smiles": "O=O",
    "chebi": "CHEBI:15379",
    "inchiKey": "MYMOODYAVFYCLP-UHFFFAOYSA-N",
    "descriptionRu": "Конечный акцептор электронов аэробного метаболизма человека. Комплекс IV связывает O₂ и восстанавливает его 4 электронами до 2 молекул воды.",
    "descriptionEn": "Terminal electron acceptor of human aerobic respiration. Diffuses into mitochondrial matrix where Complex IV reduces it to 2 H₂O.",
    "synonymsRu": [
      "Кислород",
      "O2",
      "Дикислород",
      "Молекулярный кислород"
    ],
    "synonymsEn": [
      "Oxygen",
      "O2",
      "Dioxygen",
      "Molecular oxygen"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-OXPHOS",
        "pathwayNameRu": "Дыхательная цепь (OxPhos)",
        "pathwayNameEn": "Electron Transport Chain (OxPhos)",
        "isCurrentPathway": true,
        "role": "substrate",
        "detailsRu": "Терминальный акцептор электронов в каталитическом центре Комплекса IV (гем a3–CuB).",
        "detailsEn": "Terminal electron acceptor at Complex IV heme a3-CuB catalytic core.",
        "stepNumber": 3,
        "reactionCode": "R_ETC_CIV",
        "reactionNameRu": "Восстановление кислорода цитохромоксидазой",
        "reactionNameEn": "Oxygen reduction by cytochrome c oxidase"
      }
    ]
  },
  {
    "id": "b0000006-0000-0000-0000-000000000004",
    "code": "MET_METABOLIC_H2O",
    "nameRu": "Метаболическая вода",
    "nameEn": "Metabolic Water (H₂O)",
    "abbrevRu": "H₂O (мет)",
    "abbrevEn": "H₂O (met)",
    "formula": "H₂O",
    "carbons": "0C (Продукт OxPhos)",
    "carbonsEn": "0C (OxPhos product)",
    "smiles": "O",
    "chebi": "CHEBI:15377",
    "inchiKey": "XLYOFNOQVPJJNP-UHFFFAOYSA-N",
    "descriptionRu": "Вода, образующаяся в организме в процессе окисления субстратов в дыхательной цепи (~300–400 мл/сутки у взрослого человека).",
    "descriptionEn": "Water generated internally through complete 4-electron reduction of oxygen by Complex IV (~300-400 mL/day in adult humans).",
    "synonymsRu": [
      "Метаболическая вода",
      "Вода",
      "Эндогенная вода",
      "H2O"
    ],
    "synonymsEn": [
      "Metabolic water",
      "Endogenous water",
      "Water",
      "H2O"
    ],
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "pathwaysRu": [
      {
        "pathwayCode": "PW-OXPHOS",
        "pathwayNameRu": "Дыхательная цепь (OxPhos)",
        "pathwayNameEn": "Electron Transport Chain (OxPhos)",
        "isCurrentPathway": true,
        "role": "product",
        "detailsRu": "Конечный продукт четырехэлектронного восстановления O₂ Комплексом IV.",
        "detailsEn": "End product of Complex IV terminal reduction of oxygen.",
        "stepNumber": 3,
        "reactionCode": "R_ETC_CIV",
        "reactionNameRu": "Восстановление кислорода цитохромоксидазой",
        "reactionNameEn": "Oxygen reduction by cytochrome c oxidase"
      }
    ]
  }
];
