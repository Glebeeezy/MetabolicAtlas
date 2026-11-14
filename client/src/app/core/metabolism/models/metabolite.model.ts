/**
 * Information regarding a metabolite's participation in a metabolic pathway.
 */
export interface PathwayParticipation {
  pathwayCode: string;
  pathwayNameRu: string;
  pathwayNameEn?: string;
  isCurrentPathway: boolean;
  role: 'substrate' | 'product' | 'cofactor' | 'intermediate';
  detailsRu: string;
  detailsEn?: string;
  stepNumber?: number;
  reactionCode?: string;
  reactionNameRu?: string;
  reactionNameEn?: string;
}

/**
 * Biological and chemical domain representation of a human metabolite.
 * Contains chemical identifiers, nomenclature, formula, and biological roles.
 * Independent of canvas layout and visual presentation coordinates.
 */
export interface BiologicalMetabolite {
  id: string;
  code: string;
  nameRu: string;
  nameEn: string;
  abbrevRu: string;
  abbrevEn: string;
  formula: string;
  carbons: string;
  carbonsEn?: string;
  smiles: string;
  chebi: string;
  inchiKey: string;
  descriptionRu: string;
  descriptionEn?: string;
  synonymsRu: string[];
  synonymsEn?: string[];
  isCofactor?: boolean;
  isHub?: boolean;
  compartmentRu?: string;
  compartmentEn?: string;
  pathwaysRu: PathwayParticipation[];
}

/**
 * Alias for BiologicalMetabolite representing standard biochemical entity.
 */
export type Metabolite = BiologicalMetabolite;
