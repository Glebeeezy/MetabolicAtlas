/**
 * Summary representation of a metabolic pathway for listing.
 */
export interface PathwaySummary {
  id: string;
  code: string;
  name: string;
  category?: string | null;
  reactionsCount: number;
}
