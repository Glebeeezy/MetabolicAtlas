import { computed, Injectable, signal } from '@angular/core';

export type PathwayStatus = 'ready' | 'hub' | 'wip';

export interface PathwayMeta {
  id: string;
  nameRu: string;
  nameEn: string;
  code: string;
  categoryRu: string;
  categoryEn: string;
  dotColor: string;
  status: PathwayStatus;
  reactionCount?: number;
  metaboliteCount?: number;
  connectedHubCode?: string;
  crossroadId?: string;
  descriptionRu: string;
  descriptionEn: string;
}

export interface MapFocusTarget {
  pathwayId: string;
  targetCode?: string;
  crossroadId?: string;
  timestamp: number;
}

export const HUMAN_PATHWAYS_CATALOG: PathwayMeta[] = [
  {
    id: 'ALL',
    nameRu: 'Все пути (Обзор)',
    nameEn: 'All Pathways (Overview)',
    code: 'ALL',
    categoryRu: 'Обзор карты',
    categoryEn: 'Map Overview',
    dotColor: '#38BDF8',
    status: 'ready',
    reactionCount: 37,
    metaboliteCount: 36,
    descriptionRu: 'Полная карта метаболических взаимосвязей человека, циклов и ключевых узлов обмена веществ.',
    descriptionEn: 'Full map of human metabolic pathways, cycles and central exchange hubs.',
  },
  {
    id: 'PW-TCA-CYCLE',
    nameRu: 'ЦТК (Кребс)',
    nameEn: 'TCA Cycle',
    code: 'TCA',
    categoryRu: 'Энергетический обмен',
    categoryEn: 'Energy Metabolism',
    dotColor: '#10B981',
    status: 'ready',
    reactionCount: 8,
    metaboliteCount: 8,
    connectedHubCode: 'MET_ACETYL_COA',
    descriptionRu: 'Центральный циклический конвейер клеточного дыхания (8 ферментов, 8 интермедиатов цикла), окисляющий ацетильный остаток Ацетил-КоА.',
    descriptionEn: 'Central catalytic cycle of cellular respiration (8 enzymes, 8 cycle intermediates), oxidising acetyl moiety from Acetyl-CoA.',
  },
  {
    id: 'PW-GLYCOLISIS',
    nameRu: 'Гликолиз (Цитозоль)',
    nameEn: 'Glycolysis (Cytosol)',
    code: 'GLY',
    categoryRu: 'Углеводный обмен',
    categoryEn: 'Carbohydrate Metabolism',
    dotColor: '#F59E0B',
    status: 'ready',
    reactionCount: 10,
    metaboliteCount: 11,
    connectedHubCode: 'MET_ACETYL_COA',
    descriptionRu: 'Десятистадийный цитоплазматический каскад расщепления глюкозы до двух молекул пирувата с генерацией 2 АТФ и 2 НАДН.',
    descriptionEn: 'Ten-step cytosolic glucose oxidation to pyruvate with net yield of 2 ATP and 2 NADH.',
  },
  {
    id: 'PW-PDH',
    nameRu: 'Комплекс ПДХ (Матрикс)',
    nameEn: 'PDH Complex (Matrix)',
    code: 'PDH',
    categoryRu: 'Углеводный обмен',
    categoryEn: 'Carbohydrate Metabolism',
    dotColor: '#F59E0B',
    status: 'ready',
    reactionCount: 2,
    metaboliteCount: 3,
    connectedHubCode: 'MET_ACETYL_COA',
    crossroadId: 'cr-pdh-in',
    descriptionRu: 'Транспорт пирувата через мембрану переносчиком MPC1/2 и окислительное декарбоксилирование мультиферментным комплексом ПДХ (E1-E2-E3) в центральный Ацетил-КоА.',
    descriptionEn: 'Mitochondrial pyruvate entry via MPC1/2 and oxidative decarboxylation via multienzyme PDH cluster into central Acetyl-CoA.',
  },
  {
    id: 'PW-GALACTOSE',
    nameRu: 'Путь Лелуара (Галактоза)',
    nameEn: 'Leloir Pathway (Galactose)',
    code: 'GAL',
    categoryRu: 'Углеводный обмен',
    categoryEn: 'Carbohydrate Metabolism',
    dotColor: '#A855F7',
    status: 'ready',
    reactionCount: 5,
    metaboliteCount: 6,
    connectedHubCode: 'MET_G6P',
    descriptionRu: 'Гидролиз лактозы (LCT) и цитоплазматическая конверсия галактозы (GALK1 → GALT → GALE → PGM1) через цикл УДФ-гексоз в глюкозо-6-фосфат для гликолиза или синтеза глюкозы в печени.',
    descriptionEn: 'Lactose hydrolysis (LCT) and cytosolic galactose conversion (GALK1 → GALT → GALE → PGM1) via UDP-hexose recycling into glucose 6-phosphate for glycolysis or hepatic glucose output.',
  },
  {
    id: 'PW-GLYCOGEN',
    nameRu: 'Метаболизм гликогена',
    nameEn: 'Glycogen Metabolism',
    code: 'GLYCO',
    categoryRu: 'Углеводный обмен',
    categoryEn: 'Carbohydrate Metabolism',
    dotColor: '#06B6D4',
    status: 'ready',
    reactionCount: 3,
    metaboliteCount: 4,
    connectedHubCode: 'MET_GLYCOGEN',
    descriptionRu: 'Запасание и мобилизация полимерного резерва глюкозы в цитозоле печени и мышц: активация в УДФ-глюкозу (UGP2, -1 УТФ), синтез (GYS1/2 + GBE1) и фосфоролиз (PYGL/M + AGL) через PGM1 ⇄ Г6Ф.',
    descriptionEn: 'Cytosolic storage and mobilization of polymeric glucose granules: activation to UDP-glucose (UGP2, -1 UTP), glycogen synthesis (GYS1/2 + GBE1), and phosphorolysis (PYGL/M + AGL) via PGM1 ⇄ G6P.',
  },
  {
    id: 'PW-FRUCTOSE',
    nameRu: 'Фруктолиз (Фруктоза)',
    nameEn: 'Fructolysis (Fructose)',
    code: 'FRU',
    categoryRu: 'Углеводный обмен',
    categoryEn: 'Carbohydrate Metabolism',
    dotColor: '#F97316',
    status: 'ready',
    reactionCount: 5,
    metaboliteCount: 6,
    connectedHubCode: 'MET_G3P',
    descriptionRu: 'Гидролиз сахарозы (SI), печёночный фруктолиз (KHK → ALDOB → TKFC) в обход PFK-1 с образованием ДАФ и ГАФ, а также альтернативный гексокиназный шунт в мышцах и жировой ткани (HK → Ф6Ф).',
    descriptionEn: 'Sucrose hydrolysis (SI), hepatic fructolysis (KHK → ALDOB → TKFC) bypassing PFK-1 to yield DHAP and GAP, plus extrahepatic hexokinase shunt into fructose 6-phosphate.',
  },
  {
    id: 'PW-OXPHOS',
    nameRu: 'Дыхательная цепь (OxPhos / АТФ)',
    nameEn: 'OxPhos / Electron Transport Chain',
    code: 'ETC',
    categoryRu: 'Биоэнергетика',
    categoryEn: 'Bioenergetics',
    dotColor: '#0EA5E9',
    status: 'ready',
    reactionCount: 4,
    metaboliteCount: 4,
    connectedHubCode: 'MET_QH2',
    descriptionRu: 'Электронно-транспортная цепь (Комплексы I, III, IV) и синтез АТФ роторной АТФ-синтазой (Комплекс V) на кристах внутренней мембраны митохондрий.',
    descriptionEn: 'Mitochondrial inner membrane cristae electron transport chain (Complexes I, III, IV) and ATP synthesis by rotational ATP synthase (Complex V).',
  },
  {
    id: 'PW-BETA-OXIDATION',
    nameRu: 'β-Окисление жиров',
    nameEn: 'β-Oxidation',
    code: 'FAO',
    categoryRu: 'Липидный обмен',
    categoryEn: 'Lipid Metabolism',
    dotColor: '#8B5CF6',
    status: 'hub',
    reactionCount: 4,
    connectedHubCode: 'MET_ACETYL_COA',
    crossroadId: 'cr-cit-out',
    descriptionRu: 'Катаболизм жирных кислот с генерацией Ацетил-КоА, питающего цикл Кребса.',
    descriptionEn: 'Fatty acid breakdown generating Acetyl-CoA fueling the citric acid cycle.',
  },
  {
    id: 'PW-GLUCONEOGENESIS',
    nameRu: 'Глюконеогенез',
    nameEn: 'Gluconeogenesis',
    code: 'GNG',
    categoryRu: 'Углеводный обмен',
    categoryEn: 'Carbohydrate Metabolism',
    dotColor: '#06B6D4',
    status: 'hub',
    reactionCount: 11,
    connectedHubCode: 'MET_OAA',
    crossroadId: 'cr-gng-out',
    descriptionRu: 'Синтез глюкозы из неуглеводных предшественников через оксалоацетат (PEPCK-M).',
    descriptionEn: 'Synthesis of glucose from non-carbohydrate precursors via oxaloacetate (PEPCK-M).',
  },
  {
    id: 'PW-UREA-CYCLE',
    nameRu: 'Орнитиновый цикл',
    nameEn: 'Urea Cycle',
    code: 'URC',
    categoryRu: 'Аминокислотный обмен',
    categoryEn: 'Amino Acid Metabolism',
    dotColor: '#E11D48',
    status: 'hub',
    reactionCount: 5,
    connectedHubCode: 'MET_AKG',
    crossroadId: 'cr-akg-cross',
    descriptionRu: 'Обезвреживание аммиака в печени; связан с ЦТК через фумарат и аспартат-аргининосукцинатный шунт.',
    descriptionEn: 'Ammonia detox cycle in liver; coupled to TCA cycle via fumarate & aspartate-argininosuccinate shunt.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AtlasStateService {
  readonly pathways = signal<PathwayMeta[]>(HUMAN_PATHWAYS_CATALOG);
  readonly selectedPathwayId = signal<string>('ALL');
  readonly searchQuery = signal<string>('');
  readonly showStructures = signal<boolean>(true);
  readonly isFluxAnimated = signal<boolean>(false);
  readonly mapFocusTarget = signal<MapFocusTarget | null>(null);

  readonly selectedPathway = computed(() => {
    const id = this.selectedPathwayId();
    return this.pathways().find((p) => p.id === id) ?? this.pathways()[0];
  });

  selectPathway(id: string): void {
    const pathway = this.pathways().find((p) => p.id === id);
    if (!pathway) return;

    this.selectedPathwayId.set(id);

    this.mapFocusTarget.set({
      pathwayId: id,
      targetCode: pathway.connectedHubCode,
      crossroadId: pathway.crossroadId,
      timestamp: Date.now(),
    });
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query.trim());
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  toggleStructures(): void {
    this.showStructures.update((v) => !v);
  }

  toggleFlux(): void {
    this.isFluxAnimated.update((v) => !v);
  }
}

