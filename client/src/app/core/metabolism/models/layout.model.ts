export type CofactorPreset = 'tangent-swoop' | 'lateral-loop' | 'perpendicular-dip' | 'through-cross';

export interface CofactorParticipant {
  name: string;
  nameEn?: string;
  text: string;
  textRu?: string;
  textEn?: string;
  dx?: number;
  dy?: number;
  isEnergy?: boolean;
  isGtp?: boolean;
}

export interface ReactionCofactorArc {
  preset?: CofactorPreset;
  path: string;
  inCofactor?: string;
  inCofactorEn?: string;
  inText?: string;
  inTextRu?: string;
  inTextEn?: string;
  inX?: number;
  inY?: number;
  inAnchor?: 'start' | 'middle' | 'end';
  outCofactor?: string;
  outCofactorEn?: string;
  outText?: string;
  outTextRu?: string;
  outTextEn?: string;
  outX?: number;
  outY?: number;
  outAnchor?: 'start' | 'middle' | 'end';
  isEnergy?: boolean;
  isGtp?: boolean;
  inItems?: CofactorParticipant[];
  outItems?: CofactorParticipant[];
}

export interface ReactionBranch {
  id: string;
  role: 'in' | 'out';
  metaboliteId: string;
  pathData: string;
  showArrow?: boolean;
  isReversible?: boolean;
}

export interface ReactionJunction {
  x: number;
  y: number;
  label?: string;
  labelRu?: string;
  width?: number;
  height?: number;
}

/**
 * Visual layout and spatial coordinates for a metabolite node on the canvas.
 */
export interface MetaboliteLayout {
  metaboliteId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  skeletalSvg: string;
  structureSvg?: string;
}

/**
 * Visual geometry and SVG path specifications for a reaction arrow on the canvas.
 */
export interface ReactionLayout {
  reactionId: string;
  pathData: string;
  secondaryPathData?: string;
  tooltipX: number;
  tooltipY: number;
  junction?: ReactionJunction;
  branches?: ReactionBranch[];
  cofactorArc?: ReactionCofactorArc;
}
