/**
 * Data transfer object for a visual connection (edge/arrow) on the map.
 */
export interface MapEdge {
  id: string;
  sourceElementId: string;
  targetElementId: string;
  edgeType: number;
  edgeTypeName: string;
  pathData?: string | null;
  arrowhead?: string | null;
}

