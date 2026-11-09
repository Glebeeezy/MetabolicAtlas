/**
 * Data transfer object for a catalytic enzyme entity.
 */
export interface EnzymeDetail {
  id: string;
  ecNumber?: string | null;
  name: string;
  uniprotId?: string | null;
  description?: string | null;
}

