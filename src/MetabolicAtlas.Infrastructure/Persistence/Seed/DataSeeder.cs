using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MetabolicAtlas.Domain.Core.Entities;
using MetabolicAtlas.Domain.Core.Enums;
using MetabolicAtlas.Domain.Pathways.Entities;
using MetabolicAtlas.Domain.Pathways.Enums;
using MetabolicAtlas.Domain.Content.Entities;
using MetabolicAtlas.Infrastructure.Persistence;

namespace MetabolicAtlas.Infrastructure.Persistence.Seed;

/// <summary>
/// Seeds scientific reference data for the TCA (Krebs) Cycle and the
/// Pyruvate Dehydrogenase Complex (link reaction) into a fresh database.
/// Safe to call on every startup — checks for existing data and exits early.
/// </summary>
public static class DataSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        await using var scope = services.CreateAsyncScope();
        var context = scope.ServiceProvider.GetRequiredService<MetabolicAtlasDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<MetabolicAtlasDbContext>>();

        // Guard: skip if already seeded
        if (await context.Metabolites.AnyAsync())
        {
            logger.LogInformation("DataSeeder: data already present, skipping.");
            return;
        }

        logger.LogInformation("DataSeeder: seeding TCA Cycle and Pyruvate Oxidation...");

        // ─────────────────────────────────────────────────────────────────────
        // COMPARTMENTS
        // ─────────────────────────────────────────────────────────────────────

        var mitochondrialMatrix = new Compartment(
            SeedIds.Compartment.MitochondrialMatrix,
            code: "MITO",
            name: "Mitochondrial matrix",
            description: "Innermost aqueous compartment of the mitochondrion where the TCA cycle and pyruvate oxidation take place.");

        var cytosol = new Compartment(
            SeedIds.Compartment.Cytosol,
            code: "CYTO",
            name: "Cytosol",
            description: "Liquid component of the cytoplasm surrounding organelles.");

        context.Compartments.AddRange(mitochondrialMatrix, cytosol);

        // ─────────────────────────────────────────────────────────────────────
        // METABOLITES — TCA cycle intermediates + co-substrates
        // ─────────────────────────────────────────────────────────────────────

        var pyruvate = CreateMetabolite(SeedIds.Met.Pyruvate,
            formula: "C3H3O3", netCharge: -1, mass: 87.0320m,
            inChIKey: "LCTONWCANYUPML-UHFFFAOYSA-M",
            enName: "Pyruvate", ruName: "Пируват",
            chebi: "CHEBI:15361");

        var acetylCoA = CreateMetabolite(SeedIds.Met.AcetylCoA,
            formula: "C23H34N7O17P3S", netCharge: -4, mass: 809.1258m,
            inChIKey: "ZSLZBFCDCINBEF-UHFFFAOYSA-N",
            enName: "Acetyl-CoA", ruName: "Ацетил-КоА",
            chebi: "CHEBI:57288");

        var oxaloacetate = CreateMetabolite(SeedIds.Met.Oxaloacetate,
            formula: "C4H2O5", netCharge: -2, mass: 130.0013m,
            inChIKey: "KHPXUQMNIQBQEV-UHFFFAOYSA-L",
            enName: "Oxaloacetate", ruName: "Оксалоацетат",
            chebi: "CHEBI:16452");

        var citrate = CreateMetabolite(SeedIds.Met.Citrate,
            formula: "C6H5O7", netCharge: -3, mass: 191.0197m,
            inChIKey: "KRKNYBCHXYNGOX-UHFFFAOYSA-K",
            enName: "Citrate", ruName: "Цитрат",
            chebi: "CHEBI:16947");

        var isocitrate = CreateMetabolite(SeedIds.Met.Isocitrate,
            formula: "C6H5O7", netCharge: -3, mass: 191.0197m,
            inChIKey: "ODBLHEXUDAPZAU-UHFFFAOYSA-N",
            enName: "Isocitrate", ruName: "Изоцитрат",
            chebi: "CHEBI:16087");

        var alphaKetoglutarate = CreateMetabolite(SeedIds.Met.AlphaKetoglutarate,
            formula: "C5H4O5", netCharge: -2, mass: 144.0166m,
            inChIKey: "KPGXRSRHYNQIFN-UHFFFAOYSA-L",
            enName: "2-Oxoglutarate", ruName: "α-Кетоглутарат",
            chebi: "CHEBI:16810",
            enSynonyms: ["Alpha-ketoglutarate", "2-Oxoglutaric acid"],
            ruSynonyms: ["2-Оксоглутарат", "α-Кетоглутаровая кислота"]);

        var succinylCoA = CreateMetabolite(SeedIds.Met.SuccinylCoA,
            formula: "C25H36N7O19P3S", netCharge: -5, mass: 867.1206m,
            inChIKey: "HCOWTJKLQGBQSQ-UHFFFAOYSA-N",
            enName: "Succinyl-CoA", ruName: "Сукцинил-КоА",
            chebi: "CHEBI:57292");

        var succinate = CreateMetabolite(SeedIds.Met.Succinate,
            formula: "C4H4O4", netCharge: -2, mass: 116.0109m,
            inChIKey: "KDYFGRWQOYBRFD-UHFFFAOYSA-L",
            enName: "Succinate", ruName: "Сукцинат",
            chebi: "CHEBI:30031");

        var fumarate = CreateMetabolite(SeedIds.Met.Fumarate,
            formula: "C4H2O4", netCharge: -2, mass: 114.0196m,
            inChIKey: "VZCYOOQTPOCHFL-OWOJBTEDSA-L",
            enName: "Fumarate", ruName: "Фумарат",
            chebi: "CHEBI:18012");

        var malate = CreateMetabolite(SeedIds.Met.Malate,
            formula: "C4H4O5", netCharge: -2, mass: 132.0266m,
            inChIKey: "BJEPYKJPYRNKOW-UHFFFAOYSA-L",
            enName: "L-Malate", ruName: "Малат",
            chebi: "CHEBI:15589");

        // Co-substrates
        var coa = CreateMetabolite(SeedIds.Met.CoA,
            formula: "C21H32N7O16P3S", netCharge: -4, mass: 763.0994m,
            inChIKey: "RGJOEKWQDUBAIZ-UHFFFAOYSA-N",
            enName: "Coenzyme A", ruName: "Кофермент А",
            chebi: "CHEBI:57287",
            enSynonyms: ["CoA-SH", "CoA"], ruSynonyms: ["КоА-SH", "КоА"]);

        var nadPlus = CreateMetabolite(SeedIds.Met.NadPlus,
            formula: "C21H26N7O14P2", netCharge: -1, mass: 662.0989m,
            inChIKey: "BAWFJGJZGIEFAR-NNYOXOHSSA-M",
            enName: "NAD⁺", ruName: "НАД⁺",
            chebi: "CHEBI:57540",
            enSynonyms: ["Nicotinamide adenine dinucleotide (oxidized)"],
            ruSynonyms: ["Никотинамидадениндинуклеотид (окисленный)"]);

        var nadh = CreateMetabolite(SeedIds.Met.Nadh,
            formula: "C21H27N7O14P2", netCharge: -2, mass: 663.1067m,
            inChIKey: "BOPGDPNILDQYTO-NNYOXOHSSA-L",
            enName: "NADH", ruName: "НАДН",
            chebi: "CHEBI:57945",
            enSynonyms: ["Nicotinamide adenine dinucleotide (reduced)"],
            ruSynonyms: ["Никотинамидадениндинуклеотид (восстановленный)"]);

        var fad = CreateMetabolite(SeedIds.Met.Fad,
            formula: "C27H31N9O15P2", netCharge: -2, mass: 783.1415m,
            inChIKey: "VWWQXMAJTJZDQX-UHFFFAOYSA-N",
            enName: "FAD", ruName: "ФАД",
            chebi: "CHEBI:57692",
            enSynonyms: ["Flavin adenine dinucleotide (oxidized)"],
            ruSynonyms: ["Флавинадениндинуклеотид (окисленный)"]);

        var fadh2 = CreateMetabolite(SeedIds.Met.Fadh2,
            formula: "C27H33N9O15P2", netCharge: -2, mass: 785.1572m,
            inChIKey: "CVIJJHQBSGFZOJ-UHFFFAOYSA-N",
            enName: "FADH₂", ruName: "ФАДН₂",
            chebi: "CHEBI:58307",
            enSynonyms: ["Flavin adenine dinucleotide (reduced)"],
            ruSynonyms: ["Флавинадениндинуклеотид (восстановленный)"]);

        var gdp = CreateMetabolite(SeedIds.Met.Gdp,
            formula: "C10H12N5O7P2", netCharge: -3, mass: 440.0169m,
            inChIKey: "QGWNDRXFNXRZMB-UHFFFAOYSA-N",
            enName: "GDP", ruName: "ГДФ",
            chebi: "CHEBI:58189");

        var gtp = CreateMetabolite(SeedIds.Met.Gtp,
            formula: "C10H12N5O10P3", netCharge: -4, mass: 520.0073m,
            inChIKey: "HDTRYLNUVZCQOY-UHFFFAOYSA-N",
            enName: "GTP", ruName: "ГТФ",
            chebi: "CHEBI:37565");

        var co2 = CreateMetabolite(SeedIds.Met.Co2,
            formula: "CO2", netCharge: 0, mass: 43.9898m,
            inChIKey: "CURLTUGMZLYLDI-UHFFFAOYSA-N",
            enName: "Carbon dioxide", ruName: "Углекислый газ",
            chebi: "CHEBI:16526",
            enSynonyms: ["CO₂"], ruSynonyms: ["CO₂"]);

        var water = CreateMetabolite(SeedIds.Met.Water,
            formula: "H2O", netCharge: 0, mass: 18.0106m,
            inChIKey: "XLYOFNOQVPJJNP-UHFFFAOYSA-N",
            enName: "Water", ruName: "Вода",
            chebi: "CHEBI:15377");

        var phosphate = CreateMetabolite(SeedIds.Met.Phosphate,
            formula: "H2O4P", netCharge: -1, mass: 95.9612m,
            inChIKey: "NBIIXXVUZAFLBC-UHFFFAOYSA-K",
            enName: "Phosphate", ruName: "Фосфат",
            chebi: "CHEBI:43474",
            enSynonyms: ["Inorganic phosphate", "Pi"], ruSynonyms: ["Неорганический фосфат", "Pi"]);

        var proton = CreateMetabolite(SeedIds.Met.Proton,
            formula: "H", netCharge: 1, mass: 1.0078m,
            inChIKey: "GPRLSGONYQIRFK-UHFFFAOYSA-N",
            enName: "Proton", ruName: "Протон",
            chebi: "CHEBI:15378",
            enSynonyms: ["H⁺"], ruSynonyms: ["H⁺"]);

        context.Metabolites.AddRange(
            pyruvate, acetylCoA, oxaloacetate, citrate, isocitrate,
            alphaKetoglutarate, succinylCoA, succinate, fumarate, malate,
            coa, nadPlus, nadh, fad, fadh2, gdp, gtp, co2, water, phosphate, proton);

        // ─────────────────────────────────────────────────────────────────────
        // ENZYMES
        // ─────────────────────────────────────────────────────────────────────

        var pdh = new Enzyme(SeedIds.Enzyme.PyruvateDehydrogenase,
            name: "Pyruvate dehydrogenase complex",
            ecNumber: "1.2.4.1",
            description: "Multi-enzyme complex that catalyzes the irreversible oxidative decarboxylation of pyruvate to acetyl-CoA. Links glycolysis to the TCA cycle.");

        var citrateSynthase = new Enzyme(SeedIds.Enzyme.CitrateSynthase,
            name: "Citrate synthase",
            ecNumber: "2.3.3.1",
            description: "Catalyzes the first step of the TCA cycle: condensation of acetyl-CoA with oxaloacetate to form citrate. The pace-setter enzyme of the cycle.");

        var aconitase = new Enzyme(SeedIds.Enzyme.Aconitase,
            name: "Aconitase",
            ecNumber: "4.2.1.3",
            description: "Catalyzes the reversible isomerization of citrate to isocitrate via the intermediate cis-aconitate. Contains an iron-sulfur [4Fe-4S] cluster.");

        var isocitrateDehydrogenase = new Enzyme(SeedIds.Enzyme.IsocitrateDehydrogenase,
            name: "Isocitrate dehydrogenase",
            ecNumber: "1.1.1.41",
            description: "Catalyzes the oxidative decarboxylation of isocitrate to α-ketoglutarate. Key regulatory step of the TCA cycle; allosterically activated by ADP.");

        var alphaKetoglutarateDehydrogenase = new Enzyme(SeedIds.Enzyme.AlphaKetoglutarateDehydrogenase,
            name: "Alpha-ketoglutarate dehydrogenase complex",
            ecNumber: "1.2.4.2",
            description: "Multi-enzyme complex catalyzing the oxidative decarboxylation of α-ketoglutarate to succinyl-CoA. Structurally analogous to PDH complex.");

        var succinylCoASynthetase = new Enzyme(SeedIds.Enzyme.SuccinylCoASynthetase,
            name: "Succinyl-CoA synthetase",
            ecNumber: "6.2.1.4",
            description: "Catalyzes the substrate-level phosphorylation: conversion of succinyl-CoA to succinate with coupled GTP synthesis from GDP and phosphate.");

        var succinateDehydrogenase = new Enzyme(SeedIds.Enzyme.SuccinateDehydrogenase,
            name: "Succinate dehydrogenase",
            ecNumber: "1.3.5.1",
            description: "Complex II of the mitochondrial electron transport chain. Oxidizes succinate to fumarate, reducing FAD to FADH₂. Directly embedded in the inner mitochondrial membrane.");

        var fumarase = new Enzyme(SeedIds.Enzyme.Fumarase,
            name: "Fumarase",
            ecNumber: "4.2.1.2",
            description: "Catalyzes the reversible hydration of fumarate to L-malate.");

        var malateDehydrogenase = new Enzyme(SeedIds.Enzyme.MalateDehydrogenase,
            name: "Malate dehydrogenase",
            ecNumber: "1.1.1.37",
            description: "Catalyzes the final step of the TCA cycle: reversible oxidation of L-malate to oxaloacetate, regenerating the oxaloacetate acceptor for the next cycle turn.");

        context.Enzymes.AddRange(
            pdh, citrateSynthase, aconitase, isocitrateDehydrogenase,
            alphaKetoglutarateDehydrogenase, succinylCoASynthetase,
            succinateDehydrogenase, fumarase, malateDehydrogenase);

        // ─────────────────────────────────────────────────────────────────────
        // REACTIONS — Link reaction + 8 TCA cycle steps
        // ─────────────────────────────────────────────────────────────────────

        // R0: Pyruvate → Acetyl-CoA (link reaction / pyruvate oxidation)
        var r0 = new Reaction(
            SeedIds.Rxn.PyruvateOxidation,
            code: "R_PDH",
            name: "Pyruvate oxidative decarboxylation",
            direction: ReactionDirection.ForwardOnly,
            description: "Irreversible bridge between glycolysis and the TCA cycle. Pyruvate is oxidatively decarboxylated to acetyl-CoA by the pyruvate dehydrogenase complex.");
        r0.AddParticipant(SeedIds.Met.Pyruvate, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r0.AddParticipant(SeedIds.Met.NadPlus, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r0.AddParticipant(SeedIds.Met.CoA, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r0.AddParticipant(SeedIds.Met.AcetylCoA, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r0.AddParticipant(SeedIds.Met.Nadh, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r0.AddParticipant(SeedIds.Met.Co2, ParticipantRole.Product, 1m);
        r0.AddParticipant(SeedIds.Met.Proton, ParticipantRole.Product, 1m);
        r0.AddEnzyme(SeedIds.Enzyme.PyruvateDehydrogenase);

        // R1: Acetyl-CoA + Oxaloacetate → Citrate (citrate synthase)
        var r1 = new Reaction(
            SeedIds.Rxn.CitrateSynthase,
            code: "R_CS",
            name: "Citrate synthase reaction",
            direction: ReactionDirection.ForwardOnly,
            description: "Step 1 of TCA. Acetyl-CoA condenses with oxaloacetate to form citrate. Strongly exergonic (ΔG°' = −31.5 kJ/mol), making it essentially irreversible.");
        r1.AddParticipant(SeedIds.Met.AcetylCoA, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r1.AddParticipant(SeedIds.Met.Oxaloacetate, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r1.AddParticipant(SeedIds.Met.Water, ParticipantRole.Substrate, 1m);
        r1.AddParticipant(SeedIds.Met.Citrate, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r1.AddParticipant(SeedIds.Met.CoA, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r1.AddParticipant(SeedIds.Met.Proton, ParticipantRole.Product, 1m);
        r1.AddEnzyme(SeedIds.Enzyme.CitrateSynthase);

        // R2: Citrate ⇌ Isocitrate (aconitase)
        var r2 = new Reaction(
            SeedIds.Rxn.Aconitase,
            code: "R_ACO",
            name: "Citrate isomerization to isocitrate",
            direction: ReactionDirection.Reversible,
            description: "Step 2 of TCA. Aconitase catalyzes the stereospecific isomerization of citrate to isocitrate via the intermediate cis-aconitate. The reaction involves dehydration then rehydration.");
        r2.AddParticipant(SeedIds.Met.Citrate, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r2.AddParticipant(SeedIds.Met.Isocitrate, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r2.AddParticipant(SeedIds.Met.Water, ParticipantRole.Cofactor, 1m);
        r2.AddEnzyme(SeedIds.Enzyme.Aconitase);

        // R3: Isocitrate → α-Ketoglutarate + CO₂ (isocitrate dehydrogenase)
        var r3 = new Reaction(
            SeedIds.Rxn.IsocitrateDehydrogenase,
            code: "R_IDH",
            name: "Isocitrate oxidative decarboxylation",
            direction: ReactionDirection.ForwardOnly,
            description: "Step 3 of TCA. First CO₂-releasing step and first NADH-producing step. Key regulatory point: IDH is allosterically activated by ADP and inhibited by ATP and NADH.");
        r3.AddParticipant(SeedIds.Met.Isocitrate, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r3.AddParticipant(SeedIds.Met.NadPlus, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r3.AddParticipant(SeedIds.Met.AlphaKetoglutarate, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r3.AddParticipant(SeedIds.Met.Nadh, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r3.AddParticipant(SeedIds.Met.Co2, ParticipantRole.Product, 1m);
        r3.AddParticipant(SeedIds.Met.Proton, ParticipantRole.Product, 1m);
        r3.AddEnzyme(SeedIds.Enzyme.IsocitrateDehydrogenase);

        // R4: α-Ketoglutarate → Succinyl-CoA + CO₂ (α-ketoglutarate dehydrogenase)
        var r4 = new Reaction(
            SeedIds.Rxn.AlphaKgDehydrogenase,
            code: "R_KGDH",
            name: "Alpha-ketoglutarate oxidative decarboxylation",
            direction: ReactionDirection.ForwardOnly,
            description: "Step 4 of TCA. Second CO₂-releasing step and second NADH-producing step. The α-ketoglutarate dehydrogenase complex is the rate-limiting step in many tissues.");
        r4.AddParticipant(SeedIds.Met.AlphaKetoglutarate, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r4.AddParticipant(SeedIds.Met.NadPlus, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r4.AddParticipant(SeedIds.Met.CoA, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r4.AddParticipant(SeedIds.Met.SuccinylCoA, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r4.AddParticipant(SeedIds.Met.Nadh, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r4.AddParticipant(SeedIds.Met.Co2, ParticipantRole.Product, 1m);
        r4.AddParticipant(SeedIds.Met.Proton, ParticipantRole.Product, 1m);
        r4.AddEnzyme(SeedIds.Enzyme.AlphaKetoglutarateDehydrogenase);

        // R5: Succinyl-CoA + GDP + Pi → Succinate + GTP (succinyl-CoA synthetase)
        var r5 = new Reaction(
            SeedIds.Rxn.SuccinylCoaSynthetase,
            code: "R_SCS",
            name: "Succinyl-CoA substrate-level phosphorylation",
            direction: ReactionDirection.Reversible,
            description: "Step 5 of TCA. Sole substrate-level phosphorylation step in the TCA cycle. Energy of the thioester bond in succinyl-CoA drives GTP synthesis.");
        r5.AddParticipant(SeedIds.Met.SuccinylCoA, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r5.AddParticipant(SeedIds.Met.Gdp, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r5.AddParticipant(SeedIds.Met.Phosphate, ParticipantRole.Substrate, 1m);
        r5.AddParticipant(SeedIds.Met.Succinate, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r5.AddParticipant(SeedIds.Met.Gtp, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r5.AddParticipant(SeedIds.Met.CoA, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r5.AddEnzyme(SeedIds.Enzyme.SuccinylCoASynthetase);

        // R6: Succinate → Fumarate (succinate dehydrogenase, Complex II)
        var r6 = new Reaction(
            SeedIds.Rxn.SuccinateDehydrogenase,
            code: "R_SDH",
            name: "Succinate oxidation to fumarate",
            direction: ReactionDirection.ForwardOnly,
            description: "Step 6 of TCA. Succinate dehydrogenase (Complex II) oxidizes succinate to fumarate and reduces FAD to FADH₂. This enzyme is the only TCA enzyme embedded in the inner mitochondrial membrane.");
        r6.AddParticipant(SeedIds.Met.Succinate, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r6.AddParticipant(SeedIds.Met.Fad, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r6.AddParticipant(SeedIds.Met.Fumarate, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r6.AddParticipant(SeedIds.Met.Fadh2, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r6.AddEnzyme(SeedIds.Enzyme.SuccinateDehydrogenase);

        // R7: Fumarate + H₂O ⇌ L-Malate (fumarase)
        var r7 = new Reaction(
            SeedIds.Rxn.Fumarase,
            code: "R_FUM",
            name: "Fumarate hydration to L-malate",
            direction: ReactionDirection.Reversible,
            description: "Step 7 of TCA. Fumarase (fumarate hydratase) catalyzes the stereospecific addition of water across the double bond of fumarate, producing exclusively L-malate.");
        r7.AddParticipant(SeedIds.Met.Fumarate, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r7.AddParticipant(SeedIds.Met.Water, ParticipantRole.Substrate, 1m);
        r7.AddParticipant(SeedIds.Met.Malate, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r7.AddEnzyme(SeedIds.Enzyme.Fumarase);

        // R8: L-Malate → Oxaloacetate (malate dehydrogenase)
        var r8 = new Reaction(
            SeedIds.Rxn.MalateDehydrogenase,
            code: "R_MDH",
            name: "L-Malate oxidation to oxaloacetate",
            direction: ReactionDirection.Reversible,
            description: "Step 8 of TCA. Malate dehydrogenase regenerates oxaloacetate for the next cycle turn, producing NADH. The reaction is thermodynamically unfavorable (ΔG°' = +29.7 kJ/mol) but driven forward by rapid consumption of oxaloacetate by citrate synthase.");
        r8.AddParticipant(SeedIds.Met.Malate, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r8.AddParticipant(SeedIds.Met.NadPlus, ParticipantRole.Substrate, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r8.AddParticipant(SeedIds.Met.Oxaloacetate, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r8.AddParticipant(SeedIds.Met.Nadh, ParticipantRole.Product, 1m, SeedIds.Compartment.MitochondrialMatrix);
        r8.AddParticipant(SeedIds.Met.Proton, ParticipantRole.Product, 1m);
        r8.AddEnzyme(SeedIds.Enzyme.MalateDehydrogenase);

        context.Reactions.AddRange(r0, r1, r2, r3, r4, r5, r6, r7, r8);

        // ─────────────────────────────────────────────────────────────────────
        // PATHWAYS
        // ─────────────────────────────────────────────────────────────────────

        // Pathway 1: Pyruvate oxidation (link reaction)
        var pyruvateOxidationPathway = new Pathway(
            SeedIds.Pathway.PyruvateOxidation,
            code: "PWY_PDH",
            name: "Pyruvate oxidation",
            description: "The pyruvate dehydrogenase complex (PDC) converts pyruvate — the end product of glycolysis — into acetyl-CoA, providing the substrate for the TCA cycle and fatty acid synthesis. It links carbohydrate catabolism to oxidative phosphorylation.",
            category: "Energy metabolism");
        pyruvateOxidationPathway.AddReaction(SeedIds.Rxn.PyruvateOxidation, ordinal: 1);

        // Pathway 2: TCA Cycle (Krebs cycle / citric acid cycle)
        var tcaPathway = new Pathway(
            SeedIds.Pathway.TcaCycle,
            code: "PWY_TCA",
            name: "TCA cycle",
            description: "The tricarboxylic acid cycle (Krebs cycle, citric acid cycle) is the central hub of aerobic cellular respiration. Per turn: 2 CO₂ released, 3 NADH + 1 FADH₂ + 1 GTP produced. Occurs in the mitochondrial matrix.",
            category: "Energy metabolism");
        tcaPathway.AddReaction(SeedIds.Rxn.CitrateSynthase, ordinal: 1);
        tcaPathway.AddReaction(SeedIds.Rxn.Aconitase, ordinal: 2);
        tcaPathway.AddReaction(SeedIds.Rxn.IsocitrateDehydrogenase, ordinal: 3);
        tcaPathway.AddReaction(SeedIds.Rxn.AlphaKgDehydrogenase, ordinal: 4);
        tcaPathway.AddReaction(SeedIds.Rxn.SuccinylCoaSynthetase, ordinal: 5);
        tcaPathway.AddReaction(SeedIds.Rxn.SuccinateDehydrogenase, ordinal: 6);
        tcaPathway.AddReaction(SeedIds.Rxn.Fumarase, ordinal: 7);
        tcaPathway.AddReaction(SeedIds.Rxn.MalateDehydrogenase, ordinal: 8);

        context.Pathways.AddRange(pyruvateOxidationPathway, tcaPathway);

        // ─────────────────────────────────────────────────────────────────────
        // MAP LAYOUT — TCA cycle canvas (circular arrangement)
        // ─────────────────────────────────────────────────────────────────────

        var tcaLayout = new MapLayout(
            SeedIds.Layout.TcaLayout,
            code: "MAP_TCA_V1",
            name: "TCA Cycle — Interactive Map",
            width: 1400,
            height: 1000,
            pathwayId: SeedIds.Pathway.TcaCycle,
            version: "1.0.0");

        // Metabolite nodes — arranged in a clockwise ring, center approx (700, 500)
        // The circle has radius ~350 px. Positions calculated for 8 intermediates.
        // OAA (top), Citrate (top-right), Isocitrate (right), α-KG (bottom-right),
        // Succinyl-CoA (bottom), Succinate (bottom-left), Fumarate (left), Malate (top-left)

        var elOaa     = AddMetaboliteNode(tcaLayout, SeedIds.Met.Oxaloacetate,    "Oxaloacetate\n(OAA)",   700,  80,  "#8B5CF6");
        var elCitrate = AddMetaboliteNode(tcaLayout, SeedIds.Met.Citrate,         "Citrate",               1060, 200, "#6366F1");
        var elIso     = AddMetaboliteNode(tcaLayout, SeedIds.Met.Isocitrate,      "Isocitrate",            1160, 490, "#6366F1");
        var elKg      = AddMetaboliteNode(tcaLayout, SeedIds.Met.AlphaKetoglutarate, "α-Ketoglutarate",    1000, 760, "#6366F1");
        var elSucCoA  = AddMetaboliteNode(tcaLayout, SeedIds.Met.SuccinylCoA,     "Succinyl-CoA",          640,  870, "#6366F1");
        var elSuc     = AddMetaboliteNode(tcaLayout, SeedIds.Met.Succinate,       "Succinate",             300,  760, "#6366F1");
        var elFum     = AddMetaboliteNode(tcaLayout, SeedIds.Met.Fumarate,        "Fumarate",              170,  490, "#6366F1");
        var elMal     = AddMetaboliteNode(tcaLayout, SeedIds.Met.Malate,          "Malate",                340,  200, "#6366F1");
        var elAcCoA   = AddMetaboliteNode(tcaLayout, SeedIds.Met.AcetylCoA,       "Acetyl-CoA",            400,  80,  "#10B981");

        // Reaction nodes — positioned between their substrate and product nodes
        var elR1 = AddReactionNode(tcaLayout, SeedIds.Rxn.CitrateSynthase,         "CS",   880, 120);
        var elR2 = AddReactionNode(tcaLayout, SeedIds.Rxn.Aconitase,               "ACO",  1130, 340);
        var elR3 = AddReactionNode(tcaLayout, SeedIds.Rxn.IsocitrateDehydrogenase, "IDH",  1110, 630);
        var elR4 = AddReactionNode(tcaLayout, SeedIds.Rxn.AlphaKgDehydrogenase,    "KGDH", 840,  830);
        var elR5 = AddReactionNode(tcaLayout, SeedIds.Rxn.SuccinylCoaSynthetase,   "SCS",  480,  870);
        var elR6 = AddReactionNode(tcaLayout, SeedIds.Rxn.SuccinateDehydrogenase,  "SDH",  240,  630);
        var elR7 = AddReactionNode(tcaLayout, SeedIds.Rxn.Fumarase,                "FUM",  250,  340);
        var elR8 = AddReactionNode(tcaLayout, SeedIds.Rxn.MalateDehydrogenase,     "MDH",  520,  120);

        // Edges (substrate→reaction→product, clockwise)
        tcaLayout.AddEdge(elAcCoA, elR1, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elOaa,   elR1, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elR1,    elCitrate, MapEdgeType.ReactionToProduct);

        tcaLayout.AddEdge(elCitrate, elR2, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elR2,      elIso, MapEdgeType.ReactionToProduct);

        tcaLayout.AddEdge(elIso, elR3, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elR3,  elKg, MapEdgeType.ReactionToProduct);

        tcaLayout.AddEdge(elKg, elR4, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elR4, elSucCoA, MapEdgeType.ReactionToProduct);

        tcaLayout.AddEdge(elSucCoA, elR5, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elR5,     elSuc, MapEdgeType.ReactionToProduct);

        tcaLayout.AddEdge(elSuc, elR6, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elR6,  elFum, MapEdgeType.ReactionToProduct);

        tcaLayout.AddEdge(elFum, elR7, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elR7,  elMal, MapEdgeType.ReactionToProduct);

        tcaLayout.AddEdge(elMal, elR8, MapEdgeType.SubstrateToReaction);
        tcaLayout.AddEdge(elR8,  elOaa, MapEdgeType.ReactionToProduct);

        context.MapLayouts.Add(tcaLayout);

        // ─────────────────────────────────────────────────────────────────────
        // ARTICLES
        // ─────────────────────────────────────────────────────────────────────

        var tcaArticle = new Article(
            SeedIds.Article.TcaCycle,
            slug: "tca-cycle",
            relatedEntityType: "Pathway",
            relatedEntityId: SeedIds.Pathway.TcaCycle);

        tcaArticle.AddTranslation(
            languageCode: "ru",
            title: "Цикл трикарбоновых кислот (ЦТК)",
            summary: "Центральный путь аэробного клеточного дыхания. За один оборот цикла образуется 3 НАДН, 1 ФАДН₂, 1 ГТФ и 2 молекулы CO₂.",
            bodyMarkdown: """
# Цикл трикарбоновых кислот (ЦТК)

Цикл трикарбоновых кислот (ЦТК), также известный как **цикл Кребса** или **цикл лимонной кислоты**, — центральный метаболический путь аэробного клеточного дыхания. Протекает в **матриксе митохондрий**.

## Биологическая роль

ЦТК выполняет двойную роль:
1. **Катаболическую** — окисляет ацетильные группы (из жиров, углеводов и аминокислот) до CO₂, сохраняя энергию в виде НАДН и ФАДН₂.
2. **Анаплеротическую** — служит источником углеродных скелетов для биосинтеза аминокислот, нуклеотидов, порфиринов и жирных кислот.

## Общий итог одного оборота

| Продукт | Количество |
|---|---|
| CO₂ | 2 молекулы |
| НАДН | 3 молекулы |
| ФАДН₂ | 1 молекула |
| ГТФ | 1 молекула |

## Реакции цикла

### 1. Цитратсинтаза (КФ 2.3.3.1)
Ацетил-КоА + Оксалоацетат → Цитрат

Первая и необратимая реакция. Конденсация ацетильной группы с оксалоацетатом — темп-задающий фермент цикла.

### 2. Аконитаза (КФ 4.2.1.3)
Цитрат ⇌ Изоцитрат

Стереоспецифическая изомеризация через промежуточное образование *цис*-аконитата.

### 3. Изоцитратдегидрогеназа (КФ 1.1.1.41)
Изоцитрат + НАД⁺ → α-Кетоглутарат + CO₂ + НАДН

Первая точка декарбоксилирования. Ключевой регуляторный фермент: активируется АДФ, ингибируется АТФ и НАДН.

### 4. α-Кетоглутаратдегидрогеназный комплекс (КФ 1.2.4.2)
α-Кетоглутарат + НАД⁺ + КоА → Сукцинил-КоА + CO₂ + НАДН

Второе декарбоксилирование. Структурно аналогичен пируватдегидрогеназному комплексу.

### 5. Сукцинил-КоА-синтетаза (КФ 6.2.1.4)
Сукцинил-КоА + ГДФ + Фосфат ⇌ Сукцинат + ГТФ + КоА

Единственное субстратное фосфорилирование в ЦТК. Энергия тиоэфирной связи используется для синтеза ГТФ.

### 6. Сукцинатдегидрогеназа (КФ 1.3.5.1) — Комплекс II
Сукцинат + ФАД → Фумарат + ФАДН₂

Единственный фермент ЦТК, встроенный в **внутреннюю мембрану митохондрий**. Является одновременно комплексом II цепи переноса электронов.

### 7. Фумараза (КФ 4.2.1.2)
Фумарат + H₂O ⇌ L-Малат

Стереоспецифическое гидратирование — образуется исключительно L-малат.

### 8. Малатдегидрогеназа (КФ 1.1.1.37)
L-Малат + НАД⁺ ⇌ Оксалоацетат + НАДН

Регенерирует оксалоацетат — акцептор для следующего оборота. Реакция термодинамически невыгодна (ΔG°' = +29,7 кДж/моль), но сдвигается вперёд за счёт потребления оксалоацетата цитратсинтазой.

## Регуляция

ЦТК регулируется преимущественно через соотношение **НАД⁺/НАДН** и **АДФ/АТФ**:
- При высоком уровне АТФ — изоцитратдегидрогеназа и α-кетоглутаратдегидрогеназа ингибируются.
- При высоком уровне НАДН — все три НАД⁺-зависимые дегидрогеназы работают медленнее.
- Кальций (Ca²⁺) активирует три ключевых фермента — при мышечном сокращении резко ускоряет цикл.
""");

        tcaArticle.AddTranslation(
            languageCode: "en",
            title: "Tricarboxylic Acid Cycle (TCA Cycle)",
            summary: "The central pathway of aerobic cellular respiration. Each turn of the cycle produces 3 NADH, 1 FADH₂, 1 GTP, and 2 CO₂ molecules.",
            bodyMarkdown: """
# Tricarboxylic Acid Cycle (TCA Cycle)

The tricarboxylic acid cycle (TCA cycle), also known as the **Krebs cycle** or **citric acid cycle**, is the central metabolic pathway of aerobic cellular respiration. It takes place in the **mitochondrial matrix**.

## Biological Role

The TCA cycle serves a dual purpose:
1. **Catabolic** — oxidizes acetyl groups (from fats, carbohydrates, and amino acids) to CO₂, conserving energy as NADH and FADH₂.
2. **Anaplerotic** — provides carbon skeletons for biosynthesis of amino acids, nucleotides, porphyrins, and fatty acids.

## Net Yield per Turn

| Product | Amount |
|---|---|
| CO₂ | 2 molecules |
| NADH | 3 molecules |
| FADH₂ | 1 molecule |
| GTP | 1 molecule |

## Regulation

The TCA cycle is primarily regulated by the **NAD⁺/NADH** and **ADP/ATP** ratios:
- High ATP levels inhibit isocitrate dehydrogenase and α-ketoglutarate dehydrogenase.
- High NADH levels slow all three NAD⁺-dependent dehydrogenases.
- Calcium (Ca²⁺) activates three key enzymes — during muscle contraction, the cycle accelerates sharply.
""");

        var pyruvateArticle = new Article(
            SeedIds.Article.PyruvateOxidation,
            slug: "pyruvate-oxidation",
            relatedEntityType: "Pathway",
            relatedEntityId: SeedIds.Pathway.PyruvateOxidation);

        pyruvateArticle.AddTranslation(
            languageCode: "ru",
            title: "Окисление пирувата (пируватдегидрогеназный комплекс)",
            summary: "Необратимая реакция окислительного декарбоксилирования пирувата до ацетил-КоА. Связывает гликолиз с циклом Кребса.",
            bodyMarkdown: """
# Окислительное декарбоксилирование пирувата

**Пируватдегидрогеназный комплекс (ПДК)** катализирует необратимое превращение пирувата в ацетил-КоА. Эта реакция является **связующим звеном** между гликолизом (протекающим в цитозоле) и ЦТК (протекающим в матриксе митохондрий).

## Реакция

**Пируват + НАД⁺ + КоА → Ацетил-КоА + НАДН + CO₂**

ΔG°' = −33,5 кДж/моль — реакция практически необратима в физиологических условиях.

## Строение комплекса

ПДК — мультиферментный комплекс из трёх компонентов:
| Субъединица | Фермент | КФ | Кофактор |
|---|---|---|---|
| E1 | Пируватдекарбоксилаза | 1.2.4.1 | ТПФ (тиаминпирофосфат) |
| E2 | Дигидролипоат-ацетилтрансфераза | 2.3.1.12 | Липоевая кислота, КоА |
| E3 | Дигидролипоатдегидрогеназа | 1.8.1.4 | ФАД, НАД⁺ |

## Регуляция

- **Ингибирование:** продукты реакции — ацетил-КоА и НАДН — по принципу отрицательной обратной связи.
- **Активация:** пируватдегидрогеназафосфатаза (активируется Ca²⁺ и инсулином) дефосфорилирует E1, активируя комплекс.
- **Инактивация:** пируватдегидрогеназакиназа фосфорилирует E1, блокируя комплекс при высоких АТФ/АДФ и ацетил-КоА/КоА.
""");

        context.Articles.AddRange(tcaArticle, pyruvateArticle);

        // ─────────────────────────────────────────────────────────────────────
        // SAVE
        // ─────────────────────────────────────────────────────────────────────
        await context.SaveChangesAsync();
        logger.LogInformation("DataSeeder: seeding complete — 21 metabolites, 9 enzymes, 9 reactions, 2 pathways, 1 map layout, 2 articles.");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Helpers
    // ─────────────────────────────────────────────────────────────────────────

    private static Metabolite CreateMetabolite(
        Guid id,
        string formula,
        int netCharge,
        decimal mass,
        string inChIKey,
        string enName,
        string ruName,
        string chebi,
        string[]? enSynonyms = null,
        string[]? ruSynonyms = null)
    {
        var m = new Metabolite(id, chemicalFormula: formula, netCharge: netCharge,
            inChIKey: inChIKey, monoisotopicMass: mass);
        m.AddName(enName, "en", isPreferred: true, NameType.Common);
        m.AddName(ruName, "ru", isPreferred: true, NameType.Common);
        foreach (var syn in enSynonyms ?? [])
            m.AddName(syn, "en", isPreferred: false, NameType.Synonym);
        foreach (var syn in ruSynonyms ?? [])
            m.AddName(syn, "ru", isPreferred: false, NameType.Synonym);
        m.AddIdentifier("CHEBI", chebi, isPrimary: true);
        return m;
    }

    /// <summary>Adds a metabolite node to the layout and returns its element ID.</summary>
    private static Guid AddMetaboliteNode(MapLayout layout, Guid entityId, string label,
        double x, double y, string color)
    {
        var id = Guid.NewGuid();
        layout.AddElement(MapElementType.Metabolite, entityId, x - 60, y - 22, 120, 44, label, color);
        // Return the ID of the element just added
        return layout.Elements.Last().Id;
    }

    /// <summary>Adds a reaction node (small diamond) and returns its element ID.</summary>
    private static Guid AddReactionNode(MapLayout layout, Guid entityId, string label,
        double x, double y)
    {
        layout.AddElement(MapElementType.Reaction, entityId, x - 20, y - 20, 40, 40, label, "#F59E0B");
        return layout.Elements.Last().Id;
    }
}

