import { BiologicalMetabolite } from './metabolite.model';
import { BiologicalReaction } from './reaction.model';
import {
  MetaboliteLayout,
  ReactionLayout,
  ReactionBranch,
  ReactionJunction,
  ReactionCofactorArc,
} from './layout.model';

/**
 * Hydrated representation of a metabolite on the interactive metabolic map.
 * Combines biological entity data with visual SVG coordinates and colors.
 */
export interface HumanMetaboliteNode extends BiologicalMetabolite {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  skeletalSvg: string;
  structureSvg?: string;
}

/**
 * Hydrated representation of a biochemical reaction arrow on the canvas.
 * Combines reaction biochemistry, stoichiometry, and kinetics with SVG vector paths and branch geometries.
 */
export interface HumanReactionArrow extends BiologicalReaction {
  pathData: string;
  secondaryPathData?: string;
  tooltipX: number;
  tooltipY: number;
  junction?: ReactionJunction;
  branches?: ReactionBranch[];
  cofactorArc?: ReactionCofactorArc;
}
