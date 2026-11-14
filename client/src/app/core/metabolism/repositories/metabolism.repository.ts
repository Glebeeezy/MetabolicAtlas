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

/**
 * Abstract data repository interface for accessing metabolic map data.
 * Designed to decouple Angular presentation components from physical data sources
 * and provide seamless transition to future ASP.NET Core 10 REST API backend.
 */
export interface MetabolismRepository {
  /** Retrieves all biological metabolites (including cofactors). */
  getMetabolites(): Observable<BiologicalMetabolite[]>;

  /** Retrieves a biological metabolite by its unique UUID. */
  getMetaboliteById(id: string): Observable<BiologicalMetabolite | undefined>;

  /** Retrieves a biological metabolite by its stable code (e.g. 'MET_GLUCOSE'). */
  getMetaboliteByCode(code: string): Observable<BiologicalMetabolite | undefined>;

  /** Retrieves all biological reactions across all pathways. */
  getReactions(): Observable<BiologicalReaction[]>;

  /** Retrieves a biological reaction by its unique UUID. */
  getReactionById(id: string): Observable<BiologicalReaction | undefined>;

  /** Retrieves a biological reaction by its stable code (e.g. 'R_HK'). */
  getReactionByCode(code: string): Observable<BiologicalReaction | undefined>;

  /** Retrieves all biological reactions belonging to a specific pathway code. */
  getReactionsByPathway(pathwayCode: string): Observable<BiologicalReaction[]>;

  /** Retrieves fully hydrated metabolite nodes for interactive canvas rendering. */
  getCanvasMetabolites(): Observable<HumanMetaboliteNode[]>;

  /** Retrieves fully hydrated reaction arrows with SVG paths for canvas rendering. */
  getCanvasReactions(): Observable<HumanReactionArrow[]>;

  /** Retrieves all metabolic crossroads and inter-pathway gates. */
  getCrossroads(): Observable<MetabolicCrossroad[]>;

  /** Retrieves radial sector layout configurations. */
  getSectors(): Observable<SectorLayoutConfig[]>;

  /** Retrieves inter-pathway superhighway carbon flux conduits. */
  getSuperHighways(): Observable<PathwaySuperHighway[]>;
}
