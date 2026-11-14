export * from './tca.reactions';
export * from './oxphos.reactions';

import { TCA_REACTIONS } from './tca.reactions';
import { OXPHOS_REACTIONS } from './oxphos.reactions';

export const ENERGY_REACTIONS = [
  ...TCA_REACTIONS,
  ...OXPHOS_REACTIONS,
];
