/**
 * Chemical participant (substrate or product) within a biochemical reaction.
 */
export interface ReactionParticipant {
  name: string;
  nameEn?: string;
  formula: string;
  isCo?: boolean;
}

/**
 * Biological and biochemical domain representation of a human metabolic reaction.
 * Contains enzyme details, genetics, stoichiometry, thermodynamics,
 * regulation, and clinical implications.
 * Independent of canvas geometry and SVG path rendering.
 */
export interface BiologicalReaction {
  id: string;
  stepNumber: number;
  code: string;
  nameRu: string;
  nameEn: string;
  pathwayCode?: string;
  pathwayNameRu?: string;
  pathwayNameEn?: string;
  compartmentRu?: string;
  compartmentEn?: string;
  sourceMetaboliteId: string;
  targetMetaboliteId: string;
  secondarySourceId?: string;
  secondaryTargetId?: string;
  enzymeRu: string;
  enzymeEn: string;
  enzymeShort: string;
  enzymeShortRu?: string;
  ecNumber: string;
  gene: string;
  uniprotId: string;
  isReversible: boolean;
  deltaG0: string;
  substrates: ReactionParticipant[];
  products: ReactionParticipant[];
  activatorsRu?: string[];
  activatorsEn?: string[];
  inhibitorsRu?: string[];
  inhibitorsEn?: string[];
  mechanismRu: string;
  mechanismEn?: string;
  energyBalanceRu?: string;
  energyBalanceEn?: string;
  netAtpYieldRu?: string;
  netAtpYieldEn?: string;
  clinicalNoteRu?: string;
  clinicalNoteEn?: string;
}

/**
 * Alias for BiologicalReaction representing standard biochemical reaction entity.
 */
export type Reaction = BiologicalReaction;
