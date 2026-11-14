import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MetabolismRepository } from './metabolism.repository';
import {
  BiologicalMetabolite,
  BiologicalReaction,
  HumanMetaboliteNode,
  HumanReactionArrow,
  MetabolicCrossroad,
  SectorLayoutConfig,
  PathwaySuperHighway,
} from '../models';
import {
  BIOLOGICAL_HUMAN_METABOLITES,
  BIOLOGICAL_COFACTOR_METABOLITES,
  ALL_BIOLOGICAL_REACTIONS,
  HUMAN_METABOLITES,
  HUMAN_REACTIONS,
  HUMAN_CROSSROADS,
  SECTOR_LAYOUT_CONFIGS,
  PATHWAY_SUPER_HIGHWAYS,
} from '../../../data/metabolism';
import { MetabolismIndexService } from '../services/metabolism-index.service';

/**
 * In-memory local implementation of MetabolismRepository.
 * Serves static modularized biochemical data and layout models to the client.
 */
@Injectable({
  providedIn: 'root',
})
export class LocalMetabolismRepository implements MetabolismRepository {
  private readonly indexService = inject(MetabolismIndexService);

  private readonly allBiologicalMetabolites: BiologicalMetabolite[] = [
    ...BIOLOGICAL_HUMAN_METABOLITES,
    ...BIOLOGICAL_COFACTOR_METABOLITES,
  ];

  getMetabolites(): Observable<BiologicalMetabolite[]> {
    return of(this.allBiologicalMetabolites);
  }

  getMetaboliteById(id: string): Observable<BiologicalMetabolite | undefined> {
    const met = this.indexService.getMetaboliteById(id);
    return of(met);
  }

  getMetaboliteByCode(code: string): Observable<BiologicalMetabolite | undefined> {
    const met = this.indexService.getMetaboliteByCode(code);
    return of(met);
  }

  getReactions(): Observable<BiologicalReaction[]> {
    return of(ALL_BIOLOGICAL_REACTIONS);
  }

  getReactionById(id: string): Observable<BiologicalReaction | undefined> {
    const rx = this.indexService.getReactionById(id);
    return of(rx);
  }

  getReactionByCode(code: string): Observable<BiologicalReaction | undefined> {
    const rx = this.indexService.getReactionByCode(code);
    return of(rx);
  }

  getReactionsByPathway(pathwayCode: string): Observable<BiologicalReaction[]> {
    const rxs = this.indexService.getReactionsByPathway(pathwayCode);
    return of(rxs);
  }

  getCanvasMetabolites(): Observable<HumanMetaboliteNode[]> {
    return of(HUMAN_METABOLITES);
  }

  getCanvasReactions(): Observable<HumanReactionArrow[]> {
    return of(HUMAN_REACTIONS);
  }

  getCrossroads(): Observable<MetabolicCrossroad[]> {
    return of(HUMAN_CROSSROADS);
  }

  getSectors(): Observable<SectorLayoutConfig[]> {
    return of(SECTOR_LAYOUT_CONFIGS);
  }

  getSuperHighways(): Observable<PathwaySuperHighway[]> {
    return of(PATHWAY_SUPER_HIGHWAYS);
  }
}
