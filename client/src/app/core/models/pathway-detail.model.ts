import { PathwayReaction } from './pathway-reaction.model';

/**
 * Detailed representation of a metabolic pathway including its ordered reactions.
 */
export interface PathwayDetail {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  category?: string | null;
  reactions: PathwayReaction[];
}

