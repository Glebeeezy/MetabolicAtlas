using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc;
using MetabolicAtlas.Application.DTOs;
using MetabolicAtlas.Domain.Common.Exceptions;
using MetabolicAtlas.IntegrationTests.Factories;
using Moq;
using Xunit;

namespace MetabolicAtlas.IntegrationTests;

/// <summary>
/// Integration tests verifying the Core Read API endpoints (Pathways, Metabolites, Reactions, Enzymes).
/// </summary>
public class CoreEndpointTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;
    private readonly TestWebApplicationFactory _factory;

    public CoreEndpointTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetPathways_ReturnsOk_WithPathwayList()
    {
        // Act
        var response = await _client.GetAsync("/api/v1/pathways");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var pathways = await response.Content.ReadFromJsonAsync<IReadOnlyList<PathwaySummaryDto>>();
        Assert.NotNull(pathways);
        Assert.NotEmpty(pathways);
        Assert.Contains(pathways, p => p.Code == "PWY_TCA");
    }

    [Fact]
    public async Task GetPathwayById_ReturnsOk_WhenExists()
    {
        // Arrange
        var pathwayId = Guid.NewGuid();
        var expected = new PathwayDetailDto(
            pathwayId,
            "PWY_TCA",
            "TCA Cycle",
            "Central respiration hub",
            "Energy",
            [
                new PathwayReactionDto(Guid.NewGuid(), "R_CS", "Citrate synthase", 1)
            ]);

        _factory.PathwayServiceMock
            .Setup(s => s.GetPathwayByIdAsync(pathwayId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        // Act
        var response = await _client.GetAsync($"/api/v1/pathways/{pathwayId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var pathway = await response.Content.ReadFromJsonAsync<PathwayDetailDto>();
        Assert.NotNull(pathway);
        Assert.Equal("PWY_TCA", pathway.Code);
        Assert.Single(pathway.Reactions);
    }

    [Fact]
    public async Task GetPathwayById_Returns404ProblemDetails_WhenNotFound()
    {
        // Arrange
        var missingId = Guid.NewGuid();
        _factory.PathwayServiceMock
            .Setup(s => s.GetPathwayByIdAsync(missingId, It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException("Pathway", missingId));

        // Act
        var response = await _client.GetAsync($"/api/v1/pathways/{missingId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var problem = await response.Content.ReadFromJsonAsync<ProblemDetails>();
        Assert.NotNull(problem);
        Assert.Equal(404, problem.Status);
        Assert.Contains(missingId.ToString(), problem.Detail ?? string.Empty);
    }

    [Fact]
    public async Task GetMetaboliteById_ReturnsOk_WithLocalizedData()
    {
        // Arrange
        var metId = Guid.NewGuid();
        var expected = new MetaboliteDto(
            metId,
            "Цитрат",
            "C6H5O7",
            -3,
            191.0197m,
            ["Citrate", "Лимонная кислота"],
            new Dictionary<string, string> { ["CHEBI"] = "CHEBI:16947" });

        _factory.MetaboliteServiceMock
            .Setup(s => s.GetMetaboliteByIdAsync(metId, "ru", It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        // Act
        var response = await _client.GetAsync($"/api/v1/metabolites/{metId}?lang=ru");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var dto = await response.Content.ReadFromJsonAsync<MetaboliteDto>();
        Assert.NotNull(dto);
        Assert.Equal("Цитрат", dto.PrimaryName);
        Assert.Equal("C6H5O7", dto.Formula);
        Assert.Equal(-3, dto.NetCharge);
        Assert.Contains("CHEBI", dto.ExternalIdentifiers.Keys);
    }

    [Fact]
    public async Task GetReactionById_ReturnsOk_WithParticipantsAndStoichiometry()
    {
        // Arrange
        var rxnId = Guid.NewGuid();
        var expected = new ReactionDto(
            rxnId,
            "R_CS",
            "Citrate synthase reaction",
            "ForwardOnly",
            false,
            "First step of TCA",
            [
                new ReactionParticipantDto(Guid.NewGuid(), "Ацетил-КоА", "Substrate", 1.0m, "Mitochondrial matrix"),
                new ReactionParticipantDto(Guid.NewGuid(), "Цитрат", "Product", 1.0m, "Mitochondrial matrix")
            ]);

        _factory.ReactionServiceMock
            .Setup(s => s.GetReactionByIdAsync(rxnId, "ru", It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        // Act
        var response = await _client.GetAsync($"/api/v1/reactions/{rxnId}?lang=ru");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var reaction = await response.Content.ReadFromJsonAsync<ReactionDto>();
        Assert.NotNull(reaction);
        Assert.Equal("R_CS", reaction.Code);
        Assert.Equal(2, reaction.Participants.Count);
        Assert.Contains(reaction.Participants, p => p.Role == "Substrate" && p.Stoichiometry == 1.0m);
    }

    [Fact]
    public async Task GetEnzymes_ReturnsOk_WithList()
    {
        // Act
        var response = await _client.GetAsync("/api/v1/enzymes");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var enzymes = await response.Content.ReadFromJsonAsync<IReadOnlyList<EnzymeDto>>();
        Assert.NotNull(enzymes);
        Assert.NotEmpty(enzymes);
        Assert.Contains(enzymes, e => e.EcNumber == "2.3.3.1");
    }

    [Fact]
    public async Task GetEnzymeById_ReturnsOk_WhenExists()
    {
        // Arrange
        var enzymeId = Guid.NewGuid();
        var expected = new EnzymeDto(enzymeId, "1.1.1.37", "Malate dehydrogenase", "P40926", "Step 8 of TCA");

        _factory.EnzymeServiceMock
            .Setup(s => s.GetEnzymeByIdAsync(enzymeId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expected);

        // Act
        var response = await _client.GetAsync($"/api/v1/enzymes/{enzymeId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var enzyme = await response.Content.ReadFromJsonAsync<EnzymeDto>();
        Assert.NotNull(enzyme);
        Assert.Equal("1.1.1.37", enzyme.EcNumber);
        Assert.Equal("Malate dehydrogenase", enzyme.Name);
    }
}

