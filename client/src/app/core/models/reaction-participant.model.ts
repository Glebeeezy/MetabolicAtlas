/**
 * Data transfer object for a reaction participant with stoichiometry, role, and compartment.
 */
export interface ReactionParticipant {
  metaboliteId: string;
  metaboliteName: string;
  role: string;
  stoichiometry: number;
  compartmentName?: string | null;
}

