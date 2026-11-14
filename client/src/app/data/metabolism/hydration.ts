import {
  BiologicalMetabolite,
  BiologicalReaction,
  HumanMetaboliteNode,
  HumanReactionArrow,
  MetaboliteLayout,
  ReactionLayout,
} from '../../core/metabolism/models';

/**
 * Combines biological metabolite data with spatial canvas coordinates and SVG representations.
 */
export function hydrateMetabolite(
  bio: BiologicalMetabolite,
  layout: MetaboliteLayout
): HumanMetaboliteNode {
  return {
    ...bio,
    x: layout.x,
    y: layout.y,
    width: layout.width,
    height: layout.height,
    color: layout.color,
    skeletalSvg: layout.skeletalSvg,
    ...(layout.structureSvg !== undefined ? { structureSvg: layout.structureSvg } : {}),
  };
}

/**
 * Combines biological reaction data with SVG path geometry, junction markers, and cofactor arcs.
 */
export function hydrateReaction(
  bio: BiologicalReaction,
  layout: ReactionLayout
): HumanReactionArrow {
  return {
    ...bio,
    pathData: layout.pathData,
    ...(layout.secondaryPathData !== undefined ? { secondaryPathData: layout.secondaryPathData } : {}),
    tooltipX: layout.tooltipX,
    tooltipY: layout.tooltipY,
    ...(layout.junction !== undefined ? { junction: layout.junction } : {}),
    ...(layout.branches !== undefined ? { branches: layout.branches } : {}),
    ...(layout.cofactorArc !== undefined ? { cofactorArc: layout.cofactorArc } : {}),
  };
}
