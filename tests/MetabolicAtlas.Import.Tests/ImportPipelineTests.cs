using MetabolicAtlas.Import.Models;
using MetabolicAtlas.Import.Services;
using MetabolicAtlas.Application.Common.Interfaces;
using Moq;
using Xunit;

namespace MetabolicAtlas.Import.Tests;

public class ImportPipelineTests
{
    [Fact]
    public async Task ExecuteImportAsync_ShouldDetectEmptyExternalId_AndRecordValidationIssue()
    {
        // Arrange
        var mockContext = new Mock<IMetabolicAtlasDbContext>();
        var pipeline = new ImportPipeline(mockContext.Object);

        var records = new List<StagingRecord>
        {
            new StagingRecord("", "RHEA", "{}", DateTime.UtcNow),
            new StagingRecord("RHEA:10001", "RHEA", "{}", DateTime.UtcNow)
        };

        // Act
        var report = await pipeline.ExecuteImportAsync("RHEA", records);

        // Assert
        Assert.Equal(2, report.TotalProcessed);
        Assert.Equal(1, report.AddedCount);
        Assert.Equal(1, report.SkippedCount);
        Assert.Single(report.Issues);
        Assert.Equal("ERR_EMPTY_ID", report.Issues[0].Code);
    }
}
