import { ReactionParticipant } from './reaction-participant.model';

/**
 * Data transfer object for a biochemical reaction with stoichiometry and participants.
 */
export interface ReactionDetail {
  id: string;
  code: string;
  name: string;
  direction: string;
  isReversible: boolean;
  description?: string | null;
  participants: ReactionParticipant[];
}
