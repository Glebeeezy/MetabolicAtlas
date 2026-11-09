/**
 * Data transfer object for a visual map element (node).
 */
export interface MapElement {
  id: string;
  elementType: number;
  elementTypeName: string;
  entityId?: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  colorHex?: string | null;
  stylePropsJson?: string | null;
}

