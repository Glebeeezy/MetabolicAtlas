import {
  ALL_METABOLITES,
  HUMAN_METABOLITES,
  COFACTOR_METABOLITES,
  HUMAN_REACTIONS,
  HUMAN_CROSSROADS,
  SECTOR_LAYOUT_CONFIGS,
  PATHWAY_SUPER_HIGHWAYS,
  METABOLITE_LAYOUTS,
  REACTION_LAYOUTS,
} from './index';

describe('Metabolic Data Integrity & Topology Specs', () => {
  it('should have strictly unique UUIDs across all 53 metabolites', () => {
    const ids = new Set<string>();
    for (const met of ALL_METABOLITES) {
      expect(ids.has(met.id), `Duplicate metabolite UUID: ${met.id} (${met.code})`).toBe(false);
      ids.add(met.id);
    }
    expect(ids.size).toBe(53);
  });

  it('should have strictly unique codes across all 53 metabolites', () => {
    const codes = new Set<string>();
    for (const met of ALL_METABOLITES) {
      expect(codes.has(met.code), `Duplicate metabolite code: ${met.code}`).toBe(false);
      codes.add(met.code);
    }
    expect(codes.size).toBe(53);
  });

  it('should have strictly unique UUIDs across all 37 reactions', () => {
    const ids = new Set<string>();
    for (const rx of HUMAN_REACTIONS) {
      expect(ids.has(rx.id), `Duplicate reaction UUID: ${rx.id} (${rx.code})`).toBe(false);
      ids.add(rx.id);
    }
    expect(ids.size).toBe(37);
  });

  it('should have strictly unique codes across all 37 reactions', () => {
    const codes = new Set<string>();
    for (const rx of HUMAN_REACTIONS) {
      expect(codes.has(rx.code), `Duplicate reaction code: ${rx.code}`).toBe(false);
      codes.add(rx.code);
    }
    expect(codes.size).toBe(37);
  });

  it('should verify all reaction source and target metabolite IDs resolve to existing metabolites', () => {
    const metIdMap = new Map(ALL_METABOLITES.map((m) => [m.id, m]));

    for (const rx of HUMAN_REACTIONS) {
      expect(
        metIdMap.has(rx.sourceMetaboliteId),
        `Rx ${rx.code} unresolved sourceMetaboliteId: ${rx.sourceMetaboliteId}`
      ).toBe(true);

      expect(
        metIdMap.has(rx.targetMetaboliteId),
        `Rx ${rx.code} unresolved targetMetaboliteId: ${rx.targetMetaboliteId}`
      ).toBe(true);

      if (rx.secondarySourceId) {
        expect(
          metIdMap.has(rx.secondarySourceId),
          `Rx ${rx.code} unresolved secondarySourceId: ${rx.secondarySourceId}`
        ).toBe(true);
      }

      if (rx.secondaryTargetId) {
        expect(
          metIdMap.has(rx.secondaryTargetId),
          `Rx ${rx.code} unresolved secondaryTargetId: ${rx.secondaryTargetId}`
        ).toBe(true);
      }

      if (rx.branches) {
        for (const b of rx.branches) {
          expect(
            metIdMap.has(b.metaboliteId),
            `Rx ${rx.code} branch unresolved metaboliteId: ${b.metaboliteId}`
          ).toBe(true);
        }
      }
    }
  });

  it('should preserve all SVG structures and layouts for all 53 metabolites', () => {
    expect(METABOLITE_LAYOUTS.length).toBe(53);
    for (const layout of METABOLITE_LAYOUTS) {
      expect(layout.skeletalSvg).toBeTruthy();
      expect(Number.isFinite(layout.width)).toBe(true);
      expect(Number.isFinite(layout.height)).toBe(true);
    }

    // All 36 canvas tile metabolites must have positive dimensions
    for (const met of HUMAN_METABOLITES) {
      expect(met.width).toBeGreaterThan(0);
      expect(met.height).toBeGreaterThan(0);
    }

    // All 17 cofactor metabolites have isCofactor = true
    for (const met of COFACTOR_METABOLITES) {
      expect(met.isCofactor).toBe(true);
    }
  });

  it('should preserve all SVG paths and layout geometry for all 37 reactions', () => {
    expect(REACTION_LAYOUTS.length).toBe(37);
    for (const layout of REACTION_LAYOUTS) {
      expect(layout.pathData).toBeTruthy();
      expect(Number.isFinite(layout.tooltipX)).toBe(true);
      expect(Number.isFinite(layout.tooltipY)).toBe(true);
    }
  });

  it('should verify all 5 sector configs have valid geometry and bounding polygons', () => {
    expect(SECTOR_LAYOUT_CONFIGS.length).toBe(5);
    for (const sector of SECTOR_LAYOUT_CONFIGS) {
      expect(sector.sectorId).toBeTruthy();
      expect(sector.boundingPoly.length).toBeGreaterThanOrEqual(3);
      expect(sector.radiusMax).toBeGreaterThan(sector.radiusMin);
    }
  });

  it('should verify all 8 superhighways have valid SVG paths and flux definitions', () => {
    expect(PATHWAY_SUPER_HIGHWAYS.length).toBe(8);
    for (const hw of PATHWAY_SUPER_HIGHWAYS) {
      expect(hw.id).toBeTruthy();
      expect(hw.pathData).toBeTruthy();
      expect(hw.carbonFlux).toBeTruthy();
    }
  });

  it('should verify all 6 crossroads have valid coordinate geometries', () => {
    expect(HUMAN_CROSSROADS.length).toBe(6);
    for (const cr of HUMAN_CROSSROADS) {
      expect(cr.id).toBeTruthy();
      expect(Number.isFinite(cr.startX)).toBe(true);
      expect(Number.isFinite(cr.startY)).toBe(true);
      expect(Number.isFinite(cr.endX)).toBe(true);
      expect(Number.isFinite(cr.endY)).toBe(true);
    }
  });
});
