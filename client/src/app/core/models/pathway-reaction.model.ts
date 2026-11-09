/**
 * Data transfer object for a reaction participating in a pathway.
 */
export interface PathwayReaction {
  reactionId: string;
  reactionCode: string;
  reactionName: string;
  ordinal?: number | null;
}

