-- ====================================================================
-- Metabolic Atlas: Database Initialization Script
-- ====================================================================

-- Enable core extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Create required schemas according to Metabolic Atlas architecture
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS pathways;
CREATE SCHEMA IF NOT EXISTS content;
CREATE SCHEMA IF NOT EXISTS provenance;
CREATE SCHEMA IF NOT EXISTS learning;

-- Schema comments for documentation
COMMENT ON SCHEMA core IS 'Scientific biochemical entities (metabolites, reactions, enzymes, compartments)';
COMMENT ON SCHEMA pathways IS 'Metabolic pathways, reaction graphs, and visual map layouts (MapLayout, MapElement, MapEdge)';
COMMENT ON SCHEMA content IS 'Educational articles, descriptions, and translations (localization)';
COMMENT ON SCHEMA provenance IS 'Data sources, automated import runs, and citations (evidence)';
COMMENT ON SCHEMA learning IS 'Educational quizzes, challenges, and user progress tracking';

-- Grant access to public role (or application user)
GRANT ALL ON SCHEMA core TO PUBLIC;
GRANT ALL ON SCHEMA pathways TO PUBLIC;
GRANT ALL ON SCHEMA content TO PUBLIC;
GRANT ALL ON SCHEMA provenance TO PUBLIC;
GRANT ALL ON SCHEMA learning TO PUBLIC;
