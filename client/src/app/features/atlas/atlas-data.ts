export interface PathwayParticipation {
  pathwayCode: string;
  pathwayNameRu: string;
  pathwayNameEn?: string;
  isCurrentPathway: boolean;
  role: 'substrate' | 'product' | 'cofactor' | 'intermediate';
  detailsRu: string;
  detailsEn?: string;
  stepNumber?: number;
  reactionCode?: string;
  reactionNameRu?: string;
  reactionNameEn?: string;
}

export interface HumanMetaboliteNode {
  id: string;
  code: string;
  nameRu: string;
  nameEn: string;
  abbrevRu: string;
  abbrevEn: string;
  formula: string;
  carbons: string;
  carbonsEn?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  smiles: string;
  chebi: string;
  inchiKey: string;
  descriptionRu: string;
  descriptionEn?: string;
  synonymsRu: string[];
  synonymsEn?: string[];
  skeletalSvg: string;
  structureSvg?: string;
  isCofactor?: boolean;
  isHub?: boolean;
  compartmentRu?: string;
  compartmentEn?: string;
  pathwaysRu: PathwayParticipation[];
}

export type CofactorPreset = 'tangent-swoop' | 'lateral-loop' | 'perpendicular-dip' | 'through-cross';

export interface CofactorParticipant {
  name: string;
  nameEn?: string;
  text: string;
  textRu?: string;
  textEn?: string;
  dx?: number;
  dy?: number;
  isEnergy?: boolean;
  isGtp?: boolean;
}

export interface ReactionCofactorArc {
  preset?: CofactorPreset;
  path: string;
  inCofactor?: string;
  inCofactorEn?: string;
  inText?: string;
  inTextRu?: string;
  inTextEn?: string;
  inX?: number;
  inY?: number;
  inAnchor?: 'start' | 'middle' | 'end';
  outCofactor?: string;
  outCofactorEn?: string;
  outText?: string;
  outTextRu?: string;
  outTextEn?: string;
  outX?: number;
  outY?: number;
  outAnchor?: 'start' | 'middle' | 'end';
  isEnergy?: boolean;
  isGtp?: boolean;
  inItems?: CofactorParticipant[];
  outItems?: CofactorParticipant[];
}

export interface HumanReactionArrow {
  id: string;
  stepNumber: number;
  code: string;
  nameRu: string;
  nameEn: string;
  pathwayCode?: string;
  pathwayNameRu?: string;
  pathwayNameEn?: string;
  compartmentRu?: string;
  compartmentEn?: string;
  sourceMetaboliteId: string;
  targetMetaboliteId: string;
  secondarySourceId?: string;
  secondaryTargetId?: string;
  secondaryPathData?: string;
  pathData: string;
  tooltipX: number;
  tooltipY: number;
  enzymeRu: string;
  enzymeEn: string;
  enzymeShort: string;
  ecNumber: string;
  gene: string;
  uniprotId: string;
  isReversible: boolean;
  deltaG0: string;
  substrates: { name: string; nameEn?: string; formula: string; isCo?: boolean }[];
  products: { name: string; nameEn?: string; formula: string; isCo?: boolean }[];
  cofactorArc?: ReactionCofactorArc;
  activatorsRu?: string[];
  activatorsEn?: string[];
  inhibitorsRu?: string[];
  inhibitorsEn?: string[];
  mechanismRu: string;
  mechanismEn?: string;
  energyBalanceRu?: string;
  energyBalanceEn?: string;
  netAtpYieldRu?: string;
  netAtpYieldEn?: string;
  clinicalNoteRu?: string;
  clinicalNoteEn?: string;
}

export interface MetabolicCrossroad {
  id: string;
  nameRu: string;
  nameEn: string;
  pathwayCode?: string;
  pathwayNameRu?: string;
  pathwayNameEn?: string;
  compartmentRu?: string;
  compartmentEn?: string;
  direction: 'in' | 'out';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  textX: number;
  textY: number;
}


export interface SectorLayoutConfig {
  sectorId: string;
  nameRu: string;
  nameEn: string;
  categoryRu: string;
  categoryEn: string;
  centerAngleRad: number;
  radiusMin: number;
  radiusMax: number;
  themeColor: string;
  gradientColors: [string, string];
  iconSvg?: string;
  centerX: number;
  centerY: number;
  boundingPoly: { x: number; y: number }[];
  descriptionRu: string;
  descriptionEn: string;
  connectedHubCode?: string;
  targetPathwayId: string;
}

export interface PathwaySuperHighway {
  id: string;
  sourcePathwayId: string;
  targetPathwayId: string;
  sourceMetaboliteCode: string;
  targetMetaboliteCode: string;
  nameRu: string;
  nameEn: string;
  pathData: string;
  carbonFlux: string;
  isAnabolic: boolean;
  isCatabolic: boolean;
  themeColor: string;
}

export interface GlobalMetabolicCanvasState {
  lodLevel: 1 | 2 | 3;
  activeSectorId: string | 'ALL';
  focusMetaboliteCode: string | null;
  camera: { x: number; y: number; zoom: number };
}

export const HUMAN_METABOLITES: HumanMetaboliteNode[] = [
  {
    "id": "b0000002-0000-0000-0000-000000000001",
    "code": "MET_GLUCOSE",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "D-Глюкоза",
    "nameEn": "D-Glucose",
    "abbrevRu": "Глю",
    "abbrevEn": "Glc",
    "formula": "C₆H₁₂O₆",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 1520,
    "y": -274,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<polygon points=\"24,12 36,18 36,30 24,36 12,30 12,18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"36\" cy=\"18\" r=\"3\" fill=\"#EF4444\"/><circle cx=\"24\" cy=\"36\" r=\"3\" fill=\"#EF4444\"/><circle cx=\"12\" cy=\"18\" r=\"3\" fill=\"#EF4444\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"120,20 155,40 155,75 120,95 85,75 85,40\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"155\" cy=\"40\" r=\"4.5\" fill=\"#EF4444\"/>\n  <text x=\"168\" y=\"42\" class=\"atom-o\" fill=\"#EF4444\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"central\">O</text>\n  <line x1=\"120\" y1=\"20\" x2=\"120\" y2=\"6\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"120\" y=\"2\" class=\"atom-c\" fill=\"#CBD5E1\" font-weight=\"600\" text-anchor=\"middle\" dominant-baseline=\"central\">CH₂OH</text>\n  <line x1=\"85\" y1=\"40\" x2=\"68\" y2=\"30\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"60\" y=\"25\" class=\"atom-o\" fill=\"#EF4444\" font-weight=\"700\" text-anchor=\"end\" dominant-baseline=\"central\">HO</text>\n  <line x1=\"85\" y1=\"75\" x2=\"68\" y2=\"85\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"60\" y=\"90\" class=\"atom-o\" fill=\"#EF4444\" font-weight=\"700\" text-anchor=\"end\" dominant-baseline=\"central\">OH</text>\n  <line x1=\"120\" y1=\"95\" x2=\"120\" y2=\"108\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"120\" y=\"114\" class=\"atom-o\" fill=\"#EF4444\" font-weight=\"700\" text-anchor=\"middle\" dominant-baseline=\"central\">OH</text>\n  <line x1=\"155\" y1=\"75\" x2=\"175\" y2=\"85\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"182\" y=\"90\" class=\"atom-o\" fill=\"#EF4444\" font-weight=\"700\" text-anchor=\"start\" dominant-baseline=\"central\">OH</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Глюкозо-6-фосфат",
    "nameEn": "Glucose 6-phosphate",
    "abbrevRu": "Г6Ф",
    "abbrevEn": "G6P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 1520,
    "y": -114,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<polygon points=\"24,12 36,18 36,30 24,36 12,30 12,18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"12\" cy=\"18\" r=\"3\" fill=\"#EF4444\"/><circle cx=\"24\" cy=\"8\" r=\"3\" fill=\"#F59E0B\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"100,30 135,50 135,80 100,98 65,80 65,50\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"135\" cy=\"50\" r=\"4\" fill=\"#EF4444\"/>\n  <line x1=\"100\" y1=\"30\" x2=\"100\" y2=\"15\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <line x1=\"100\" y1=\"15\" x2=\"135\" y2=\"15\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"140\" y=\"4\" width=\"70\" height=\"22\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"175\" y=\"15\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"11\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n</svg>",
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
        "pathwayCode": "PWY_GLYCOGEN",
        "pathwayNameRu": "Синтез гликогена",
        "pathwayNameEn": "Glycogen Synthesis",
        "isCurrentPathway": false,
        "role": "substrate",
        "detailsRu": "Изомеризуется фосфоглюкомутазой в G1P для активации в УДФ-глюкозу.",
        "detailsEn": "Precursor of glucose 1-phosphate and UDP-glucose for glycogen storage."
      }
    ]
  },
  {
    "id": "b0000002-0000-0000-0000-000000000003",
    "code": "MET_F6P",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Фруктозо-6-фосфат",
    "nameEn": "Fructose 6-phosphate",
    "abbrevRu": "Ф6Ф",
    "abbrevEn": "F6P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 1520,
    "y": 46,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<polygon points=\"24,14 34,22 30,34 18,34 14,22\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"34\" cy=\"22\" r=\"3\" fill=\"#EF4444\"/><circle cx=\"14\" cy=\"22\" r=\"3\" fill=\"#F59E0B\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"105,32 135,48 125,78 85,78 75,48\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"105\" cy=\"32\" r=\"4\" fill=\"#EF4444\"/>\n  <line x1=\"75\" y1=\"48\" x2=\"60\" y2=\"40\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"52\" y=\"36\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"end\">HOCH₂</text>\n  <line x1=\"135\" y1=\"48\" x2=\"155\" y2=\"40\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"160\" y=\"30\" width=\"65\" height=\"20\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"192\" y=\"40\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Фруктозо-1,6-бисфосфат",
    "nameEn": "Fructose 1,6-bisphosphate",
    "abbrevRu": "Ф1,6БФ",
    "abbrevEn": "F1,6BP",
    "formula": "C₆H₁₀O₁₂P₂⁴⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 1520,
    "y": 206,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<circle cx=\"10\" cy=\"18\" r=\"3\" fill=\"#F59E0B\"/><polygon points=\"24,14 34,22 30,34 18,34 14,22\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"38\" cy=\"18\" r=\"3\" fill=\"#F59E0B\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"110,34 140,50 130,78 90,78 80,50\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"110\" cy=\"34\" r=\"4\" fill=\"#EF4444\"/>\n  <rect x=\"8\" y=\"42\" width=\"60\" height=\"20\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"38\" y=\"52\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"9.5\" text-anchor=\"middle\" dominant-baseline=\"central\">⁻²O₃P-O</text>\n  <line x1=\"68\" y1=\"52\" x2=\"80\" y2=\"50\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <line x1=\"140\" y1=\"50\" x2=\"160\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"162\" y=\"42\" width=\"60\" height=\"20\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"192\" y=\"52\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"9.5\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Дигидроксиацетонфосфат",
    "nameEn": "Dihydroxyacetone phosphate",
    "abbrevRu": "ДАФ",
    "abbrevEn": "DHAP",
    "formula": "C₃H₅O₆P²⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 1885,
    "y": 366,
    "width": 155,
    "height": 74,
    "color": "#8B5CF6",
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
    "skeletalSvg": "<path d=\"M 12 18 L 24 24 L 36 18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><line x1=\"24\" y1=\"24\" x2=\"24\" y2=\"34\" stroke=\"currentColor\" stroke-width=\"1.6\"/><circle cx=\"24\" cy=\"34\" r=\"2.5\" fill=\"#EF4444\"/><circle cx=\"36\" cy=\"18\" r=\"3\" fill=\"#F59E0B\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <text x=\"35\" y=\"52\" fill=\"#CBD5E1\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">HO-CH₂</text>\n  <line x1=\"60\" y1=\"52\" x2=\"95\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <line x1=\"92\" y1=\"52\" x2=\"92\" y2=\"24\" stroke=\"#94A3B8\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n  <line x1=\"98\" y1=\"52\" x2=\"98\" y2=\"24\" stroke=\"#94A3B8\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n  <text x=\"95\" y=\"16\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"12\" text-anchor=\"middle\">O</text>\n  <line x1=\"95\" y1=\"52\" x2=\"135\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"142\" y=\"52\" fill=\"#CBD5E1\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">CH₂</text>\n  <line x1=\"155\" y1=\"52\" x2=\"175\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <rect x=\"178\" y=\"40\" width=\"55\" height=\"24\" rx=\"4\" fill=\"rgba(139,92,246,0.18)\" stroke=\"#8B5CF6\" stroke-width=\"1.2\"/>\n  <text x=\"205\" y=\"52\" fill=\"#8B5CF6\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Глицеральдегид-3-фосфат",
    "nameEn": "Glyceraldehyde 3-phosphate",
    "abbrevRu": "ГАФ",
    "abbrevEn": "G3P",
    "formula": "C₃H₅O₆P²⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 1520,
    "y": 366,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<path d=\"M 12 18 L 24 24 L 36 18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"12\" cy=\"18\" r=\"3\" fill=\"#EF4444\"/><circle cx=\"36\" cy=\"18\" r=\"3\" fill=\"#F59E0B\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <text x=\"35\" y=\"30\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"12\" text-anchor=\"middle\">O=CH</text>\n  <line x1=\"55\" y1=\"34\" x2=\"90\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"100\" y=\"55\" fill=\"#CBD5E1\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">CH(OH)</text>\n  <line x1=\"125\" y1=\"52\" x2=\"155\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <rect x=\"160\" y=\"40\" width=\"60\" height=\"24\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"190\" y=\"52\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "1,3-Бисфосфоглицерат",
    "nameEn": "1,3-Bisphosphoglycerate",
    "abbrevRu": "1,3-БФГ",
    "abbrevEn": "1,3-BPG",
    "formula": "C₃H₄O₁₀P₂⁴⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 1520,
    "y": 526,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<circle cx=\"10\" cy=\"18\" r=\"3\" fill=\"#F59E0B\"/><path d=\"M 14 18 L 24 24 L 34 18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"38\" cy=\"18\" r=\"3\" fill=\"#F59E0B\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <rect x=\"8\" y=\"40\" width=\"55\" height=\"22\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"35\" y=\"51\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"9\" text-anchor=\"middle\" dominant-baseline=\"central\">⁻²O₃P-O</text>\n  <line x1=\"65\" y1=\"51\" x2=\"88\" y2=\"51\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"96\" y=\"51\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">C(=O)</text>\n  <line x1=\"115\" y1=\"51\" x2=\"140\" y2=\"51\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"148\" y=\"51\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">CH(OH)</text>\n  <line x1=\"170\" y1=\"51\" x2=\"182\" y2=\"51\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"185\" y=\"40\" width=\"50\" height=\"22\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"210\" y=\"51\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"9\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "3-Фосфоглицерат",
    "nameEn": "3-Phosphoglycerate",
    "abbrevRu": "3-ФГ",
    "abbrevEn": "3-PG",
    "formula": "C₃H₄O₇P³⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 1520,
    "y": 686,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<path d=\"M 12 24 L 24 18 L 36 24\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"12\" cy=\"24\" r=\"3\" fill=\"#EF4444\"/><circle cx=\"36\" cy=\"24\" r=\"3\" fill=\"#F59E0B\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <text x=\"38\" y=\"52\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"11\" text-anchor=\"middle\">⁻OOC</text>\n  <line x1=\"60\" y1=\"52\" x2=\"95\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"110\" y=\"52\" fill=\"#CBD5E1\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">CH(OH)</text>\n  <line x1=\"135\" y1=\"52\" x2=\"165\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <rect x=\"170\" y=\"40\" width=\"60\" height=\"24\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"200\" y=\"52\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "2-Фосфоглицерат",
    "nameEn": "2-Phosphoglycerate",
    "abbrevRu": "2-ФГ",
    "abbrevEn": "2-PG",
    "formula": "C₃H₄O₇P³⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 1520,
    "y": 846,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<path d=\"M 12 18 L 24 24 L 36 18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"24\" cy=\"24\" r=\"3\" fill=\"#F59E0B\"/><circle cx=\"36\" cy=\"18\" r=\"3\" fill=\"#EF4444\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <text x=\"40\" y=\"52\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"11\" text-anchor=\"middle\">⁻OOC</text>\n  <line x1=\"62\" y1=\"52\" x2=\"98\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"115\" y=\"52\" fill=\"#CBD5E1\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">CH</text>\n  <line x1=\"115\" y1=\"40\" x2=\"115\" y2=\"24\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"85\" y=\"4\" width=\"60\" height=\"20\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"115\" y=\"14\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"9.5\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n  <line x1=\"130\" y1=\"52\" x2=\"165\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"185\" y=\"52\" fill=\"#CBD5E1\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">CH₂OH</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Фосфоенолпируват",
    "nameEn": "Phosphoenolpyruvate",
    "abbrevRu": "ФЕП",
    "abbrevEn": "PEP",
    "formula": "C₃H₂O₆P³⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 1520,
    "y": 1006,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<line x1=\"12\" y1=\"26\" x2=\"24\" y2=\"20\" stroke=\"currentColor\" stroke-width=\"2.2\"/><line x1=\"12\" y1=\"22\" x2=\"24\" y2=\"16\" stroke=\"currentColor\" stroke-width=\"1.4\"/><circle cx=\"24\" cy=\"18\" r=\"3\" fill=\"#F59E0B\"/><circle cx=\"36\" cy=\"24\" r=\"3\" fill=\"#EF4444\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <text x=\"35\" y=\"52\" fill=\"#CBD5E1\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">CH₂=</text>\n  <line x1=\"55\" y1=\"48\" x2=\"90\" y2=\"48\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <line x1=\"55\" y1=\"54\" x2=\"90\" y2=\"54\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"100\" y=\"52\" fill=\"#CBD5E1\" font-size=\"12\" font-weight=\"600\" text-anchor=\"middle\">C</text>\n  <line x1=\"100\" y1=\"40\" x2=\"100\" y2=\"24\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"70\" y=\"4\" width=\"60\" height=\"20\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"100\" y=\"14\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"9.5\" text-anchor=\"middle\" dominant-baseline=\"central\">O-PO₃²⁻</text>\n  <line x1=\"110\" y1=\"52\" x2=\"145\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"165\" y=\"52\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"12\" text-anchor=\"middle\">COO⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Пируват (Цитозоль)",
    "nameEn": "Pyruvate (Cytosolic)",
    "abbrevRu": "Пир (Цит)",
    "abbrevEn": "Pyr (Cyt)",
    "formula": "C₃H₃O₃⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 1520,
    "y": 1166,
    "width": 160,
    "height": 74,
    "color": "#F59E0B",
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
    "skeletalSvg": "<path d=\"M 12 24 L 24 18 L 36 24\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><line x1=\"24\" y1=\"18\" x2=\"24\" y2=\"8\" stroke=\"currentColor\" stroke-width=\"1.6\"/><circle cx=\"24\" cy=\"8\" r=\"2.5\" fill=\"#EF4444\"/><circle cx=\"36\" cy=\"24\" r=\"3\" fill=\"#EF4444\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <text x=\"45\" y=\"52\" fill=\"#CBD5E1\" font-size=\"12\" font-weight=\"600\" text-anchor=\"middle\">H₃C</text>\n  <line x1=\"65\" y1=\"52\" x2=\"105\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <line x1=\"102\" y1=\"52\" x2=\"102\" y2=\"24\" stroke=\"#94A3B8\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n  <line x1=\"108\" y1=\"52\" x2=\"108\" y2=\"24\" stroke=\"#94A3B8\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n  <text x=\"105\" y=\"16\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"12\" text-anchor=\"middle\">O</text>\n  <line x1=\"105\" y1=\"52\" x2=\"145\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"165\" y=\"52\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"12\" text-anchor=\"middle\">COO⁻</text>\n</svg>",
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
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "nameRu": "Пируват (Матрикс)",
    "nameEn": "Pyruvate (Mitochondrial)",
    "abbrevRu": "Пир (Мит)",
    "abbrevEn": "Pyr (Mit)",
    "formula": "C₃H₃O₃⁻",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 1520,
    "y": 1356,
    "width": 160,
    "height": 74,
    "color": "#10B981",
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
    "skeletalSvg": "<path d=\"M 12 24 L 24 18 L 36 24\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><line x1=\"24\" y1=\"18\" x2=\"24\" y2=\"8\" stroke=\"currentColor\" stroke-width=\"1.6\"/><circle cx=\"24\" cy=\"8\" r=\"2.5\" fill=\"#10B981\"/><circle cx=\"36\" cy=\"24\" r=\"3\" fill=\"#EF4444\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <text x=\"45\" y=\"52\" fill=\"#CBD5E1\" font-size=\"12\" font-weight=\"600\" text-anchor=\"middle\">H₃C</text>\n  <line x1=\"65\" y1=\"52\" x2=\"105\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <line x1=\"102\" y1=\"52\" x2=\"102\" y2=\"24\" stroke=\"#94A3B8\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n  <line x1=\"108\" y1=\"52\" x2=\"108\" y2=\"24\" stroke=\"#94A3B8\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>\n  <text x=\"105\" y=\"16\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"12\" text-anchor=\"middle\">O</text>\n  <line x1=\"105\" y1=\"52\" x2=\"145\" y2=\"52\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"165\" y=\"52\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"12\" text-anchor=\"middle\">COO⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "D-Галактоза",
    "nameEn": "D-Galactose",
    "abbrevRu": "Гал",
    "abbrevEn": "Gal",
    "formula": "C₆H₁₂O₆",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 700,
    "y": -274,
    "width": 160,
    "height": 74,
    "color": "#A855F7",
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
    "skeletalSvg": "<polygon points=\"24,12 36,18 36,30 24,36 12,30 12,18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"12\" cy=\"18\" r=\"3\" fill=\"#A855F7\"/><circle cx=\"24\" cy=\"12\" r=\"3\" fill=\"#EF4444\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"120,24 156,42 156,74 120,92 84,74 84,42\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"156\" cy=\"42\" r=\"4\" fill=\"#EF4444\"/>\n  <line x1=\"84\" y1=\"42\" x2=\"64\" y2=\"28\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"46\" y=\"25\" fill=\"#A855F7\" font-size=\"10\" font-weight=\"700\" text-anchor=\"middle\">HO(C4)</text>\n  <line x1=\"156\" y1=\"74\" x2=\"178\" y2=\"84\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"196\" y=\"88\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">OH</text>\n  <line x1=\"84\" y1=\"74\" x2=\"64\" y2=\"84\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"44\" y=\"88\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">CH₂OH</text>\n</svg>",
    "pathwaysRu": [
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Галактозо-1-фосфат",
    "nameEn": "Galactose 1-phosphate",
    "abbrevRu": "Гал-1-Ф",
    "abbrevEn": "Gal-1-P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 700,
    "y": -114,
    "width": 160,
    "height": 74,
    "color": "#A855F7",
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
    "skeletalSvg": "<polygon points=\"22,12 34,18 34,30 22,36 10,30 10,18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"34\" cy=\"24\" r=\"3\" fill=\"#A855F7\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"95,26 128,44 128,74 95,90 62,74 62,44\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"128\" cy=\"44\" r=\"4\" fill=\"#EF4444\"/>\n  <line x1=\"128\" y1=\"60\" x2=\"155\" y2=\"60\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"158\" y=\"48\" width=\"72\" height=\"24\" rx=\"4\" fill=\"rgba(168,85,247,0.18)\" stroke=\"#A855F7\" stroke-width=\"1.2\"/>\n  <text x=\"194\" y=\"60\" fill=\"#A855F7\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">C1-O-PO₃²⁻</text>\n  <text x=\"42\" y=\"36\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">HO(C4)</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Глюкозо-1-фосфат",
    "nameEn": "Glucose 1-phosphate",
    "abbrevRu": "Г1Ф",
    "abbrevEn": "G1P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 1175,
    "y": -114,
    "width": 155,
    "height": 74,
    "color": "#A855F7",
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
    "skeletalSvg": "<polygon points=\"22,12 34,18 34,30 22,36 10,30 10,18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"34\" cy=\"24\" r=\"3\" fill=\"#F59E0B\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"95,26 128,44 128,74 95,90 62,74 62,44\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"128\" cy=\"44\" r=\"4\" fill=\"#EF4444\"/>\n  <line x1=\"128\" y1=\"60\" x2=\"155\" y2=\"60\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"158\" y=\"48\" width=\"72\" height=\"24\" rx=\"4\" fill=\"rgba(245,158,11,0.18)\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n  <text x=\"194\" y=\"60\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">C1-O-PO₃²⁻</text>\n  <text x=\"42\" y=\"36\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">Glc(C4-OH)</text>\n</svg>",
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
      }
    ]
  },
  {
    "id": "b0000003-0000-0000-0000-000000000004",
    "code": "MET_UDP_GAL",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "УДФ-галактоза",
    "nameEn": "UDP-galactose",
    "abbrevRu": "УДФ-Гал",
    "abbrevEn": "UDP-Gal",
    "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻",
    "carbons": "6C+УДФ",
    "carbonsEn": "6C+UDP",
    "x": 930,
    "y": -274,
    "width": 155,
    "height": 74,
    "color": "#A855F7",
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
    "skeletalSvg": "<polygon points=\"28,14 38,20 38,30 28,36 18,30 18,20\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"12\" cy=\"24\" r=\"4\" fill=\"#A855F7\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"150,24 182,42 182,72 150,88 118,72 118,42\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <line x1=\"118\" y1=\"56\" x2=\"86\" y2=\"56\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"18\" y=\"42\" width=\"68\" height=\"28\" rx=\"5\" fill=\"rgba(168,85,247,0.18)\" stroke=\"#A855F7\" stroke-width=\"1.2\"/>\n  <text x=\"52\" y=\"56\" fill=\"#A855F7\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">UDP-P₂-O</text>\n  <text x=\"205\" y=\"42\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">Gal(C4)</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "УДФ-глюкоза",
    "nameEn": "UDP-glucose",
    "abbrevRu": "УДФ-Глю",
    "abbrevEn": "UDP-Glc",
    "formula": "C₁₅H₂₂N₂O₁₇P₂²⁻",
    "carbons": "6C+УДФ",
    "carbonsEn": "6C+UDP",
    "x": 1175,
    "y": -274,
    "width": 155,
    "height": 74,
    "color": "#A855F7",
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
    "skeletalSvg": "<polygon points=\"28,14 38,20 38,30 28,36 18,30 18,20\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"12\" cy=\"24\" r=\"4\" fill=\"#10B981\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"150,24 182,42 182,72 150,88 118,72 118,42\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <line x1=\"118\" y1=\"56\" x2=\"86\" y2=\"56\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"18\" y=\"42\" width=\"68\" height=\"28\" rx=\"5\" fill=\"rgba(16,185,129,0.18)\" stroke=\"#10B981\" stroke-width=\"1.2\"/>\n  <text x=\"52\" y=\"56\" fill=\"#10B981\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">UDP-P₂-O</text>\n  <text x=\"205\" y=\"42\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">Glc(C4)</text>\n</svg>",
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
      }
    ]
  },
  {
    "id": "b0000004-0000-0000-0000-000000000001",
    "code": "MET_FRUCTOSE",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "D-Фруктоза",
    "nameEn": "D-Fructose",
    "abbrevRu": "Фру",
    "abbrevEn": "Fru",
    "formula": "C₆H₁₂O₆",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 2160,
    "y": 46,
    "width": 160,
    "height": 74,
    "color": "#F97316",
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
    "skeletalSvg": "<polygon points=\"24,14 34,22 30,34 18,34 14,22\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"24\" cy=\"14\" r=\"3\" fill=\"#F97316\"/><circle cx=\"34\" cy=\"22\" r=\"2.5\" fill=\"#EF4444\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"120,26 156,46 142,80 98,80 84,46\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"120\" cy=\"26\" r=\"4\" fill=\"#F97316\"/>\n  <line x1=\"156\" y1=\"46\" x2=\"182\" y2=\"34\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"202\" y=\"32\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">CH₂OH</text>\n  <line x1=\"84\" y1=\"46\" x2=\"58\" y2=\"34\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <text x=\"38\" y=\"32\" fill=\"#CBD5E1\" font-size=\"10\" font-weight=\"600\" text-anchor=\"middle\">CH₂OH</text>\n</svg>",
    "pathwaysRu": [
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Фруктозо-1-фосфат",
    "nameEn": "Fructose 1-phosphate",
    "abbrevRu": "Ф1Ф",
    "abbrevEn": "F1P",
    "formula": "C₆H₁₁O₉P²⁻",
    "carbons": "6C",
    "carbonsEn": "6C",
    "x": 2160,
    "y": 206,
    "width": 160,
    "height": 74,
    "color": "#F97316",
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
    "skeletalSvg": "<polygon points=\"22,14 32,22 28,34 16,34 12,22\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"34\" cy=\"22\" r=\"3\" fill=\"#F97316\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <polygon points=\"95,28 128,46 116,78 74,78 62,46\" class=\"chem-ring\" stroke=\"#94A3B8\" stroke-width=\"2.2\" fill=\"none\"/>\n  <circle cx=\"95\" cy=\"28\" r=\"4\" fill=\"#EF4444\"/>\n  <line x1=\"128\" y1=\"46\" x2=\"156\" y2=\"46\" stroke=\"#94A3B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n  <rect x=\"158\" y=\"34\" width=\"72\" height=\"24\" rx=\"4\" fill=\"rgba(249,115,22,0.18)\" stroke=\"#F97316\" stroke-width=\"1.2\"/>\n  <text x=\"194\" y=\"46\" fill=\"#F97316\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\" dominant-baseline=\"central\">C1-O-PO₃²⁻</text>\n</svg>",
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
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "D-Глицеральдегид",
    "nameEn": "D-Glyceraldehyde",
    "abbrevRu": "ГА",
    "abbrevEn": "GA",
    "formula": "C₃H₆O₃",
    "carbons": "3C",
    "carbonsEn": "3C",
    "x": 2160,
    "y": 366,
    "width": 165,
    "height": 74,
    "color": "#F97316",
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
    "skeletalSvg": "<path d=\"M 12 18 L 24 24 L 36 18\" stroke=\"currentColor\" stroke-width=\"1.6\" fill=\"none\"/><circle cx=\"12\" cy=\"18\" r=\"3\" fill=\"#EF4444\"/><circle cx=\"36\" cy=\"18\" r=\"2.5\" fill=\"#F97316\"/>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <text x=\"42\" y=\"34\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"12\" text-anchor=\"middle\">O=CH</text>\n  <line x1=\"62\" y1=\"36\" x2=\"100\" y2=\"54\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"120\" y=\"58\" fill=\"#CBD5E1\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">CH(OH)</text>\n  <line x1=\"146\" y1=\"54\" x2=\"182\" y2=\"54\" stroke=\"#94A3B8\" stroke-width=\"2.2\" stroke-linecap=\"round\"/>\n  <text x=\"204\" y=\"58\" fill=\"#F97316\" font-size=\"11\" font-weight=\"700\" text-anchor=\"middle\">CH₂OH</text>\n</svg>",
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
    id: 'b0000001-0000-0000-0000-000000000003',
    code: 'MET_OAA',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Оксалоацетат',
    nameEn: 'Oxaloacetate',
    abbrevRu: 'ОАО',
    abbrevEn: 'OAA',
    formula: 'C₄H₂O₅²⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 1364,
    y: 1766,
    width: 150,
    height: 72,
    color: '#8B5CF6',
    smiles: 'C(C(=O)C(=O)[O-])C(=O)[O-]',
    chebi: 'CHEBI:16452',
    inchiKey: 'KHPXUQMNIQBQEV-UHFFFAOYSA-L',
    descriptionRu: 'Четырехуглеродный акцептор ацетильной группы в первой реакции цикла. Регенерируется на последней стадии. Служит субстратом для глюконеогенеза и малат-аспартатного челнока.',
    descriptionEn: 'Four-carbon acetyl group acceptor in the initial condensation step of the TCA cycle. Regenerated in the final step. Also serves as key substrate for gluconeogenesis and the malate-aspartate shuttle.',
    synonymsRu: ['Оксалоацетат', 'ОАО', 'Щавелевоуксусная кислота', '2-оксобутандиоат'],
    synonymsEn: ['Oxaloacetate', 'OAA', 'Oxaloacetic acid', '2-oxobutanedioate'],
    skeletalSvg: '<path d="M 12 18 L 22 24 L 32 18 L 42 24" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="18" r="3" fill="#EF4444"/><circle cx="42" cy="24" r="3" fill="#EF4444"/><circle cx="22" cy="12" r="2.5" fill="#EF4444"/><line x1="22" y1="24" x2="22" y2="12" stroke="currentColor" stroke-width="1.6"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="28" y="34" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O⁻</text>
  <line x1="38" y1="38" x2="65" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="62" y1="52" x2="62" y2="78" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="68" y1="52" x2="68" y2="78" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <text x="65" y="88" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="65" y1="52" x2="105" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="102" y1="52" x2="102" y2="24" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="108" y1="52" x2="108" y2="24" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <text x="105" y="16" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="105" y1="52" x2="140" y2="66" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="148" y="68" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="162" y1="64" x2="185" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="182" y1="52" x2="182" y2="24" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="188" y1="52" x2="188" y2="24" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <text x="185" y="16" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="185" y1="52" x2="208" y2="64" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="218" y="70" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O⁻</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'substrate',
        detailsRu: 'Стадия 1: конденсируется с ацетил-КоА в цитрат; Стадия 8: регенерируется окислением L-малата.',
        detailsEn: 'Step 1: condenses with Acetyl-CoA into citrate; Step 8: regenerated by L-malate oxidation.',
        stepNumber: 1,
        reactionCode: 'R_CS',
        reactionNameRu: 'Конденсация оксалоацетата и ацетил-КоА',
        reactionNameEn: 'Condensation of oxaloacetate and acetyl-CoA',
      },
      {
        pathwayCode: 'PWY_GNG',
        pathwayNameRu: 'Глюконеогенез (Синтез глюкозы)',
        pathwayNameEn: 'Gluconeogenesis (Glucose Synthesis)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Превращается в фосфоенолпируват митохондриальной фосфоенолпируваткарбоксикиназой (PEPCK-M / PCK2).',
        detailsEn: 'Converted into phosphoenolpyruvate by mitochondrial phosphoenolpyruvate carboxykinase (PEPCK-M / PCK2).',
      },
      {
        pathwayCode: 'PWY_MALATE_SHUTTLE',
        pathwayNameRu: 'Малат-аспартатный челночный механизм',
        pathwayNameEn: 'Malate-Aspartate Shuttle Mechanism',
        isCurrentPathway: false,
        role: 'intermediate',
        detailsRu: 'Трансаминируется в L-аспартат (фермент GOT2) для переноса электронов в матрикс митохондрий.',
        detailsEn: 'Transaminated to L-aspartate by GOT2 for transferring reducing equivalents into mitochondrial matrix.',
      },
      {
        pathwayCode: 'PWY_AMINO_ACID',
        pathwayNameRu: 'Синтез аминокислот',
        pathwayNameEn: 'Amino Acid Biosynthesis',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Прямой метаболический предшественник аспартата, аспарагина и пиримидиновых нуклеотидов.',
        detailsEn: 'Direct precursor to aspartate, asparagine, and pyrimidine nucleotide synthesis.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000004',
    code: 'MET_CITRATE',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Цитрат',
    nameEn: 'Citrate',
    abbrevRu: 'ЦИТ',
    abbrevEn: 'CIT',
    formula: 'C₆H₅O₇³⁻',
    carbons: '6C',
    carbonsEn: '6C',
    x: 1691,
    y: 1766,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(C(=O)[O-])C(CC(=O)[O-])(C(=O)[O-])O',
    chebi: 'CHEBI:16947',
    inchiKey: 'KRKNYBCHXYNGOX-UHFFFAOYSA-K',
    descriptionRu: 'Шестиуглеродная трикарбоновая кислота, первый промежуточный продукт цикла. Может транспортироваться в цитозоль для синтеза жирных кислот и холестерина.',
    descriptionEn: 'Six-carbon tricarboxylic acid and first intermediate of the citric acid cycle. Exportable to cytosol via citrate shuttle for fatty acid and cholesterol synthesis.',
    synonymsRu: ['Цитрат', 'ЦИТ', 'Лимонная кислота', '2-гидроксипропан-1,2,3-трикарбоксилат'],
    synonymsEn: ['Citrate', 'CIT', 'Citric acid', '2-hydroxypropane-1,2,3-tricarboxylate'],
    skeletalSvg: '<path d="M 10 20 L 22 26 L 34 20 L 46 26" stroke="currentColor" stroke-width="1.6" fill="none"/><line x1="22" y1="26" x2="22" y2="10" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="20" r="3" fill="#EF4444"/><circle cx="46" cy="26" r="3" fill="#EF4444"/><circle cx="22" cy="10" r="3" fill="#EF4444"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="24" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">⁻OOC</text>
  <line x1="48" y1="52" x2="74" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="84" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="96" y1="52" x2="120" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="120" y1="52" x2="120" y2="28" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="120" y="18" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">OH</text>
  <line x1="120" y1="52" x2="120" y2="76" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="120" y="86" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">COO⁻</text>
  <line x1="120" y1="52" x2="144" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="154" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="166" y1="52" x2="192" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="214" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">COO⁻</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'intermediate',
        detailsRu: 'Образуется на стадии 1 (цитратсинтаза) и изомеризуется в изоцитрат на стадии 2 (аконитаза).',
        detailsEn: 'Generated in step 1 (citrate synthase) and isomerized to isocitrate in step 2 (aconitase).',
        stepNumber: 2,
        reactionCode: 'R_ACO',
        reactionNameRu: 'Изомеризация цитрата в изоцитрат',
        reactionNameEn: 'Isomerization of citrate to isocitrate',
      },
      {
        pathwayCode: 'PWY_LIPID_SYN',
        pathwayNameRu: 'Синтез жирных кислот (Липогенез)',
        pathwayNameEn: 'Fatty Acid Synthesis (Lipogenesis)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Экспортируется в цитоплазму через цитратный челнок (SLC25A1) и расщепляется АТФ-цитратлиазой (ACLY) для синтеза липидов.',
        detailsEn: 'Exported into cytoplasm via citrate shuttle (SLC25A1) and cleaved by ATP-citrate lyase (ACLY) for lipid synthesis.',
      },
      {
        pathwayCode: 'PWY_GLYCOLYSIS',
        pathwayNameRu: 'Гликолиз (Аллостерический регулятор)',
        pathwayNameEn: 'Glycolysis (Allosteric Regulator)',
        isCurrentPathway: false,
        role: 'cofactor',
        detailsRu: 'Сильный аллостерический ингибитор фосфофруктокиназы-1 (ФФК-1); сигнализирует об избытке клеточной энергии.',
        detailsEn: 'Potent allosteric inhibitor of phosphofructokinase-1 (PFK-1); signals cellular energy surplus.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000005',
    code: 'MET_ISOCITRATE',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Изоцитрат',
    nameEn: 'Isocitrate',
    abbrevRu: 'ИЗО',
    abbrevEn: 'ICT',
    formula: 'C₆H₅O₇³⁻',
    carbons: '6C',
    carbonsEn: '6C',
    x: 1918,
    y: 1993,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(C(C(=O)[O-])O)(CC(=O)[O-])C(=O)[O-]',
    chebi: 'CHEBI:16087',
    inchiKey: 'ODBLHEXUDAPZAU-UHFFFAOYSA-N',
    descriptionRu: 'Изомер цитрата с вторичной гидроксильной группой, подготовленный для окислительного декарбоксилирования.',
    descriptionEn: 'Citrate isomer with a secondary hydroxyl group, structured for oxidative decarboxylation into α-ketoglutarate.',
    synonymsRu: ['Изоцитрат', 'ИЗО', 'Изолимонная кислота', '1-гидроксипропан-1,2,3-трикарбоксилат'],
    synonymsEn: ['Isocitrate', 'ICT', 'Isocitric acid', '1-hydroxypropane-1,2,3-tricarboxylate'],
    skeletalSvg: '<path d="M 10 24 L 22 18 L 34 24 L 46 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="24" r="3" fill="#EF4444"/><circle cx="46" cy="18" r="3" fill="#EF4444"/><circle cx="34" cy="32" r="3" fill="#EF4444"/><line x1="34" y1="24" x2="34" y2="32" stroke="currentColor" stroke-width="1.6"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="22" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">⁻OOC</text>
  <line x1="46" y1="52" x2="68" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="72" y1="46" x2="72" y2="26" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="72" y="16" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">OH</text>
  <text x="72" y="54" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH</text>
  <line x1="82" y1="52" x2="114" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="120" y1="58" x2="120" y2="76" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="120" y="86" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">COO⁻</text>
  <text x="120" y="54" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH</text>
  <line x1="130" y1="52" x2="158" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="166" y="54" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="178" y1="52" x2="198" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="218" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">COO⁻</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'substrate',
        detailsRu: 'Стадия 3: субстрат главного регуляторного фермента — изоцитратдегидрогеназы 3 (IDH3).',
        detailsEn: 'Step 3: substrate for key rate-limiting enzyme isocitrate dehydrogenase 3 (IDH3).',
        stepNumber: 3,
        reactionCode: 'R_IDH',
        reactionNameRu: 'Окислительное декарбоксилирование изоцитрата',
        reactionNameEn: 'Oxidative decarboxylation of isocitrate',
      },
      {
        pathwayCode: 'PWY_NADPH_GEN',
        pathwayNameRu: 'Цитозольная генерация НАДФН',
        pathwayNameEn: 'Cytosolic NADPH Generation',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Окисляется цитозольной IDH1 с образованием НАДФН для антиоксидантной защиты глутатиона.',
        detailsEn: 'Oxidized by cytosolic IDH1 yielding NADPH for glutathione-mediated antioxidant defense.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000006',
    code: 'MET_AKG',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'α-Кетоглутарат',
    nameEn: 'α-Ketoglutarate',
    abbrevRu: 'α-КГ',
    abbrevEn: 'α-KG',
    formula: 'C₅H₄O₅²⁻',
    carbons: '5C',
    carbonsEn: '5C',
    x: 1913,
    y: 2315,
    width: 150,
    height: 72,
    color: '#6366F1',
    smiles: 'C(CC(=O)[O-])C(=O)C(=O)[O-]',
    chebi: 'CHEBI:16810',
    inchiKey: 'KPGXRSRHYNQIFN-UHFFFAOYSA-L',
    descriptionRu: 'Пятиуглеродный интермедиат. Ключевой перекресток обмена аминокислот (глутамат, глутамин), обезвреживания аммиака и эпигенетической регуляции.',
    descriptionEn: 'Five-carbon intermediate. Critical crossroads of amino acid metabolism (glutamate, glutamine), ammonia detoxification, and epigenetic chromatin regulation.',
    synonymsRu: ['α-Кетоглутарат', '2-оксоглутарат', 'α-КГ', '2-оксопентандиоат'],
    synonymsEn: ['α-Ketoglutarate', '2-oxoglutarate', 'α-KG', '2-oxopentanedioate'],
    skeletalSvg: '<path d="M 10 20 L 22 26 L 34 18 L 46 24" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="20" r="3" fill="#EF4444"/><circle cx="46" cy="24" r="3" fill="#EF4444"/><circle cx="34" cy="10" r="2.5" fill="#EF4444"/><line x1="34" y1="18" x2="34" y2="10" stroke="currentColor" stroke-width="1.6"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="24" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">⁻OOC</text>
  <line x1="50" y1="52" x2="78" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="75" y1="52" x2="75" y2="26" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="81" y1="52" x2="81" y2="26" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <text x="78" y="16" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="78" y1="52" x2="114" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="124" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="136" y1="52" x2="164" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="174" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="186" y1="52" x2="208" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="224" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">COO⁻</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'intermediate',
        detailsRu: 'Образуется на стадии 3 (ИДГ3) и окислительно декарбоксилируется на стадии 4 (α-КГДГ).',
        detailsEn: 'Produced in step 3 (IDH3) and oxidatively decarboxylated in step 4 (α-KGDH).',
        stepNumber: 4,
        reactionCode: 'R_KGDH',
        reactionNameRu: 'Окислительное декарбоксилирование α-кетоглутарата',
        reactionNameEn: 'Oxidative decarboxylation of α-ketoglutarate',
      },
      {
        pathwayCode: 'PWY_AMINO_ACID',
        pathwayNameRu: 'Обмен аминокислот (Трансаминирование)',
        pathwayNameEn: 'Amino Acid Metabolism (Transamination)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Универсальный акцептор аминогрупп от большинства аминокислот с образованием L-глутамата (АлАТ, АсАТ).',
        detailsEn: 'Universal amino group acceptor from amino acids forming L-glutamate (ALT, AST).',
      },
      {
        pathwayCode: 'PWY_UREA',
        pathwayNameRu: 'Обезвреживание аммиака / Цикл мочевины',
        pathwayNameEn: 'Ammonia Detoxification / Urea Cycle',
        isCurrentPathway: false,
        role: 'intermediate',
        detailsRu: 'Связывает токсичный ион аммония через глутаматдегидрогеназу (ГДГ), поставляя азот в цикл мочевины.',
        detailsEn: 'Fixes toxic ammonium via glutamate dehydrogenase (GDH), delivering nitrogen to the urea cycle.',
      },
      {
        pathwayCode: 'PWY_EPIGENETICS',
        pathwayNameRu: 'Эпигенетическая регуляция хроматина',
        pathwayNameEn: 'Epigenetic Chromatin Regulation',
        isCurrentPathway: false,
        role: 'cofactor',
        detailsRu: 'Обязательный кофактор TET-диоксигеназ деметилирования ДНК и JmjC-деметилаз гистонов.',
        detailsEn: 'Obligate cofactor for TET DNA demethylases and JmjC histone demethylases.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000007',
    code: 'MET_SUCCINYL_COA',
    nameRu: 'Сукцинил-КоА',
    nameEn: 'Succinyl-CoA',
    abbrevRu: 'Сук-КоА',
    abbrevEn: 'Suc-CoA',
    formula: 'C₂₅H₃₆N₇O₁₉P₃S⁵⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 1686,
    y: 2542,
    width: 150,
    height: 72,
    color: '#6366F1',
    smiles: 'CC(C)(COP(=O)([O-])OP(=O)([O-])OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)([O-])[O-])C(C(=O)NCCC(=O)NCCSC(=O)CCC(=O)[O-])O',
    chebi: 'CHEBI:57292',
    inchiKey: 'HCOWTJKLQGBQSQ-UHFFFAOYSA-N',
    descriptionRu: 'Макроэргический тиоэфир сукцината и кофермента A. Используется для синтеза порфиринов (гемоглобина) и утилизации кетоновых тел в головном мозге.',
    descriptionEn: 'High-energy thioester of succinate and coenzyme A. Serves as precursor for porphyrin/heme biosynthesis and ketone body utilization in peripheral tissues.',
    synonymsRu: ['Сукцинил-КоА', 'Сукцинил-коэнзим А', 'Сук-КоА'],
    synonymsEn: ['Succinyl-CoA', 'Succinyl-Coenzyme A', 'Suc-CoA'],
    skeletalSvg: '<path d="M 10 24 L 20 18 L 30 24 L 40 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="24" r="3" fill="#EF4444"/><circle cx="40" cy="18" r="3" fill="#10B981"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="22" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">⁻OOC</text>
  <line x1="48" y1="52" x2="74" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="82" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="94" y1="52" x2="118" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="126" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="138" y1="52" x2="162" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="159" y1="52" x2="159" y2="26" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="165" y1="52" x2="165" y2="26" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <text x="162" y="16" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="162" y1="52" x2="188" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="194" y="52" class="atom-s" fill="#F59E0B" font-weight="700" text-anchor="middle" dominant-baseline="central">S</text>
  <line x1="200" y1="52" x2="212" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <rect x="212" y="40" width="26" height="22" rx="4" class="coa-badge-bg" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" stroke-width="1.5"/>
  <text x="225" y="52" class="coa-badge-text" fill="#10B981" font-weight="800" text-anchor="middle" dominant-baseline="central">CoA</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'intermediate',
        detailsRu: 'Продукт стадии 4 (α-КГДГ) и субстрат субстратного фосфорилирования на стадии 5 (синтез ГТФ).',
        detailsEn: 'Product of step 4 (α-KGDH) and substrate for substrate-level phosphorylation in step 5 (GTP/ATP synthesis).',
        stepNumber: 5,
        reactionCode: 'R_SCS',
        reactionNameRu: 'Субстратное фосфорилирование (Синтез ГТФ / АТФ)',
        reactionNameEn: 'Substrate-level phosphorylation (GTP / ATP synthesis)',
      },
      {
        pathwayCode: 'PWY_HEME',
        pathwayNameRu: 'Биосинтез гема и гемоглобина (Порфирины)',
        pathwayNameEn: 'Heme and Hemoglobin Biosynthesis (Porphyrins)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Конденсируется с глицином пиридоксальфосфат-зависимой АЛК-синтазой 1/2 с образованием δ-аминолевулината.',
        detailsEn: 'Condenses with glycine via pyridoxal phosphate-dependent ALAS1/2 to form δ-aminolevulinate.',
      },
      {
        pathwayCode: 'PWY_KETOLYSIS',
        pathwayNameRu: 'Кетолиз (Утилизация кетоновых тел)',
        pathwayNameEn: 'Ketolysis (Ketone Body Utilization)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Активирует ацетоацетат в миокарде и нейронах мозга через сукцинил-КоА:3-кетокислота-КоА-трансферазу (SCOT).',
        detailsEn: 'Activates acetoacetate in myocardium and neurons via succinyl-CoA:3-ketoacid CoA transferase (SCOT).',
      },
      {
        pathwayCode: 'PWY_AMINO_CATABOLISM',
        pathwayNameRu: 'Катаболизм валина, изолейцина, метионина',
        pathwayNameEn: 'Valine, Isoleucine, Methionine Catabolism',
        isCurrentPathway: false,
        role: 'product',
        detailsRu: 'Точка входа углеродных скелетов аминокислот с разветвленной цепью через пропионил-КоА и метилмалонил-КоА.',
        detailsEn: 'Entry point for branched-chain amino acid carbon skeletons via propionyl-CoA and methylmalonyl-CoA.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000008',
    code: 'MET_SUCCINATE',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Сукцинат',
    nameEn: 'Succinate',
    abbrevRu: 'СУК',
    abbrevEn: 'SUC',
    formula: 'C₄H₄O₄²⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 1369,
    y: 2542,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(CC(=O)[O-])C(=O)[O-]',
    chebi: 'CHEBI:15741',
    inchiKey: 'KDYFGRWQOYBRFD-UHFFFAOYSA-L',
    descriptionRu: 'Четырехуглеродная дикарбоновая кислота. Окисляется Комплексом II внутренней мембраны митохондрий, напрямую передавая электроны в пул убихинона.',
    descriptionEn: 'Four-carbon dicarboxylic acid. Directly oxidized by Complex II (succinate dehydrogenase) in the inner mitochondrial membrane, transferring electrons into the ubiquinone pool.',
    synonymsRu: ['Сукцинат', 'СУК', 'Янтарная кислота', 'Бутандиоат'],
    synonymsEn: ['Succinate', 'SUC', 'Succinic acid', 'Butanedioate'],
    skeletalSvg: '<path d="M 10 20 L 22 26 L 34 18 L 46 24" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="20" r="3" fill="#EF4444"/><circle cx="46" cy="24" r="3" fill="#EF4444"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="26" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">⁻OOC</text>
  <line x1="52" y1="52" x2="86" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="96" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="110" y1="52" x2="144" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="154" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="168" y1="52" x2="202" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="218" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">COO⁻</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'intermediate',
        detailsRu: 'Образуется на стадии 5 (СКС) и окисляется на стадии 6 сукцинатдегидрогеназой (Комплекс II).',
        detailsEn: 'Formed in step 5 (SCS) and oxidized in step 6 by succinate dehydrogenase (Complex II).',
        stepNumber: 6,
        reactionCode: 'R_SDH',
        reactionNameRu: 'Окисление сукцината в фумарат',
        reactionNameEn: 'Oxidation of succinate to fumarate',
      },
      {
        pathwayCode: 'PWY_ETC',
        pathwayNameRu: 'Дыхательная цепь (Комплекс II / SDH)',
        pathwayNameEn: 'Electron Transport Chain (Complex II / SDH)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Прямой донор электронов в мембранный пул убихинона без участия Комплекса I.',
        detailsEn: 'Direct electron donor to membrane ubiquinone pool independent of Complex I.',
      },
      {
        pathwayCode: 'PWY_SIGNALING',
        pathwayNameRu: 'Клеточная сигнализация (Онкометаболит)',
        pathwayNameEn: 'Cellular Signaling (Oncometabolite)',
        isCurrentPathway: false,
        role: 'intermediate',
        detailsRu: 'Накопление сукцината ингибирует пролилгидроксилазы (PHD), стабилизируя транскрипционный фактор гипоксии HIF-1α.',
        detailsEn: 'Succinate accumulation inhibits prolyl hydroxylases (PHDs), stabilizing hypoxia-inducible factor HIF-1α.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000009',
    code: 'MET_FUMARATE',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Фумарат',
    nameEn: 'Fumarate',
    abbrevRu: 'ФУМ',
    abbrevEn: 'FUM',
    formula: 'C₄H₂O₄²⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 1142,
    y: 2315,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(=CC(=O)[O-])C(=O)[O-]',
    chebi: 'CHEBI:29806',
    inchiKey: 'VZCYOOQTPOCHFL-UHFFFAOYSA-L',
    descriptionRu: 'Транс-ненасыщенная дикарбоновая кислота. Продукт действия сукцинатдегидрогеназы. Связывает ЦТК с циклом мочевины и пуриновым нуклеотидным циклом.',
    descriptionEn: 'Trans-unsaturated dicarboxylic acid produced by succinate dehydrogenase. Couples the TCA cycle to the urea cycle and the purine nucleotide cycle.',
    synonymsRu: ['Фумарат', 'ФУМ', 'Фумаровая кислота', 'транс-бутендиоат'],
    synonymsEn: ['Fumarate', 'FUM', 'Fumaric acid', 'trans-butenedioate'],
    skeletalSvg: '<path d="M 10 24 L 20 18 L 32 24 L 44 18" stroke="currentColor" stroke-width="1.6" fill="none"/><line x1="20" y1="21" x2="32" y2="27" stroke="currentColor" stroke-width="1.2"/><circle cx="10" cy="24" r="3" fill="#EF4444"/><circle cx="44" cy="18" r="3" fill="#EF4444"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="24" y="28" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">⁻OOC</text>
  <line x1="48" y1="34" x2="82" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="88" y="54" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH</text>
  <line x1="102" y1="49" x2="136" y2="49" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="102" y1="55" x2="136" y2="55" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <text x="146" y="54" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH</text>
  <line x1="156" y1="56" x2="188" y2="74" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="212" y="78" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">COO⁻</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'intermediate',
        detailsRu: 'Образуется на стадии 6 (СДГ) и стереоспецифически гидратируется на стадии 7 (фумараза).',
        detailsEn: 'Formed in step 6 (SDH) and stereospecifically hydrated in step 7 (fumarase).',
        stepNumber: 7,
        reactionCode: 'R_FUM',
        reactionNameRu: 'Гидратация фумарата в L-малат',
        reactionNameEn: 'Hydration of fumarate to L-malate',
      },
      {
        pathwayCode: 'PWY_UREA',
        pathwayNameRu: 'Цикл мочевины (Кребсовский велосипед)',
        pathwayNameEn: 'Urea Cycle (Krebs Bicycle)',
        isCurrentPathway: false,
        role: 'product',
        detailsRu: 'Побочный продукт расщепления аргининосукцината аргининосукцинатлиазой (ASL); возвращается в ЦТК.',
        detailsEn: 'Byproduct of argininosuccinate cleavage by argininosuccinate lyase (ASL); returns to the TCA cycle.',
      },
      {
        pathwayCode: 'PWY_PURINE',
        pathwayNameRu: 'Пуриновый нуклеотидный цикл',
        pathwayNameEn: 'Purine Nucleotide Cycle',
        isCurrentPathway: false,
        role: 'product',
        detailsRu: 'Выделяется аденилосукцинатлиазой (ADSL) при регенерации АМФ в скелетных мышцах человека.',
        detailsEn: 'Released by adenylosuccinate lyase (ADSL) during AMP regeneration in skeletal muscle.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000010',
    code: 'MET_MALATE',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'L-Малат',
    nameEn: 'L-Malate',
    abbrevRu: 'МАЛ',
    abbrevEn: 'MAL',
    formula: 'C₄H₄O₅²⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 1142,
    y: 1993,
    width: 140,
    height: 72,
    color: '#6366F1',
    smiles: 'C(C(C(=O)[O-])O)C(=O)[O-]',
    chebi: 'CHEBI:15588',
    inchiKey: 'BJEPYKJPYRNKOW-UHFFFAOYSA-L',
    descriptionRu: 'Гидроксидикарбоновая кислота. Участвует в малат-аспартатном челночном механизме переноса электронов в митохондрию и глюконеогенезе.',
    descriptionEn: 'Hydroxydicarboxylic acid intermediate. Vital participant in the malate-aspartate shuttle for NADH electron transport into mitochondria and gluconeogenic export.',
    synonymsRu: ['L-Малат', 'МАЛ', 'Яблочная кислота', '(2S)-2-гидроксибутандиоат'],
    synonymsEn: ['L-Malate', 'MAL', 'Malic acid', '(2S)-2-hydroxybutanedioate'],
    skeletalSvg: '<path d="M 10 24 L 22 18 L 34 24 L 46 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="24" r="3" fill="#EF4444"/><circle cx="46" cy="18" r="3" fill="#EF4444"/><circle cx="22" cy="10" r="2.5" fill="#EF4444"/><line x1="22" y1="18" x2="22" y2="10" stroke="currentColor" stroke-width="1.6"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="24" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">⁻OOC</text>
  <line x1="50" y1="52" x2="84" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="94" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH₂</text>
  <line x1="108" y1="52" x2="142" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="148" y1="44" x2="148" y2="24" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="148" y="16" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">OH</text>
  <text x="148" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">CH</text>
  <line x1="158" y1="52" x2="198" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="218" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">COO⁻</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'intermediate',
        detailsRu: 'Образуется на стадии 7 (фумараза) и окисляется на стадии 8 малатдегидрогеназой 2 (МДГ2) с регенерацией оксалоацетата.',
        detailsEn: 'Produced in step 7 (fumarase) and oxidized in step 8 by malate dehydrogenase 2 (MDH2) regenerating oxaloacetate.',
        stepNumber: 8,
        reactionCode: 'R_MDH',
        reactionNameRu: 'Окисление L-малата в оксалоацетат',
        reactionNameEn: 'Oxidation of L-malate to oxaloacetate',
      },
      {
        pathwayCode: 'PWY_MALATE_SHUTTLE',
        pathwayNameRu: 'Малат-аспартатный челночный механизм',
        pathwayNameEn: 'Malate-Aspartate Shuttle Mechanism',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Транспортируется через переносчик 2-оксоглутарат/малат (SLC25A11) сквозь внутреннюю мембрану.',
        detailsEn: 'Transported across inner membrane by 2-oxoglutarate/malate carrier (SLC25A11).',
      },
      {
        pathwayCode: 'PWY_GNG',
        pathwayNameRu: 'Глюконеогенез',
        pathwayNameEn: 'Gluconeogenesis',
        isCurrentPathway: false,
        role: 'intermediate',
        detailsRu: 'Служит челночной транспортной формой оксалоацетата из митохондрий в цитоплазму для синтеза углеводов.',
        detailsEn: 'Serves as shuttle transport vehicle for oxaloacetate equivalents from mitochondria to cytosol for glucose synthesis.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000002',
    code: 'MET_ACETYL_COA',
    compartmentRu: 'Центральный хаб (Матрикс)',
    compartmentEn: 'Central Hub (Matrix)',
    nameRu: 'Ацетил-КоА',
    nameEn: 'Acetyl-CoA',
    abbrevRu: 'Ац-КоА',
    abbrevEn: 'Ac-CoA',
    formula: 'C₂₃H₃₄N₇O₁₇P₃S⁴⁻',
    carbons: '2C',
    carbonsEn: '2C',
    x: 1520,
    y: 1560,
    width: 155,
    height: 74,
    color: '#10B981',
    isHub: true,
    smiles: 'CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)([O-])OP(=O)([O-])OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)([O-])[O-])O',
    chebi: 'CHEBI:57288',
    inchiKey: 'ZSLZBFCDCINBEF-UHFFFAOYSA-N',
    descriptionRu: 'Центральный метаболит организма человека. Образуется из углеводов (через ПДХ), липидов (β-окисление) и аминокислот. Поставщик двухуглеродного ацетильного остатка для сгорания в цикле Кребса.',
    descriptionEn: 'Central metabolic hub of human cellular metabolism. Derived from carbohydrates (via PDH), lipid breakdown (β-oxidation), and ketogenic amino acids. Supplies the two-carbon acetyl fuel for the citric acid cycle.',
    synonymsRu: ['Ацетил-КоА', 'Ацетил-коэнзим А', 'Ац-КоА'],
    synonymsEn: ['Acetyl-CoA', 'Acetyl-Coenzyme A', 'Ac-CoA'],
    skeletalSvg: '<path d="M 12 18 L 24 24 L 36 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="18" r="3" fill="#10B981"/><circle cx="36" cy="18" r="3" fill="#EF4444"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="36" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">H₃C</text>
  <line x1="54" y1="52" x2="95" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="92" y1="52" x2="92" y2="25" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="98" y1="52" x2="98" y2="25" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <text x="95" y="16" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="95" y1="52" x2="140" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="148" y="52" class="atom-s" fill="#F59E0B" font-weight="700" text-anchor="middle" dominant-baseline="central">S</text>
  <line x1="156" y1="52" x2="175" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <rect x="175" y="38" width="48" height="28" rx="6" class="coa-badge-bg" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" stroke-width="1.5"/>
  <text x="199" y="53" class="coa-badge-text" fill="#10B981" font-weight="800" text-anchor="middle" dominant-baseline="central">CoA</text>
</svg>`,
    pathwaysRu: [
      {
        pathwayCode: 'ALL',
        pathwayNameRu: 'Центральный хаб метаболизма клетки',
        pathwayNameEn: 'Central Cellular Metabolic Hub',
        isCurrentPathway: true,
        role: 'intermediate',
        detailsRu: 'Главный метаболический перекресток клетки: точка схождения катаболизма углеводов (ПДХ), липидов (β-окисление) и аминокислот.',
        detailsEn: 'Central crossroads of cellular metabolism: convergence of carbohydrate, lipid, and amino acid catabolism.',
      },
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Стадия 1: внешний топливный субстрат (донор 2C-ацетила для оксалоацетата 4C). Не является регенерируемым интермедиатом самого цикла.',
        detailsEn: 'Step 1: external fuel substrate delivering 2C-acetyl to oxaloacetate 4C. Not a regenerated intermediate of the cycle itself.',
        stepNumber: 1,
        reactionCode: 'R_CS',
        reactionNameRu: 'Конденсация оксалоацетата и ацетил-КоА',
        reactionNameEn: 'Condensation of oxaloacetate and acetyl-CoA',
      },
      {
        pathwayCode: 'PWY_PDH',
        pathwayNameRu: 'Пируватдегидрогеназный комплекс (ПДХ)',
        pathwayNameEn: 'Pyruvate Dehydrogenase Complex (PDH)',
        isCurrentPathway: false,
        role: 'product',
        detailsRu: 'Конечный продукт аэробного окислительного декарбоксилирования гликолитического пирувата.',
        detailsEn: 'End-product of aerobic oxidative decarboxylation of glycolytic pyruvate.',
      },
      {
        pathwayCode: 'PWY_BETA_OX',
        pathwayNameRu: 'β-Окисление жирных кислот',
        pathwayNameEn: 'Fatty Acid β-Oxidation',
        isCurrentPathway: false,
        role: 'product',
        detailsRu: 'Конечный продукт каждого цикла расщепления высших жирных кислот в матриксе митохондрий.',
        detailsEn: 'Final recurrent cleavage product of fatty acid breakdown in the mitochondrial matrix.',
      },
      {
        pathwayCode: 'PWY_KETOGENESIS',
        pathwayNameRu: 'Кетогенез (Синтез кетоновых тел)',
        pathwayNameEn: 'Ketogenesis (Ketone Body Synthesis)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Конденсируется в ацетоацетил-КоА и HMG-CoA в печени при дефиците глюкозы.',
        detailsEn: 'Condenses into acetoacetyl-CoA and HMG-CoA in hepatocytes during carbohydrate restriction.',
      },
      {
        pathwayCode: 'PWY_CHOLESTEROL',
        pathwayNameRu: 'Синтез холестерина и стероидов',
        pathwayNameEn: 'Cholesterol & Steroid Biosynthesis',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Исходный мономерный предшественник мевалонатного пути биосинтеза стероидов и желчных кислот.',
        detailsEn: 'Building-block monomer for mevalonate pathway producing cholesterol, bile acids, and steroid hormones.',
      },
    ],
  },
];

export const COFACTOR_METABOLITES: HumanMetaboliteNode[] = [
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
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0,
    "color": "#F59E0B",
    "isCofactor": true,
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
    "skeletalSvg": "<circle cx=\"20\" cy=\"20\" r=\"14\" fill=\"#F59E0B\" fill-opacity=\"0.2\"/><text x=\"20\" y=\"24\" fill=\"#F59E0B\" font-size=\"11\" font-weight=\"800\" text-anchor=\"middle\">ATP</text>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <rect x=\"15\" y=\"35\" width=\"60\" height=\"28\" rx=\"6\" fill=\"rgba(245,158,11,0.2)\" stroke=\"#F59E0B\" stroke-width=\"1.5\"/>\n  <text x=\"45\" y=\"52\" fill=\"#F59E0B\" font-weight=\"800\" font-size=\"11\" text-anchor=\"middle\" dominant-baseline=\"central\">Adenosine</text>\n  <line x1=\"75\" y1=\"49\" x2=\"100\" y2=\"49\" stroke=\"#94A3B8\" stroke-width=\"2\"/>\n  <text x=\"110\" y=\"52\" fill=\"#F59E0B\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\">P~P~P</text>\n  <text x=\"175\" y=\"52\" fill=\"#EF4444\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\">4-</text>\n</svg>",
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
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0,
    "color": "#94A3B8",
    "isCofactor": true,
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
    "skeletalSvg": "<circle cx=\"20\" cy=\"20\" r=\"14\" fill=\"#94A3B8\" fill-opacity=\"0.2\"/><text x=\"20\" y=\"24\" fill=\"#94A3B8\" font-size=\"11\" font-weight=\"800\" text-anchor=\"middle\">ADP</text>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <rect x=\"25\" y=\"35\" width=\"60\" height=\"28\" rx=\"6\" fill=\"rgba(148,163,184,0.2)\" stroke=\"#94A3B8\" stroke-width=\"1.5\"/>\n  <text x=\"55\" y=\"52\" fill=\"#CBD5E1\" font-weight=\"800\" font-size=\"11\" text-anchor=\"middle\" dominant-baseline=\"central\">Adenosine</text>\n  <line x1=\"85\" y1=\"49\" x2=\"110\" y2=\"49\" stroke=\"#94A3B8\" stroke-width=\"2\"/>\n  <text x=\"130\" y=\"52\" fill=\"#94A3B8\" font-weight=\"700\" font-size=\"10\" text-anchor=\"middle\">P~P</text>\n</svg>",
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
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0,
    "color": "#E2E8F0",
    "isCofactor": true,
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
    "skeletalSvg": "<circle cx=\"20\" cy=\"20\" r=\"10\" fill=\"#E2E8F0\" fill-opacity=\"0.2\"/><text x=\"20\" y=\"24\" fill=\"#E2E8F0\" font-size=\"12\" font-weight=\"800\" text-anchor=\"middle\">H⁺</text>",
    "structureSvg": "<svg viewBox=\"0 0 240 100\" class=\"molecule-structure-svg\" preserveAspectRatio=\"xMidYMid meet\">\n  <circle cx=\"120\" cy=\"50\" r=\"24\" fill=\"rgba(226,232,240,0.15)\" stroke=\"#E2E8F0\" stroke-width=\"2\"/>\n  <text x=\"120\" y=\"55\" fill=\"#E2E8F0\" font-size=\"18\" font-weight=\"800\" text-anchor=\"middle\">H⁺</text>\n</svg>",
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
    id: 'b0000001-0000-0000-0000-000000000012',
    code: 'MET_NAD_PLUS',
    nameRu: 'НАД⁺',
    nameEn: 'NAD⁺',
    abbrevRu: 'НАД⁺',
    abbrevEn: 'NAD⁺',
    formula: 'C₂₁H₂₇N₇O₁₄P₂',
    carbons: 'Кофермент (B₃)',
    carbonsEn: 'Coenzyme (B₃)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#38BDF8',
    smiles: 'NC(=O)C1=CN(C=CC1)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)OC[C@H]2O[C@H]([C@@H](O)[C@@H]2O)N2C=NC3=C(N)N=CN=C23)[C@@H](O)[C@@H]1O',
    chebi: 'CHEBI:15846',
    inchiKey: 'BAWFJGJZGIEFAR-UHFFFAOYSA-N',
    descriptionRu: 'Главный окислительный кофермент дегидрогеназ человека. Образуется из витамина B₃ (ниацина). В цикле Кребса акцептирует электроны в реакциях 3, 4 и 8, восстанавливаясь до НАДН.',
    descriptionEn: 'Primary oxidizing coenzyme of human dehydrogenases derived from vitamin B₃ (niacin). In the TCA cycle, accepts electrons in steps 3, 4, and 8, becoming reduced to NADH.',
    synonymsRu: ['НАД⁺', 'Окисленный никотинамидадениндинуклеотид', 'NAD⁺', 'Кофермент дегидрогеназ'],
    synonymsEn: ['NAD⁺', 'Oxidized nicotinamide adenine dinucleotide', 'Dehydrogenase coenzyme'],
    skeletalSvg: '<path d="M 10 20 L 22 28 L 34 20 L 46 28 L 54 20" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="20" r="3" fill="#38BDF8"/><circle cx="54" cy="20" r="3" fill="#EF4444"/><circle cx="34" cy="20" r="2.5" fill="#F59E0B"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <polygon points="40,22 60,33 60,57 40,68 20,57 20,33" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" stroke-width="1.8"/>
  <text x="40" y="24" class="atom-n">N⁺</text>
  <line x1="60" y1="33" x2="80" y2="22" class="chem-bond"/>
  <text x="96" y="20" class="atom-c">CONH₂</text>
  <line x1="40" y1="68" x2="40" y2="82" class="chem-bond"/>
  <text x="40" y="90" class="atom-c">Рибоза</text>
  <line x1="68" y1="88" x2="105" y2="88" class="chem-bond"/>
  <text x="122" y="88" class="atom-p">P-O-P</text>
  <line x1="142" y1="88" x2="175" y2="65" class="chem-bond"/>
  <rect x="175" y="42" width="56" height="30" rx="6" fill="rgba(99, 102, 241, 0.18)" stroke="#6366F1" stroke-width="1.5"/>
  <text x="203" y="58" class="atom-c">Аденин</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'cofactor',
        detailsRu: 'Окислительный кофермент изоцитрат- (ст. 3), α-кетоглутарат- (ст. 4) и малатдегидрогеназы (ст. 8).',
        detailsEn: 'Oxidizing coenzyme for isocitrate (step 3), α-ketoglutarate (step 4), and malate dehydrogenases (step 8).',
      },
      {
        pathwayCode: 'PWY_GLYCOLYSIS',
        pathwayNameRu: 'Гликолиз (Цитозоль)',
        pathwayNameEn: 'Glycolysis (Cytosol)',
        isCurrentPathway: false,
        role: 'cofactor',
        detailsRu: 'Окисление глицеральдегид-3-фосфата (ГАФДГ); требует непрерывной челночной регенерации.',
        detailsEn: 'Oxidation of glyceraldehyde-3-phosphate (GAPDH); requires continuous shuttle regeneration.',
      },
      {
        pathwayCode: 'PWY_PDH',
        pathwayNameRu: 'Пируватдегидрогеназный комплекс',
        pathwayNameEn: 'Pyruvate Dehydrogenase Complex',
        isCurrentPathway: false,
        role: 'cofactor',
        detailsRu: 'Окисление дигидролипоата ферментом E3 (дигидролипоилдегидрогеназой).',
        detailsEn: 'Reoxidizes dihydrolipoamide via subunit E3 (dihydrolipoyl dehydrogenase).',
      },
      {
        pathwayCode: 'PWY_ETC',
        pathwayNameRu: 'Дыхательная цепь (Комплекс I)',
        pathwayNameEn: 'Electron Transport Chain (Complex I)',
        isCurrentPathway: false,
        role: 'product',
        detailsRu: 'Регенерируется из НАДН Комплексом I дыхательной цепи с переносом протонов в межмембранное пространство.',
        detailsEn: 'Regenerated from NADH by Complex I with concomitant proton translocation into intermembrane space.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000013',
    code: 'MET_NADH',
    nameRu: 'НАДН',
    nameEn: 'NADH',
    abbrevRu: 'НАДН',
    abbrevEn: 'NADH',
    formula: 'C₂₁H₂₉N₇O₁₄P₂',
    carbons: 'Энергоноситель (~2.5 АТФ)',
    carbonsEn: 'Energy carrier (~2.5 ATP)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#F59E0B',
    smiles: 'NC(=O)C1=CN([C@@H]2O[C@H](COP(=O)(O)OP(=O)(O)OC[C@H]3O[C@H]([C@@H](O)[C@@H]3O)N3C=NC4=C(N)N=CN=C43)[C@@H](O)[C@@H]2O)CC=C1',
    chebi: 'CHEBI:16908',
    inchiKey: 'BOPGDPNILDQYTO-UHFFFAOYSA-N',
    descriptionRu: 'Главный энергоемкий восстановительный эквивалент клеточного дыхания. В цикле Кребса генерируются 3 молекулы НАДН на 1 ацетил-КоА, обеспечивающие синтез ~7.5 молекул АТФ в дыхательной цепи.',
    descriptionEn: 'Primary energy-rich reducing equivalent of cellular respiration. The TCA cycle generates 3 NADH molecules per Acetyl-CoA, yielding ~7.5 ATP via oxidative phosphorylation.',
    synonymsRu: ['НАДН', 'NADH', 'Восстановленный никотинамидадениндинуклеотид', 'DPNH'],
    synonymsEn: ['NADH', 'Reduced nicotinamide adenine dinucleotide', 'DPNH'],
    skeletalSvg: '<path d="M 10 24 L 22 18 L 34 24 L 46 18 L 54 24" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="24" r="3.2" fill="#F59E0B"/><circle cx="46" cy="18" r="3" fill="#EF4444"/><circle cx="54" cy="24" r="2.5" fill="#38BDF8"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <polygon points="40,22 60,33 60,57 40,68 20,57 20,33" fill="rgba(245, 158, 11, 0.15)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="40" y="24" class="atom-n">N</text>
  <text x="40" y="66" class="atom-c">2H</text>
  <line x1="60" y1="33" x2="80" y2="22" class="chem-bond"/>
  <text x="96" y="20" class="atom-c">CONH₂</text>
  <line x1="40" y1="68" x2="40" y2="82" class="chem-bond"/>
  <text x="40" y="90" class="atom-c">Рибоза</text>
  <line x1="68" y1="88" x2="105" y2="88" class="chem-bond"/>
  <text x="122" y="88" class="atom-p">P-O-P</text>
  <line x1="142" y1="88" x2="175" y2="65" class="chem-bond"/>
  <rect x="175" y="42" width="56" height="30" rx="6" fill="rgba(99, 102, 241, 0.18)" stroke="#6366F1" stroke-width="1.5"/>
  <text x="203" y="58" class="atom-c">Аденин</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'product',
        detailsRu: 'Образуется на стадиях 3 (ИДГ3), 4 (ОГДГ) и 8 (МДГ2) — суммарно 3 НАДН за оборот цикла.',
        detailsEn: 'Formed in steps 3 (IDH3), 4 (α-KGDH), and 8 (MDH2) — total of 3 NADH per cycle turn.',
      },
      {
        pathwayCode: 'PWY_ETC',
        pathwayNameRu: 'Дыхательная цепь (Комплекс I)',
        pathwayNameEn: 'Electron Transport Chain (Complex I)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Главный донор электронов в Комплекс I; окисление дает выход ~2.5 АТФ на молекулу.',
        detailsEn: 'Primary electron donor to Complex I; oxidation yields ~2.5 ATP per molecule.',
      },
      {
        pathwayCode: 'PWY_PDH',
        pathwayNameRu: 'ПДХ комплекс',
        pathwayNameEn: 'PDH Complex',
        isCurrentPathway: false,
        role: 'product',
        detailsRu: 'Генерируется при окислении пирувата до ацетил-КоА.',
        detailsEn: 'Generated during oxidative decarboxylation of pyruvate to Acetyl-CoA.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000014',
    code: 'MET_FAD',
    nameRu: 'ФАД',
    nameEn: 'FAD',
    abbrevRu: 'ФАД',
    abbrevEn: 'FAD',
    formula: 'C₂₇H₃₃N₉O₁₅P₂',
    carbons: 'Простетическая группа (B₂)',
    carbonsEn: 'Prosthetic group (B₂)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#10B981',
    smiles: 'CC1=CC2=C(C=C1C)N(C3=NC(=O)NC(=O)C3=N2)CC(C(C(COP(=O)(O)OP(=O)(O)OCC4C(C(C(O4)N5C=NC6=C5N=CN=C6N)O)O)O)O)O',
    chebi: 'CHEBI:16238',
    inchiKey: 'VZZFIPVCIKBDJD-UHFFFAOYSA-N',
    descriptionRu: 'Ковалентно связанная простетическая группа сукцинатдегидрогеназы (Комплекс II). Ковалентно соединен с остатком гистидина His-B44 субъединицы SDHA.',
    descriptionEn: 'Covalently bound prosthetic group of Complex II (succinate dehydrogenase), linked to His-B44 of the SDHA subunit.',
    synonymsRu: ['ФАД', 'Флавинадениндинуклеотид', 'FAD', 'Витамин B2 кофермент'],
    synonymsEn: ['FAD', 'Flavin adenine dinucleotide', 'Vitamin B2 coenzyme'],
    skeletalSvg: '<path d="M 12 20 L 24 26 L 36 20 L 48 26" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="20" r="3" fill="#10B981"/><circle cx="48" cy="26" r="3" fill="#EF4444"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <rect x="15" y="32" width="75" height="38" rx="4" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" stroke-width="1.8"/>
  <text x="52" y="52" class="atom-n">Изоаллоксазин</text>
  <line x1="90" y1="52" x2="118" y2="52" class="chem-bond"/>
  <text x="136" y="52" class="atom-c">Рибитол</text>
  <line x1="156" y1="52" x2="175" y2="52" class="chem-bond"/>
  <rect x="175" y="36" width="55" height="32" rx="6" fill="rgba(99, 102, 241, 0.18)" stroke="#6366F1" stroke-width="1.5"/>
  <text x="202" y="53" class="atom-c">АДФ</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'cofactor',
        detailsRu: 'Стадия 6 (СДГ): акцептор пары протонов и электронов при окислении сукцината в фумарат.',
        detailsEn: 'Step 6 (SDH): two-electron acceptor in the oxidation of succinate to fumarate.',
      },
      {
        pathwayCode: 'PWY_BETA_OX',
        pathwayNameRu: 'β-Окисление жирных кислот',
        pathwayNameEn: 'Fatty Acid β-Oxidation',
        isCurrentPathway: false,
        role: 'cofactor',
        detailsRu: 'Кофермент ацил-КоА-дегидрогеназ окисления липидов.',
        detailsEn: 'Coenzyme for acyl-CoA dehydrogenases in mitochondrial lipid breakdown.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000015',
    code: 'MET_FADH2',
    nameRu: 'ФАДН₂',
    nameEn: 'FADH₂',
    abbrevRu: 'ФАДН₂',
    abbrevEn: 'FADH₂',
    formula: 'C₂₇H₃₅N₉O₁₅P₂',
    carbons: 'Энергоноситель (~1.5 АТФ)',
    carbonsEn: 'Energy carrier (~1.5 ATP)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#F59E0B',
    smiles: 'CC1=CC2=C(C=C1C)NC3C(=O)NC(=O)NC3=N2',
    chebi: 'CHEBI:17877',
    inchiKey: 'YPZRHBJRZVGUNU-UHFFFAOYSA-N',
    descriptionRu: 'Восстановленная форма флавинадениндинуклеотида Комплекса II. Передает электроны через железосерные кластеры напрямую в мембранный пул убихинона (Q₁₀).',
    descriptionEn: 'Reduced flavin adenine dinucleotide of Complex II. Transfers electrons through Fe-S clusters directly into the membrane ubiquinone (Q₁₀) pool.',
    synonymsRu: ['ФАДН₂', 'FADH₂', 'Восстановленный флавинадениндинуклеотид'],
    synonymsEn: ['FADH₂', 'Reduced flavin adenine dinucleotide'],
    skeletalSvg: '<path d="M 12 24 L 24 18 L 36 24 L 48 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="24" r="3" fill="#F59E0B"/><circle cx="48" cy="18" r="3" fill="#10B981"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <rect x="15" y="32" width="80" height="38" rx="4" fill="rgba(245, 158, 11, 0.18)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="55" y="46" class="atom-n">1,5-Дигидро</text>
  <text x="55" y="60" class="atom-c">флавин (2H)</text>
  <line x1="95" y1="52" x2="118" y2="52" class="chem-bond"/>
  <text x="136" y="52" class="atom-c">Рибитол</text>
  <line x1="156" y1="52" x2="175" y2="52" class="chem-bond"/>
  <rect x="175" y="36" width="55" height="32" rx="6" fill="rgba(99, 102, 241, 0.18)" stroke="#6366F1" stroke-width="1.5"/>
  <text x="202" y="53" class="atom-c">АДФ</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'product',
        detailsRu: 'Образуется на стадии 6 сукцинатдегидрогеназой; дает ~1.5 АТФ при передаче электронов в убихинон.',
        detailsEn: 'Formed in step 6 by succinate dehydrogenase; yields ~1.5 ATP upon electron transfer to ubiquinone.',
      },
      {
        pathwayCode: 'PWY_ETC',
        pathwayNameRu: 'Дыхательная цепь (Комплекс II)',
        pathwayNameEn: 'Electron Transport Chain (Complex II)',
        isCurrentPathway: false,
        role: 'intermediate',
        detailsRu: 'Восстанавливает убихинон до убихинола (QH₂) во внутренней мембране.',
        detailsEn: 'Reduces ubiquinone to ubiquinol (QH₂) within the inner mitochondrial membrane.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000016',
    code: 'MET_GDP',
    nameRu: 'ГДФ',
    nameEn: 'GDP',
    abbrevRu: 'ГДФ',
    abbrevEn: 'GDP',
    formula: 'C₁₀H₁₅N₅O₁₁P₂',
    carbons: 'Нуклеотид',
    carbonsEn: 'Nucleotide (GDP)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#10B981',
    smiles: 'NC1=NC(=O)C2=C(N1)N(C=N2)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@@H]1O',
    chebi: 'CHEBI:17552',
    inchiKey: 'QGWNDRXFNXRZMB-UHFFFAOYSA-N',
    descriptionRu: 'Пуриновый рибонуклеозиддифосфат. Акцептор неорганического фосфата в реакции субстратного фосфорилирования сукцинил-КоА-синтетазой.',
    descriptionEn: 'Purine ribonucleoside diphosphate. Inorganic phosphate acceptor in the substrate-level phosphorylation reaction catalyzed by succinyl-CoA synthetase.',
    synonymsRu: ['ГДФ', 'Гуанозин-5′-дифосфат', 'GDP'],
    synonymsEn: ['GDP', 'Guanosine 5′-diphosphate'],
    skeletalSvg: '<path d="M 12 20 L 24 26 L 36 20" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="20" r="3" fill="#10B981"/><circle cx="36" cy="20" r="3" fill="#38BDF8"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <rect x="15" y="35" width="70" height="34" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" stroke-width="1.5"/>
  <text x="50" y="52" class="atom-c">Гуанозин</text>
  <line x1="85" y1="52" x2="115" y2="52" class="chem-bond"/>
  <circle cx="130" cy="52" r="13" fill="rgba(192, 132, 252, 0.2)" stroke="#C084FC" stroke-width="1.5"/>
  <text x="130" y="53" class="atom-p">Pα</text>
  <line x1="143" y1="52" x2="167" y2="52" class="chem-bond"/>
  <circle cx="180" cy="52" r="13" fill="rgba(192, 132, 252, 0.2)" stroke="#C084FC" stroke-width="1.5"/>
  <text x="180" y="53" class="atom-p">Pβ</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'cofactor',
        detailsRu: 'Стадия 5: фосфорилируется до ГТФ за счет энергии тиоэфирной связи сукцинил-КоА.',
        detailsEn: 'Step 5: phosphorylated to GTP driven by high-energy thioester bond cleavage of succinyl-CoA.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000017',
    code: 'MET_GTP',
    nameRu: 'ГТФ',
    nameEn: 'GTP',
    abbrevRu: 'ГТФ',
    abbrevEn: 'GTP',
    formula: 'C₁₀H₁₆N₅O₁₄P₃',
    carbons: 'Макроэрг (1 АТФ)',
    carbonsEn: 'Macroergic nucleotide (1 ATP)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#10B981',
    smiles: 'NC1=NC(=O)C2=C(N1)N(C=N2)[C@@H]1O[C@H](COP(=O)(O)OP(=O)(O)OP(=O)(O)O)[C@@H](O)[C@@H]1O',
    chebi: 'CHEBI:15996',
    inchiKey: 'XKMLYBNGHNGKST-UHFFFAOYSA-N',
    descriptionRu: 'Высокоэнергетический нуклеотидтрифосфат. Единственный продукт цикла Кребса, образующийся путем субстратного фосфорилирования без прямого участия дыхательной цепи.',
    descriptionEn: 'High-energy nucleoside triphosphate. The sole high-energy phosphate produced directly by substrate-level phosphorylation in the citric acid cycle.',
    synonymsRu: ['ГТФ', 'Гуанозин-5′-трифосфат', 'GTP'],
    synonymsEn: ['GTP', 'Guanosine 5′-triphosphate'],
    skeletalSvg: '<path d="M 10 22 L 22 16 L 34 22 L 46 16" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="22" r="3" fill="#10B981"/><circle cx="46" cy="16" r="3" fill="#F59E0B"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <rect x="12" y="35" width="65" height="34" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" stroke-width="1.5"/>
  <text x="44" y="52" class="atom-c">Гуанозин</text>
  <line x1="77" y1="52" x2="98" y2="52" class="chem-bond"/>
  <circle cx="110" cy="52" r="12" fill="rgba(192, 132, 252, 0.2)" stroke="#C084FC" stroke-width="1.5"/>
  <text x="110" y="53" class="atom-p">Pα</text>
  <line x1="122" y1="52" x2="142" y2="52" class="chem-bond"/>
  <circle cx="154" cy="52" r="12" fill="rgba(192, 132, 252, 0.2)" stroke="#C084FC" stroke-width="1.5"/>
  <text x="154" y="53" class="atom-p">Pβ</text>
  <line x1="166" y1="52" x2="186" y2="52" class="chem-bond"/>
  <circle cx="198" cy="52" r="12" fill="rgba(52, 211, 153, 0.25)" stroke="#34D399" stroke-width="1.8"/>
  <text x="198" y="53" class="atom-p" fill="#34D399">Pγ~</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'product',
        detailsRu: 'Стадия 5: прямой макроэргический выход одного оборота цикла (сукцинил-КоА-синтетаза).',
        detailsEn: 'Step 5: direct macroergic output of one cycle revolution (succinyl-CoA synthetase).',
      },
      {
        pathwayCode: 'PWY_GNG',
        pathwayNameRu: 'Глюконеогенез',
        pathwayNameEn: 'Gluconeogenesis',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Донор фосфата для митохондриальной фосфоенолпируваткарбоксикиназы (PEPCK-M).',
        detailsEn: 'Phosphate donor for mitochondrial phosphoenolpyruvate carboxykinase (PEPCK-M).',
      },
      {
        pathwayCode: 'PWY_PROTEIN_SYN',
        pathwayNameRu: 'Биосинтез белка (Трансляция)',
        pathwayNameEn: 'Protein Biosynthesis (Translation)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Энергетическое обеспечение факторов инициации и элонгации рибосомального синтеза.',
        detailsEn: 'Supplies energy for ribosomal initiation, elongation, and translocation factors.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000011',
    code: 'MET_COA',
    nameRu: 'Кофермент A (КоА-SH)',
    nameEn: 'Coenzyme A (CoA-SH)',
    abbrevRu: 'КоА-SH',
    abbrevEn: 'CoA-SH',
    formula: 'C₂₁H₃₆N₇O₁₆P₃S',
    carbons: 'Кофермент (B₅)',
    carbonsEn: 'Coenzyme (B₅)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#10B981',
    smiles: 'CC(C)(COP(=O)(O)OP(=O)(O)OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)C(C(=O)NCCC(=O)NCCS)O',
    chebi: 'CHEBI:15346',
    inchiKey: 'RGJOEKWQDUBAIZ-UHFFFAOYSA-N',
    descriptionRu: 'Универсальный клеточный переносчик ацильных и ацетильных остатков. Включает пантотеновую кислоту (витамин B₅) и концевую тиольную (-SH) группу.',
    descriptionEn: 'Universal cellular acyl and acetyl carrier. Composed of pantothenic acid (vitamin B₅) and a terminal reactive thiol (-SH) group.',
    synonymsRu: ['Кофермент A (КоА-SH)', 'Кофермент A', 'Коэнзим А', 'КоА-SH', 'КоА', 'CoA', 'CoA-SH'],
    synonymsEn: ['Coenzyme A (CoA-SH)', 'Coenzyme A', 'CoA-SH', 'CoA', 'HS-CoA'],
    skeletalSvg: '<path d="M 10 24 L 20 18 L 30 24 L 40 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="10" cy="24" r="3" fill="#10B981"/><circle cx="40" cy="18" r="3" fill="#38BDF8"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="24" y="52" class="atom-s" fill="#F59E0B" font-weight="700" text-anchor="middle" dominant-baseline="central">H-S</text>
  <line x1="42" y1="52" x2="68" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="96" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">Цистеамин</text>
  <line x1="124" y1="52" x2="144" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="170" y="52" class="atom-c" fill="#CBD5E1" font-weight="600" text-anchor="middle" dominant-baseline="central">Пантотенат</text>
  <line x1="196" y1="52" x2="210" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <rect x="210" y="38" width="28" height="26" rx="4" class="coa-badge-bg" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" stroke-width="1.5"/>
  <text x="224" y="52" class="coa-badge-text" fill="#10B981" font-weight="800" text-anchor="middle" dominant-baseline="central">ADP</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'cofactor',
        detailsRu: 'Освобождается на стадиях 1 и 5, связывается на стадии 4 с образованием сукцинил-КоА.',
        detailsEn: 'Released in steps 1 and 5, condensed in step 4 to form succinyl-CoA.',
      },
      {
        pathwayCode: 'PWY_PDH',
        pathwayNameRu: 'ПДХ комплекс',
        pathwayNameEn: 'PDH Complex',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Принимает ацетильную группу от E2 ➔ Ацетил-КоА.',
        detailsEn: 'Accepts acetyl group from E2 subunit yielding Acetyl-CoA.',
      },
      {
        pathwayCode: 'PWY_BETA_OX',
        pathwayNameRu: 'β-Окисление липидов',
        pathwayNameEn: 'Fatty Acid β-Oxidation',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Образование ацил-КоА и тиолитическое отщепление ацетил-КоА.',
        detailsEn: 'Formation of fatty acyl-CoA and thiolytic release of Acetyl-CoA.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000019',
    code: 'MET_PI',
    nameRu: 'Неорганический фосфат (Фᵢ)',
    nameEn: 'Phosphate (Pᵢ)',
    abbrevRu: 'Фᵢ',
    abbrevEn: 'Pᵢ',
    formula: 'HPO₄²⁻',
    carbons: 'Фосфат',
    carbonsEn: 'Inorganic anion (Pᵢ)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#94A3B8',
    smiles: 'OP(=O)(O)[O-]',
    chebi: 'CHEBI:43474',
    inchiKey: 'NBIIXXVUZAFLBC-UHFFFAOYSA-L',
    descriptionRu: 'Неорганический ортофосфат-анион. Транспортируется в матрикс фосфатным переносчиком (PiC / SLC25A3) симпортом с H⁺.',
    descriptionEn: 'Inorganic orthophosphate anion. Transported into matrix by the phosphate carrier (PiC / SLC25A3) in symport with H⁺.',
    synonymsRu: ['Фосфат неорганический', 'Фᵢ', 'Pᵢ', 'Ортофосфат'],
    synonymsEn: ['Inorganic phosphate', 'Pᵢ', 'Orthophosphate', 'Phosphate ion'],
    skeletalSvg: '<path d="M 20 20 L 30 30" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="20" cy="20" r="4" fill="#94A3B8"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <circle cx="120" cy="52" r="18" fill="rgba(192, 132, 252, 0.2)" stroke="#C084FC" stroke-width="2"/>
  <text x="120" y="54" class="atom-p" fill="#C084FC" font-weight="800" text-anchor="middle" dominant-baseline="central">P</text>
  <line x1="117" y1="34" x2="117" y2="18" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="123" y1="34" x2="123" y2="18" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
  <text x="120" y="10" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="102" y1="52" x2="80" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="70" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">⁻O</text>
  <line x1="138" y1="52" x2="160" y2="52" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="170" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O⁻</text>
  <line x1="120" y1="70" x2="120" y2="86" class="chem-bond" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="120" y="94" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">OH</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'cofactor',
        detailsRu: 'Стадия 5: субстрат сукцинил-КоА-синтетазы (образование фосфогистидинового интермедиата).',
        detailsEn: 'Step 5: substrate for succinyl-CoA synthetase forming phosphohistidine enzyme intermediate.',
      },
      {
        pathwayCode: 'PWY_OXPHOS',
        pathwayNameRu: 'Окислительное фосфорилирование',
        pathwayNameEn: 'Oxidative Phosphorylation',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Субстрат митохондриальной АТФ-синтазы (Комплекс V): АДФ + Фᵢ ➔ АТФ.',
        detailsEn: 'Substrate for mitochondrial ATP synthase (Complex V): ADP + Pᵢ ➔ ATP.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000018',
    code: 'MET_CO2',
    nameRu: 'Диоксид углерода (CO₂)',
    nameEn: 'Carbon dioxide (CO₂)',
    abbrevRu: 'CO₂',
    abbrevEn: 'CO₂',
    formula: 'CO₂',
    carbons: '1C',
    carbonsEn: '1C',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#94A3B8',
    smiles: 'O=C=O',
    chebi: 'CHEBI:16526',
    inchiKey: 'CURLTTPVMYMDTN-UHFFFAOYSA-N',
    descriptionRu: 'Конечный продукт декарбоксилирования. В ЦТК выделяются 2 молекулы CO₂ (стадии 3 и 4), что соответствует полному сгоранию 2 углеродов ацетильной группы.',
    descriptionEn: 'End-product of oxidative decarboxylation. Two CO₂ molecules are released per cycle revolution (steps 3 and 4), corresponding to complete oxidation of the two acetyl carbons.',
    synonymsRu: ['Диоксид углерода', 'Углекислый газ', 'CO₂', 'Двуокись углерода', 'Угольный ангидрид'],
    synonymsEn: ['Carbon dioxide', 'CO₂', 'Carbonic anhydride', 'Carbonic acid gas'],
    skeletalSvg: '<line x1="10" y1="20" x2="40" y2="20" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="20" r="3" fill="#EF4444"/><circle cx="40" cy="20" r="3" fill="#EF4444"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <text x="50" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="62" y1="48" x2="108" y2="48" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="62" y1="56" x2="108" y2="56" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="120" y="52" class="atom-c" fill="#CBD5E1" font-weight="700" text-anchor="middle" dominant-baseline="central">C</text>
  <line x1="132" y1="48" x2="178" y2="48" class="chem-bond-double-1" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="132" y1="56" x2="178" y2="56" class="chem-bond-double-2" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round"/>
  <text x="190" y="52" class="atom-o" fill="#EF4444" font-weight="700" text-anchor="middle" dominant-baseline="central">O</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PW-PDH',
        pathwayNameRu: 'Комплекс ПДХ (Матрикс)',
        pathwayNameEn: 'PDH Complex (Matrix)',
        isCurrentPathway: true,
        role: 'product',
        detailsRu: 'Окислительное декарбоксилирование пирувата: выделение 1 молекулы CO₂ на молекулу пирувата (2 CO₂ на глюкозу).',
        detailsEn: 'Oxidative decarboxylation of pyruvate: release of 1 CO₂ per pyruvate (2 CO₂ per glucose).',
        stepNumber: 1,
        reactionCode: 'R_PDH',
      },
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'product',
        detailsRu: 'Стадии 3 (ИДГ3) и 4 (ОГДГ): выделение двух молекул CO₂ за оборот.',
        detailsEn: 'Steps 3 (IDH3) and 4 (α-KGDH): release of two CO₂ molecules per cycle turn.',
      },
      {
        pathwayCode: 'PWY_UREA',
        pathwayNameRu: 'Цикл мочевины',
        pathwayNameEn: 'Urea Cycle',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Субстрат карбамоилфосфатсинтетазы I (в форме бикарбоната HCO₃⁻).',
        detailsEn: 'Substrate for carbamoyl phosphate synthetase I (as bicarbonate HCO₃⁻).',
      },
      {
        pathwayCode: 'PWY_GNG',
        pathwayNameRu: 'Глюконеогенез (Анаплероз)',
        pathwayNameEn: 'Gluconeogenesis (Anaplerosis)',
        isCurrentPathway: false,
        role: 'substrate',
        detailsRu: 'Карбоксилирование пирувата в оксалоацетат пируваткарбоксилазой (ПК).',
        detailsEn: 'Carboxylation of pyruvate to oxaloacetate by pyruvate carboxylase (PC).',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000021',
    code: 'MET_COQ10',
    nameRu: 'Кофермент Q₁₀ (Убихинон)',
    nameEn: 'Coenzyme Q₁₀',
    abbrevRu: 'Q₁₀',
    abbrevEn: 'CoQ₁₀',
    formula: 'C₅₉H₉₀O₄',
    carbons: 'Бензохинон',
    carbonsEn: 'Lipophilic carrier',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#EC4899',
    smiles: 'CC1=C(C(=O)C(=C(C1=O)OC)OC)CC=C(C)CCC=C(C)C',
    chebi: 'CHEBI:46245`',
    inchiKey: 'QYSPLQLAKJAUJT-UHFFFAOYSA-N',
    descriptionRu: 'Жирорастворимый подвижный переносчик электронов в липидном бислое внутренней мембраны митохондрий. Принимает электроны от Комплекса I и Комплекса II (СДГ).',
    descriptionEn: 'Lipophilic mobile electron carrier in the inner mitochondrial membrane bilayer. Accepts electrons from Complexes I and II (SDH).',
    synonymsRu: ['Убихинон', 'Коэнзим Q10', 'CoQ10', 'Q10'],
    synonymsEn: ['Ubiquinone', 'Coenzyme Q10', 'CoQ10', 'Q10'],
    skeletalSvg: '<path d="M 12 18 L 24 24 L 36 18" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="18" r="3" fill="#EC4899"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <rect x="50" y="28" width="60" height="46" rx="6" fill="rgba(236, 72, 153, 0.15)" stroke="#EC4899" stroke-width="1.8"/>
  <text x="80" y="52" class="atom-n" fill="#EC4899">Хинон</text>
  <line x1="80" y1="28" x2="80" y2="12" class="chem-bond"/>
  <text x="80" y="6" class="atom-o">=O</text>
  <line x1="80" y1="74" x2="80" y2="90" class="chem-bond"/>
  <text x="80" y="96" class="atom-o">=O</text>
  <line x1="110" y1="52" x2="145" y2="52" class="chem-bond"/>
  <text x="180" y="52" class="atom-c">-(CH₂-CH=C(CH₃)-CH₂)₁₀-H</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'cofactor',
        detailsRu: 'Стадия 6 (СДГ): акцептор электронов от FADH₂ с образованием убихинола (QH₂).',
        detailsEn: 'Step 6 (SDH): terminal electron acceptor from FADH₂ forming ubiquinol (QH₂).',
      },
      {
        pathwayCode: 'PWY_ETC',
        pathwayNameRu: 'Дыхательная цепь',
        pathwayNameEn: 'Electron Transport Chain',
        isCurrentPathway: false,
        role: 'intermediate',
        detailsRu: 'Переносчик электронов от Комплексов I и II к Комплексу III.',
        detailsEn: 'Mobile electron shuttle linking Complexes I & II to Complex III.',
      },
    ],
  },
  {
    id: 'b0000001-0000-0000-0000-000000000020',
    code: 'MET_WATER',
    nameRu: 'Вода (H₂O)',
    nameEn: 'Water (H₂O)',
    abbrevRu: 'H₂O',
    abbrevEn: 'H₂O',
    formula: 'H₂O',
    carbons: 'Растворитель',
    carbonsEn: 'Solvent (H₂O)',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#38BDF8',
    smiles: 'O',
    chebi: 'CHEBI:15377',
    inchiKey: 'XLYOFNOQVPJJNP-UHFFFAOYSA-N',
    descriptionRu: 'Полярный клеточный растворитель и субстрат гидролитических и гидратационных реакций клеточного метаболизма.',
    descriptionEn: 'Polar cellular solvent and reactive substrate in hydrolytic and hydration reactions of cellular metabolism.',
    synonymsRu: ['Вода', 'H2O', 'Оксид водорода'],
    synonymsEn: ['Water', 'H2O', 'Dihydrogen monoxide'],
    skeletalSvg: '<circle cx="20" cy="20" r="3.5" fill="#38BDF8"/>',
    structureSvg: `<svg viewBox="0 0 240 100" class="molecule-structure-svg" preserveAspectRatio="xMidYMid meet">
  <circle cx="120" cy="38" r="18" fill="rgba(56, 189, 248, 0.2)" stroke="#38BDF8" stroke-width="2"/>
  <text x="120" y="38" fill="#38BDF8" font-size="16" font-weight="800" text-anchor="middle" dominant-baseline="central">O</text>
  <line x1="108" y1="48" x2="84" y2="72" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="76" cy="80" r="12" fill="rgba(226, 232, 240, 0.15)" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="76" y="80" fill="#F1F5F9" font-size="13" font-weight="700" text-anchor="middle" dominant-baseline="central">H</text>
  <line x1="132" y1="48" x2="156" y2="72" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="164" cy="80" r="12" fill="rgba(226, 232, 240, 0.15)" stroke="#94A3B8" stroke-width="1.5"/>
  <text x="164" y="80" fill="#F1F5F9" font-size="13" font-weight="700" text-anchor="middle" dominant-baseline="central">H</text>
  <text x="120" y="70" fill="#64748B" font-size="11" font-weight="600" text-anchor="middle" dominant-baseline="central">104.5°</text>
</svg>`,
    isCofactor: true,
    pathwaysRu: [
      {
        pathwayCode: 'PWY_TCA',
        pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
        pathwayNameEn: 'Citric Acid Cycle (TCA)',
        isCurrentPathway: true,
        role: 'cofactor',
        detailsRu: 'Стадии 1 (гидролиз цитрил-КоА), 2 (гидратация цис-аконитата) и 7 (гидратация фумарата).',
        detailsEn: 'Steps 1 (citryl-CoA hydrolysis), 2 (cis-aconitate hydration), and 7 (fumarate hydration).',
      },
    ],
  },
];

export const ALL_METABOLITES: HumanMetaboliteNode[] = [
  ...HUMAN_METABOLITES,
  ...COFACTOR_METABOLITES,
];

export const HUMAN_REACTIONS: HumanReactionArrow[] = [
  {
    "id": "d0000002-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_HK",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Фосфорилирование глюкозы гексокиназой",
    "nameEn": "Hexokinase phosphorylation of glucose",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000002",
    "pathData": "M 1600 -200 L 1600 -114",
    "tooltipX": 1600,
    "tooltipY": -157,
    "enzymeRu": "Гексокиназа 1 / Глюкокиназа",
    "enzymeEn": "Hexokinase 1 / Glucokinase",
    "enzymeShort": "HK1 / GCK",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 -178 C 1552 -172, 1586 -160, 1600 -157 C 1586 -154, 1552 -142, 1495 -136",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 1460,
      "inY": -178,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 1448,
      "outY": -136,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    },
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
    "clinicalNoteRu": "Мутации в гене глюкокиназы (GCK) вызывают MODY2 диабет; повышенная экспрессия HK2 характерна для злокачественных опухолей (эффект Варбурга).",
    "energyBalanceRu": "Расход: -1 АТФ (инвестиция)",
    "energyBalanceEn": "Cost: -1 ATP (investment)",
    "netAtpYieldRu": "Баланс: -1 АТФ (фаза затрат)",
    "netAtpYieldEn": "Cumulative: -1 ATP (investment phase)"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_GPI",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Изомеризация глюкозо-6-фосфата во фруктозо-6-фосфат",
    "nameEn": "Phosphoglucose isomerase conversion of G6P to F6P",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000002",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000003",
    "pathData": "M 1600 -40 L 1600 46",
    "tooltipX": 1600,
    "tooltipY": 3,
    "enzymeRu": "Глюкозо-6-фосфатизомераза",
    "enzymeEn": "Glucose-6-phosphate isomerase",
    "enzymeShort": "GPI",
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
    "clinicalNoteRu": "Дефицит GPI — редкая причина наследственной несефероцитарной гемолитической анемии (2-е место среди гликолитических энзимопатий).",
    "energyBalanceRu": "Энергонейтрально (изомеризация)",
    "energyBalanceEn": "Isoenergetic (isomerization)",
    "netAtpYieldRu": "Баланс: -1 АТФ",
    "netAtpYieldEn": "Cumulative: -1 ATP"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_PFK1",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Фосфорилирование фруктозо-6-фосфата (PFK-1)",
    "nameEn": "Phosphofructokinase-1 phosphorylation of F6P",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000003",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000004",
    "pathData": "M 1600 120 L 1600 206",
    "tooltipX": 1600,
    "tooltipY": 163,
    "enzymeRu": "Фосфофруктокиназа-1",
    "enzymeEn": "Phosphofructokinase-1",
    "enzymeShort": "PFK-1",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 142 C 1552 148, 1586 160, 1600 163 C 1586 166, 1552 178, 1495 184",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 1460,
      "inY": 142,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 1448,
      "outY": 184,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    },
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
    "clinicalNoteRu": "Болезнь Таруи (гликогеноз VII типа) — дефицит PFKM в мышцах, приводящий к миопатии и непереносимости физических нагрузок.",
    "energyBalanceRu": "Расход: -1 АТФ (вторая инвестиция)",
    "energyBalanceEn": "Cost: -1 ATP (second investment)",
    "netAtpYieldRu": "Баланс: -2 АТФ (конец фазы инвестиций)",
    "netAtpYieldEn": "Cumulative: -2 ATP (investment phase end)"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000004",
    "stepNumber": 4,
    "code": "R_ALDO",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Альдолазное расщепление на две триозы (ГАФ и ДАФ)",
    "nameEn": "Aldolase cleavage of F1,6BP into GAP and DHAP",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000004",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000006",
    "secondaryTargetId": "b0000002-0000-0000-0000-000000000005",
    "secondaryPathData": "M 1600 280 C 1745 296, 1895 315, 1935 366",
    "pathData": "M 1600 280 L 1600 366",
    "tooltipX": 1600,
    "tooltipY": 323,
    "enzymeRu": "Фруктозобисфосфатальдолаза",
    "enzymeEn": "Fructose-bisphosphate aldolase",
    "enzymeShort": "ALDOA",
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
    "clinicalNoteRu": "Мутации ALDOB в печени вызывают наследственную непереносимость фруктозы (HFI) с накоплением фруктозо-1-фосфата и гипогликемией.",
    "energyBalanceRu": "Расщепление C₆ ➔ 2×C₃",
    "energyBalanceEn": "Cleavage C₆ ➔ 2×C₃",
    "netAtpYieldRu": "Баланс: -2 АТФ (удвоение последующего потока)",
    "netAtpYieldEn": "Cumulative: -2 ATP (subsequent flux doubled)"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000005",
    "stepNumber": 5,
    "code": "R_TPI",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Изомеризация дигидроксиацетонфосфата в ГАФ",
    "nameEn": "Triosephosphate isomerase conversion of DHAP to GAP",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000005",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000006",
    "pathData": "M 1885 403 L 1680 403",
    "tooltipX": 1782,
    "tooltipY": 388,
    "enzymeRu": "Триозофосфатизомераза",
    "enzymeEn": "Triosephosphate isomerase",
    "enzymeShort": "TPI1",
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
    "clinicalNoteRu": "Дефицит TPI1 — тяжелейшая гликолитическая энзимопатия с летальным исходом в детстве из-за прогрессирующей нейродегенерации и гемолиза.",
    "energyBalanceRu": "Конверсия ДАФ ➔ ГАФ",
    "energyBalanceEn": "Conversion DHAP ➔ GAP",
    "netAtpYieldRu": "Баланс: -2 АТФ (обе триозы готовы к фазе отдачи)",
    "netAtpYieldEn": "Cumulative: -2 ATP (both trioses enter payoff phase)"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000006",
    "stepNumber": 6,
    "code": "R_GAPDH",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Окисление ГАФ с генерацией НАДН (GAPDH)",
    "nameEn": "GAPDH oxidation and phosphorylation to 1,3-BPG",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000006",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000007",
    "pathData": "M 1600 440 L 1600 526",
    "tooltipX": 1600,
    "tooltipY": 483,
    "enzymeRu": "Глицеральдегид-3-фосфатдегидрогеназа",
    "enzymeEn": "Glyceraldehyde-3-phosphate dehydrogenase",
    "enzymeShort": "GAPDH",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 462 C 1552 468, 1586 480, 1600 483 C 1586 486, 1552 498, 1495 504",
      "inCofactor": "НАД⁺",
      "inCofactorEn": "NAD⁺",
      "inText": "+ Фᵢ + НАД⁺",
      "inTextRu": "+ Фᵢ + НАД⁺",
      "inTextEn": "+ Pi + NAD⁺",
      "inX": 1436,
      "inY": 462,
      "outCofactor": "НАДН",
      "outCofactorEn": "NADH",
      "outText": "НАДН + H⁺",
      "outTextRu": "НАДН + H⁺",
      "outTextEn": "NADH + H⁺",
      "outX": 1444,
      "outY": 504,
      "isEnergy": true,
      "inItems": [
        {
          "name": "НАД⁺",
          "nameEn": "NAD⁺",
          "text": "+ НАД⁺",
          "textRu": "+ НАД⁺",
          "textEn": "+ NAD⁺"
        }
      ],
      "outItems": [
        {
          "name": "НАДН",
          "nameEn": "NADH",
          "text": "НАДН",
          "textRu": "НАДН",
          "textEn": "NADH",
          "isEnergy": true
        }
      ]
    },
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
    "clinicalNoteRu": "Арсенат заменяет неорганический фосфат, образуя нестабильный 1-арсено-3-фосфоглицерат, который гидролизуется в обход синтеза АТФ (токсичность мышьяка).",
    "energyBalanceRu": "Выход: +2 НАДН на молекулу глюкозы",
    "energyBalanceEn": "Yield: +2 NADH per glucose",
    "netAtpYieldRu": "Дыхательный потенциал: +3...5 АТФ в ДЦ (аэробно)",
    "netAtpYieldEn": "Respiratory potential: +3...5 ATP via ETC (aerobic)"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000007",
    "stepNumber": 7,
    "code": "R_PGK",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Субстратное фосфорилирование АТФ (PGK1)",
    "nameEn": "Phosphoglycerate kinase substrate-level ATP generation",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000007",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000008",
    "pathData": "M 1600 600 L 1600 686",
    "tooltipX": 1600,
    "tooltipY": 643,
    "enzymeRu": "Фосфоглицераткиназа 1",
    "enzymeEn": "Phosphoglycerate kinase 1",
    "enzymeShort": "PGK1",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 622 C 1552 628, 1586 640, 1600 643 C 1586 646, 1552 658, 1495 664",
      "inCofactor": "Аденозиндифосфат",
      "inCofactorEn": "ADP",
      "inText": "+ АДФ",
      "inTextRu": "+ АДФ",
      "inTextEn": "+ ADP",
      "inX": 1460,
      "inY": 622,
      "outCofactor": "Аденозинтрифосфат",
      "outCofactorEn": "ATP",
      "outText": "⚡ АТФ (2x)",
      "outTextRu": "⚡ АТФ (2x)",
      "outTextEn": "⚡ ATP (2x)",
      "outX": 1440,
      "outY": 664,
      "isEnergy": true,
      "inItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "+ АДФ",
          "textRu": "+ АДФ",
          "textEn": "+ ADP"
        }
      ],
      "outItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "⚡ АТФ",
          "textRu": "⚡ АТФ",
          "textEn": "⚡ ATP",
          "isEnergy": true
        }
      ]
    },
    "mechanismRu": "Первая стадия гликолиза, окупающая затраты энергии. Перенос высокоэнергетического 1-ацилфосфата с 1,3-БФГ на АДФ с генерацией 2 молекул АТФ на глюкозу.",
    "mechanismEn": "First substrate-level phosphorylation reaction compensating for preparatory phase ATP consumption.",
    "clinicalNoteRu": "Дефицит сцепленной с X-хромосомой PGK1 проявляется гемолитической анемией и миопатией с рабдомиолизом при нагрузках.",
    "energyBalanceRu": "Выход: +2 АТФ субстратно (2 триозы)",
    "energyBalanceEn": "Yield: +2 ATP substrate-level (2 trioses)",
    "netAtpYieldRu": "Баланс: 0 АТФ (точка безубыточности / возврат инвестиций)",
    "netAtpYieldEn": "Cumulative: 0 ATP (break-even point reached)"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000008",
    "stepNumber": 8,
    "code": "R_PGAM",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Изомеризация 3-PG в 2-PG (мутазная реакция)",
    "nameEn": "Phosphoglycerate mutase conversion of 3-PG to 2-PG",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000008",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000009",
    "pathData": "M 1600 760 L 1600 846",
    "tooltipX": 1600,
    "tooltipY": 803,
    "enzymeRu": "Фосфоглицератмутаза 1",
    "enzymeEn": "Phosphoglycerate mutase 1",
    "enzymeShort": "PGAM1",
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
    "clinicalNoteRu": "Гликогеноз X типа — дефицит мышечной PGAM2 с непереносимостью физической активности и спазмами.",
    "energyBalanceRu": "Изомеризация 3-PG ➔ 2-PG",
    "energyBalanceEn": "Isomerization 3-PG ➔ 2-PG",
    "netAtpYieldRu": "Баланс: 0 АТФ",
    "netAtpYieldEn": "Cumulative: 0 ATP"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000009",
    "stepNumber": 9,
    "code": "R_ENO",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Дегидратация 2-PG енолазой с образованием ФЕП",
    "nameEn": "Enolase dehydration of 2-PG to phosphoenolpyruvate",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000009",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000010",
    "pathData": "M 1600 920 L 1600 1006",
    "tooltipX": 1600,
    "tooltipY": 963,
    "enzymeRu": "Енолаза",
    "enzymeEn": "Enolase (Phosphopyruvate hydratase)",
    "enzymeShort": "ENO1",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1600 963 C 1565 963, 1530 963, 1495 963",
      "outCofactor": "Вода (H₂O)",
      "outCofactorEn": "Water (H₂O)",
      "outText": "- H₂O",
      "outTextRu": "- H₂O",
      "outTextEn": "- H₂O",
      "outX": 1460,
      "outY": 963,
      "outItems": [
        {
          "name": "Вода (H₂O)",
          "nameEn": "Water (H₂O)",
          "text": "- H₂O",
          "textRu": "- H₂O",
          "textEn": "- H₂O"
        }
      ]
    },
    "inhibitorsRu": [
      "Фторид-ионы (F⁻ в присутствии фосфата и Mg²⁺)"
    ],
    "inhibitorsEn": [
      "Fluoride ion (complex with Mg2+ and phosphate)"
    ],
    "mechanismRu": "Элиминирование молекулы воды с образованием нестабильного енольного эфира, фиксирующего высокую энергию гидролиза фосфатной связи.",
    "mechanismEn": "Elimination of H2O creating high-energy enol-phosphate bond trapped in the enol tautomer.",
    "clinicalNoteRu": "Фторид натрия добавляется в клинические пробирки для забора крови на сахар для ингибирования енолазы и остановки спонтанного гликолиза in vitro.",
    "energyBalanceRu": "Синтез макроэрга ФЕП (-2 H₂O)",
    "energyBalanceEn": "Synthesis of high-energy PEP (-2 H₂O)",
    "netAtpYieldRu": "Баланс: 0 АТФ (накопление свободной энергии)",
    "netAtpYieldEn": "Cumulative: 0 ATP (free energy trapped in PEP)"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000010",
    "stepNumber": 10,
    "code": "R_PK",
    "pathwayCode": "PW-GLYCOLISIS",
    "pathwayNameRu": "Гликолиз (Эмбден-Мейергоф)",
    "pathwayNameEn": "Glycolysis",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Синтез пирувата пируваткиназой (PKM)",
    "nameEn": "Pyruvate kinase conversion of PEP to pyruvate with ATP yield",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000010",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000011",
    "pathData": "M 1600 1080 L 1600 1166",
    "tooltipX": 1600,
    "tooltipY": 1123,
    "enzymeRu": "Пируваткиназа M1/M2 / L/R",
    "enzymeEn": "Pyruvate kinase",
    "enzymeShort": "PKM / PKLR",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1495 1102 C 1552 1108, 1586 1120, 1600 1123 C 1586 1126, 1552 1138, 1495 1144",
      "inCofactor": "Аденозиндифосфат",
      "inCofactorEn": "ADP",
      "inText": "+ АДФ",
      "inTextRu": "+ АДФ",
      "inTextEn": "+ ADP",
      "inX": 1460,
      "inY": 1102,
      "outCofactor": "Аденозинтрифосфат",
      "outCofactorEn": "ATP",
      "outText": "⚡ АТФ (2x)",
      "outTextRu": "⚡ АТФ (2x)",
      "outTextEn": "⚡ ATP (2x)",
      "outX": 1440,
      "outY": 1144,
      "isEnergy": true,
      "inItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "+ АДФ",
          "textRu": "+ АДФ",
          "textEn": "+ ADP"
        }
      ],
      "outItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "⚡ АТФ",
          "textRu": "⚡ АТФ",
          "textEn": "⚡ ATP",
          "isEnergy": true
        }
      ]
    },
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
    "clinicalNoteRu": "Дефицит эритроцитарной PKLR — самая частая причина наследственной гемолитической анемии, вызванной ферментопатиями гликолиза.",
    "energyBalanceRu": "Выход: +2 АТФ субстратно (2 триозы)",
    "energyBalanceEn": "Yield: +2 ATP substrate-level (2 trioses)",
    "netAtpYieldRu": "ЧИСТАЯ ПРИБЫЛЬ: +2 АТФ (чистый анаэробный итог гликолиза)",
    "netAtpYieldEn": "NET PROFIT: +2 ATP (net anaerobic glycolytic yield)"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000011",
    "stepNumber": 1,
    "code": "R_MPC",
    "pathwayCode": "PW-MPC",
    "pathwayNameRu": "Митохондриальный транспорт пирувата",
    "pathwayNameEn": "Mitochondrial Pyruvate Transport",
    "compartmentRu": "Внутренняя мембрана митохондрий (ВММ)",
    "compartmentEn": "Inner Mitochondrial Membrane (IMM)",
    "nameRu": "Транспорт пирувата через митохондриальный переносчик (MPC1/2)",
    "nameEn": "Mitochondrial pyruvate carrier translocase (MPC1/MPC2)",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000011",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000012",
    "pathData": "M 1600 1240 L 1600 1356",
    "tooltipX": 1600,
    "tooltipY": 1298,
    "enzymeRu": "Митохондриальный пируватный переносчик",
    "enzymeEn": "Mitochondrial pyruvate carrier complex",
    "enzymeShort": "MPC1 / MPC2",
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
    "clinicalNoteRu": "Дефицит MPC вызывает тяжелый неонатальный лактатацидоз и задержку психомоторного развития; фармакологическое ингибирование MPC исследуется при диабете 2 типа.",
    "energyBalanceRu": "Протон-зависимый транспорт (H⁺-симпорт)",
    "energyBalanceEn": "Proton-coupled symport into matrix",
    "netAtpYieldRu": "Вход в митохондриальный матрикс",
    "netAtpYieldEn": "Matrix entry step"
  },
  {
    "id": "d0000002-0000-0000-0000-000000000012",
    "stepNumber": 1,
    "code": "R_PDH",
    "pathwayCode": "PW-PDH",
    "pathwayNameRu": "Пируватдегидрогеназный комплекс (ПДХ)",
    "pathwayNameEn": "Pyruvate Dehydrogenase Complex (PDH)",
    "compartmentRu": "Матрикс митохондрий",
    "compartmentEn": "Mitochondrial Matrix",
    "nameRu": "Окислительное декарбоксилирование пирувата в Ацетил-КоА (ПДХ)",
    "nameEn": "Pyruvate dehydrogenase complex conversion of pyruvate to Acetyl-CoA",
    "sourceMetaboliteId": "b0000002-0000-0000-0000-000000000012",
    "targetMetaboliteId": "b0000001-0000-0000-0000-000000000002",
    "pathData": "M 1600 1430 L 1600 1560",
    "tooltipX": 1600,
    "tooltipY": 1495,
    "enzymeRu": "Пируватдегидрогеназный мультиферментный комплекс",
    "enzymeEn": "Pyruvate dehydrogenase multienzyme complex (E1-E2-E3)",
    "enzymeShort": "ПДХ (PDH Complex)",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1500 1468 C 1555 1476, 1588 1490, 1600 1495 C 1588 1500, 1555 1514, 1500 1522",
      "inCofactor": "НАД⁺",
      "inCofactorEn": "NAD⁺",
      "inText": "+ КоА-SH + НАД⁺",
      "inTextRu": "+ КоА-SH + НАД⁺",
      "inTextEn": "+ CoA-SH + NAD⁺",
      "inX": 1395,
      "inY": 1468,
      "outCofactor": "НАДН",
      "outCofactorEn": "NADH",
      "outText": "НАДН + CO₂ ↑",
      "outTextRu": "НАДН + CO₂ ↑",
      "outTextEn": "NADH + CO₂ ↑",
      "outX": 1395,
      "outY": 1522,
      "isEnergy": true,
      "inItems": [
        {
          "name": "Кофермент A (КоА-SH)",
          "nameEn": "Coenzyme A (CoA-SH)",
          "text": "+ КоА-SH",
          "textRu": "+ КоА-SH",
          "textEn": "+ CoA-SH",
          "dx": -38
        },
        {
          "name": "НАД⁺",
          "nameEn": "NAD⁺",
          "text": "+ НАД⁺",
          "textRu": "+ НАД⁺",
          "textEn": "+ NAD⁺",
          "dx": 30
        }
      ],
      "outItems": [
        {
          "name": "НАДН",
          "nameEn": "NADH",
          "text": "НАДН",
          "textRu": "НАДН",
          "textEn": "NADH",
          "dx": -34,
          "isEnergy": true
        },
        {
          "name": "Диоксид углерода (CO₂)",
          "nameEn": "Carbon dioxide (CO₂)",
          "text": "+ CO₂ ↑",
          "textRu": "+ CO₂ ↑",
          "textEn": "+ CO₂ ↑",
          "dx": 30
        }
      ]
    },
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
    "clinicalNoteRu": "Дефицит E1-альфа (PDHA1) — наиболее частая причина наследственного синдрома Ли (подострой некротизирующей энцефаломиелопатии); дефицит тиамина (витамина B1) нарушает работу E1, вызывая болезнь Бери-бери.",
    "energyBalanceRu": "Выход: +2 НАДН + 2 Ацетил-КоА + 2 CO₂ (на глюкозу)",
    "energyBalanceEn": "Yield: +2 NADH + 2 Acetyl-CoA + 2 CO₂ (per glucose)",
    "netAtpYieldRu": "Дыхательный потенциал: +5 АТФ в ДЦ (на 2 пирувата)",
    "netAtpYieldEn": "Respiratory potential: +5 ATP via ETC (per 2 pyruvates)"
  },
  {
    "id": "d0000003-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_GALK1",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Фосфорилирование D-галактозы галактокиназой",
    "nameEn": "Galactokinase C1 phosphorylation of D-galactose",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000002",
    "pathData": "M 780 -200 L 780 -114",
    "tooltipX": 780,
    "tooltipY": -157,
    "enzymeRu": "Галактокиназа 1",
    "enzymeEn": "Galactokinase 1",
    "enzymeShort": "GALK1",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 675 -178 C 732 -172, 766 -160, 780 -157 C 766 -154, 732 -142, 675 -136",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 640,
      "inY": -178,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 632,
      "outY": -136,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    },
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
    "clinicalNoteRu": "Дефицит GALK1 вызывает галактоземию II типа: ранняя двусторонняя катаракта у младенцев из-за восстановления избытка галактозы альдозоредуктазой хрусталика в осмотически активный галактитол (дулцитол), без тяжёлого поражения печени.",
    "energyBalanceRu": "Расход: -1 АТФ",
    "energyBalanceEn": "Investment: -1 ATP",
    "netAtpYieldRu": "Итог входа в гликолиз: +2 АТФ нетто (как от глюкозы)",
    "netAtpYieldEn": "Glycolytic net total: +2 net ATP (equivalent to glucose)"
  },
  {
    "id": "d0000003-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_GALT",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Уридилилтрансферазный обмен (Гал-1-Ф + УДФ-Глю ⇄ УДФ-Гал + Г1Ф)",
    "nameEn": "Uridylyltransferase exchange (Gal-1-P + UDP-Glc ⇄ UDP-Gal + G1P)",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000002",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000003",
    "secondarySourceId": "b0000003-0000-0000-0000-000000000005",
    "secondaryTargetId": "b0000003-0000-0000-0000-000000000004",
    "pathData": "M 860 -77 L 1175 -77",
    "secondaryPathData": "M 1175 -218 C 1135 -145, 1055 -110, 1018 -77 C 990 -115, 995 -150, 1007 -200",
    "tooltipX": 1018,
    "tooltipY": -56,
    "enzymeRu": "Галактозо-1-фосфатуридилтрансфераза",
    "enzymeEn": "Galactose-1-phosphate uridylyltransferase",
    "enzymeShort": "GALT",
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
    "clinicalNoteRu": "Мутации GALT вызывают классическую галактоземию I типа — тяжелейшее неонатальное состояние с желтухой, гепатомегалией, сепсисом E. coli, катарактой и энцефалопатией при накоплении Гал-1-Ф и галактитола.",
    "energyBalanceRu": "Обмен УМФ без затраты АТФ (ΔG° ≈ 0)",
    "energyBalanceEn": "ATP-neutral UMP group exchange (ΔG° ≈ 0)",
    "netAtpYieldRu": "Освобождает C6 скелет в виде Г1Ф без расхода УТФ",
    "netAtpYieldEn": "Releases G1P without net UTP consumption"
  },
  {
    "id": "d0000003-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_GALE",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "C4-эпимеризация УДФ-галактозы в УДФ-глюкозу",
    "nameEn": "UDP-galactose 4-epimerase isomerization to UDP-glucose",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000004",
    "targetMetaboliteId": "b0000003-0000-0000-0000-000000000005",
    "pathData": "M 1085 -237 L 1175 -237",
    "tooltipX": 1130,
    "tooltipY": -254,
    "enzymeRu": "УДФ-глюкоза-4-эпимераза",
    "enzymeEn": "UDP-glucose 4-epimerase",
    "enzymeShort": "GALE",
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
    "clinicalNoteRu": "Дефицит GALE (галактоземия III типа) нарушает регенерацию УДФ-глюкозы и биосинтез гликопротеинов/гликолипидов. Обратимость реакции позволяет клеткам без поступления галактозы с пищей синтезировать УДФ-галактозу из глюкозы для мембран мозга.",
    "energyBalanceRu": "Внутреннее замыкание цикла УДФ-сахаров (0 АТФ)",
    "energyBalanceEn": "Internal UDP-sugar regeneration (0 ATP)",
    "netAtpYieldRu": "Возвращает УДФ-глюкозу для следующего цикла GALT",
    "netAtpYieldEn": "Replenishes UDP-glucose for continuous GALT turnover"
  },
  {
    "id": "d0000003-0000-0000-0000-000000000004",
    "stepNumber": 4,
    "code": "R_PGM1",
    "pathwayCode": "PW-GALACTOSE",
    "pathwayNameRu": "Путь Лелуара (Галактоза)",
    "pathwayNameEn": "Leloir Pathway (Galactose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Взаимопревращение глюкозо-1-фосфата и Г6Ф (вход в гликолиз и синтез глюкозы)",
    "nameEn": "Phosphoglucomutase isomerization of G1P to G6P",
    "sourceMetaboliteId": "b0000003-0000-0000-0000-000000000003",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000002",
    "pathData": "M 1330 -77 L 1520 -77",
    "tooltipX": 1425,
    "tooltipY": -92,
    "enzymeRu": "Фосфоглюкомутаза 1",
    "enzymeEn": "Phosphoglucomutase 1",
    "enzymeShort": "PGM1",
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
    "clinicalNoteRu": "Дефицит PGM1 относится к врождённым нарушениям гликозилирования (PGM1-CDG) и гликогенозу XIV типа с гепатопатией, миопатией и гипогликемией. Ключевой узел превращения галактозы молока в свободную глюкозу крови в печени (совместно с G6PC1).",
    "energyBalanceRu": "Изомеризация без АТФ; обход гексокиназы (экономит 1 АТФ от Г1Ф)",
    "energyBalanceEn": "ATP-free isomerization; merges directly at G6P",
    "netAtpYieldRu": "От Галактозы до Пирувата: +2 АТФ нетто (аэробно до ~32 АТФ); либо ➔ Глюкоза (G6PC1)",
    "netAtpYieldEn": "Galactose ➔ Pyruvate yields +2 net ATP (~32 ATP aerobic); or ➔ Blood Glucose (G6PC1)"
  },
  {
    "id": "d0000004-0000-0000-0000-000000000001",
    "stepNumber": 1,
    "code": "R_KHK",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз (Печень)",
    "pathwayNameEn": "Fructolysis (Liver)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Быстрое фосфорилирование D-фруктозы кетогексокиназой",
    "nameEn": "Ketohexokinase phosphorylation of D-fructose",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000004-0000-0000-0000-000000000002",
    "pathData": "M 2240 120 L 2240 206",
    "tooltipX": 2240,
    "tooltipY": 163,
    "enzymeRu": "Кетогексокиназа (Фруктокиназа)",
    "enzymeEn": "Ketohexokinase (Fructokinase)",
    "enzymeShort": "KHK",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 2345 142 C 2288 148, 2254 160, 2240 163 C 2254 166, 2288 178, 2345 184",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 2385,
      "inY": 142,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 2392,
      "outY": 184,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    },
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
    "clinicalNoteRu": "Доброкачественный дефицит KHK (эссенциальная фруктозурия) протекает бессимптомно с экскрецией фруктозы с мочой. Напротив, избыточная активация KHK-C вызывает резкое падение АТФ/Pi в гепатоцитах, распад АМФ до мочевой кислоты (гиперурикемия) и de novo липогенез.",
    "energyBalanceRu": "Расход: -1 АТФ (обход PFK-1)",
    "energyBalanceEn": "Investment: -1 ATP (bypasses PFK-1)",
    "netAtpYieldRu": "Перед лимитирующим расщеплением ALDOB: -1 АТФ",
    "netAtpYieldEn": "Pre-cleavage balance: -1 ATP"
  },
  {
    "id": "d0000004-0000-0000-0000-000000000002",
    "stepNumber": 2,
    "code": "R_ALDOB",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз (Печень)",
    "pathwayNameEn": "Fructolysis (Liver)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Расщепление Ф1Ф альдолазой B на ДАФ и D-глицеральдегид",
    "nameEn": "Aldolase B cleavage of F1P into DHAP and D-glyceraldehyde",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000002",
    "targetMetaboliteId": "b0000004-0000-0000-0000-000000000003",
    "secondaryTargetId": "b0000002-0000-0000-0000-000000000005",
    "pathData": "M 2240 280 L 2240 366",
    "secondaryPathData": "M 2240 280 C 2135 296, 2020 315, 1990 366",
    "tooltipX": 2240,
    "tooltipY": 323,
    "enzymeRu": "Альдолаза B (Печёночная)",
    "enzymeEn": "Aldolase B (Hepatic)",
    "enzymeShort": "ALDOB",
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
    "clinicalNoteRu": "Наследственная непереносимость фруктозы (HFI, аутосомно-рецессивный дефицит ALDOB): при приёме фруктозы или сахарозы Ф1Ф необратимо запирает неорганический фосфат (Pi), тормозит гликогенолиз (фосфорилазу) и глюконеогенез, вызывая тяжёлую гипогликемию, лактатацидоз и печёночную недостаточность.",
    "energyBalanceRu": "Расщепление в обход PFK-1: 1 триоза с фосфатом (ДАФ) + 1 без (ГА)",
    "energyBalanceEn": "PFK-1 bypass cleavage: phosphorylated DHAP + free GA",
    "netAtpYieldRu": "Удвоение потока C₃: далее ГА (через TKFC) и ДАФ дают +4 АТФ (итого +2 АТФ нетто)",
    "netAtpYieldEn": "Trioses feed payoff phase (+4 ATP gross, +2 ATP net total)"
  },
  {
    "id": "d0000004-0000-0000-0000-000000000003",
    "stepNumber": 3,
    "code": "R_TKFC",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз (Печень)",
    "pathwayNameEn": "Fructolysis (Liver)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Фосфорилирование D-глицеральдегида триокиназой в ГАФ",
    "nameEn": "Triokinase phosphorylation of D-glyceraldehyde into G3P",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000003",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000006",
    "pathData": "M 2240 440 C 2240 520, 1860 520, 1680 425",
    "tooltipX": 2028,
    "tooltipY": 482,
    "enzymeRu": "Триокиназа (TKFC)",
    "enzymeEn": "Triokinase / FMN cyclase",
    "enzymeShort": "TKFC",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1990 550 C 2006 522, 2022 501, 2028 498 C 2034 501, 2050 522, 2066 550",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 1966,
      "inY": 564,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 2092,
      "outY": 564,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    },
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
    "clinicalNoteRu": "Недостаточность TKFC вызывает редкую триокиназную недостаточность (TKFCD) с неврологическими расстройствами, гипогликемией и катарактой; при здоровом ферменте предупреждает восстановление глицеральдегида в токсичный глицерол или оксалат.",
    "energyBalanceRu": "Расход второй АТФ (-1 АТФ; всего -2 АТФ как в гликолизе)",
    "energyBalanceEn": "Second ATP spent (-1 ATP; cumulative -2 ATP matching glycolysis)",
    "netAtpYieldRu": "Итог от Фруктозы ➔ Пируват: +2 АТФ нетто; в печени: путь синтеза Глюкозы (➔ G6P ➔ G6PC1)",
    "netAtpYieldEn": "Fructose ➔ Pyruvate total: +2 net ATP; or hepatic gluconeogenesis to glucose"
  },
  {
    "id": "d0000004-0000-0000-0000-000000000004",
    "stepNumber": 4,
    "code": "R_HK_FRU",
    "pathwayCode": "PW-FRUCTOSE",
    "pathwayNameRu": "Фруктолиз (Мышцы / Адипоциты)",
    "pathwayNameEn": "Fructolysis (Muscle / Adipose)",
    "compartmentRu": "Цитозоль",
    "compartmentEn": "Cytosol",
    "nameRu": "Внепечёночное фосфорилирование фруктозы во Ф6Ф",
    "nameEn": "Extrahepatic hexokinase phosphorylation of fructose to F6P",
    "sourceMetaboliteId": "b0000004-0000-0000-0000-000000000001",
    "targetMetaboliteId": "b0000002-0000-0000-0000-000000000003",
    "pathData": "M 2160 83 L 1680 83",
    "tooltipX": 1920,
    "tooltipY": 66,
    "enzymeRu": "Гексокиназа 1 / 2",
    "enzymeEn": "Hexokinase 1 / 2",
    "enzymeShort": "HK1 / HK2",
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
    "cofactorArc": {
      "preset": "tangent-swoop",
      "path": "M 1885 135 C 1900 106, 1914 86, 1920 83 C 1926 86, 1940 106, 1955 135",
      "inCofactor": "Аденозинтрифосфат",
      "inCofactorEn": "ATP",
      "inText": "+ АТФ",
      "inTextRu": "+ АТФ",
      "inTextEn": "+ ATP",
      "inX": 1870,
      "inY": 148,
      "outCofactor": "Аденозиндифосфат",
      "outCofactorEn": "ADP",
      "outText": "АДФ + H⁺",
      "outTextRu": "АДФ + H⁺",
      "outTextEn": "ADP + H⁺",
      "outX": 1974,
      "outY": 148,
      "inItems": [
        {
          "name": "Аденозинтрифосфат",
          "nameEn": "ATP",
          "text": "+ АТФ",
          "textRu": "+ АТФ",
          "textEn": "+ ATP",
          "isEnergy": true
        }
      ],
      "outItems": [
        {
          "name": "Аденозиндифосфат",
          "nameEn": "ADP",
          "text": "АДФ",
          "textRu": "АДФ",
          "textEn": "ADP"
        }
      ]
    },
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
    "clinicalNoteRu": "Этот запасной путь объясняет появление фруктозурии при сохранной общей утилизации фруктозы в мышцах, а также защищённость внепечёночных тканей от резкого истощения АТФ, характерного для печёночной KHK.",
    "energyBalanceRu": "Расход: -1 АТФ (далее ещё -1 АТФ на PFK-1 ➔ всего -2 АТФ)",
    "energyBalanceEn": "Investment: -1 ATP (plus -1 ATP at PFK-1 ➔ -2 ATP total)",
    "netAtpYieldRu": "Итог по стволу гликолиза: +2 АТФ нетто (аэробно ~30–32 АТФ)",
    "netAtpYieldEn": "Via main glycolysis payoff: +2 net ATP (~30–32 ATP aerobic)"
  },
  {
    id: 'd0000001-0000-0000-0000-000000000001',
    stepNumber: 1,
    code: 'R_CS',
    pathwayCode: 'PW-TCA-CYCLE',
    pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
    pathwayNameEn: 'Citric Acid Cycle (TCA)',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Конденсация оксалоацетата и ацетил-КоА',
    nameEn: 'Citrate synthase condensation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000003', // OAA
    secondarySourceId: 'b0000001-0000-0000-0000-000000000002', // Acetyl-CoA
    secondaryPathData: 'M 1600 1634 L 1600 1768',
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000004', // Citrate
    pathData: 'M 1516 1778 A 420 420 0 0 1 1689 1779',
    tooltipX: 1602,
    tooltipY: 1795,
    enzymeRu: 'Цитратсинтаза',
    enzymeEn: 'Citrate synthase',
    enzymeShort: 'CS',
    ecNumber: '2.3.3.1',
    gene: 'CS',
    uniprotId: 'O75390',
    isReversible: false,
    deltaG0: '-31.5 кДж/моль',
    substrates: [
      { name: 'Оксалоацетат', nameEn: 'Oxaloacetate', formula: 'C₄H₂O₅²⁻' },
      { name: 'Ацетил-КоА', nameEn: 'Acetyl-CoA', formula: 'C₂₃H₃₄N₇O₁₇P₃S⁴⁻', isCo: true },
      { name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', formula: 'H₂O', isCo: true },
    ],
    products: [
      { name: 'Цитрат', nameEn: 'Citrate', formula: 'C₆H₅O₇³⁻' },
      { name: 'Кофермент A (КоА-SH)', nameEn: 'Coenzyme A (CoA-SH)', formula: 'C₂₁H₃₆N₇O₁₆P₃S', isCo: true },
      { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      preset: 'tangent-swoop',
      path: 'M 1542 1692 C 1568 1726, 1592 1764, 1600 1770 C 1608 1764, 1632 1726, 1658 1692',
      inCofactor: 'Вода (H₂O)',
      inCofactorEn: 'Water (H₂O)',
      inText: '+ H₂O',
      inTextRu: '+ H₂O',
      inTextEn: '+ H₂O',
      inX: 1525,
      inY: 1684,
      inAnchor: 'middle',
      outCofactor: 'Кофермент A (КоА-SH)',
      outCofactorEn: 'Coenzyme A (CoA-SH)',
      outText: 'КоА-SH',
      outTextRu: 'КоА-SH',
      outTextEn: 'CoA-SH',
      outX: 1678,
      outY: 1684,
      inItems: [{ name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', text: '+ H₂O', textRu: '+ H₂O', textEn: '+ H₂O' }],
      outItems: [{ name: 'Кофермент A (КоА-SH)', nameEn: 'Coenzyme A (CoA-SH)', text: 'КоА-SH', textRu: 'КоА-SH', textEn: 'CoA-SH' }],
    },
    inhibitorsRu: ['АТФ', 'НАДН', 'Сукцинил-КоА', 'Цитрат'],
    inhibitorsEn: ['ATP', 'NADH', 'Succinyl-CoA', 'Citrate'],
    mechanismRu: 'Конденсация метильной группы ацетил-КоА с карбонильным углеродом оксалоацетата с образованием цитрил-КоА, гидролиз которого высвобождает энергию тиоэфирной связи.',
    mechanismEn: 'Condensation of acetyl-CoA methyl carbon with oxaloacetate carbonyl carbon to form citryl-CoA, followed by thioester hydrolysis driving the reaction forward.',
    clinicalNoteRu: 'Начальная стадия цикла; сильно экзергоническая реакция, делающая процесс необратимым in vivo.',
    clinicalNoteEn: 'Initial committed step; strongly exergonic reaction driving cycle unidirectionality in vivo.',
    energyBalanceRu: '0 АТФ (конденсация)',
    energyBalanceEn: '0 ATP (condensation)',
    netAtpYieldRu: '+7 АТФ (с учетом гликолиза и ПДХ)',
    netAtpYieldEn: '+7 ATP (cumulative with glycolysis and PDH)'
  },
  {
    id: 'd0000001-0000-0000-0000-000000000002',
    stepNumber: 2,
    code: 'R_ACO',
    pathwayCode: 'PW-TCA-CYCLE',
    pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
    pathwayNameEn: 'Citric Acid Cycle (TCA)',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Изомеризация цитрата в изоцитрат',
    nameEn: 'Aconitate hydratase isomerization',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000004', // Citrate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000005', // Isocitrate
    pathData: 'M 1832 1840 A 420 420 0 0 1 1970 1991',
    tooltipX: 1892,
    tooltipY: 1924,
    enzymeRu: 'Аконитаза 2 (митохондриальная)',
    enzymeEn: 'Aconitate hydratase 2',
    enzymeShort: 'ACO2',
    ecNumber: '4.2.1.3',
    gene: 'ACO2',
    uniprotId: 'Q99798',
    isReversible: true,
    deltaG0: '+5.0 кДж/моль',
    substrates: [
      { name: 'Цитрат', nameEn: 'Citrate', formula: 'C₆H₅O₇³⁻' },
    ],
    products: [
      { name: 'Изоцитрат', nameEn: 'Isocitrate', formula: 'C₆H₅O₇³⁻' },
    ],
    cofactorArc: {
      preset: 'tangent-swoop',
      path: 'M 1904 1808 C 1898 1855, 1913 1904, 1910 1907 C 1913 1904, 1961 1924, 2008 1923',
      inCofactor: 'Вода (H₂O)',
      inCofactorEn: 'Water (H₂O)',
      inText: '− H₂O',
      inTextRu: '− H₂O',
      inTextEn: '− H₂O',
      inX: 1911,
      inY: 1773,
      outCofactor: 'Вода (H₂O)',
      outCofactorEn: 'Water (H₂O)',
      outText: '+ H₂O',
      outTextRu: '+ H₂O',
      outTextEn: '+ H₂O',
      outX: 2043,
      outY: 1918,
      inItems: [{ name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', text: '− H₂O', textRu: '− H₂O', textEn: '− H₂O' }],
      outItems: [{ name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', text: '+ H₂O', textRu: '+ H₂O', textEn: '+ H₂O' }],
    },
    mechanismRu: 'Стереоспецифическая дегидратация цитрата до промежуточного цис-аконитата, за которой следует гидратация с образованием изоцитрата при участии железосерного кластера [4Fe-4S].',
    mechanismEn: 'Stereospecific dehydration of citrate to cis-aconitate intermediate, followed by rehydration to isocitrate coordinated by a [4Fe-4S] iron-sulfur cluster.',
    clinicalNoteRu: 'Ингибируется фторацетатом (образующим фторцитрат — токсический яд).',
    clinicalNoteEn: 'Inhibited by fluoroacetate (which is converted into fluorocitrate, a potent suicide inhibitor).',
    energyBalanceRu: '0 АТФ (изомеризация)',
    energyBalanceEn: '0 ATP (isomerization)',
    netAtpYieldRu: '+7 АТФ',
    netAtpYieldEn: '+7 ATP'
  },
  {
    id: 'd0000001-0000-0000-0000-000000000003',
    stepNumber: 3,
    code: 'R_IDH',
    pathwayCode: 'PW-TCA-CYCLE',
    pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
    pathwayNameEn: 'Citric Acid Cycle (TCA)',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Окислительное декарбоксилирование изоцитрата',
    nameEn: 'Isocitrate oxidative decarboxylation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000005', // Isocitrate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000006', // aKG
    pathData: 'M 2002 2067 A 420 420 0 0 1 2002 2313',
    tooltipX: 1995,
    tooltipY: 2190,
    enzymeRu: 'Изоцитратдегидрогеназа 3 (НАД⁺)',
    enzymeEn: 'Isocitrate dehydrogenase 3 (NAD⁺)',
    enzymeShort: 'IDH3',
    ecNumber: '1.1.1.41',
    gene: 'IDH3A',
    uniprotId: 'P50213',
    isReversible: false,
    deltaG0: '-21.0 кДж/моль',
    substrates: [
      { name: 'Изоцитрат', nameEn: 'Isocitrate', formula: 'C₆H₅O₇³⁻' },
      { name: 'НАД⁺', nameEn: 'NAD⁺', formula: 'C₂₁H₂₇N₇O₁₄P₂', isCo: true },
    ],
    products: [
      { name: 'α-Кетоглутарат', nameEn: 'α-Ketoglutarate', formula: 'C₅H₄O₅²⁻' },
      { name: 'НАДН', nameEn: 'NADH', formula: 'C₂₁H₂₉N₇O₁₄P₂', isCo: true },
      { name: 'Диоксид углерода (CO₂)', nameEn: 'Carbon dioxide (CO₂)', formula: 'CO₂', isCo: true },
      { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      preset: 'tangent-swoop',
      path: 'M 2082 2112 C 2046 2143, 2024 2190, 2020 2190 C 2024 2190, 2046 2237, 2082 2255',
      inCofactor: 'НАД⁺',
      inCofactorEn: 'NAD⁺',
      inText: 'НАД⁺',
      inTextRu: 'НАД⁺',
      inTextEn: 'NAD⁺',
      inX: 2111,
      inY: 2098,
      outCofactor: 'НАДН',
      outCofactorEn: 'NADH',
      outText: 'НАДН + CO₂ ↑',
      outTextRu: 'НАДН + CO₂ ↑',
      outTextEn: 'NADH + CO₂ ↑',
      outX: 2135,
      outY: 2255,
      isEnergy: true,
      inItems: [{ name: 'НАД⁺', nameEn: 'NAD⁺', text: 'НАД⁺', textRu: 'НАД⁺', textEn: 'NAD⁺' }],
      outItems: [
        { name: 'НАДН', nameEn: 'NADH', text: 'НАДН', textRu: 'НАДН', textEn: 'NADH', dx: -36, isEnergy: true },
        { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', text: '+ H⁺', textRu: '+ H⁺', textEn: '+ H⁺', dx: 12 },
        { name: 'Диоксид углерода (CO₂)', nameEn: 'Carbon dioxide (CO₂)', text: '+ CO₂ ↑', textRu: '+ CO₂ ↑', textEn: '+ CO₂ ↑', dx: 64 },
      ],
    },
    activatorsRu: ['АДФ', 'Ca²⁺'],
    activatorsEn: ['ADP', 'Ca²⁺'],
    inhibitorsRu: ['АТФ', 'НАДН'],
    inhibitorsEn: ['ATP', 'NADH'],
    mechanismRu: 'Окисление гидроксильной группы изоцитрата до кетогруппы (оксалосукцинат), за которым следует необратимое декарбоксилирование с выделением первой молекулы CO₂.',
    mechanismEn: 'Oxidation of the secondary alcohol to oxalosuccinate, followed by irreversible decarboxylation yielding α-ketoglutarate and the first CO₂.',
    clinicalNoteRu: 'Главный регуляторный переключатель скорости клеточного дыхания у человека. Активируется при энергодефиците (высокий АДФ).',
    clinicalNoteEn: 'Primary rate-limiting control point of respiration. Strongly activated allosterically by ADP during energy demand.',
    energyBalanceRu: '+2 НАДН (5 АТФ) + 2 CO₂ (за 2 оборота)',
    energyBalanceEn: '+2 NADH (5 ATP) + 2 CO₂ (2 turns)',
    netAtpYieldRu: '+12 АТФ',
    netAtpYieldEn: '+12 ATP'
  },
  {
    id: 'd0000001-0000-0000-0000-000000000004',
    stepNumber: 4,
    code: 'R_KGDH',
    pathwayCode: 'PW-TCA-CYCLE',
    pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
    pathwayNameEn: 'Citric Acid Cycle (TCA)',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Окислительное декарбоксилирование α-кетоглутарата',
    nameEn: 'α-Ketoglutarate dehydrogenase',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000006', // aKG
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000007', // Succinyl-CoA
    pathData: 'M 1970 2389 A 420 420 0 0 1 1832 2540',
    tooltipX: 1892,
    tooltipY: 2456,
    enzymeRu: 'α-Кетоглутаратдегидрогеназный комплекс',
    enzymeEn: 'α-Ketoglutarate dehydrogenase complex',
    enzymeShort: 'OGDH',
    ecNumber: '1.2.4.2',
    gene: 'OGDH',
    uniprotId: 'Q02218',
    isReversible: false,
    deltaG0: '-33.5 кДж/моль',
    substrates: [
      { name: 'α-Кетоглутарат', nameEn: 'α-Ketoglutarate', formula: 'C₅H₄O₅²⁻' },
      { name: 'НАД⁺', nameEn: 'NAD⁺', formula: 'C₂₁H₂₇N₇O₁₄P₂', isCo: true },
      { name: 'Кофермент A (КоА-SH)', nameEn: 'Coenzyme A (CoA-SH)', formula: 'C₂₁H₃₆N₇O₁₆P₃S', isCo: true },
    ],
    products: [
      { name: 'Сукцинил-КоА', nameEn: 'Succinyl-CoA', formula: 'C₂₅H₃₆N₇O₁₉P₃S⁵⁻' },
      { name: 'НАДН', nameEn: 'NADH', formula: 'C₂₁H₂₉N₇O₁₄P₂', isCo: true },
      { name: 'Диоксид углерода (CO₂)', nameEn: 'Carbon dioxide (CO₂)', formula: 'CO₂', isCo: true },
      { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      preset: 'tangent-swoop',
      path: 'M 2008 2457 C 1961 2456, 1913 2476, 1910 2473 C 1913 2476, 1898 2525, 1904 2572',
      inCofactor: 'НАД⁺',
      inCofactorEn: 'NAD⁺',
      inText: 'НАД⁺ + КоА-SH',
      inTextRu: 'НАД⁺ + КоА-SH',
      inTextEn: 'NAD⁺ + CoA-SH',
      inX: 2043,
      inY: 2462,
      outCofactor: 'НАДН',
      outCofactorEn: 'NADH',
      outText: 'НАДН + CO₂ ↑',
      outTextRu: 'НАДН + CO₂ ↑',
      outTextEn: 'NADH + CO₂ ↑',
      outX: 1945,
      outY: 2595,
      isEnergy: true,
      inItems: [
        { name: 'НАД⁺', nameEn: 'NAD⁺', text: 'НАД⁺', textRu: 'НАД⁺', textEn: 'NAD⁺', dx: -34 },
        { name: 'Кофермент A (КоА-SH)', nameEn: 'Coenzyme A (CoA-SH)', text: '+ КоА-SH', textRu: '+ КоА-SH', textEn: '+ CoA-SH', dx: 30 },
      ],
      outItems: [
        { name: 'НАДН', nameEn: 'NADH', text: 'НАДН', textRu: 'НАДН', textEn: 'NADH', dx: -44, isEnergy: true },
        { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', text: '+ H⁺', textRu: '+ H⁺', textEn: '+ H⁺', dx: 6 },
        { name: 'Диоксид углерода (CO₂)', nameEn: 'Carbon dioxide (CO₂)', text: '+ CO₂ ↑', textRu: '+ CO₂ ↑', textEn: '+ CO₂ ↑', dx: 58 },
      ],
    },
    activatorsRu: ['Ca²⁺'],
    activatorsEn: ['Ca²⁺'],
    inhibitorsRu: ['Сукцинил-КоА', 'НАДН', 'АТФ'],
    inhibitorsEn: ['Succinyl-CoA', 'NADH', 'ATP'],
    mechanismRu: 'Мультиферментный комплекс (E1, E2, E3), аналогичный пируватдегидрогеназному. Требует 5 коферментов: тиаминпирофосфат (B₁), липоат, КоА (B₅), ФАД (B₂), НАД⁺ (B₃).',
    mechanismEn: 'Multi-enzyme complex (E1, E2, E3) homologous to PDH. Requires 5 coenzymes: thiamine pyrophosphate (TPP), lipoate, CoA (B₅), FAD (B₂), NAD⁺ (B₃).',
    clinicalNoteRu: 'Дефицит витамина B₁ (тиамина) при алкоголизме (синдром Вернике-Корсакова) или бери-бери блокирует эту реакцию, вызывая энергетический коллапс ЦНС.',
    clinicalNoteEn: 'Thiamine (vitamin B₁) deficiency (Wernicke-Korsakoff syndrome, beriberi) impairs complex function, precipitating neuroenergetic failure.',
    energyBalanceRu: '+2 НАДН (5 АТФ) + 2 CO₂ (за 2 оборота)',
    energyBalanceEn: '+2 NADH (5 ATP) + 2 CO₂ (2 turns)',
    netAtpYieldRu: '+17 АТФ',
    netAtpYieldEn: '+17 ATP'
  },
  {
    id: 'd0000001-0000-0000-0000-000000000005',
    stepNumber: 5,
    code: 'R_SCS',
    pathwayCode: 'PW-TCA-CYCLE',
    pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
    pathwayNameEn: 'Citric Acid Cycle (TCA)',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Субстратное фосфорилирование (Синтез ГТФ / АТФ)',
    nameEn: 'Succinate-CoA ligase (substrate-level phosphorylation)',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000007', // Succinyl-CoA
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000008', // Succinate
    pathData: 'M 1684 2602 A 420 420 0 0 1 1511 2601',
    tooltipX: 1598,
    tooltipY: 2585,
    enzymeRu: 'Сукцинил-КоА-синтетаза (Сукцинат-КоА-лигаза)',
    enzymeEn: 'Succinyl-CoA synthetase',
    enzymeShort: 'SUCLG2',
    ecNumber: '6.2.1.4',
    gene: 'SUCLG2 / SUCLA2',
    uniprotId: 'Q96I99',
    isReversible: true,
    deltaG0: '-2.9 кДж/моль',
    substrates: [
      { name: 'Сукцинил-КоА', nameEn: 'Succinyl-CoA', formula: 'C₂₅H₃₆N₇O₁₉P₃S⁵⁻' },
      { name: 'ГДФ (или АДФ)', nameEn: 'GDP (or ADP)', formula: 'C₁₀H₁₅N₅O₁₁P₂', isCo: true },
      { name: 'Неорганический фосфат (Фᵢ)', nameEn: 'Inorganic phosphate (Pᵢ)', formula: 'HPO₄²⁻', isCo: true },
    ],
    products: [
      { name: 'Сукцинат', nameEn: 'Succinate', formula: 'C₄H₄O₄²⁻' },
      { name: 'ГТФ (или АТФ)', nameEn: 'GTP (or ATP)', formula: 'C₁₀H₁₆N₅O₁₄P₃', isCo: true },
      { name: 'Кофермент A (КоА-SH)', nameEn: 'Coenzyme A (CoA-SH)', formula: 'C₂₁H₃₆N₇O₁₆P₃S', isCo: true },
    ],
    cofactorArc: {
      preset: 'lateral-loop',
      path: 'M 1675 2672 C 1644 2636, 1597 2614, 1597 2610 C 1597 2614, 1551 2635, 1519 2671',
      inCofactor: 'ГДФ',
      inCofactorEn: 'GDP',
      inText: 'ГДФ + Фᵢ',
      inTextRu: 'ГДФ + Фᵢ',
      inTextEn: 'GDP + Pᵢ',
      inX: 1715,
      inY: 2692,
      outCofactor: 'ГТФ',
      outCofactorEn: 'GTP',
      outText: 'ГТФ + КоА-SH',
      outTextRu: 'ГТФ + КоА-SH',
      outTextEn: 'GTP + CoA-SH',
      outX: 1485,
      outY: 2692,
      isGtp: true,
      inItems: [
        { name: 'ГДФ', nameEn: 'GDP', text: 'ГДФ', textRu: 'ГДФ', textEn: 'GDP', dx: -26, isGtp: true },
        { name: 'Неорганический фосфат (Фᵢ)', nameEn: 'Inorganic phosphate (Pᵢ)', text: '+ Фᵢ', textRu: '+ Фᵢ', textEn: '+ Pᵢ', dx: 26 },
      ],
      outItems: [
        { name: 'ГТФ', nameEn: 'GTP', text: 'ГТФ', textRu: 'ГТФ', textEn: 'GTP', dx: -30, isGtp: true, isEnergy: true },
        { name: 'Кофермент A (КоА-SH)', nameEn: 'Coenzyme A (CoA-SH)', text: '+ КоА-SH', textRu: '+ КоА-SH', textEn: '+ CoA-SH', dx: 32 },
      ],
    },
    mechanismRu: 'Разрыв богатой энергией тиоэфирной связи сукцинил-КоА сопряжен с фосфорилированием гуанозиндифосфата (ГДФ) до ГТФ через фосфогистидиновый интермедиат фермента.',
    mechanismEn: 'Energy from high-energy thioester bond cleavage is coupled to GDP phosphorylation into GTP via an active-site phosphohistidine intermediate.',
    clinicalNoteRu: 'Тканевая специфичность человека: в печени и почках преобладает ГТФ-специфичная изоформа (ген SUCLG2, необходима для глюконеогенеза), в сердце и мозге — АТФ-специфичная (ген SUCLA2).',
    clinicalNoteEn: 'Human tissue specificity: liver/kidney express GTP-specific isoform (SUCLG2, linked to gluconeogenesis), whereas heart/brain express ATP-specific (SUCLA2).',
    energyBalanceRu: '+2 ГТФ (2 АТФ субстратно за 2 оборота)',
    energyBalanceEn: '+2 GTP (2 ATP substrate-level per 2 turns)',
    netAtpYieldRu: '+19 АТФ',
    netAtpYieldEn: '+19 ATP'
  },
  {
    id: 'd0000001-0000-0000-0000-000000000006',
    stepNumber: 6,
    code: 'R_SDH',
    pathwayCode: 'PW-TCA-CYCLE',
    pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
    pathwayNameEn: 'Citric Acid Cycle (TCA)',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Окисление сукцината в фумарат',
    nameEn: 'Succinate dehydrogenase oxidation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000008', // Succinate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000009', // Fumarate
    pathData: 'M 1368 2540 A 420 420 0 0 1 1230 2389',
    tooltipX: 1308,
    tooltipY: 2456,
    enzymeRu: 'Сукцинатдегидрогеназа / Комплекс II',
    enzymeEn: 'Succinate dehydrogenase / Complex II',
    enzymeShort: 'SDH',
    ecNumber: '1.3.5.1',
    gene: 'SDHA-D',
    uniprotId: 'P31040',
    isReversible: true,
    deltaG0: '0.0 кДж/моль',
    substrates: [
      { name: 'Сукцинат', nameEn: 'Succinate', formula: 'C₄H₄O₄²⁻' },
      { name: 'ФАД (связанный)', nameEn: 'FAD (covalently bound)', formula: 'C₂₇H₃₃N₉O₁₅P₂', isCo: true },
    ],
    products: [
      { name: 'Фумарат', nameEn: 'Fumarate', formula: 'C₄H₂O₄²⁻' },
      { name: 'ФАДН₂ (в пул Кофермента Q₁₀)', nameEn: 'FADH₂ (into Coenzyme Q₁₀ pool)', formula: 'C₂₇H₃₅N₉O₁₅P₂', isCo: true },
    ],
    cofactorArc: {
      preset: 'tangent-swoop',
      path: 'M 1296 2572 C 1302 2525, 1287 2476, 1290 2473 C 1287 2476, 1239 2456, 1192 2457',
      inCofactor: 'ФАД',
      inCofactorEn: 'FAD',
      inText: 'ФАД',
      inTextRu: 'ФАД',
      inTextEn: 'FAD',
      inX: 1289,
      inY: 2607,
      outCofactor: 'ФАДН₂',
      outCofactorEn: 'FADH₂',
      outText: 'ФАДН₂ ➔ Q₁₀',
      outTextRu: 'ФАДН₂ ➔ Q₁₀',
      outTextEn: 'FADH₂ ➔ Q₁₀',
      outX: 1157,
      outY: 2462,
      isEnergy: true,
      inItems: [{ name: 'ФАД', nameEn: 'FAD', text: 'ФАД', textRu: 'ФАД', textEn: 'FAD', dx: 0 }],
      outItems: [
        { name: 'ФАДН₂', nameEn: 'FADH₂', text: 'ФАДН₂', textRu: 'ФАДН₂', textEn: 'FADH₂', dx: -34, isEnergy: true },
        { name: 'Кофермент Q₁₀ (Убихинон)', nameEn: 'Coenzyme Q₁₀ (Ubiquinone)', text: '➔ Q₁₀', textRu: '➔ Q₁₀', textEn: '➔ Q₁₀', dx: 34 },
      ],
    },
    inhibitorsRu: ['Малонат (конкурентный)', 'Оксалоацетат'],
    inhibitorsEn: ['Malonate (competitive inhibitor)', 'Oxaloacetate'],
    mechanismRu: 'Стереоспецифическое транс-дегидрирование сукцината. Единственный фермент цикла, встроенный во внутреннюю мембрану митохондрий и напрямую передающий электроны в убихинон (Кофермент Q₁₀).',
    mechanismEn: 'Stereospecific trans-dehydrogenation of succinate. Sole cycle enzyme embedded in the inner mitochondrial membrane, transferring electrons directly to ubiquinone (CoQ₁₀).',
    clinicalNoteRu: 'Генетические мутации в субъединицах SDH человека приводят к параганглиомам и феохромоцитомам (накопление сукцината стабилизирует онкогенный фактор HIF-1α).',
    clinicalNoteEn: 'SDH subunit germline mutations cause paragangliomas and pheochromocytomas (succinate accumulation inhibits prolyl hydroxylases and stabilizes HIF-1α).',
    energyBalanceRu: '+2 ФАДH₂ (3 АТФ через комплекс II)',
    energyBalanceEn: '+2 FADH₂ (3 ATP via complex II)',
    netAtpYieldRu: '+22 АТФ',
    netAtpYieldEn: '+22 ATP'
  },
  {
    id: 'd0000001-0000-0000-0000-000000000007',
    stepNumber: 7,
    code: 'R_FUM',
    pathwayCode: 'PW-TCA-CYCLE',
    pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
    pathwayNameEn: 'Citric Acid Cycle (TCA)',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Гидратация фумарата в L-малат',
    nameEn: 'Fumarate hydratase trans-hydration',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000009', // Fumarate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000010', // Malate
    pathData: 'M 1198 2313 A 420 420 0 0 1 1198 2067',
    tooltipX: 1205,
    tooltipY: 2190,
    enzymeRu: 'Фумараза (митохондриальная фумаратгидратаза)',
    enzymeEn: 'Fumarate hydratase',
    enzymeShort: 'FH',
    ecNumber: '4.2.1.2',
    gene: 'FH',
    uniprotId: 'P07954',
    isReversible: true,
    deltaG0: '-3.8 кДж/моль',
    substrates: [
      { name: 'Фумарат', nameEn: 'Fumarate', formula: 'C₄H₂O₄²⁻' },
      { name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', formula: 'H₂O', isCo: true },
    ],
    products: [
      { name: 'L-Малат', nameEn: 'L-Malate', formula: 'C₄H₄O₅²⁻' },
    ],
    cofactorArc: {
      preset: 'through-cross',
      path: 'M 1105 2190 C 1135 2190, 1160 2190, 1180 2190',
      inCofactor: 'Вода (H₂O)',
      inCofactorEn: 'Water (H₂O)',
      inText: '+ H₂O',
      inTextRu: '+ H₂O',
      inTextEn: '+ H₂O',
      inX: 1070,
      inY: 2190,
      isEnergy: false,
      inItems: [{ name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', text: '+ H₂O', textRu: '+ H₂O', textEn: '+ H₂O', dx: 0 }],
    },
    mechanismRu: 'Стереоспецифическое транс-присоединение молекулы воды по двойной углерод-углеродной связи фумарата с образованием исключительно L-изомера яблочной кислоты.',
    mechanismEn: 'Stereospecific trans-addition of water across the carbon-carbon double bond of fumarate, yielding solely L-malate.',
    clinicalNoteRu: 'Классический опухолевый супрессор человека. Герминальные мутации гена FH вызывают наследственный лейомиоматоз и почечно-клеточный рак (синдром HLRCC).',
    clinicalNoteEn: 'Tumor suppressor; germline mutations in FH cause hereditary leiomyomatosis and renal cell cancer (HLRCC syndrome).',
    energyBalanceRu: '0 АТФ (гидратация)',
    energyBalanceEn: '0 ATP (hydration)',
    netAtpYieldRu: '+22 АТФ',
    netAtpYieldEn: '+22 ATP'
  },
  {
    id: 'd0000001-0000-0000-0000-000000000008',
    stepNumber: 8,
    code: 'R_MDH',
    pathwayCode: 'PW-TCA-CYCLE',
    pathwayNameRu: 'Цикл трикарбоновых кислот (ЦТК)',
    pathwayNameEn: 'Citric Acid Cycle (TCA)',
    compartmentRu: 'Матрикс митохондрий',
    compartmentEn: 'Mitochondrial Matrix',
    nameRu: 'Окисление L-малата в оксалоацетат',
    nameEn: 'Malate dehydrogenase oxidation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000010', // Malate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000003', // OAA
    pathData: 'M 1230 1991 A 420 420 0 0 1 1368 1840',
    tooltipX: 1308,
    tooltipY: 1924,
    enzymeRu: 'Малатдегидрогеназа 2 (митохондриальная)',
    enzymeEn: 'Malate dehydrogenase 2',
    enzymeShort: 'MDH2',
    ecNumber: '1.1.1.37',
    gene: 'MDH2',
    uniprotId: 'P40926',
    isReversible: true,
    deltaG0: '+29.7 кДж/моль',
    substrates: [
      { name: 'L-Малат', nameEn: 'L-Malate', formula: 'C₄H₄O₅²⁻' },
      { name: 'НАД⁺', nameEn: 'NAD⁺', formula: 'C₂₁H₂₇N₇O₁₄P₂', isCo: true },
    ],
    products: [
      { name: 'Оксалоацетат', nameEn: 'Oxaloacetate', formula: 'C₄H₂O₅²⁻' },
      { name: 'НАДН', nameEn: 'NADH', formula: 'C₂₁H₂₉N₇O₁₄P₂', isCo: true },
      { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      preset: 'perpendicular-dip',
      path: 'M 1192 1923 C 1239 1924, 1287 1904, 1290 1907 C 1287 1904, 1302 1855, 1296 1808',
      inCofactor: 'НАД⁺',
      inCofactorEn: 'NAD⁺',
      inText: 'НАД⁺',
      inTextRu: 'НАД⁺',
      inTextEn: 'NAD⁺',
      inX: 1157,
      inY: 1918,
      outCofactor: 'НАДН',
      outCofactorEn: 'NADH',
      outText: 'НАДН + H⁺',
      outTextRu: 'НАДН + H⁺',
      outTextEn: 'NADH + H⁺',
      outX: 1255,
      outY: 1785,
      isEnergy: true,
      inItems: [{ name: 'НАД⁺', nameEn: 'NAD⁺', text: 'НАД⁺', textRu: 'НАД⁺', textEn: 'NAD⁺', dx: 0 }],
      outItems: [
        { name: 'НАДН', nameEn: 'NADH', text: 'НАДН', textRu: 'НАДН', textEn: 'NADH', dx: -28, isEnergy: true },
        { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', text: '+ H⁺', textRu: '+ H⁺', textEn: '+ H⁺', dx: 28 },
      ],
    },
    inhibitorsRu: ['Высокие концентрации оксалоацетата'],
    inhibitorsEn: ['High concentrations of oxaloacetate'],
    mechanismRu: 'Окисление вторичной спиртовой группы малата до кетогруппы с регенерацией оксалоацетата и образованием третьей молекулы НАДН цикла.',
    mechanismEn: 'Reversible oxidation of L-malate secondary hydroxyl group to regenerate oxaloacetate and produce the third NADH of the cycle.',
    clinicalNoteRu: 'Термодинамически неблагоприятная реакция (ΔG°\' = +29.7 кДж/моль), сдвигаемая вправо постоянным и быстрым расходом оксалоацетата цитратсинтазой.',
    clinicalNoteEn: 'Thermodynamically endergonic (ΔG°\' = +29.7 kJ/mol), driven forward in vivo by rapid removal of oxaloacetate by citrate synthase.',
    energyBalanceRu: '+2 НАДН (5 АТФ через комплекс I)',
    energyBalanceEn: '+2 NADH (5 ATP via complex I)',
    netAtpYieldRu: '+30...32 АТФ (полное сгорание глюкозы)',
    netAtpYieldEn: '+30...32 ATP (full glucose oxidation)'
  },
];

export const HUMAN_CROSSROADS: MetabolicCrossroad[] = [
  {
    id: 'cr-galactose-in',
    nameRu: 'Лактоза пищи ➔ Галактоза',
    nameEn: 'Dietary Lactose ➔ Galactose',
    pathwayCode: 'PW-GALACTOSE',
    pathwayNameRu: 'Путь Лелуара',
    pathwayNameEn: 'Leloir Pathway',
    compartmentRu: 'Цитозоль',
    compartmentEn: 'Cytosol',
    direction: 'in',
    startX: 780,
    startY: -360,
    endX: 780,
    endY: -278,
    textX: 665,
    textY: -372,
  },
  {
    id: 'cr-glycogen-out',
    nameRu: 'Выход: УДФ-Глю ➔ Гликоген',
    nameEn: 'Exit: UDP-Glc ➔ Glycogen',
    pathwayCode: 'PW-GALACTOSE',
    pathwayNameRu: 'Синтез гликогена',
    pathwayNameEn: 'Glycogenesis',
    compartmentRu: 'Цитозоль',
    compartmentEn: 'Cytosol',
    direction: 'out',
    startX: 1252,
    startY: -274,
    endX: 1252,
    endY: -355,
    textX: 1150,
    textY: -372,
  },
  {
    id: 'cr-fructose-in',
    nameRu: 'Сахароза / диета ➔ Фруктоза',
    nameEn: 'Dietary Sucrose ➔ Fructose',
    pathwayCode: 'PW-FRUCTOSE',
    pathwayNameRu: 'Фруктолиз',
    pathwayNameEn: 'Fructolysis',
    compartmentRu: 'Цитозоль',
    compartmentEn: 'Cytosol',
    direction: 'in',
    startX: 2450,
    startY: 83,
    endX: 2324,
    endY: 83,
    textX: 2335,
    textY: 66,
  },
  {
    id: 'cr-g6pc-out',
    nameRu: 'Печень (G6PC1) ➔ D-Глюкоза',
    nameEn: 'Liver (G6PC1) ➔ Blood Glucose',
    pathwayCode: 'PW-GLYCOLISIS',
    pathwayNameRu: 'Печёночный синтез глюкозы',
    pathwayNameEn: 'Hepatic Glucose Release',
    compartmentRu: 'Цитозоль',
    compartmentEn: 'Cytosol',
    direction: 'out',
    startX: 1680,
    startY: -90,
    endX: 1805,
    endY: -175,
    textX: 1755,
    textY: -192,
  },
  {
    id: 'cr-pdh-in',
    nameRu: 'Гликолиз ➔ Пируват ➔ ПДХ (3C ➔ 2C)',
    nameEn: 'Glycolysis ➔ Pyruvate ➔ PDH (3C ➔ 2C)',
    direction: 'in',
    startX: 1920,
    startY: 1393,
    endX: 1684,
    endY: 1393,
    textX: 1705,
    textY: 1380,
  },
  {
    id: 'cr-cit-out',
    nameRu: 'Выход: Цитратный челнок ➔ Синтез липидов',
    nameEn: 'Exit: Citrate shuttle ➔ Lipid synthesis',
    direction: 'out',
    startX: 1775,
    startY: 1766,
    endX: 1960,
    endY: 1690,
    textX: 1860,
    textY: 1675,
  },
  {
    id: 'cr-akg-cross',
    nameRu: 'Обмен аминокислот ⇋ Глутамат',
    nameEn: 'Amino acid exchange ⇋ Glutamate',
    direction: 'out',
    startX: 2065,
    startY: 2351,
    endX: 2235,
    endY: 2351,
    textX: 2075,
    textY: 2338,
  },
  {
    id: 'cr-heme-out',
    nameRu: 'Синтез гема (порфиринов / Hb)',
    nameEn: 'Heme synthesis (porphyrins / Hb)',
    direction: 'out',
    startX: 1761,
    startY: 2614,
    endX: 1785,
    endY: 2740,
    textX: 1795,
    textY: 2745,
  },
  {
    id: 'cr-gng-out',
    nameRu: 'Выход: ОАО ➔ Глюконеогенез (PEPCK-M)',
    nameEn: 'Exit: OAA ➔ Gluconeogenesis (PEPCK-M)',
    direction: 'out',
    startX: 1410,
    startY: 1766,
    endX: 1270,
    endY: 1700,
    textX: 1055,
    textY: 1686,
  },
];

export const SECTOR_LAYOUT_CONFIGS: SectorLayoutConfig[] = [
  {
    sectorId: 'PW-GLYCOLISIS',
    nameRu: 'Углеводный сектор (Гликолиз / ПДХ)',
    nameEn: 'Carbohydrate Sector (Glycolysis / PDH)',
    categoryRu: 'Углеводный обмен',
    categoryEn: 'Carbohydrate Metabolism',
    centerAngleRad: -Math.PI / 2, // -90 deg (North / 12:00)
    radiusMin: 350,
    radiusMax: 1400,
    themeColor: '#F59E0B',
    gradientColors: ['rgba(245, 158, 11, 0.14)', 'rgba(245, 158, 11, 0.01)'],
    centerX: 1600,
    centerY: 460,
    boundingPoly: [{ x: 560, y: -365 }, { x: 2560, y: -365 }, { x: 2560, y: 1255 }, { x: 560, y: 1255 }],
    descriptionRu: 'Расщепление глюкозы, галактозы (путь Лелуара) и фруктозы (фруктолиз) до пирувата с последующим окислением в ПДХ прямо в Ацетил-КоА.',
    descriptionEn: 'Oxidation of glucose, galactose (Leloir pathway), and fructose (fructolysis) to pyruvate with PDH complex feeding straight into Acetyl-CoA.',
    connectedHubCode: 'MET_ACETYL_COA',
    targetPathwayId: 'PW-GLYCOLISIS'
  },
  {
    sectorId: 'PW-BETA-OXIDATION',
    nameRu: 'Липидный сектор (β-Окисление / Липиды)',
    nameEn: 'Lipid Sector (β-Oxidation / Lipids)',
    categoryRu: 'Липидный обмен',
    categoryEn: 'Lipid Metabolism',
    centerAngleRad: Math.PI, // 180 deg (West / 9:00)
    radiusMin: 350,
    radiusMax: 1400,
    themeColor: '#8B5CF6',
    gradientColors: ['rgba(139, 92, 246, 0.14)', 'rgba(139, 92, 246, 0.01)'],
    centerX: 525,
    centerY: 1750,
    boundingPoly: [{ x: 150, y: 1300 }, { x: 900, y: 1300 }, { x: 900, y: 2250 }, { x: 150, y: 2250 }],
    descriptionRu: 'Катаболизм жирных кислот (β-окисление), генерация ацетил-КоА, кетогенез и цитозольный липогенез через цитратный челнок.',
    descriptionEn: 'Fatty acid breakdown via beta-oxidation, acetyl-CoA yield, ketogenesis and fatty acid synthesis via citrate shuttle.',
    connectedHubCode: 'MET_ACETYL_COA',
    targetPathwayId: 'PW-BETA-OXIDATION'
  },
  {
    sectorId: 'PW-TCA-CYCLE',
    nameRu: 'Цикл трикарбоновых кислот (ЦТК / Кребс)',
    nameEn: 'Citric Acid Cycle (TCA / Krebs Cycle)',
    categoryRu: 'Энергетический цикл',
    categoryEn: 'Energy Cycle',
    centerAngleRad: 0,
    radiusMin: 0,
    radiusMax: 650,
    themeColor: '#10B981',
    gradientColors: ['rgba(16, 185, 129, 0.14)', 'rgba(16, 185, 129, 0.01)'],
    centerX: 1600,
    centerY: 2190,
    boundingPoly: [{ x: 950, y: 1680 }, { x: 2250, y: 1680 }, { x: 2250, y: 2745 }, { x: 950, y: 2745 }],
    descriptionRu: 'Центральный окислительный 8-стадийный цикл клетки в матриксе митохондрий, поставляющий НАДН и ФАДН₂ для АТФ-синтазы.',
    descriptionEn: 'Central 8-step catalytic mitochondrial matrix engine generating reducing equivalents NADH & FADH₂.',
    connectedHubCode: 'MET_ACETYL_COA',
    targetPathwayId: 'PW-TCA-CYCLE'
  },
  {
    sectorId: 'PW-UREA-CYCLE',
    nameRu: 'Белковый сектор (Аминокислоты / Мочевина)',
    nameEn: 'Amino Acid Sector (Amino Acids / Urea)',
    categoryRu: 'Аминокислотный обмен',
    categoryEn: 'Amino Acid Metabolism',
    centerAngleRad: 0, // 0 deg (East / 3:00)
    radiusMin: 350,
    radiusMax: 1400,
    themeColor: '#E11D48',
    gradientColors: ['rgba(225, 29, 72, 0.14)', 'rgba(225, 29, 72, 0.01)'],
    centerX: 2675,
    centerY: 1750,
    boundingPoly: [{ x: 2300, y: 1300 }, { x: 3050, y: 1300 }, { x: 3050, y: 2250 }, { x: 2300, y: 2250 }],
    descriptionRu: 'Катаболизм аминокислот, трансаминирование (АлАТ, АсАТ) и орнитиновый цикл мочевины с фумаратным шунтом к ЦТК.',
    descriptionEn: 'Amino acid transamination, nitrogen disposal via urea cycle, and Krebs bicycle linking through fumarate.',
    connectedHubCode: 'MET_AKG',
    targetPathwayId: 'PW-UREA-CYCLE'
  },
  {
    sectorId: 'PW-OXPHOS',
    nameRu: 'Дыхательная цепь (OxPhos / АТФ)',
    nameEn: 'Oxidative Phosphorylation (OxPhos / ATP)',
    categoryRu: 'Биоэнергетика',
    categoryEn: 'Bioenergetics',
    centerAngleRad: Math.PI / 2, // 90 deg (South / 6:00)
    radiusMin: 350,
    radiusMax: 1400,
    themeColor: '#0EA5E9',
    gradientColors: ['rgba(14, 165, 233, 0.14)', 'rgba(14, 165, 233, 0.01)'],
    centerX: 1600,
    centerY: 2980,
    boundingPoly: [{ x: 950, y: 2780 }, { x: 2250, y: 2780 }, { x: 2250, y: 3220 }, { x: 950, y: 3220 }],
    descriptionRu: 'Электронно-транспортная цепь (Комплексы I-IV) и АТФ-синтаза (Комплекс V) на кристах митохондрий (28-32 АТФ на глюкозу).',
    descriptionEn: 'Mitochondrial cristae electron transport chain complexes I-IV and ATP synthase driving aerobic phosphorylation.',
    connectedHubCode: 'MET_SUCCINATE',
    targetPathwayId: 'PW-OXPHOS'
  }
];

export const PATHWAY_SUPER_HIGHWAYS: PathwaySuperHighway[] = [
  {
    id: 'hw-gly-pdh',
    sourcePathwayId: 'PW-GLYCOLISIS',
    targetPathwayId: 'ALL',
    sourceMetaboliteCode: 'MET_PYRUVATE',
    targetMetaboliteCode: 'MET_ACETYL_COA',
    nameRu: 'ПДХ Комплекс (Пируват ➔ Ацетил-КоА)',
    nameEn: 'PDH Complex (Pyruvate ➔ Acetyl-CoA)',
    pathData: 'M 1600 1203 L 1600 1560',
    carbonFlux: '3C ➔ 2C + CO₂',
    isAnabolic: false,
    isCatabolic: true,
    themeColor: '#F59E0B'
  },
  {
    id: 'hw-fao-hub',
    sourcePathwayId: 'PW-BETA-OXIDATION',
    targetPathwayId: 'ALL',
    sourceMetaboliteCode: 'MET_PALMITATE',
    targetMetaboliteCode: 'MET_ACETYL_COA',
    nameRu: 'β-Окисление жирных кислот ➔ Ацетил-КоА',
    nameEn: 'β-Oxidation of fatty acids ➔ Acetyl-CoA',
    pathData: 'M 900 1600 L 1520 1600',
    carbonFlux: '16C ➔ 8 × 2C',
    isAnabolic: false,
    isCatabolic: true,
    themeColor: '#8B5CF6'
  },
  {
    id: 'hw-hub-tca',
    sourcePathwayId: 'ALL',
    targetPathwayId: 'PW-TCA-CYCLE',
    sourceMetaboliteCode: 'MET_ACETYL_COA',
    targetMetaboliteCode: 'MET_CITRATE',
    nameRu: 'Вход в ЦТК: Цитратсинтаза (Стадия 1)',
    nameEn: 'Entry to TCA: Citrate synthase (Step 1)',
    pathData: 'M 1600 1634 L 1600 1770',
    carbonFlux: '2C + 4C ➔ 6C',
    isAnabolic: false,
    isCatabolic: true,
    themeColor: '#10B981'
  },
  {
    id: 'hw-citrate-shuttle',
    sourcePathwayId: 'PW-TCA-CYCLE',
    targetPathwayId: 'PW-BETA-OXIDATION',
    sourceMetaboliteCode: 'MET_CITRATE',
    targetMetaboliteCode: 'MET_CYT_ACETYL_COA',
    nameRu: 'Цитратный челнок ➔ Цитозольный липогенез',
    nameEn: 'Citrate shuttle ➔ Cytosolic lipogenesis',
    pathData: 'M 1720 1772 C 1450 1720, 1180 1720, 900 1760',
    carbonFlux: '6C (Цитрат) ➔ 2C',
    isAnabolic: true,
    isCatabolic: false,
    themeColor: '#8B5CF6'
  },
  {
    id: 'hw-amino-acetyl',
    sourcePathwayId: 'PW-UREA-CYCLE',
    targetPathwayId: 'ALL',
    sourceMetaboliteCode: 'MET_LEU_LYS',
    targetMetaboliteCode: 'MET_ACETYL_COA',
    nameRu: 'Кетогенные аминокислоты (Leu, Lys) ➔ Ацетил-КоА',
    nameEn: 'Ketogenic amino acids (Leu, Lys) ➔ Acetyl-CoA',
    pathData: 'M 2300 1600 L 1675 1600',
    carbonFlux: 'АК ➔ 2C',
    isAnabolic: false,
    isCatabolic: true,
    themeColor: '#E11D48'
  },
  {
    id: 'hw-amino-akg',
    sourcePathwayId: 'PW-UREA-CYCLE',
    targetPathwayId: 'PW-TCA-CYCLE',
    sourceMetaboliteCode: 'MET_GLU',
    targetMetaboliteCode: 'MET_AKG',
    nameRu: 'Трансаминирование АК ⇋ α-Кетоглутарат',
    nameEn: 'AA transamination ⇋ α-Ketoglutarate',
    pathData: 'M 2300 2250 C 2180 2320, 2120 2345, 2063 2351',
    carbonFlux: '5C',
    isAnabolic: false,
    isCatabolic: true,
    themeColor: '#E11D48'
  },
  {
    id: 'hw-urea-fumarate',
    sourcePathwayId: 'PW-UREA-CYCLE',
    targetPathwayId: 'PW-TCA-CYCLE',
    sourceMetaboliteCode: 'MET_ARGININOSUCCINATE',
    targetMetaboliteCode: 'MET_FUMARATE',
    nameRu: 'Шунт цикла мочевины (ASL) ➔ Фумарат',
    nameEn: 'Urea cycle shunt (ASL) ➔ Fumarate',
    pathData: 'M 2300 2050 C 1850 2220, 1500 2320, 1282 2351',
    carbonFlux: '4C',
    isAnabolic: false,
    isCatabolic: true,
    themeColor: '#E11D48'
  },
  {
    id: 'hw-tca-oxphos',
    sourcePathwayId: 'PW-TCA-CYCLE',
    targetPathwayId: 'PW-OXPHOS',
    sourceMetaboliteCode: 'MET_SUCCINATE',
    targetMetaboliteCode: 'MET_ETC_COMPLEX_II',
    nameRu: 'ЦТК ➔ OxPhos (СДГ / Комплекс II & НАДН)',
    nameEn: 'TCA ➔ OxPhos (SDH / Complex II & NADH)',
    pathData: 'M 1439 2614 C 1439 2700, 1550 2740, 1600 2820',
    carbonFlux: 'ФАДН₂ / НАДН ➔ 30-32 АТФ',
    isAnabolic: false,
    isCatabolic: true,
    themeColor: '#0EA5E9'
  }
];
