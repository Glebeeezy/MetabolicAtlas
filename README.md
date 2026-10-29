# Metabolic Atlas

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![.NET](https://img.shields.io/badge/.NET-10.0-512BD4.svg)](https://dotnet.microsoft.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![API Docs](https://img.shields.io/badge/API_Docs-Scalar-black.svg)](#api-endpoints-prefix-apiv1)

An interactive human metabolism atlas: a scientifically structured biochemical database, interactive metabolic pathway maps, and educational resources.

The project unites a human biochemistry reference system and a visual educational tool tailored for medical students, biochemists, nutritionists, and researchers.

---

## Project Goals

- **Interactive Map Visualization:** Render human central metabolism on an interactive canvas.
- **Deep Exploration:** Navigate seamlessly from high-level maps to metabolites, reactions, enzymes, and curated articles.
- **Separation of Concerns:** Strict separation between scientific data, editorial content, and visual rendering layouts.
- **Scientific Provenance:** Controlled ingestion pipeline from authoritative scientific databases (Rhea, Reactome, ChEBI, HMDB) with traceable provenance.
- **Educational Integration:** Provide interactive exercises, biochemical challenges, and learning pathways.
- **Multilingual Support:** Russian and English localization from the ground up, accompanied by light and dark themes.

---

## Architectural Principles

1. **Scientific Domain Model is the Single Source of Truth:** Visual maps and articles reference structured biochemical entities rather than storing disconnected coordinates or labels.
2. **Entities are Decoupled from Presentation:** A metabolite or reaction entity does not contain SVG coordinates or drawing styling.
3. **Stable Internal Identifiers:** Primary keys are internal GUIDs; external database IDs and names are treated as cross-references and aliases.
4. **Explicit Stoichiometry:** Reactions are modeled via explicit participants, roles (substrate, product, cofactor), stoichiometry (using high-precision `numeric`), and cellular compartments.
5. **Traceability and Provenance:** Ingested entities link to their respective source databases, versions, and scientific literature evidence.
6. **Controlled & Idempotent Ingestion:** Data passes through staging, normalization, validation, and conflict resolution before publication.
7. **Native Localization:** Translations never duplicate scientific entities.
8. **Modular Monolith First:** Maintain a clean, maintainable modular structure without premature microservices or separate graph databases until proven necessary.

---

## Technology Stack

### Backend
- **C# / .NET 10**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **PostgreSQL 16+** (Schema-based modular isolation, Full-Text Search, Trigram indexing)
- **OpenAPI & Scalar** (Interactive documentation)

### Frontend
- **Angular** (TypeScript)
- **SVG + D3.js** for high-performance canvas & graph visualization
- **Angular Signals** (NgRx Signal Store when complex state sharing is required)
- **CSS Custom Properties** for consistent theming across map layers

### DevOps & Testing
- **Docker Compose** for local database and environment orchestration
- **xUnit** with **Moq** and **Microsoft.AspNetCore.Mvc.Testing** for unit and integration testing

---

## Architecture

```text
Angular SPA (Frontend)
  ├── Interactive Atlas Canvas
  ├── Detailed Pathway Schemes
  ├── Entity Detail Sheets (Metabolite, Reaction, Enzyme)
  ├── Search & Educational Articles
  └── Theme & Locale Switcher
           │ REST API (/api/v1)
           ▼
ASP.NET Core Web API
  ├── Application: Use cases, DTOs, interfaces, validation
  ├── Domain: Core biochemical domain entities, invariants, value objects
  ├── Infrastructure: EF Core, PostgreSQL persistence, migrations, search
  └── Import: Data staging, normalization, validation, ingestion pipelines
           │
           ▼
PostgreSQL Database
  ├── core       — Scientific biochemical entities
  ├── pathways   — Metabolic pathways and map layouts
  ├── content    — Educational articles and localized translations
  ├── provenance — Data sources, import runs, and evidence
  └── learning   — Quizzes, challenges, and user progress
```

---

## Solution Structure

```text
metabolic-atlas/
├── src/
│   ├── MetabolicAtlas.Domain/         # Pure domain model, aggregates, entities, enums
│   ├── MetabolicAtlas.Application/    # Use cases, DTOs, service abstractions, logic
│   ├── MetabolicAtlas.Infrastructure/ # EF Core DbContext, PostgreSQL mappings, migrations
│   ├── MetabolicAtlas.Import/         # External source adapters, staging, pipelines
│   └── MetabolicAtlas.Api/            # ASP.NET Core Web API, Minimal API endpoints, Scalar
├── tests/
│   ├── MetabolicAtlas.Domain.Tests/     # Domain entity and rule unit tests
│   ├── MetabolicAtlas.Import.Tests/     # Staging validation and import pipeline tests
│   └── MetabolicAtlas.IntegrationTests/ # End-to-end API integration tests
├── docker/
│   └── postgres/                      # Dockerfile and schema initialization SQL
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Domain Model

### Key Entities:
- **Metabolite:** Chemical entity (formula, net charge, InChIKey, SMILES, monoisotopic mass).
- **MetaboliteIdentifier:** External identifier within a namespace (ChEBI, HMDB, KEGG, PubChem).
- **MetaboliteName:** Name or synonym with language code (`ru`, `en`) and name type (common, systematic, synonym).
- **Compartment:** Cellular compartment (cytosol, mitochondrial matrix, etc.).
- **Reaction:** Biochemical reaction with direction and reversible flags.
- **ReactionParticipant:** Metabolite participant with role, high-precision stoichiometry, and compartment.
- **Enzyme:** Catalytic enzyme (EC number, UniProt ID, name).
- **ReactionEnzyme:** Association between reaction and enzyme.
- **Pathway:** Metabolic pathway (e.g., TCA cycle, Glycolysis).
- **PathwayReaction:** Association connecting reaction to pathway with educational ordering.
- **MapLayout:** Versioned layout configuration for atlas maps.
- **MapElement / MapEdge:** Visual node and edge representations for the SVG canvas.
- **Article / ArticleTranslation:** Educational articles with markdown content and revisions.
- **Source / ImportRun / Evidence:** Provenance metadata, ingestion logs, and citations.

---

## API Endpoints (Prefix: `/api/v1`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/atlas/layouts` | List active map layouts |
| `GET` | `/api/v1/atlas/layouts/{id}` | Get complete map layout data (elements + edges) |
| `GET` | `/api/v1/pathways` | List metabolic pathways |
| `GET` | `/api/v1/pathways/{id}` | Pathway details and ordered reactions |
| `GET` | `/api/v1/metabolites/{id}` | Metabolite details with synonyms and IDs |
| `GET` | `/api/v1/reactions/{id}` | Reaction details with stoichiometry and participants |
| `GET` | `/api/v1/enzymes/{id}` | Enzyme details |
| `GET` | `/api/v1/search?q=...` | Full-text and trigram search across entities |
| `GET` | `/api/v1/articles/{slug}` | Educational article content |
| `GET` | `/health` | System health check |
| `GET` | `/scalar/v1` | Interactive Scalar API documentation |

---

## Local Development Setup

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/)
- [Docker & Docker Compose](https://www.docker.com/)

### 1. Start PostgreSQL
```powershell
# Copy environment configuration
Copy-Item .env.example .env

# Start database container
docker compose up -d
```

### 2. Apply Database Migrations
```powershell
dotnet ef database update --project src/MetabolicAtlas.Infrastructure --startup-project src/MetabolicAtlas.Api
```

### 3. Run the Backend API
```powershell
dotnet run --project src/MetabolicAtlas.Api
```
The API will be available at `https://localhost:7001` (or configured port).
Access interactive Scalar documentation at `/scalar/v1`.

### 4. Run Tests
```powershell
dotnet test
```

---

## License

This project is licensed under the MIT License. Data ingested from third-party scientific databases (Rhea, Reactome, ChEBI, HMDB) remains subject to their respective licenses and terms of use.
