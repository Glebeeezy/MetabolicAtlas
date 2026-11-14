import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BiologicalMetabolite,
  BiologicalReaction,
  HumanMetaboliteNode,
  HumanReactionArrow,
  MetabolicCrossroad,
  SectorLayoutConfig,
  PathwaySuperHighway,
} from '../models';
import { LocalMetabolismRepository } from '../repositories/local-metabolism.repository';
import { MetabolismIndexService, MetaboliteReactionParticipation } from './metabolism-index.service';
import {
  HUMAN_METABOLITES,
  COFACTOR_METABOLITES,
  ALL_METABOLITES,
  HUMAN_REACTIONS,
  HUMAN_CROSSROADS,
  SECTOR_LAYOUT_CONFIGS,
  PATHWAY_SUPER_HIGHWAYS,
} from '../../../data/metabolism';

/**
 * High-level metabolism service consumed by UI components.
 * Provides both reactive streams (Observable API) and synchronous high-performance
 * cached queries for interactive canvas exploration.
 */
@Injectable({
  providedIn: 'root',
})
export class MetabolismService {
  private readonly repository = inject(LocalMetabolismRepository);
  private readonly indexService = inject(MetabolismIndexService);

  // Synchronous static datasets for high-performance canvas loops
  readonly canvasMetabolites: readonly HumanMetaboliteNode[] = HUMAN_METABOLITES;
  readonly cofactorMetabolites: readonly HumanMetaboliteNode[] = COFACTOR_METABOLITES;
  readonly allMetabolites: readonly HumanMetaboliteNode[] = ALL_METABOLITES;
  readonly reactions: readonly HumanReactionArrow[] = HUMAN_REACTIONS;
  readonly crossroads: readonly MetabolicCrossroad[] = HUMAN_CROSSROADS;
  readonly sectorConfigs: readonly SectorLayoutConfig[] = SECTOR_LAYOUT_CONFIGS;
  readonly superHighways: readonly PathwaySuperHighway[] = PATHWAY_SUPER_HIGHWAYS;

  // Reactive methods (Repository abstraction)
  getMetabolites$(): Observable<BiologicalMetabolite[]> {
    return this.repository.getMetabolites();
  }

  getReactions$(): Observable<BiologicalReaction[]> {
    return this.repository.getReactions();
  }

  getCanvasMetabolites$(): Observable<HumanMetaboliteNode[]> {
    return this.repository.getCanvasMetabolites();
  }

  getCanvasReactions$(): Observable<HumanReactionArrow[]> {
    return this.repository.getCanvasReactions();
  }

  // Fast O(1) indexed lookups
  getMetaboliteById(id: string): HumanMetaboliteNode | undefined {
    return this.indexService.getMetaboliteById(id);
  }

  getMetaboliteByCode(code: string): HumanMetaboliteNode | undefined {
    return this.indexService.getMetaboliteByCode(code);
  }

  findMetaboliteByName(name: string): HumanMetaboliteNode | undefined {
    return this.indexService.findMetaboliteByName(name);
  }

  getReactionById(id: string): HumanReactionArrow | undefined {
    return this.indexService.getReactionById(id);
  }

  getReactionByCode(code: string): HumanReactionArrow | undefined {
    return this.indexService.getReactionByCode(code);
  }

  getReactionsForMetabolite(metaboliteId: string): MetaboliteReactionParticipation[] {
    return this.indexService.getReactionsForMetabolite(metaboliteId);
  }

  getReactionsByPathway(pathwayCode: string): HumanReactionArrow[] {
    return this.indexService.getReactionsByPathway(pathwayCode);
  }

  getMetabolitesByPathway(pathwayCode: string): HumanMetaboliteNode[] {
    return this.indexService.getMetabolitesByPathway(pathwayCode);
  }
}
