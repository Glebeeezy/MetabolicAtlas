using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MetabolicAtlas.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "content");

            migrationBuilder.EnsureSchema(
                name: "core");

            migrationBuilder.EnsureSchema(
                name: "provenance");

            migrationBuilder.EnsureSchema(
                name: "pathways");

            migrationBuilder.CreateTable(
                name: "articles",
                schema: "content",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    RelatedEntityType = table.Column<string>(type: "text", nullable: true),
                    RelatedEntityId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_articles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "compartments",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_compartments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "enzymes",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EcNumber = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    UniprotId = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_enzymes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "metabolites",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ChemicalFormula = table.Column<string>(type: "text", nullable: true),
                    NetCharge = table.Column<int>(type: "integer", nullable: true),
                    InChIKey = table.Column<string>(type: "text", nullable: true),
                    InChI = table.Column<string>(type: "text", nullable: true),
                    Smiles = table.Column<string>(type: "text", nullable: true),
                    MonoisotopicMass = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_metabolites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "pathways",
                schema: "pathways",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Category = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pathways", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "reactions",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Direction = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reactions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "sources",
                schema: "provenance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Version = table.Column<string>(type: "text", nullable: true),
                    Url = table.Column<string>(type: "text", nullable: true),
                    License = table.Column<string>(type: "text", nullable: true),
                    LicenseUrl = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sources", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "article_translations",
                schema: "content",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ArticleId = table.Column<Guid>(type: "uuid", nullable: false),
                    LanguageCode = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Summary = table.Column<string>(type: "text", nullable: false),
                    BodyMarkdown = table.Column<string>(type: "text", nullable: false),
                    Version = table.Column<int>(type: "integer", nullable: false),
                    PublishedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_article_translations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_article_translations_articles_ArticleId",
                        column: x => x.ArticleId,
                        principalSchema: "content",
                        principalTable: "articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "metabolite_identifiers",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MetaboliteId = table.Column<Guid>(type: "uuid", nullable: false),
                    Namespace = table.Column<string>(type: "text", nullable: false),
                    Identifier = table.Column<string>(type: "text", nullable: false),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_metabolite_identifiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_metabolite_identifiers_metabolites_MetaboliteId",
                        column: x => x.MetaboliteId,
                        principalSchema: "core",
                        principalTable: "metabolites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "metabolite_names",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MetaboliteId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    LanguageCode = table.Column<string>(type: "text", nullable: false),
                    IsPreferred = table.Column<bool>(type: "boolean", nullable: false),
                    NameType = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_metabolite_names", x => x.Id);
                    table.ForeignKey(
                        name: "FK_metabolite_names_metabolites_MetaboliteId",
                        column: x => x.MetaboliteId,
                        principalSchema: "core",
                        principalTable: "metabolites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "map_layouts",
                schema: "pathways",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PathwayId = table.Column<Guid>(type: "uuid", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Version = table.Column<string>(type: "text", nullable: false),
                    Width = table.Column<double>(type: "double precision", nullable: false),
                    Height = table.Column<double>(type: "double precision", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_map_layouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_map_layouts_pathways_PathwayId",
                        column: x => x.PathwayId,
                        principalSchema: "pathways",
                        principalTable: "pathways",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "pathway_reactions",
                schema: "pathways",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PathwayId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReactionId = table.Column<Guid>(type: "uuid", nullable: false),
                    Ordinal = table.Column<int>(type: "integer", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pathway_reactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_pathway_reactions_pathways_PathwayId",
                        column: x => x.PathwayId,
                        principalSchema: "pathways",
                        principalTable: "pathways",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_pathway_reactions_reactions_ReactionId",
                        column: x => x.ReactionId,
                        principalSchema: "core",
                        principalTable: "reactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "reaction_enzymes",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ReactionId = table.Column<Guid>(type: "uuid", nullable: false),
                    EnzymeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reaction_enzymes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reaction_enzymes_enzymes_EnzymeId",
                        column: x => x.EnzymeId,
                        principalSchema: "core",
                        principalTable: "enzymes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_reaction_enzymes_reactions_ReactionId",
                        column: x => x.ReactionId,
                        principalSchema: "core",
                        principalTable: "reactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "reaction_participants",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ReactionId = table.Column<Guid>(type: "uuid", nullable: false),
                    MetaboliteId = table.Column<Guid>(type: "uuid", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    Stoichiometry = table.Column<decimal>(type: "numeric(18,4)", precision: 18, scale: 4, nullable: false),
                    CompartmentId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reaction_participants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reaction_participants_compartments_CompartmentId",
                        column: x => x.CompartmentId,
                        principalSchema: "core",
                        principalTable: "compartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_reaction_participants_metabolites_MetaboliteId",
                        column: x => x.MetaboliteId,
                        principalSchema: "core",
                        principalTable: "metabolites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_reaction_participants_reactions_ReactionId",
                        column: x => x.ReactionId,
                        principalSchema: "core",
                        principalTable: "reactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "evidences",
                schema: "provenance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceId = table.Column<Guid>(type: "uuid", nullable: false),
                    EntityType = table.Column<string>(type: "text", nullable: false),
                    EntityId = table.Column<Guid>(type: "uuid", nullable: false),
                    ExternalReferenceId = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_evidences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_evidences_sources_SourceId",
                        column: x => x.SourceId,
                        principalSchema: "provenance",
                        principalTable: "sources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "import_runs",
                schema: "provenance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceId = table.Column<Guid>(type: "uuid", nullable: false),
                    StartedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    TotalRecords = table.Column<int>(type: "integer", nullable: false),
                    ProcessedRecords = table.Column<int>(type: "integer", nullable: false),
                    ErrorsCount = table.Column<int>(type: "integer", nullable: false),
                    SummaryJson = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_import_runs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_import_runs_sources_SourceId",
                        column: x => x.SourceId,
                        principalSchema: "provenance",
                        principalTable: "sources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "map_elements",
                schema: "pathways",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MapLayoutId = table.Column<Guid>(type: "uuid", nullable: false),
                    ElementType = table.Column<int>(type: "integer", nullable: false),
                    EntityId = table.Column<Guid>(type: "uuid", nullable: true),
                    X = table.Column<double>(type: "double precision", nullable: false),
                    Y = table.Column<double>(type: "double precision", nullable: false),
                    Width = table.Column<double>(type: "double precision", nullable: false),
                    Height = table.Column<double>(type: "double precision", nullable: false),
                    Label = table.Column<string>(type: "text", nullable: false),
                    ColorHex = table.Column<string>(type: "text", nullable: true),
                    StylePropsJson = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_map_elements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_map_elements_map_layouts_MapLayoutId",
                        column: x => x.MapLayoutId,
                        principalSchema: "pathways",
                        principalTable: "map_layouts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "map_edges",
                schema: "pathways",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MapLayoutId = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceElementId = table.Column<Guid>(type: "uuid", nullable: false),
                    TargetElementId = table.Column<Guid>(type: "uuid", nullable: false),
                    EdgeType = table.Column<int>(type: "integer", nullable: false),
                    PathData = table.Column<string>(type: "text", nullable: true),
                    Arrowhead = table.Column<string>(type: "text", nullable: true),
                    StylePropsJson = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_map_edges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_map_edges_map_elements_SourceElementId",
                        column: x => x.SourceElementId,
                        principalSchema: "pathways",
                        principalTable: "map_elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_map_edges_map_elements_TargetElementId",
                        column: x => x.TargetElementId,
                        principalSchema: "pathways",
                        principalTable: "map_elements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_map_edges_map_layouts_MapLayoutId",
                        column: x => x.MapLayoutId,
                        principalSchema: "pathways",
                        principalTable: "map_layouts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_article_translations_ArticleId_LanguageCode",
                schema: "content",
                table: "article_translations",
                columns: new[] { "ArticleId", "LanguageCode" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_articles_Slug",
                schema: "content",
                table: "articles",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_compartments_Code",
                schema: "core",
                table: "compartments",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_enzymes_EcNumber",
                schema: "core",
                table: "enzymes",
                column: "EcNumber");

            migrationBuilder.CreateIndex(
                name: "IX_evidences_SourceId",
                schema: "provenance",
                table: "evidences",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_import_runs_SourceId",
                schema: "provenance",
                table: "import_runs",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_map_edges_MapLayoutId",
                schema: "pathways",
                table: "map_edges",
                column: "MapLayoutId");

            migrationBuilder.CreateIndex(
                name: "IX_map_edges_SourceElementId",
                schema: "pathways",
                table: "map_edges",
                column: "SourceElementId");

            migrationBuilder.CreateIndex(
                name: "IX_map_edges_TargetElementId",
                schema: "pathways",
                table: "map_edges",
                column: "TargetElementId");

            migrationBuilder.CreateIndex(
                name: "IX_map_elements_MapLayoutId_EntityId",
                schema: "pathways",
                table: "map_elements",
                columns: new[] { "MapLayoutId", "EntityId" });

            migrationBuilder.CreateIndex(
                name: "IX_map_layouts_Code",
                schema: "pathways",
                table: "map_layouts",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_map_layouts_PathwayId",
                schema: "pathways",
                table: "map_layouts",
                column: "PathwayId");

            migrationBuilder.CreateIndex(
                name: "IX_metabolite_identifiers_MetaboliteId",
                schema: "core",
                table: "metabolite_identifiers",
                column: "MetaboliteId");

            migrationBuilder.CreateIndex(
                name: "IX_metabolite_identifiers_Namespace_Identifier",
                schema: "core",
                table: "metabolite_identifiers",
                columns: new[] { "Namespace", "Identifier" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_metabolite_names_LanguageCode_Name",
                schema: "core",
                table: "metabolite_names",
                columns: new[] { "LanguageCode", "Name" });

            migrationBuilder.CreateIndex(
                name: "IX_metabolite_names_MetaboliteId",
                schema: "core",
                table: "metabolite_names",
                column: "MetaboliteId");

            migrationBuilder.CreateIndex(
                name: "IX_pathway_reactions_PathwayId",
                schema: "pathways",
                table: "pathway_reactions",
                column: "PathwayId");

            migrationBuilder.CreateIndex(
                name: "IX_pathway_reactions_ReactionId",
                schema: "pathways",
                table: "pathway_reactions",
                column: "ReactionId");

            migrationBuilder.CreateIndex(
                name: "IX_pathways_Code",
                schema: "pathways",
                table: "pathways",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_reaction_enzymes_EnzymeId",
                schema: "core",
                table: "reaction_enzymes",
                column: "EnzymeId");

            migrationBuilder.CreateIndex(
                name: "IX_reaction_enzymes_ReactionId",
                schema: "core",
                table: "reaction_enzymes",
                column: "ReactionId");

            migrationBuilder.CreateIndex(
                name: "IX_reaction_participants_CompartmentId",
                schema: "core",
                table: "reaction_participants",
                column: "CompartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_reaction_participants_MetaboliteId",
                schema: "core",
                table: "reaction_participants",
                column: "MetaboliteId");

            migrationBuilder.CreateIndex(
                name: "IX_reaction_participants_ReactionId",
                schema: "core",
                table: "reaction_participants",
                column: "ReactionId");

            migrationBuilder.CreateIndex(
                name: "IX_reactions_Code",
                schema: "core",
                table: "reactions",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_sources_Code",
                schema: "provenance",
                table: "sources",
                column: "Code",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "article_translations",
                schema: "content");

            migrationBuilder.DropTable(
                name: "evidences",
                schema: "provenance");

            migrationBuilder.DropTable(
                name: "import_runs",
                schema: "provenance");

            migrationBuilder.DropTable(
                name: "map_edges",
                schema: "pathways");

            migrationBuilder.DropTable(
                name: "metabolite_identifiers",
                schema: "core");

            migrationBuilder.DropTable(
                name: "metabolite_names",
                schema: "core");

            migrationBuilder.DropTable(
                name: "pathway_reactions",
                schema: "pathways");

            migrationBuilder.DropTable(
                name: "reaction_enzymes",
                schema: "core");

            migrationBuilder.DropTable(
                name: "reaction_participants",
                schema: "core");

            migrationBuilder.DropTable(
                name: "articles",
                schema: "content");

            migrationBuilder.DropTable(
                name: "sources",
                schema: "provenance");

            migrationBuilder.DropTable(
                name: "map_elements",
                schema: "pathways");

            migrationBuilder.DropTable(
                name: "enzymes",
                schema: "core");

            migrationBuilder.DropTable(
                name: "compartments",
                schema: "core");

            migrationBuilder.DropTable(
                name: "metabolites",
                schema: "core");

            migrationBuilder.DropTable(
                name: "reactions",
                schema: "core");

            migrationBuilder.DropTable(
                name: "map_layouts",
                schema: "pathways");

            migrationBuilder.DropTable(
                name: "pathways",
                schema: "pathways");
        }
    }
}
