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
    reactionCount: 8,
    metaboliteCount: 9,
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
    metaboliteCount: 9,
    connectedHubCode: 'MET_AC_COA',
    descriptionRu: 'Центральный метаболический цикл клеточного дыхания в матриксе митохондрий человека.',
    descriptionEn: 'Central aerobic metabolic cycle of cellular respiration in mitochondrial matrix.',
  },
  {
    id: 'PW-GLYCOLISIS',
    nameRu: 'Гликолиз',
    nameEn: 'Glycolysis',
    code: 'GLY',
    categoryRu: 'Углеводный обмен',
    categoryEn: 'Carbohydrate Metabolism',
    dotColor: '#F59E0B',
    status: 'hub',
    reactionCount: 10,
    connectedHubCode: 'MET_AC_COA',
    crossroadId: 'cr-pdh-in',
    descriptionRu: 'Расщепление глюкозы до пирувата; связывается с ЦТК через комплекс ПДХ и Ацетил-КоА.',
    descriptionEn: 'Glucose oxidation to pyruvate; connects to TCA cycle via PDH complex and Acetyl-CoA.',
  },
  {
    id: 'PW-OXPHOS',
    nameRu: 'Дыхательная цепь (OxPhos)',
    nameEn: 'OxPhos / ETC',
    code: 'ETC',
    categoryRu: 'Энергетический обмен',
    categoryEn: 'Energy Metabolism',
    dotColor: '#EC4899',
    status: 'hub',
    reactionCount: 5,
    connectedHubCode: 'MET_SUCCINATE',
    descriptionRu: 'Окислительное фосфорилирование на кристах митохондрий; комплекс II (СДГ) напрямую входит в ЦТК.',
    descriptionEn: 'Oxidative phosphorylation across inner mitochondrial membrane; complex II is SDH.',
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
    connectedHubCode: 'MET_AC_COA',
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

