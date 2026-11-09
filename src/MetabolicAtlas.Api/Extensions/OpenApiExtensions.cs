using Microsoft.AspNetCore.OpenApi;
using Scalar.AspNetCore;

namespace MetabolicAtlas.Api.Extensions;

/// <summary>
/// Extension methods for configuring OpenAPI specification generation
/// and Scalar API reference visual presentation.
/// </summary>
public static class OpenApiExtensions
{
    private const string ApiDescriptionMarkdown = """
        # ⚛️ Metabolic Atlas — Scientific REST API

        High-performance biochemical reference engine and interactive metabolic atlas API.
        Provides structured access to human metabolic pathways, enzymatic reactions, chemical entities (metabolites), and pre-calculated 2D canvas layouts.

        ---

        ### 🧬 Architectural Highlights
        - **Scientific Single Source of Truth:** Stoichiometrically balanced biochemical reactions with explicit compartmentation (`cytosol`, `mitochondrial matrix`).
        - **Multi-Source Provenance:** Traceable evidence linking Rhea, Reactome, and ChEBI cross-references.
        - **Native Bilingual Nomenclature:** Russian (`ru`) and English (`en`) scientific naming.
        - **Interactive Graph Canvas:** Layout nodes and edges ready for SVG & D3.js vector rendering.

        ---

        ### 🚀 Quick Links
        - 🌐 **Interactive Web SPA:** [http://localhost:4200](http://localhost:4200)
        - 🗺️ **Metabolic Atlas Canvas:** [http://localhost:4200/atlas](http://localhost:4200/atlas)
        - 🐙 **GitHub Repository:** [MetabolicAtlas on GitHub](https://github.com/Glebeeezy/MetabolicAtlas)
        - 📄 **License:** MIT License (Scientific data remains subject to Rhea, Reactome, and ChEBI terms)
        """;

    private const string ScalarCustomCss = """
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
            --scalar-font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            --scalar-font-code: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
            --scalar-radius: 8px !important;
            --scalar-radius-lg: 12px !important;
        }

        /* Deep Space Dark Theme Refinements (Metabolic Atlas aesthetic) */
        .dark-mode {
            --scalar-background-1: #090d16 !important;
            --scalar-background-2: #111726 !important;
            --scalar-background-3: #1a2234 !important;
            --scalar-border-color: rgba(255, 255, 255, 0.08) !important;
            --scalar-brand: #38bdf8 !important;
            --scalar-color-accent: #38bdf8 !important;
            --scalar-color-1: #f8fafc !important;
            --scalar-color-2: #94a3b8 !important;
            --scalar-color-3: #64748b !important;
        }

        /* Light Theme Refinements */
        .light-mode {
            --scalar-background-1: #f8fafc !important;
            --scalar-background-2: #ffffff !important;
            --scalar-background-3: #f1f5f9 !important;
            --scalar-border-color: rgba(0, 0, 0, 0.08) !important;
            --scalar-brand: #0284c7 !important;
            --scalar-color-accent: #0284c7 !important;
            --scalar-color-1: #0f172a !important;
            --scalar-color-2: #475569 !important;
            --scalar-color-3: #94a3b8 !important;
        }

        /* Frosted Glass Header */
        .scalar-header {
            backdrop-filter: blur(14px) !important;
            -webkit-backdrop-filter: blur(14px) !important;
            border-bottom: 1px solid var(--scalar-border-color) !important;
        }

        /* Sidebar Navigation */
        .scalar-sidebar {
            background: var(--scalar-background-2) !important;
            border-right: 1px solid var(--scalar-border-color) !important;
        }

        /* Badges & HTTP Methods */
        .badge, .scalar-badge, .sidebar-heading {
            border-radius: 6px !important;
            font-weight: 600 !important;
            letter-spacing: 0.02em !important;
        }

        /* Method badges with subtle glow */
        .get {
            color: #10b981 !important;
        }
        .post {
            color: #0ea5e9 !important;
        }
        .put {
            color: #f59e0b !important;
        }
        .delete {
            color: #ef4444 !important;
        }

        /* Code blocks and pre elements */
        pre, code {
            border-radius: 8px !important;
            font-feature-settings: 'liga' on, 'calt' on !important;
        }

        /* Documentation Markdown prose */
        .markdown h1, .markdown h2, .markdown h3 {
            letter-spacing: -0.02em !important;
        }

        .markdown hr {
            border-color: var(--scalar-border-color) !important;
            margin: 2rem 0 !important;
        }

        .markdown blockquote {
            border-left: 3px solid var(--scalar-brand) !important;
            background: var(--scalar-background-3) !important;
            border-radius: 0 8px 8px 0 !important;
            padding: 0.75rem 1rem !important;
        }
        """;

    /// <summary>
    /// Adds and configures OpenAPI with scientific documentation metadata,
    /// contact information, license, and structured tag descriptions.
    /// </summary>
    public static IServiceCollection AddMetabolicAtlasOpenApi(this IServiceCollection services)
    {
        services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer((document, context, cancellationToken) =>
            {
                document.Info = new()
                {
                    Title = "Metabolic Atlas Scientific API",
                    Version = "v1.0.0",
                    Description = ApiDescriptionMarkdown,
                    Contact = new()
                    {
                        Name = "Metabolic Atlas Team",
                        Url = new Uri("http://localhost:4200")
                    },
                    License = new()
                    {
                        Name = "MIT License",
                        Url = new Uri("https://opensource.org/licenses/MIT")
                    }
                };

                if (document.Tags is not null)
                {
                    document.Tags.Clear();
                    document.Tags.Add(new() { Name = "Atlas", Description = "Interactive 2D vector canvas layouts, coordinates, nodes, and edges for SVG & D3.js rendering" });
                    document.Tags.Add(new() { Name = "Pathways", Description = "Metabolic pathways catalog (TCA Cycle, Glycolysis) and ordered reaction sequences" });
                    document.Tags.Add(new() { Name = "Metabolites", Description = "Chemical entities, molecular formulas, monoisotopic masses, and ChEBI/HMDB cross-references" });
                    document.Tags.Add(new() { Name = "Reactions", Description = "Biochemical reactions with explicit stoichiometry, participant roles, and cellular compartments" });
                    document.Tags.Add(new() { Name = "Enzymes", Description = "Catalytic enzymes, Enzyme Commission (EC) classifications, and UniProt associations" });
                    document.Tags.Add(new() { Name = "System", Description = "Application health status and infrastructure diagnostics" });
                }

                return Task.CompletedTask;
            });
        });

        return services;
    }

    /// <summary>
    /// Configures Scalar interactive documentation endpoint with DeepSpace theme,
    /// developer ergonomics, and customized styling matching the Metabolic Atlas SPA.
    /// </summary>
    public static IEndpointRouteBuilder MapMetabolicAtlasScalar(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapScalarApiReference(options =>
        {
            options
                .WithTitle("Metabolic Atlas API Reference")
                .WithTheme(ScalarTheme.DeepSpace)
                .EnableDarkMode()
                .WithSearchHotKey("k")
                .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient)
                .WithCustomCss(ScalarCustomCss);
        });

        return endpoints;
    }
}

