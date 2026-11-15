import { UREA_CYCLE_REACTIONS } from './urea-cycle.reactions';
import { TRANSAMINATION_REACTIONS } from './transamination.reactions';
import { AMINO_CATABOLISM_REACTIONS } from './amino-catabolism.reactions';
import { BiologicalReaction } from '../../../../core/metabolism/models';

export * from './urea-cycle.reactions';
export * from './transamination.reactions';
export * from './amino-catabolism.reactions';

export const PROTEIN_METABOLISM_REACTIONS: BiologicalReaction[] = [
  ...UREA_CYCLE_REACTIONS,
  ...TRANSAMINATION_REACTIONS,
  ...AMINO_CATABOLISM_REACTIONS,
];
