export * from './carbohydrates';
export * from './energy';

import {
  GLYCOLYSIS_REACTIONS,
  PYRUVATE_TRANSPORT_REACTIONS,
  GALACTOSE_REACTIONS,
  FRUCTOSE_REACTIONS,
  GLYCOGEN_REACTIONS,
} from './carbohydrates';
import { TCA_REACTIONS, OXPHOS_REACTIONS } from './energy';
import { BiologicalReaction } from '../../../core/metabolism/models';

/**
 * All biological reactions preserved in exact original sequential order for deterministic rendering and backwards compatibility.
 */
const rLct = GALACTOSE_REACTIONS.find((r) => r.code === 'R_LCT')!;
const rSi = FRUCTOSE_REACTIONS.find((r) => r.code === 'R_SI')!;
const galactoseCore = GALACTOSE_REACTIONS.filter((r) => r.code !== 'R_LCT');
const fructoseCore = FRUCTOSE_REACTIONS.filter((r) => r.code !== 'R_SI');

export const ALL_BIOLOGICAL_REACTIONS: BiologicalReaction[] = [
  ...GLYCOLYSIS_REACTIONS,
  ...PYRUVATE_TRANSPORT_REACTIONS,
  ...galactoseCore,
  ...fructoseCore,
  ...TCA_REACTIONS,
  ...GLYCOGEN_REACTIONS,
  rLct,
  rSi,
  ...OXPHOS_REACTIONS,
];
