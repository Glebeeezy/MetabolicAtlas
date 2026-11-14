/**
 * @file atlas-data.ts
 * Backward compatibility facade.
 * Re-exports domain models and modularized datasets from core/metabolism and data/metabolism.
 *
 * @deprecated Prefer importing directly from `../../core/metabolism` and `../../data/metabolism` in new code.
 */

export type {
  PathwayParticipation,
  HumanMetaboliteNode,
  CofactorPreset,
  CofactorParticipant,
  ReactionCofactorArc,
  ReactionBranch,
  ReactionJunction,
  HumanReactionArrow,
  MetabolicCrossroad,
  SectorLayoutConfig,
  PathwaySuperHighway,
  GlobalMetabolicCanvasState,
  BiologicalMetabolite,
  BiologicalReaction,
  Metabolite,
  Reaction,
  MetaboliteLayout,
  ReactionLayout,
} from '../../core/metabolism';

export {
  HUMAN_METABOLITES,
  COFACTOR_METABOLITES,
  ALL_METABOLITES,
  HUMAN_REACTIONS,
  HUMAN_CROSSROADS,
  SECTOR_LAYOUT_CONFIGS,
  PATHWAY_SUPER_HIGHWAYS,
  BIOLOGICAL_HUMAN_METABOLITES,
  BIOLOGICAL_COFACTOR_METABOLITES,
  ALL_BIOLOGICAL_REACTIONS,
  METABOLITE_LAYOUTS,
  REACTION_LAYOUTS,
} from '../../data/metabolism';
