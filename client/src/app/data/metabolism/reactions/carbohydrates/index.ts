export * from './glycolysis.reactions';
export * from './galactose.reactions';
export * from './fructose.reactions';
export * from './glycogen.reactions';
export * from './pyruvate-transport.reactions';

import { GLYCOLYSIS_REACTIONS } from './glycolysis.reactions';
import { GALACTOSE_REACTIONS } from './galactose.reactions';
import { FRUCTOSE_REACTIONS } from './fructose.reactions';
import { GLYCOGEN_REACTIONS } from './glycogen.reactions';
import { PYRUVATE_TRANSPORT_REACTIONS } from './pyruvate-transport.reactions';

export const CARBOHYDRATE_REACTIONS = [
  ...GLYCOLYSIS_REACTIONS,
  ...PYRUVATE_TRANSPORT_REACTIONS,
  ...GALACTOSE_REACTIONS,
  ...FRUCTOSE_REACTIONS,
  ...GLYCOGEN_REACTIONS,
];
