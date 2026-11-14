import { BIOLOGICAL_HUMAN_METABOLITES, BIOLOGICAL_COFACTOR_METABOLITES } from './metabolites';
import { ALL_BIOLOGICAL_REACTIONS } from './reactions';
import { METABOLITE_LAYOUTS, REACTION_LAYOUTS, SECTOR_LAYOUT_CONFIGS } from './visualization';
import { HUMAN_CROSSROADS, PATHWAY_SUPER_HIGHWAYS } from './navigation';
import { hydrateMetabolite, hydrateReaction } from './hydration';
import { HumanMetaboliteNode, HumanReactionArrow } from '../../core/metabolism/models';

export * from './metabolites';
export * from './reactions';
export * from './navigation';
export * from './visualization';
export * from './hydration';

// Hydrate canvas metabolites
const metLayoutMap = new Map(METABOLITE_LAYOUTS.map((l) => [l.metaboliteId, l]));

export const HUMAN_METABOLITES: HumanMetaboliteNode[] = BIOLOGICAL_HUMAN_METABOLITES.map((bio) => {
  const layout = metLayoutMap.get(bio.id);
  if (!layout) throw new Error(`Missing layout for metabolite ${bio.code} (${bio.id})`);
  return hydrateMetabolite(bio, layout);
});

export const COFACTOR_METABOLITES: HumanMetaboliteNode[] = BIOLOGICAL_COFACTOR_METABOLITES.map((bio) => {
  const layout = metLayoutMap.get(bio.id);
  if (!layout) throw new Error(`Missing layout for cofactor metabolite ${bio.code} (${bio.id})`);
  return hydrateMetabolite(bio, layout);
});

export const ALL_METABOLITES: HumanMetaboliteNode[] = [
  ...HUMAN_METABOLITES,
  ...COFACTOR_METABOLITES,
];

// Hydrate canvas reactions
const rxLayoutMap = new Map(REACTION_LAYOUTS.map((l) => [l.reactionId, l]));

export const HUMAN_REACTIONS: HumanReactionArrow[] = ALL_BIOLOGICAL_REACTIONS.map((bio) => {
  const layout = rxLayoutMap.get(bio.id);
  if (!layout) throw new Error(`Missing layout for reaction ${bio.code} (${bio.id})`);
  return hydrateReaction(bio, layout);
});

export { HUMAN_CROSSROADS, SECTOR_LAYOUT_CONFIGS, PATHWAY_SUPER_HIGHWAYS };
