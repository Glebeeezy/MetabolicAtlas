/**
 * Data transfer object for an educational article.
 */
export interface Article {
  slug: string;
  title: string;
  summary: string;
  bodyMarkdown: string;
  languageCode: string;
  version: number;
  publishedAtUtc: string;
}
