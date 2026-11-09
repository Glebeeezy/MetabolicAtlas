/**
 * Data transfer object for global search results across entities.
 */
export interface SearchResult {
  entityId: string;
  entityType: string;
  title: string;
  subtitle?: string | null;
  matchContext?: string | null;
}

