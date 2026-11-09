/**
 * Data transfer object for a metabolite card and detail view.
 */
export interface MetaboliteDetail {
  id: string;
  primaryName: string;
  formula?: string | null;
  netCharge?: number | null;
  monoisotopicMass?: number | null;
  synonyms: string[];
  externalIdentifiers: Record<string, string>;
}
