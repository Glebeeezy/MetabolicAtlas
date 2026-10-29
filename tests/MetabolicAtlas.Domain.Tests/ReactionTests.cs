using MetabolicAtlas.Domain.Common.Exceptions;
using MetabolicAtlas.Domain.Core.Entities;
using MetabolicAtlas.Domain.Core.Enums;
using Xunit;

namespace MetabolicAtlas.Domain.Tests;

public class ReactionTests
{
    [Fact]
    public void Reaction_ShouldAddParticipant_WithPositiveStoichiometry()
    {
        // Arrange
        var reaction = new Reaction(Guid.NewGuid(), "R_TCA_01", "Citrate synthase reaction", ReactionDirection.ForwardOnly);
        var oxaloacetateId = Guid.NewGuid();

        // Act
        reaction.AddParticipant(oxaloacetateId, ParticipantRole.Substrate, 1.0m);

        // Assert
        Assert.Single(reaction.Participants);
        var participant = reaction.Participants.First();
        Assert.Equal(oxaloacetateId, participant.MetaboliteId);
        Assert.Equal(1.0m, participant.Stoichiometry);
        Assert.Equal(ParticipantRole.Substrate, participant.Role);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1.5)]
    public void Reaction_ShouldThrowValidationException_WhenStoichiometryNotPositive(decimal invalidStoichiometry)
    {
        // Arrange
        var reaction = new Reaction(Guid.NewGuid(), "R_TCA_01", "Reaction", ReactionDirection.ForwardOnly);

        // Act & Assert
        Assert.Throws<ValidationException>(() =>
            reaction.AddParticipant(Guid.NewGuid(), ParticipantRole.Substrate, invalidStoichiometry));
    }

    [Fact]
    public void Metabolite_ShouldAddNames_InMultipleLanguages()
    {
        // Arrange
        var metabolite = new Metabolite(Guid.NewGuid(), chemicalFormula: "C6H8O7", netCharge: -3);

        // Act
        metabolite.AddName("Цитрат", "ru", isPreferred: true, NameType.Common);
        metabolite.AddName("Citrate", "en", isPreferred: true, NameType.Common);

        // Assert
        Assert.Equal(2, metabolite.Names.Count);
        Assert.Contains(metabolite.Names, n => n.LanguageCode == "ru" && n.Name == "Цитрат");
        Assert.Contains(metabolite.Names, n => n.LanguageCode == "en" && n.Name == "Citrate");
    }
}
