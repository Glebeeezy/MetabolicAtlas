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
  sourceMetaboliteId: string;
  targetMetaboliteId: string;
  secondarySourceId?: string;
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
  clinicalNoteRu?: string;
  clinicalNoteEn?: string;
}

export interface MetabolicCrossroad {
  id: string;
  nameRu: string;
  nameEn: string;
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
    id: 'b0000001-0000-0000-0000-000000000003',
    code: 'MET_OAA',
    nameRu: 'Оксалоацетат',
    nameEn: 'Oxaloacetate',
    abbrevRu: 'ОАО',
    abbrevEn: 'OAA',
    formula: 'C₄H₂O₅²⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 1270,
    y: 1670,
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
    nameRu: 'Цитрат',
    nameEn: 'Citrate',
    abbrevRu: 'ЦИТ',
    abbrevEn: 'CIT',
    formula: 'C₆H₅O₇³⁻',
    carbons: '6C',
    carbonsEn: '6C',
    x: 1720,
    y: 1770,
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
    nameRu: 'Изоцитрат',
    nameEn: 'Isocitrate',
    abbrevRu: 'ИЗО',
    abbrevEn: 'ICT',
    formula: 'C₆H₅O₇³⁻',
    carbons: '6C',
    carbonsEn: '6C',
    x: 1830,
    y: 2040,
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
    nameRu: 'α-Кетоглутарат',
    nameEn: 'α-Ketoglutarate',
    abbrevRu: 'α-КГ',
    abbrevEn: 'α-KG',
    formula: 'C₅H₄O₅²⁻',
    carbons: '5C',
    carbonsEn: '5C',
    x: 1680,
    y: 2320,
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
    x: 1320,
    y: 2430,
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
    nameRu: 'Сукцинат',
    nameEn: 'Succinate',
    abbrevRu: 'СУК',
    abbrevEn: 'SUC',
    formula: 'C₄H₄O₄²⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 970,
    y: 2320,
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
    nameRu: 'Фумарат',
    nameEn: 'Fumarate',
    abbrevRu: 'ФУМ',
    abbrevEn: 'FUM',
    formula: 'C₄H₂O₄²⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 830,
    y: 2040,
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
    nameRu: 'L-Малат',
    nameEn: 'L-Malate',
    abbrevRu: 'МАЛ',
    abbrevEn: 'MAL',
    formula: 'C₄H₄O₅²⁻',
    carbons: '4C',
    carbonsEn: '4C',
    x: 950,
    y: 1760,
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
    nameRu: 'Углекислый газ (CO₂)',
    nameEn: 'Carbon dioxide',
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
    synonymsRu: ['Диоксид углерода', 'Углекислый газ', 'CO₂'],
    synonymsEn: ['Carbon dioxide', 'CO₂', 'Carbonic anhydride'],
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
    id: 'd0000001-0000-0000-0000-000000000001',
    stepNumber: 1,
    code: 'R_CS',
    nameRu: 'Конденсация оксалоацетата и ацетил-КоА',
    nameEn: 'Citrate synthase condensation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000003', // OAA
    secondarySourceId: 'b0000001-0000-0000-0000-000000000002', // Acetyl-CoA
    secondaryPathData: 'M 1595 1634 L 1595 1718',
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000004', // Citrate
    pathData: 'M 1420 1706 C 1510 1715, 1620 1740, 1720 1790',
    tooltipX: 1595,
    tooltipY: 1745,
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
      path: 'M 1655 1690 C 1640 1715, 1626 1740, 1622 1749 C 1628 1752, 1675 1750, 1715 1720',
      inCofactor: 'Вода (H₂O)',
      inCofactorEn: 'Water (H₂O)',
      inText: '+ H₂O',
      inTextRu: '+ H₂O',
      inTextEn: '+ H₂O',
      inX: 1655,
      inY: 1672,
      inAnchor: 'middle',
      outCofactor: 'Кофермент A (КоА-SH)',
      outCofactorEn: 'Coenzyme A (CoA-SH)',
      outText: 'КоА-SH',
      outTextRu: 'КоА-SH',
      outTextEn: 'CoA-SH',
      outX: 1735,
      outY: 1705,
      inItems: [{ name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', text: '+ H₂O', textRu: '+ H₂O', textEn: '+ H₂O' }],
      outItems: [{ name: 'Кофермент A (КоА-SH)', nameEn: 'Coenzyme A (CoA-SH)', text: 'КоА-SH', textRu: 'КоА-SH', textEn: 'CoA-SH' }],
    },
    inhibitorsRu: ['АТФ', 'НАДН', 'Сукцинил-КоА', 'Цитрат'],
    inhibitorsEn: ['ATP', 'NADH', 'Succinyl-CoA', 'Citrate'],
    mechanismRu: 'Конденсация метильной группы ацетил-КоА с карбонильным углеродом оксалоацетата с образованием цитрил-КоА, гидролиз которого высвобождает энергию тиоэфирной связи.',
    mechanismEn: 'Condensation of acetyl-CoA methyl carbon with oxaloacetate carbonyl carbon to form citryl-CoA, followed by thioester hydrolysis driving the reaction forward.',
    clinicalNoteRu: 'Начальная стадия цикла; сильно экзергоническая реакция, делающая процесс необратимым in vivo.',
    clinicalNoteEn: 'Initial committed step; strongly exergonic reaction driving cycle unidirectionality in vivo.',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000002',
    stepNumber: 2,
    code: 'R_ACO',
    nameRu: 'Изомеризация цитрата в изоцитрат',
    nameEn: 'Aconitate hydratase isomerization',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000004', // Citrate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000005', // Isocitrate
    pathData: 'M 1790 1842 C 1820 1900, 1860 1970, 1900 2040',
    tooltipX: 1850,
    tooltipY: 1940,
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
      path: 'M 1910 1880 C 1875 1900, 1848 1925, 1841 1937 C 1848 1949, 1875 1975, 1910 1995',
      inCofactor: 'Вода (H₂O)',
      inCofactorEn: 'Water (H₂O)',
      inText: '− H₂O',
      inTextRu: '− H₂O',
      inTextEn: '− H₂O',
      inX: 1930,
      inY: 1875,
      outCofactor: 'Вода (H₂O)',
      outCofactorEn: 'Water (H₂O)',
      outText: '+ H₂O',
      outTextRu: '+ H₂O',
      outTextEn: '+ H₂O',
      outX: 1930,
      outY: 2000,
      inItems: [{ name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', text: '− H₂O', textRu: '− H₂O', textEn: '− H₂O' }],
      outItems: [{ name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', text: '+ H₂O', textRu: '+ H₂O', textEn: '+ H₂O' }],
    },
    mechanismRu: 'Стереоспецифическая дегидратация цитрата до промежуточного цис-аконитата, за которой следует гидратация с образованием изоцитрата при участии железосерного кластера [4Fe-4S].',
    mechanismEn: 'Stereospecific dehydration of citrate to cis-aconitate intermediate, followed by rehydration to isocitrate coordinated by a [4Fe-4S] iron-sulfur cluster.',
    clinicalNoteRu: 'Ингибируется фторацетатом (образующим фторцитрат — токсический яд).',
    clinicalNoteEn: 'Inhibited by fluoroacetate (which is converted into fluorocitrate, a potent suicide inhibitor).',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000003',
    stepNumber: 3,
    code: 'R_IDH',
    nameRu: 'Окислительное декарбоксилирование изоцитрата',
    nameEn: 'Isocitrate oxidative decarboxylation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000005', // Isocitrate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000006', // aKG
    pathData: 'M 1880 2112 C 1860 2200, 1830 2260, 1790 2320',
    tooltipX: 1850,
    tooltipY: 2210,
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
      { name: 'Углекислый газ (CO₂ ↑)', nameEn: 'Carbon dioxide (CO₂ ↑)', formula: 'CO₂', isCo: true },
      { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      preset: 'tangent-swoop',
      path: 'M 1915 2140 C 1875 2165, 1852 2200, 1846 2220 C 1852 2240, 1875 2260, 1900 2275',
      inCofactor: 'НАД⁺',
      inCofactorEn: 'NAD⁺',
      inText: 'НАД⁺',
      inTextRu: 'НАД⁺',
      inTextEn: 'NAD⁺',
      inX: 1925,
      inY: 2125,
      outCofactor: 'НАДН',
      outCofactorEn: 'NADH',
      outText: 'НАДН + CO₂ ↑',
      outTextRu: 'НАДН + CO₂ ↑',
      outTextEn: 'NADH + CO₂ ↑',
      outX: 1920,
      outY: 2285,
      isEnergy: true,
      inItems: [{ name: 'НАД⁺', nameEn: 'NAD⁺', text: 'НАД⁺', textRu: 'НАД⁺', textEn: 'NAD⁺' }],
      outItems: [
        { name: 'НАДН', nameEn: 'NADH', text: 'НАДН', textRu: 'НАДН', textEn: 'NADH', dx: -45, isEnergy: true },
        { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', text: '+ H⁺', textRu: '+ H⁺', textEn: '+ H⁺', dx: 0 },
        { name: 'Углекислый газ (CO₂)', nameEn: 'Carbon dioxide (CO₂)', text: '+ CO₂ ↑', textRu: '+ CO₂ ↑', textEn: '+ CO₂ ↑', dx: 52 },
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
  },
  {
    id: 'd0000001-0000-0000-0000-000000000004',
    stepNumber: 4,
    code: 'R_KGDH',
    nameRu: 'Окислительное декарбоксилирование α-кетоглутарата',
    nameEn: 'α-Ketoglutarate dehydrogenase',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000006', // aKG
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000007', // Succinyl-CoA
    pathData: 'M 1710 2392 C 1640 2450, 1560 2466, 1470 2466',
    tooltipX: 1570,
    tooltipY: 2440,
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
      { name: 'Углекислый газ (CO₂ ↑)', nameEn: 'Carbon dioxide (CO₂ ↑)', formula: 'CO₂', isCo: true },
      { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', formula: 'H⁺', isCo: true },
    ],
    cofactorArc: {
      preset: 'tangent-swoop',
      path: 'M 1665 2475 C 1635 2455, 1610 2451, 1598 2451 C 1585 2451, 1560 2465, 1530 2495',
      inCofactor: 'НАД⁺',
      inCofactorEn: 'NAD⁺',
      inText: 'НАД⁺ + КоА-SH',
      inTextRu: 'НАД⁺ + КоА-SH',
      inTextEn: 'NAD⁺ + CoA-SH',
      inX: 1670,
      inY: 2485,
      outCofactor: 'НАДН',
      outCofactorEn: 'NADH',
      outText: 'НАДН + CO₂ ↑',
      outTextRu: 'НАДН + CO₂ ↑',
      outTextEn: 'NADH + CO₂ ↑',
      outX: 1520,
      outY: 2515,
      isEnergy: true,
      inItems: [
        { name: 'НАД⁺', nameEn: 'NAD⁺', text: 'НАД⁺', textRu: 'НАД⁺', textEn: 'NAD⁺', dx: -34 },
        { name: 'Кофермент A (КоА-SH)', nameEn: 'Coenzyme A (CoA-SH)', text: '+ КоА-SH', textRu: '+ КоА-SH', textEn: '+ CoA-SH', dx: 30 },
      ],
      outItems: [
        { name: 'НАДН', nameEn: 'NADH', text: 'НАДН', textRu: 'НАДН', textEn: 'NADH', dx: -48, isEnergy: true },
        { name: 'Протон (H⁺)', nameEn: 'Proton (H⁺)', text: '+ H⁺', textRu: '+ H⁺', textEn: '+ H⁺', dx: 2 },
        { name: 'Углекислый газ (CO₂)', nameEn: 'Carbon dioxide (CO₂)', text: '+ CO₂ ↑', textRu: '+ CO₂ ↑', textEn: '+ CO₂ ↑', dx: 54 },
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
  },
  {
    id: 'd0000001-0000-0000-0000-000000000005',
    stepNumber: 5,
    code: 'R_SCS',
    nameRu: 'Субстратное фосфорилирование (Синтез ГТФ / АТФ)',
    nameEn: 'Succinate-CoA ligase (substrate-level phosphorylation)',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000007', // Succinyl-CoA
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000008', // Succinate
    pathData: 'M 1320 2466 C 1210 2466, 1110 2450, 1040 2392',
    tooltipX: 1170,
    tooltipY: 2440,
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
      path: 'M 1240 2495 C 1215 2465, 1185 2451, 1165 2451 C 1145 2451, 1120 2465, 1095 2490',
      inCofactor: 'ГДФ',
      inCofactorEn: 'GDP',
      inText: 'ГДФ + Фᵢ',
      inTextRu: 'ГДФ + Фᵢ',
      inTextEn: 'GDP + Pᵢ',
      inX: 1240,
      inY: 2515,
      outCofactor: 'ГТФ',
      outCofactorEn: 'GTP',
      outText: 'ГТФ + КоА-SH',
      outTextRu: 'ГТФ + КоА-SH',
      outTextEn: 'GTP + CoA-SH',
      outX: 1095,
      outY: 2510,
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
  },
  {
    id: 'd0000001-0000-0000-0000-000000000006',
    stepNumber: 6,
    code: 'R_SDH',
    nameRu: 'Окисление сукцината в фумарат',
    nameEn: 'Succinate dehydrogenase oxidation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000008', // Succinate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000009', // Fumarate
    pathData: 'M 1010 2320 C 950 2250, 905 2180, 895 2112',
    tooltipX: 930,
    tooltipY: 2200,
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
      path: 'M 855 2255 C 895 2235, 920 2215, 930 2208 C 920 2195, 895 2175, 855 2160',
      inCofactor: 'ФАД',
      inCofactorEn: 'FAD',
      inText: 'ФАД',
      inTextRu: 'ФАД',
      inTextEn: 'FAD',
      inX: 815,
      inY: 2255,
      outCofactor: 'ФАДН₂',
      outCofactorEn: 'FADH₂',
      outText: 'ФАДН₂ ➔ Q₁₀',
      outTextRu: 'ФАДН₂ ➔ Q₁₀',
      outTextEn: 'FADH₂ ➔ Q₁₀',
      outX: 805,
      outY: 2155,
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
  },
  {
    id: 'd0000001-0000-0000-0000-000000000007',
    stepNumber: 7,
    code: 'R_FUM',
    nameRu: 'Гидратация фумарата в L-малат',
    nameEn: 'Fumarate hydratase trans-hydration',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000009', // Fumarate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000010', // Malate
    pathData: 'M 900 2040 C 910 1960, 940 1890, 980 1832',
    tooltipX: 935,
    tooltipY: 1910,
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
      path: 'M 825 1910 C 865 1910, 905 1920, 929 1928',
      inCofactor: 'Вода (H₂O)',
      inCofactorEn: 'Water (H₂O)',
      inText: '+ H₂O',
      inTextRu: '+ H₂O',
      inTextEn: '+ H₂O',
      inX: 795,
      inY: 1910,
      isEnergy: false,
      inItems: [{ name: 'Вода (H₂O)', nameEn: 'Water (H₂O)', text: '+ H₂O', textRu: '+ H₂O', textEn: '+ H₂O', dx: 0 }],
    },
    mechanismRu: 'Стереоспецифическое транс-присоединение молекулы воды по двойной углерод-углеродной связи фумарата с образованием исключительно L-изомера яблочной кислоты.',
    mechanismEn: 'Stereospecific trans-addition of water across the carbon-carbon double bond of fumarate, yielding solely L-malate.',
    clinicalNoteRu: 'Классический опухолевый супрессор человека. Герминальные мутации гена FH вызывают наследственный лейомиоматоз и почечно-клеточный рак (синдром HLRCC).',
    clinicalNoteEn: 'Tumor suppressor; germline mutations in FH cause hereditary leiomyomatosis and renal cell cancer (HLRCC syndrome).',
  },
  {
    id: 'd0000001-0000-0000-0000-000000000008',
    stepNumber: 8,
    code: 'R_MDH',
    nameRu: 'Окисление L-малата в оксалоацетат',
    nameEn: 'Malate dehydrogenase oxidation',
    sourceMetaboliteId: 'b0000001-0000-0000-0000-000000000010', // Malate
    targetMetaboliteId: 'b0000001-0000-0000-0000-000000000003', // OAA
    pathData: 'M 1050 1760 C 1110 1700, 1190 1690, 1270 1706',
    tooltipX: 1170,
    tooltipY: 1715,
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
      path: 'M 1110 1655 C 1135 1685, 1148 1705, 1153 1705 C 1158 1705, 1175 1685, 1205 1655',
      inCofactor: 'НАД⁺',
      inCofactorEn: 'NAD⁺',
      inText: 'НАД⁺',
      inTextRu: 'НАД⁺',
      inTextEn: 'NAD⁺',
      inX: 1110,
      inY: 1638,
      outCofactor: 'НАДН',
      outCofactorEn: 'NADH',
      outText: 'НАДН + H⁺',
      outTextRu: 'НАДН + H⁺',
      outTextEn: 'NADH + H⁺',
      outX: 1215,
      outY: 1638,
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
  },
];

export const HUMAN_CROSSROADS: MetabolicCrossroad[] = [
  {
    id: 'cr-pdh-in',
    nameRu: 'Гликолиз ➔ Пируват ➔ ПДХ (3C ➔ 2C)',
    nameEn: 'Glycolysis ➔ Pyruvate ➔ PDH (3C ➔ 2C)',
    direction: 'in',
    startX: 1290,
    startY: 1597,
    endX: 1510,
    endY: 1597,
    textX: 1295,
    textY: 1584,
  },
  {
    id: 'cr-cit-out',
    nameRu: 'Выход: Цитратный челнок ➔ Синтез липидов',
    nameEn: 'Exit: Citrate shuttle ➔ Lipid synthesis',
    direction: 'out',
    startX: 1860,
    startY: 1806,
    endX: 2010,
    endY: 1806,
    textX: 1865,
    textY: 1792,
  },
  {
    id: 'cr-akg-cross',
    nameRu: 'Обмен аминокислот ⇋ Глутамат',
    nameEn: 'Amino acid exchange ⇋ Glutamate',
    direction: 'out',
    startX: 1820,
    startY: 2356,
    endX: 1980,
    endY: 2385,
    textX: 1825,
    textY: 2375,
  },
  {
    id: 'cr-heme-out',
    nameRu: 'Синтез гема (порфиринов / Hb)',
    nameEn: 'Heme synthesis (porphyrins / Hb)',
    direction: 'out',
    startX: 1390,
    startY: 2502,
    endX: 1390,
    endY: 2540,
    textX: 1290,
    textY: 2550,
  },
  {
    id: 'cr-gng-out',
    nameRu: 'Выход: ОАО ➔ Глюконеогенез (PEPCK-M)',
    nameEn: 'Exit: OAA ➔ Gluconeogenesis (PEPCK-M)',
    direction: 'out',
    startX: 1270,
    startY: 1680,
    endX: 1150,
    endY: 1630,
    textX: 1060,
    textY: 1616,
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
    centerY: 850,
    boundingPoly: [
      { x: 1050, y: 250 },
      { x: 2150, y: 250 },
      { x: 1950, y: 1350 },
      { x: 1250, y: 1350 }
    ],
    descriptionRu: 'Расщепление глюкозы до пирувата (10 стадий) с последующим окислительным декарбоксилированием в ПДХ прямо в Ацетил-КоА.',
    descriptionEn: '10-step oxidation of glucose to pyruvate with pyruvate dehydrogenase complex feeding straight into Acetyl-CoA.',
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
    centerX: 620,
    centerY: 1750,
    boundingPoly: [
      { x: 180, y: 1300 },
      { x: 1100, y: 1300 },
      { x: 1100, y: 2250 },
      { x: 180, y: 2250 }
    ],
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
    radiusMax: 600,
    themeColor: '#10B981',
    gradientColors: ['rgba(16, 185, 129, 0.14)', 'rgba(16, 185, 129, 0.01)'],
    centerX: 1380,
    centerY: 2110,
    boundingPoly: [
      { x: 740, y: 1650 },
      { x: 2020, y: 1650 },
      { x: 2020, y: 2580 },
      { x: 740, y: 2580 }
    ],
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
    centerX: 2550,
    centerY: 1750,
    boundingPoly: [
      { x: 2080, y: 1300 },
      { x: 3020, y: 1300 },
      { x: 3020, y: 2250 },
      { x: 2080, y: 2250 }
    ],
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
    centerX: 1400,
    centerY: 2850,
    boundingPoly: [
      { x: 740, y: 2650 },
      { x: 2080, y: 2650 },
      { x: 2080, y: 3120 },
      { x: 740, y: 3120 }
    ],
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
    pathData: 'M 1600 1250 L 1600 1560',
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
    pathData: 'M 1000 1600 L 1520 1600',
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
    pathData: 'M 1595 1634 L 1595 1718',
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
    pathData: 'M 1720 1790 C 1500 1850, 1200 1850, 950 1800',
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
    pathData: 'M 2200 1600 L 1675 1600',
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
    pathData: 'M 2200 2200 C 2050 2280, 1950 2320, 1830 2340',
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
    pathData: 'M 2200 2000 C 1800 2150, 1300 2150, 970 2040',
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
    pathData: 'M 1040 2390 C 1040 2550, 1400 2580, 1400 2700',
    carbonFlux: 'ФАДН₂ / НАДН ➔ 30-32 АТФ',
    isAnabolic: false,
    isCatabolic: true,
    themeColor: '#0EA5E9'
  }
];
