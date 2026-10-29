# ====================================================================
# Metabolic Atlas: PostgreSQL Dockerfile
# ====================================================================

FROM postgres:16-alpine

LABEL maintainer="Metabolic Atlas Team"
LABEL description="PostgreSQL database container for Metabolic Atlas with preconfigured extensions and schemas"

# Set timezone (default UTC) and locale
ENV TZ=UTC

# Copy initialization SQL scripts
# Scripts in /docker-entrypoint-initdb.d/ are executed alphabetically on initial database creation
COPY ./init-db/ /docker-entrypoint-initdb.d/

# Healthcheck to verify database availability
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=5 \
  CMD pg_isready -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-metabolic_atlas}" || exit 1

EXPOSE 5432
