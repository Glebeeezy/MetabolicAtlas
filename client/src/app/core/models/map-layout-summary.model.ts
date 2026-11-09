/**
 * Summary representation of a map layout for listing.
 */
export interface MapLayoutSummary {
  id: string;
  code: string;
  name: string;
  version: string;
  width: number;
  height: number;
  pathwayId?: string | null;
}

