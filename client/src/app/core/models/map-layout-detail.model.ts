import { MapElement } from './map-element.model';
import { MapEdge } from './map-edge.model';

/**
 * Detailed map layout containing visual elements and edges for canvas rendering.
 */
export interface MapLayoutDetail {
  id: string;
  code: string;
  name: string;
  version: string;
  width: number;
  height: number;
  pathwayId?: string | null;
  elements: MapElement[];
  edges: MapEdge[];
}
