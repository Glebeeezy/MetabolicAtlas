import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AtlasStateService } from '../../core/services/atlas-state.service';
import { AtlasShellComponent, HUMAN_METABOLITES, HUMAN_REACTIONS } from './atlas-shell.component';

describe('AtlasShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasShellComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create the atlas shell component', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initialize with default reaction selected (Step 1 CS)', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.selectedReaction()).toBeTruthy();
    expect(component.selectedReaction()?.code).toBe('R_CS');
    expect(component.activeTab()).toBe('reaction');
  });

  it('should switch to molecule mode and clear reaction on metabolite click', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const citrate = HUMAN_METABOLITES.find((m) => m.code === 'MET_CITRATE')!;
    component.onMetaboliteClick(citrate);

    expect(component.selectedMetabolite()?.code).toBe('MET_CITRATE');
    expect(component.selectedReaction()).toBeNull();
    expect(component.activeTab()).toBe('molecule');
  });

  it('should switch to reaction mode and clear metabolite on reaction click', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const citrate = HUMAN_METABOLITES.find((m) => m.code === 'MET_CITRATE')!;
    component.onMetaboliteClick(citrate);
    expect(component.selectedMetabolite()?.code).toBe('MET_CITRATE');

    const sdh = HUMAN_REACTIONS.find((r) => r.code === 'R_SDH')!;
    component.onReactionClick(sdh);

    expect(component.selectedReaction()?.code).toBe('R_SDH');
    expect(component.selectedMetabolite()).toBeNull();
    expect(component.activeTab()).toBe('reaction');
  });

  it('should correctly lookup metabolites and cofactors by name for card linking', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    const oaa = component.findMetaboliteByName('Оксалоацетат');
    expect(oaa).toBeTruthy();
    expect(oaa?.code).toBe('MET_OAA');

    const succinyl = component.findMetaboliteByName('Сукцинил-КоА');
    expect(succinyl).toBeTruthy();
    expect(succinyl?.code).toBe('MET_SUCCINYL_COA');

    const nad = component.findMetaboliteByName('НАД⁺');
    expect(nad).toBeTruthy();
    expect(nad?.code).toBe('MET_NAD_PLUS');
    expect(nad?.isCofactor).toBe(true);

    const unknownMet = component.findMetaboliteByName('НесуществующееВещество');
    expect(unknownMet).toBeUndefined();
  });

  it('should select cofactor and open its passport on cofactor click', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.onCofactorClick('НАДН');
    expect(component.selectedMetabolite()?.code).toBe('MET_NADH');
    expect(component.selectedReaction()).toBeNull();
    expect(component.activeTab()).toBe('molecule');
  });

  it('should sort pathways prioritizing the active TCA cycle', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    const oaa = component.findMetaboliteByName('Оксалоацетат')!;
    const sorted = component.getSortedPathways(oaa);

    expect(sorted.current.length).toBeGreaterThan(0);
    expect(sorted.current[0].pathwayCode).toBe('PWY_TCA');
    expect(sorted.current[0].isCurrentPathway).toBe(true);
    expect(sorted.others.length).toBeGreaterThan(0);
  });

  it('should toggle flux animation and energy filters correctly', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    expect(component.isFluxAnimated()).toBe(false);
    component.toggleFluxAnimation();
    expect(component.isFluxAnimated()).toBe(true);

    expect(component.activeCarrierFilter()).toBeNull();
    component.toggleEnergyFilter('NADH');
    expect(component.activeCarrierFilter()).toBe('NADH');
    expect(component.selectedReaction()?.stepNumber).toBe(3);

    component.toggleEnergyFilter('NADH');
    expect(component.activeCarrierFilter()).toBeNull();
  });

  it('should find related reactions for a metabolite with their roles', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    const citrate = HUMAN_METABOLITES.find((m) => m.code === 'MET_CITRATE')!;
    const related = component.getReactionsForMetabolite(citrate.id);

    expect(related.length).toBeGreaterThanOrEqual(2);
    const cs = related.find((r) => r.rx.code === 'R_CS');
    expect(cs?.role).toBe('product');
    const aco = related.find((r) => r.rx.code === 'R_ACO');
    expect(aco?.role).toBe('substrate');
  });

  it('should correctly identify substrates and products of selected reaction', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const csReaction = HUMAN_REACTIONS.find((r) => r.code === 'R_CS')!;
    component.onReactionClick(csReaction);

    const oaaId = csReaction.sourceMetaboliteId;
    const acetylId = csReaction.secondarySourceId!;
    const citrateId = csReaction.targetMetaboliteId;

    expect(component.isSubstrateOfSelected(oaaId)).toBe(true);
    expect(component.isSubstrateOfSelected(acetylId)).toBe(true);
    expect(component.isProductOfSelected(citrateId)).toBe(true);
    expect(component.isSubstrateOfSelected(citrateId)).toBe(false);
    expect(component.isProductOfSelected(oaaId)).toBe(false);
  });

  it('should dim unrelated nodes when a reaction is selected', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const csReaction = HUMAN_REACTIONS.find((r) => r.code === 'R_CS')!;
    component.onReactionClick(csReaction);

    const succinate = HUMAN_METABOLITES.find((m) => m.code === 'MET_SUCCINATE')!;
    expect(component.isNodeDimmed(succinate.id)).toBe(true);

    const oaa = HUMAN_METABOLITES.find((m) => m.code === 'MET_OAA')!;
    expect(component.isNodeDimmed(oaa.id)).toBe(false);
  });

  it('should adjust zoom levels correctly within bounds', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.zoom()).toBe(100);

    component.zoomIn();
    expect(component.zoom()).toBe(115);

    component.zoomOut();
    expect(component.zoom()).toBe(100);

    component.resetZoom();
    expect(component.zoom()).toBe(100);
    expect(component.panX()).toBe(0);
    expect(component.panY()).toBe(0);
  });

  it('should close inspector when closeInspector is invoked', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.selectedReaction()).toBeTruthy();

    component.closeInspector();
    expect(component.selectedReaction()).toBeNull();
    expect(component.selectedMetabolite()).toBeNull();
  });

  it('should provide authentic 2D chemical structure SVGs for all metabolites and cofactors', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    for (const met of component.allMetabolites) {
      expect(met.structureSvg).toBeTruthy();
      expect(met.structureSvg).toContain('<svg');
      expect(met.structureSvg).toContain('molecule-structure-svg');
    }
  });

  it('should reposition Acetyl-CoA at global central hub (1520, 1560) without colliding with Reaction 8', () => {
    const acetyl = HUMAN_METABOLITES.find((m) => m.code === 'MET_ACETYL_COA')!;
    expect(acetyl.x).toBe(1520);
    expect(acetyl.y).toBe(1560);
    expect(acetyl.isHub).toBe(true);

    // Reaction 8 path connects Malate to OAA (x: 1270), safely clear from x: 1520
    const mdh = HUMAN_REACTIONS.find((r) => r.code === 'R_MDH')!;
    expect(mdh.pathData).toContain('1270 1706');
  });

  it('should calculate LOD level based on zoom correctly', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.zoom.set(35);
    expect(component.lodLevel()).toBe(1);

    component.zoom.set(65);
    expect(component.lodLevel()).toBe(2);

    component.zoom.set(115);
    expect(component.lodLevel()).toBe(3);
  });

  it('should have 5 sector continents and super-highways configured', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    expect(component.sectorConfigs.length).toBe(5);
    const tcaSector = component.sectorConfigs.find((s) => s.sectorId === 'PW-TCA-CYCLE');
    expect(tcaSector).toBeTruthy();
    expect(tcaSector?.centerX).toBe(1380);
    expect(tcaSector?.centerY).toBe(2110);

    const glySector = component.sectorConfigs.find((s) => s.sectorId === 'PW-GLYCOLISIS');
    expect(glySector).toBeTruthy();

    expect(component.superHighways.length).toBeGreaterThanOrEqual(6);
    const pdhHw = component.superHighways.find((h) => h.id === 'hw-gly-pdh');
    expect(pdhHw).toBeTruthy();
  });

  it('should verify Acetyl-CoA is the external metabolic hub and not an intermediate of TCA', () => {
    const acetyl = HUMAN_METABOLITES.find((m) => m.code === 'MET_ACETYL_COA')!;
    expect(acetyl.isHub).toBe(true);

    const tcaEntry = acetyl.pathwaysRu.find((p) => p.pathwayCode === 'PWY_TCA');
    expect(tcaEntry).toBeTruthy();
    expect(tcaEntry?.isCurrentPathway).toBe(false);
    expect(tcaEntry?.role).toBe('substrate');

    const hubEntry = acetyl.pathwaysRu.find((p) => p.pathwayCode === 'ALL');
    expect(hubEntry).toBeTruthy();
    expect(hubEntry?.isCurrentPathway).toBe(true);
  });

  it('should allow wheel zoom when cursor is over a sector polygon or reaction', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.zoom.set(100);

    // Simulate wheel event over a sector polygon
    const polygonTarget = document.createElement('polygon');
    polygonTarget.classList.add('sector-polygon');
    const wheelEvent = new WheelEvent('wheel', { deltaY: -100, bubbles: true });
    Object.defineProperty(wheelEvent, 'target', { value: polygonTarget });

    component.onWheel(wheelEvent);
    expect(component.zoom()).toBe(110);

    // When over inspector, zoom should be ignored
    const inspectorTarget = document.createElement('div');
    const inspectorEl = document.createElement('aside');
    inspectorEl.classList.add('context-inspector');
    inspectorEl.appendChild(inspectorTarget);
    const wheelEventInspector = new WheelEvent('wheel', { deltaY: -100, bubbles: true });
    Object.defineProperty(wheelEventInspector, 'target', { value: inspectorTarget });

    component.onWheel(wheelEventInspector);
    expect(component.zoom()).toBe(110); // unchanged
  });

  it('should perform global cross-highlighting when a cofactor is selected', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    // Click on NADH cofactor
    component.onCofactorClick('НАДН');
    expect(component.selectedCofactorName()).toBe('НАДН');

    // Reactions producing NADH (TCA: IDH, KGDH, MDH; Glycolysis: GAPDH; PDH) -> must NOT be dimmed
    const rxIdh = HUMAN_REACTIONS.find((r) => r.code === 'R_IDH')!;
    const rxKgdh = HUMAN_REACTIONS.find((r) => r.code === 'R_KGDH')!;
    const rxMdh = HUMAN_REACTIONS.find((r) => r.code === 'R_MDH')!;
    const rxGapdh = HUMAN_REACTIONS.find((r) => r.code === 'R_GAPDH')!;
    const rxPdh = HUMAN_REACTIONS.find((r) => r.code === 'R_PDH')!;
    expect(component.isReactionDimmed(rxIdh.id)).toBe(false);
    expect(component.isReactionDimmed(rxKgdh.id)).toBe(false);
    expect(component.isReactionDimmed(rxMdh.id)).toBe(false);
    expect(component.isReactionDimmed(rxGapdh.id)).toBe(false);
    expect(component.isReactionDimmed(rxPdh.id)).toBe(false);

    // Unrelated reactions (e.g. CS, ACO, SDH, HK, PFK1) MUST be dimmed
    const rxCs = HUMAN_REACTIONS.find((r) => r.code === 'R_CS')!;
    const rxAco = HUMAN_REACTIONS.find((r) => r.code === 'R_ACO')!;
    const rxSdh = HUMAN_REACTIONS.find((r) => r.code === 'R_SDH')!;
    const rxHk = HUMAN_REACTIONS.find((r) => r.code === 'R_HK')!;
    expect(component.isReactionDimmed(rxCs.id)).toBe(true);
    expect(component.isReactionDimmed(rxAco.id)).toBe(true);
    expect(component.isReactionDimmed(rxSdh.id)).toBe(true);
    expect(component.isReactionDimmed(rxHk.id)).toBe(true);
  });

  it('should link cofactors to their participating reactions in inspector', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    const nadh = component.findMetaboliteByName('НАДН')!;
    const nadhRxs = component.getReactionsForMetabolite(nadh.id);
    // 3 TCA (IDH, OGDH, MDH) + 2 Northern (GAPDH, PDH) = 5 reactions
    expect(nadhRxs.length).toBe(5);
    expect(nadhRxs.every((item) => item.role === 'product')).toBe(true);

    const nad = component.findMetaboliteByName('НАД⁺')!;
    const nadRxs = component.getReactionsForMetabolite(nad.id);
    // 3 TCA (IDH, OGDH, MDH) + 2 Northern (GAPDH, PDH) = 5 reactions
    expect(nadRxs.length).toBe(5);
    expect(nadRxs.every((item) => item.role === 'substrate')).toBe(true);
  });

  it('should verify Phase 2 Glycolysis & PDH cascade feeding directly into central Acetyl-CoA', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    // 1. Verify D-Glucose at top of Northern cascade
    const glucose = component.allMetabolites.find((m) => m.code === 'MET_GLUCOSE')!;
    expect(glucose).toBeTruthy();
    expect(glucose.x).toBe(1520);
    expect(glucose.y).toBe(280);

    // 2. Verify Cytosolic Pyruvate at end of 10-step glycolysis
    const pyrCyto = component.allMetabolites.find((m) => m.code === 'MET_PYRUVATE')!;
    expect(pyrCyto).toBeTruthy();
    expect(pyrCyto.y).toBe(1270);

    // 3. Verify MPC translocase across inner mitochondrial membrane
    const mpc = component.reactions.find((r) => r.code === 'R_MPC')!;
    expect(mpc).toBeTruthy();
    expect(mpc.sourceMetaboliteId).toBe(pyrCyto.id);

    const pyrMito = component.allMetabolites.find((m) => m.code === 'MET_PYR_MIT')!;
    expect(pyrMito).toBeTruthy();
    expect(pyrMito.y).toBe(1400);
    expect(mpc.targetMetaboliteId).toBe(pyrMito.id);

    // 4. Verify PDH complex feeding directly into central Acetyl-CoA
    const pdh = component.reactions.find((r) => r.code === 'R_PDH')!;
    expect(pdh).toBeTruthy();
    expect(pdh.sourceMetaboliteId).toBe(pyrMito.id);

    const acetylCoa = component.allMetabolites.find((m) => m.code === 'MET_ACETYL_COA')!;
    expect(acetylCoa).toBeTruthy();
    expect(pdh.targetMetaboliteId).toBe(acetylCoa.id);
    expect(acetylCoa.y).toBe(1560);
  });

  it('should focus camera on Glycolysis sector when PW-GLYCOLISIS pathway is selected', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const atlasState = TestBed.inject(AtlasStateService);
    atlasState.selectPathway('PW-GLYCOLISIS');
    fixture.detectChanges();

    // Zoom should focus on Northern sector (zoom: 65, centered at 1600, 850)
    expect(component.zoom()).toBe(65);
    expect(component.selectedReaction()?.code).toBe('R_HK');
  });

  it('should focus camera on PDH transition cluster when PW-PDH pathway is selected', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const atlasState = TestBed.inject(AtlasStateService);
    atlasState.selectPathway('PW-PDH');
    fixture.detectChanges();

    // Zoom should focus on PDH transition cluster (zoom: 95, centered at 1600, 1460)
    expect(component.zoom()).toBe(95);
    expect(component.selectedReaction()?.code).toBe('R_PDH');
  });

  it('should properly configure R_PDH cofactors with horizontal spacing dx and valid metabolite lookup', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    const pdh = component.reactions.find((r) => r.code === 'R_PDH')!;
    expect(pdh).toBeTruthy();
    expect(pdh.cofactorArc).toBeTruthy();

    const arc = pdh.cofactorArc!;
    expect(arc.inItems?.length).toBe(2);
    expect(arc.outItems?.length).toBe(2);

    // Verify horizontal dx offsets prevent text overlapping
    expect(arc.inItems![0].text).toBe('+ КоА-SH');
    expect(arc.inItems![0].name).toBe('Кофермент A (КоА-SH)');
    expect(arc.inItems![0].dx).toBe(-38);
    expect(arc.inItems![1].text).toBe('+ НАД⁺');
    expect(arc.inItems![1].name).toBe('НАД⁺');
    expect(arc.inItems![1].dx).toBe(30);

    expect(arc.outItems![0].text).toBe('НАДН');
    expect(arc.outItems![0].name).toBe('НАДН');
    expect(arc.outItems![0].dx).toBe(-34);
    expect(arc.outItems![1].text).toBe('+ CO₂ ↑');
    expect(arc.outItems![1].name).toBe('Диоксид углерода (CO₂)');
    expect(arc.outItems![1].dx).toBe(30);

    // Verify products name matches COFACTOR_METABOLITES
    expect(pdh.products.map((p) => p.name)).toContain('Диоксид углерода (CO₂)');
    const co2Metabolite = component.findMetaboliteByName('Диоксид углерода (CO₂)');
    expect(co2Metabolite).toBeTruthy();
    expect(co2Metabolite?.code).toBe('MET_CO2');

    // Verify finding by synonym and English name works seamlessly
    expect(component.findMetaboliteByName('Углекислый газ (CO₂)')?.code).toBe('MET_CO2');
    expect(component.findMetaboliteByName('Carbon dioxide (CO₂)')?.code).toBe('MET_CO2');
    expect(component.findMetabolite('Диоксид углерода (CO₂)', 'Carbon dioxide (CO₂)')?.code).toBe('MET_CO2');
  });

  it('should accurately resolve Glycolysis metabolites in both Russian and English without abbreviation prefix collisions', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    // Critical: Glucose-6-phosphate must NOT falsely resolve to Glucose (due to 'Глю' abbreviation)
    const g6pRu = component.findMetaboliteByName('Глюкозо-6-фосфат');
    expect(g6pRu).toBeTruthy();
    expect(g6pRu?.code).toBe('MET_G6P');

    const g6pEn = component.findMetaboliteByName('Glucose 6-phosphate');
    expect(g6pEn).toBeTruthy();
    expect(g6pEn?.code).toBe('MET_G6P');

    const glucoseRu = component.findMetaboliteByName('D-Глюкоза');
    expect(glucoseRu?.code).toBe('MET_GLUCOSE');

    const glucoseEn = component.findMetaboliteByName('D-Glucose');
    expect(glucoseEn?.code).toBe('MET_GLUCOSE');

    // Check dual helper findMetabolite
    expect(component.findMetabolite('Фруктозо-6-фосфат', 'Fructose 6-phosphate')?.code).toBe('MET_F6P');
    expect(component.findMetabolite('Дигидроксиацетонфосфат', 'Dihydroxyacetone phosphate')?.code).toBe('MET_DHAP');
    expect(component.findMetabolite('Глицеральдегид-3-фосфат', 'Glyceraldehyde 3-phosphate')?.code).toBe('MET_G3P');
  });

  it('should maintain bidirectional links for all intermediate Glycolysis metabolites', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    // G6P: product of Step 1 (HK), substrate of Step 2 (GPI)
    const g6p = component.allMetabolites.find((m) => m.code === 'MET_G6P')!;
    const g6pSteps = g6p.pathwaysRu.filter((p) => p.pathwayCode === 'PW-GLYCOLISIS');
    expect(g6pSteps.some((p) => p.reactionCode === 'R_HK' && p.role === 'product')).toBe(true);
    expect(g6pSteps.some((p) => p.reactionCode === 'R_GPI' && p.role === 'substrate')).toBe(true);

    // DHAP: product of Step 4 (ALDO), substrate of Step 5 (TPI)
    const dhap = component.allMetabolites.find((m) => m.code === 'MET_DHAP')!;
    const dhapSteps = dhap.pathwaysRu.filter((p) => p.pathwayCode === 'PW-GLYCOLISIS');
    expect(dhapSteps.some((p) => p.reactionCode === 'R_ALDO' && p.role === 'product')).toBe(true);
    expect(dhapSteps.some((p) => p.reactionCode === 'R_TPI' && p.role === 'substrate')).toBe(true);

    // DHAP related reactions in inspector must identify R_ALDO as product (via secondaryTargetId)
    const dhapRxs = component.getReactionsForMetabolite(dhap.id);
    const aldoRel = dhapRxs.find((x) => x.rx.code === 'R_ALDO');
    expect(aldoRel).toBeTruthy();
    expect(aldoRel?.role).toBe('product');

    // PEP: product of Step 9 (ENO), substrate of Step 10 (PK)
    const pep = component.allMetabolites.find((m) => m.code === 'MET_PEP')!;
    const pepSteps = pep.pathwaysRu.filter((p) => p.pathwayCode === 'PW-GLYCOLISIS');
    expect(pepSteps.some((p) => p.reactionCode === 'R_ENO' && p.role === 'product')).toBe(true);
    expect(pepSteps.some((p) => p.reactionCode === 'R_PK' && p.role === 'substrate')).toBe(true);
  });

  it('should provide authentic ATP accounting metadata and Aerobic vs Anaerobic power comparison', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    // Preparation / investment phase
    const rHk = component.reactions.find((r) => r.code === 'R_HK')!;
    expect(rHk.energyBalanceRu).toContain('-1 АТФ');
    expect(rHk.netAtpYieldRu).toContain('-1 АТФ');

    const rPfk1 = component.reactions.find((r) => r.code === 'R_PFK1')!;
    expect(rPfk1.energyBalanceRu).toContain('-1 АТФ');
    expect(rPfk1.netAtpYieldRu).toContain('-2 АТФ');

    // Payoff phase
    const rGapdh = component.reactions.find((r) => r.code === 'R_GAPDH')!;
    expect(rGapdh.energyBalanceRu).toContain('+2 НАДН');

    const rPgk = component.reactions.find((r) => r.code === 'R_PGK')!;
    expect(rPgk.energyBalanceRu).toContain('+2 АТФ');
    expect(rPgk.netAtpYieldRu).toContain('0 АТФ');

    const rPk = component.reactions.find((r) => r.code === 'R_PK')!;
    expect(rPk.energyBalanceRu).toContain('+2 АТФ');
    expect(rPk.netAtpYieldRu).toContain('+2 АТФ');
  });

  it('should integrate Galactose (Leloir pathway) and Fructose (Fructolysis) into glucose metabolism', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    // Galactose Leloir pathway integration
    const glucose = component.allMetabolites.find((m) => m.code === 'MET_GLUCOSE')!;
    expect(glucose.pathwaysRu.some((p) => p.pathwayCode === 'PWY_LELOIR')).toBe(true);

    const g6p = component.allMetabolites.find((m) => m.code === 'MET_G6P')!;
    expect(g6p.pathwaysRu.some((p) => p.pathwayCode === 'PWY_LELOIR')).toBe(true);

    // Fructose integration
    const f6p = component.allMetabolites.find((m) => m.code === 'MET_F6P')!;
    expect(f6p.pathwaysRu.some((p) => p.pathwayCode === 'PWY_FRUCTOLYSIS')).toBe(true);

    const dhap = component.allMetabolites.find((m) => m.code === 'MET_DHAP')!;
    expect(dhap.pathwaysRu.some((p) => p.pathwayCode === 'PWY_FRUCTOLYSIS')).toBe(true);

    const g3p = component.allMetabolites.find((m) => m.code === 'MET_G3P')!;
    expect(g3p.pathwaysRu.some((p) => p.pathwayCode === 'PWY_FRUCTOLYSIS')).toBe(true);

    // Canvas crossroads
    expect(component.crossroads.some((cr) => cr.id === 'cr-galactose-leloir')).toBe(true);
    expect(component.crossroads.some((cr) => cr.id === 'cr-fructose-entry')).toBe(true);
  });

  it('should enforce distinct pathway taxonomy and compartments across Glycolysis, MPC, PDH, and TCA', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    // Glycolysis: 10 steps in cytosol
    const glyRxs = component.reactions.filter((r) => r.pathwayCode === 'PW-GLYCOLISIS');
    expect(glyRxs.length).toBe(10);
    const glySteps = glyRxs.map((r) => r.stepNumber).sort((a, b) => (a ?? 0) - (b ?? 0));
    expect(glySteps).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(glyRxs.every((r) => r.compartmentRu === 'Цитозоль')).toBe(true);

    // MPC Gateway
    const mpcRx = component.reactions.find((r) => r.code === 'R_MPC')!;
    expect(mpcRx.pathwayCode).toBe('PW-MPC');
    expect(mpcRx.compartmentRu).toBe('Внутренняя мембрана митохондрий (ВММ)');

    // PDH Complex: Step 1 in matrix
    const pdhRx = component.reactions.find((r) => r.code === 'R_PDH')!;
    expect(pdhRx.pathwayCode).toBe('PW-PDH');
    expect(pdhRx.stepNumber).toBe(1);
    expect(pdhRx.compartmentRu).toBe('Матрикс митохондрий');

    // TCA Cycle: 8 steps in matrix
    const tcaRxs = component.reactions.filter((r) => r.pathwayCode === 'PW-TCA-CYCLE');
    expect(tcaRxs.length).toBe(8);
    const tcaSteps = tcaRxs.map((r) => r.stepNumber).sort((a, b) => (a ?? 0) - (b ?? 0));
    expect(tcaSteps).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(tcaRxs.every((r) => r.compartmentRu === 'Матрикс митохондрий')).toBe(true);
  });
});
