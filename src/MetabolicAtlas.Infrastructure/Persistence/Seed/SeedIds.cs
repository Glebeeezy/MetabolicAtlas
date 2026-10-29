namespace MetabolicAtlas.Infrastructure.Persistence.Seed;

/// <summary>
/// Deterministic well-known GUIDs for seed data across compartments, metabolites,
/// enzymes, reactions, pathways, layouts, and educational articles.
/// Uses standard RFC 4122 compatible hexadecimal UUIDs.
/// </summary>
public static class SeedIds
{
    public static class Compartment
    {
        public static readonly Guid MitochondrialMatrix = Guid.Parse("c0000001-0000-0000-0000-000000000001");
        public static readonly Guid Cytosol             = Guid.Parse("c0000001-0000-0000-0000-000000000002");
    }

    public static class Met
    {
        public static readonly Guid Pyruvate           = Guid.Parse("b0000001-0000-0000-0000-000000000001");
        public static readonly Guid AcetylCoA          = Guid.Parse("b0000001-0000-0000-0000-000000000002");
        public static readonly Guid Oxaloacetate       = Guid.Parse("b0000001-0000-0000-0000-000000000003");
        public static readonly Guid Citrate            = Guid.Parse("b0000001-0000-0000-0000-000000000004");
        public static readonly Guid Isocitrate         = Guid.Parse("b0000001-0000-0000-0000-000000000005");
        public static readonly Guid AlphaKetoglutarate = Guid.Parse("b0000001-0000-0000-0000-000000000006");
        public static readonly Guid SuccinylCoA        = Guid.Parse("b0000001-0000-0000-0000-000000000007");
        public static readonly Guid Succinate          = Guid.Parse("b0000001-0000-0000-0000-000000000008");
        public static readonly Guid Fumarate           = Guid.Parse("b0000001-0000-0000-0000-000000000009");
        public static readonly Guid Malate             = Guid.Parse("b0000001-0000-0000-0000-000000000010");
        public static readonly Guid CoA                = Guid.Parse("b0000001-0000-0000-0000-000000000011");
        public static readonly Guid NadPlus            = Guid.Parse("b0000001-0000-0000-0000-000000000012");
        public static readonly Guid Nadh               = Guid.Parse("b0000001-0000-0000-0000-000000000013");
        public static readonly Guid Fad                = Guid.Parse("b0000001-0000-0000-0000-000000000014");
        public static readonly Guid Fadh2              = Guid.Parse("b0000001-0000-0000-0000-000000000015");
        public static readonly Guid Gdp                = Guid.Parse("b0000001-0000-0000-0000-000000000016");
        public static readonly Guid Gtp                = Guid.Parse("b0000001-0000-0000-0000-000000000017");
        public static readonly Guid Co2                = Guid.Parse("b0000001-0000-0000-0000-000000000018");
        public static readonly Guid Water              = Guid.Parse("b0000001-0000-0000-0000-000000000019");
        public static readonly Guid Phosphate          = Guid.Parse("b0000001-0000-0000-0000-000000000020");
        public static readonly Guid Proton             = Guid.Parse("b0000001-0000-0000-0000-000000000021");
    }

    public static class Enzyme
    {
        public static readonly Guid PyruvateDehydrogenase           = Guid.Parse("e0000001-0000-0000-0000-000000000001");
        public static readonly Guid CitrateSynthase                 = Guid.Parse("e0000001-0000-0000-0000-000000000002");
        public static readonly Guid Aconitase                       = Guid.Parse("e0000001-0000-0000-0000-000000000003");
        public static readonly Guid IsocitrateDehydrogenase         = Guid.Parse("e0000001-0000-0000-0000-000000000004");
        public static readonly Guid AlphaKetoglutarateDehydrogenase = Guid.Parse("e0000001-0000-0000-0000-000000000005");
        public static readonly Guid SuccinylCoASynthetase           = Guid.Parse("e0000001-0000-0000-0000-000000000006");
        public static readonly Guid SuccinateDehydrogenase          = Guid.Parse("e0000001-0000-0000-0000-000000000007");
        public static readonly Guid Fumarase                        = Guid.Parse("e0000001-0000-0000-0000-000000000008");
        public static readonly Guid MalateDehydrogenase             = Guid.Parse("e0000001-0000-0000-0000-000000000009");
    }

    public static class Rxn
    {
        public static readonly Guid PyruvateOxidation       = Guid.Parse("d0000001-0000-0000-0000-000000000000");
        public static readonly Guid CitrateSynthase         = Guid.Parse("d0000001-0000-0000-0000-000000000001");
        public static readonly Guid Aconitase               = Guid.Parse("d0000001-0000-0000-0000-000000000002");
        public static readonly Guid IsocitrateDehydrogenase = Guid.Parse("d0000001-0000-0000-0000-000000000003");
        public static readonly Guid AlphaKgDehydrogenase    = Guid.Parse("d0000001-0000-0000-0000-000000000004");
        public static readonly Guid SuccinylCoaSynthetase   = Guid.Parse("d0000001-0000-0000-0000-000000000005");
        public static readonly Guid SuccinateDehydrogenase  = Guid.Parse("d0000001-0000-0000-0000-000000000006");
        public static readonly Guid Fumarase                = Guid.Parse("d0000001-0000-0000-0000-000000000007");
        public static readonly Guid MalateDehydrogenase     = Guid.Parse("d0000001-0000-0000-0000-000000000008");
    }

    public static class Pathway
    {
        public static readonly Guid PyruvateOxidation = Guid.Parse("f0000001-0000-0000-0000-000000000001");
        public static readonly Guid TcaCycle          = Guid.Parse("f0000001-0000-0000-0000-000000000002");
    }

    public static class Layout
    {
        public static readonly Guid TcaLayout = Guid.Parse("10000001-0000-0000-0000-000000000001");
    }

    public static class Article
    {
        public static readonly Guid TcaCycle          = Guid.Parse("a0000001-0000-0000-0000-000000000001");
        public static readonly Guid PyruvateOxidation = Guid.Parse("a0000001-0000-0000-0000-000000000002");
    }
}
