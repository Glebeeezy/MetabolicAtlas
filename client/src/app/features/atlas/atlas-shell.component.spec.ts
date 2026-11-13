import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AtlasStateService } from '../../core/services/atlas-state.service';
import { LocaleService } from '../../core/services/locale.service';
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
    expect(component.selectedReaction()?.code).toBe('R_GAPDH');
    expect(component.isReactionDimmed(HUMAN_REACTIONS.find((r) => r.code === 'R_PDH')!.id)).toBe(false);
    expect(component.isReactionDimmed(HUMAN_REACTIONS.find((r) => r.code === 'R_IDH')!.id)).toBe(false);
    expect(component.isReactionDimmed(HUMAN_REACTIONS.find((r) => r.code === 'R_HK')!.id)).toBe(true);

    component.toggleEnergyFilter('ATP');
    expect(component.activeCarrierFilter()).toBe('ATP');
    expect(component.selectedReaction()?.code).toBe('R_HK');
    expect(component.isReactionDimmed(HUMAN_REACTIONS.find((r) => r.code === 'R_GAPDH')!.id)).toBe(true);

    component.toggleEnergyFilter('ATP');
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

    // Reaction 8 circular arc connects Malate to OAA (x: 1364, y: 1766), safely clear from x: 1520
    const mdh = HUMAN_REACTIONS.find((r) => r.code === 'R_MDH')!;
    expect(mdh.pathData).toContain('A 420 420 0 0 1 1368 1840');
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
    expect(tcaSector?.centerX).toBe(1600);
    expect(tcaSector?.centerY).toBe(2190);

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
    // 3 TCA (IDH, OGDH, MDH) + 2 Northern (GAPDH, PDH) + 1 OxPhos (Complex I) = 6 reactions
    expect(nadhRxs.length).toBe(6);
    expect(nadhRxs.filter((item) => item.role === 'product').length).toBe(5);
    expect(nadhRxs.find((item) => item.rx.code === 'R_ETC_CI')?.role).toBe('substrate');

    const nad = component.findMetaboliteByName('НАД⁺')!;
    const nadRxs = component.getReactionsForMetabolite(nad.id);
    // 3 TCA (IDH, OGDH, MDH) + 2 Northern (GAPDH, PDH) + 1 OxPhos (Complex I) = 6 reactions
    expect(nadRxs.length).toBe(6);
    expect(nadRxs.filter((item) => item.role === 'substrate').length).toBe(5);
    expect(nadRxs.find((item) => item.rx.code === 'R_ETC_CI')?.role).toBe('product');
  });

  it('should verify Phase 2 Glycolysis & PDH cascade feeding directly into central Acetyl-CoA', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    // 1. Verify D-Glucose at top of Northern cascade
    const glucose = component.allMetabolites.find((m) => m.code === 'MET_GLUCOSE')!;
    expect(glucose).toBeTruthy();
    expect(glucose.x).toBe(1520);
    expect(glucose.y).toBe(-274);

    // 2. Verify Cytosolic Pyruvate at end of 10-step glycolysis
    const pyrCyto = component.allMetabolites.find((m) => m.code === 'MET_PYRUVATE')!;
    expect(pyrCyto).toBeTruthy();
    expect(pyrCyto.y).toBe(1166);

    // 3. Verify MPC translocase across inner mitochondrial membrane
    const mpc = component.reactions.find((r) => r.code === 'R_MPC')!;
    expect(mpc).toBeTruthy();
    expect(mpc.sourceMetaboliteId).toBe(pyrCyto.id);

    const pyrMito = component.allMetabolites.find((m) => m.code === 'MET_PYR_MIT')!;
    expect(pyrMito).toBeTruthy();
    expect(pyrMito.y).toBe(1356);
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
    const galCodes = ['MET_GALACTOSE', 'MET_GAL1P', 'MET_G1P', 'MET_UDP_GAL', 'MET_UDP_GLC'];
    for (const code of galCodes) {
      expect(component.allMetabolites.some((m) => m.code === code), `Missing metabolite ${code}`).toBe(true);
    }
    const galRxCodes = ['R_GALK1', 'R_GALT', 'R_GALE', 'R_PGM1'];
    for (const code of galRxCodes) {
      const rx = component.reactions.find((r) => r.code === code);
      expect(rx?.pathwayCode, `Expected PW-GALACTOSE for ${code}`).toBe('PW-GALACTOSE');
    }

    const glucose = component.allMetabolites.find((m) => m.code === 'MET_GLUCOSE')!;
    expect(glucose.pathwaysRu.some((p) => p.pathwayCode === 'PW-GALACTOSE')).toBe(true);
    expect(glucose.pathwaysRu.some((p) => p.pathwayCode === 'PW-FRUCTOSE')).toBe(true);

    const g6p = component.allMetabolites.find((m) => m.code === 'MET_G6P')!;
    expect(g6p.pathwaysRu.some((p) => p.pathwayCode === 'PW-GALACTOSE' && p.reactionCode === 'R_PGM1')).toBe(true);

    // Bidirectional connections on secondarySourceId / secondaryTargetId
    const udpGlc = component.allMetabolites.find((m) => m.code === 'MET_UDP_GLC')!;
    const udpGlcRxs = component.getReactionsForMetabolite(udpGlc.id);
    expect(udpGlcRxs.some((r) => r.rx.code === 'R_GALT' && r.role === 'substrate')).toBe(true);
    expect(udpGlcRxs.some((r) => r.rx.code === 'R_GALE' && r.role === 'product')).toBe(true);

    // Fructose integration (hepatic + extrahepatic)
    const fruCodes = ['MET_FRUCTOSE', 'MET_F1P', 'MET_GLYCERALDEHYDE'];
    for (const code of fruCodes) {
      expect(component.allMetabolites.some((m) => m.code === code), `Missing metabolite ${code}`).toBe(true);
    }
    const fruRxCodes = ['R_KHK', 'R_ALDOB', 'R_TKFC', 'R_HK_FRU'];
    for (const code of fruRxCodes) {
      const rx = component.reactions.find((r) => r.code === code);
      expect(rx?.pathwayCode, `Expected PW-FRUCTOSE for ${code}`).toBe('PW-FRUCTOSE');
    }

    const f6p = component.allMetabolites.find((m) => m.code === 'MET_F6P')!;
    expect(f6p.pathwaysRu.some((p) => p.pathwayCode === 'PW-FRUCTOSE' && p.reactionCode === 'R_HK_FRU')).toBe(true);

    const dhap = component.allMetabolites.find((m) => m.code === 'MET_DHAP')!;
    expect(dhap.pathwaysRu.some((p) => p.pathwayCode === 'PW-FRUCTOSE' && p.reactionCode === 'R_ALDOB')).toBe(true);
    expect(component.getReactionsForMetabolite(dhap.id).some((r) => r.rx.code === 'R_ALDOB' && r.role === 'product')).toBe(true);

    const g3p = component.allMetabolites.find((m) => m.code === 'MET_G3P')!;
    expect(g3p.pathwaysRu.some((p) => p.pathwayCode === 'PW-FRUCTOSE' && p.reactionCode === 'R_TKFC')).toBe(true);

    // Canvas crossroads (lactose, sucrose, and glycogen crossroads replaced by full nodes/reactions)
    expect(component.crossroads.some((cr) => cr.id === 'cr-g6pc-out')).toBe(true);
    expect(component.crossroads.some((cr) => cr.id === 'cr-galactose-in')).toBe(false);
    expect(component.crossroads.some((cr) => cr.id === 'cr-glycogen-out')).toBe(false);
    expect(component.crossroads.some((cr) => cr.id === 'cr-fructose-in')).toBe(false);

    // Disaccharides & Glycogen integration
    const glyAndDisacCodes = ['MET_GLYCOGEN', 'MET_LACTOSE', 'MET_SUCROSE'];
    for (const code of glyAndDisacCodes) {
      expect(component.allMetabolites.some((m) => m.code === code), `Missing metabolite ${code}`).toBe(true);
    }
    for (const code of ['R_UGP2', 'R_GYS', 'R_PYG']) {
      expect(component.reactions.find((r) => r.code === code)?.pathwayCode).toBe('PW-GLYCOGEN');
    }
    expect(component.reactions.find((r) => r.code === 'R_LCT')?.pathwayCode).toBe('PW-GALACTOSE');
    expect(component.reactions.find((r) => r.code === 'R_SI')?.pathwayCode).toBe('PW-FRUCTOSE');
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

  it('should hide hub orbit ring, metabolic hub badges, and reaction energy strip/comparison cards in UI while keeping Acetyl-CoA as the sole hub border', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    const rHk = component.reactions.find((r) => r.code === 'R_HK')!;
    component.onReactionClick(rHk);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    // 1. Only halo glow remains around Acetyl-CoA; dashed orbit ring is removed
    expect(el.querySelector('.central-hub-beacon .beacon-pulse-halo')).toBeTruthy();
    expect(el.querySelector('.beacon-orbit-ring')).toBeNull();

    // 2. Hub badge is removed from all metabolites, and only Acetyl-CoA keeps isHub border state
    const hubMetabolites = component.allMetabolites.filter((m) => m.isHub).map((m) => m.code);
    expect(hubMetabolites).toEqual(['MET_ACETYL_COA']);
    expect(el.querySelector('.role-badge-bg--hub')).toBeNull();
    expect(el.textContent).not.toContain('ХАБ МЕТАБОЛИЗМА');
    expect(el.textContent).not.toContain('METABOLIC HUB');
    expect(el.querySelectorAll('.metabolite-tile.is-hub').length).toBe(1);

    // 3. Step impact/net strip and Aerobic vs Anaerobic card are removed from reaction cards
    expect(el.querySelector('.rx-energy-strip')).toBeNull();
    expect(el.querySelector('.energetics-card')).toBeNull();
  });

  it('should provide generously spaced Glycolysis/MPC/PDH arrows without overlapping metabolite nodes', () => {
    const verticalGlySteps = ['R_HK', 'R_GPI', 'R_PFK1', 'R_ALDO', 'R_GAPDH', 'R_PGK', 'R_PGAM', 'R_ENO', 'R_PK'];
    for (const code of verticalGlySteps) {
      const rx = HUMAN_REACTIONS.find((r) => r.code === code)!;
      const nums = rx.pathData.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      const len = Math.hypot(nums[2] - nums[0], nums[3] - nums[1]);
      expect(len, `${code} vertical arrow length`).toBe(86);
    }

    const tpi = HUMAN_REACTIONS.find((r) => r.code === 'R_TPI')!;
    const tpiNums = tpi.pathData.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    expect(Math.hypot(tpiNums[2] - tpiNums[0], tpiNums[3] - tpiNums[1])).toBe(205);

    const mpc = HUMAN_REACTIONS.find((r) => r.code === 'R_MPC')!;
    const mpcNums = mpc.pathData.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    expect(Math.hypot(mpcNums[2] - mpcNums[0], mpcNums[3] - mpcNums[1])).toBe(116);

    const pdh = HUMAN_REACTIONS.find((r) => r.code === 'R_PDH')!;
    const pdhNums = pdh.pathData.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    expect(Math.hypot(pdhNums[2] - pdhNums[0], pdhNums[3] - pdhNums[1])).toBe(130);

    for (let i = 0; i < HUMAN_METABOLITES.length; i++) {
      for (let j = i + 1; j < HUMAN_METABOLITES.length; j++) {
        const a = HUMAN_METABOLITES[i];
        const b = HUMAN_METABOLITES[j];
        const overlaps =
          a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y;
        expect(overlaps, `Nodes ${a.code} and ${b.code} must not overlap`).toBe(false);
      }
    }
  });

  it('should not dim other metabolites when selecting a substance while still highlighting connected reactions', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const citrate = component.allMetabolites.find((m) => m.code === 'MET_CITRATE')!;
    const dhap = component.allMetabolites.find((m) => m.code === 'MET_DHAP')!;

    component.onMetaboliteClick(citrate);
    fixture.detectChanges();

    for (const m of component.allMetabolites) {
      expect(component.isNodeDimmed(m.id), `${m.code} should remain undimmed`).toBe(false);
    }
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.metabolite-tile.is-dimmed').length).toBe(0);

    const cs = component.reactions.find((r) => r.code === 'R_CS')!;
    const aco = component.reactions.find((r) => r.code === 'R_ACO')!;
    const hk = component.reactions.find((r) => r.code === 'R_HK')!;
    expect(component.isReactionDimmed(cs.id)).toBe(false);
    expect(component.isReactionDimmed(aco.id)).toBe(false);
    expect(component.isReactionDimmed(hk.id)).toBe(true);

    // Selecting DHAP should also keep secondary target reaction R_ALDO undimmed
    component.onMetaboliteClick(dhap);
    fixture.detectChanges();
    const aldo = component.reactions.find((r) => r.code === 'R_ALDO')!;
    expect(component.isReactionDimmed(aldo.id)).toBe(false);
  });

  it('should arrange all 8 TCA intermediates and circular arcs symmetrically around (1600, 2190) with R=420', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const tcaCodes = [
      'MET_OAA',
      'MET_CITRATE',
      'MET_ISOCITRATE',
      'MET_AKG',
      'MET_SUCCINYL_COA',
      'MET_SUCCINATE',
      'MET_FUMARATE',
      'MET_MALATE',
    ];
    for (const code of tcaCodes) {
      const m = HUMAN_METABOLITES.find((item) => item.code === code)!;
      const cx = m.x + m.width / 2;
      const cy = m.y + m.height / 2;
      const radius = Math.hypot(cx - 1600, cy - 2190);
      expect(Math.abs(radius - 420), `${code} center radius ${radius.toFixed(2)}`).toBeLessThan(1.5);
    }

    const tcaRxs = HUMAN_REACTIONS.filter((r) => r.pathwayCode === 'PW-TCA-CYCLE');
    expect(tcaRxs.length).toBe(8);
    for (const rx of tcaRxs) {
      expect(rx.pathData, `${rx.code} circular SVG arc`).toContain('A 420 420 0 0 1');
    }

    const el = fixture.nativeElement as HTMLElement;
    const guide = el.querySelector('.tca-guide-ring');
    expect(guide?.getAttribute('cx')).toBe('1600');
    expect(guide?.getAttribute('cy')).toBe('2190');
    expect(guide?.getAttribute('r')).toBe('420');

    component.focusOnTca();
    expect(component.panX()).toBe(0);
    expect(component.panY()).toBe(Math.round((1600 - 2190) * 0.85));
  });

  it('should resolve RU and EN names for Galactose and Fructose intermediates without prefix collisions', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    expect(component.findMetaboliteByName('D-Галактоза')?.code).toBe('MET_GALACTOSE');
    expect(component.findMetaboliteByName('Галактозо-1-фосфат')?.code).toBe('MET_GAL1P');
    expect(component.findMetaboliteByName('Глюкозо-1-фосфат')?.code).toBe('MET_G1P');
    expect(component.findMetaboliteByName('УДФ-галактоза')?.code).toBe('MET_UDP_GAL');
    expect(component.findMetaboliteByName('УДФ-глюкоза')?.code).toBe('MET_UDP_GLC');
    expect(component.findMetaboliteByName('D-Глюкоза')?.code).toBe('MET_GLUCOSE');
    expect(component.findMetaboliteByName('D-Фруктоза')?.code).toBe('MET_FRUCTOSE');
    expect(component.findMetaboliteByName('Фруктозо-1-фосфат')?.code).toBe('MET_F1P');
    expect(component.findMetaboliteByName('D-Глицеральдегид')?.code).toBe('MET_GLYCERALDEHYDE');
    expect(component.findMetaboliteByName('Глицеральдегид-3-фосфат')?.code).toBe('MET_G3P');

    expect(component.findMetaboliteByName('UDP-glucose')?.code).toBe('MET_UDP_GLC');
    expect(component.findMetaboliteByName('D-Glyceraldehyde')?.code).toBe('MET_GLYCERALDEHYDE');
    expect(component.findMetaboliteByName('Glyceraldehyde 3-phosphate')?.code).toBe('MET_G3P');
  });

  it('should focus camera, render sub-clusters, and match ALL catalog counts when selecting PW-GALACTOSE and PW-FRUCTOSE', () => {
    const atlasState = TestBed.inject(AtlasStateService);
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.leloir-cluster-boundary')).toBeTruthy();
    expect(el.querySelector('.glycogen-cluster-boundary')).toBeTruthy();
    expect(el.querySelector('.fructose-cluster-boundary')).toBeTruthy();

    const allCatalog = atlasState.pathways().find((p) => p.id === 'ALL')!;
    expect(allCatalog.reactionCount).toBe(HUMAN_REACTIONS.length);
    expect(allCatalog.metaboliteCount).toBe(HUMAN_METABOLITES.length);

    atlasState.selectPathway('PW-GALACTOSE');
    fixture.detectChanges();
    expect(component.selectedReaction()?.code).toBe('R_GALK1');
    expect(component.zoom()).toBe(80);
    expect(component.panX()).toBe(Math.round((1600 - 1100) * 0.8));
    expect(component.panY()).toBe(Math.round((1600 - -240) * 0.8));

    atlasState.selectPathway('PW-GLYCOGEN');
    fixture.detectChanges();
    expect(component.selectedReaction()?.code).toBe('R_GYS');
    expect(component.zoom()).toBe(85);
    expect(component.panX()).toBe(Math.round((1600 - 1320) * 0.85));
    expect(component.panY()).toBe(Math.round((1600 - -260) * 0.85));

    atlasState.selectPathway('PW-FRUCTOSE');
    fixture.detectChanges();
    expect(component.selectedReaction()?.code).toBe('R_KHK');
    expect(component.zoom()).toBe(80);
    expect(component.panX()).toBe(Math.round((1600 - 1990) * 0.8));
    expect(component.panY()).toBe(Math.round((1600 - 260) * 0.8));
  });

  it('should structure complex multi-branch reactions with non-overlapping junctions and clickable branches', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const expectedConfigs: Record<string, { label: string; branchCount: number }> = {
      R_ALDO: { label: 'ALDOA', branchCount: 3 },
      R_ALDOB: { label: 'ALDOB', branchCount: 3 },
      R_GALT: { label: 'GALT', branchCount: 4 },
      R_CS: { label: 'CS', branchCount: 3 },
      R_LCT: { label: 'LCT', branchCount: 3 },
      R_SI: { label: 'SI', branchCount: 3 },
    };

    const el = fixture.nativeElement as HTMLElement;
    const reactionGroups = Array.from(el.querySelectorAll('g[ma-reaction-arrow]'));

    for (const [code, cfg] of Object.entries(expectedConfigs)) {
      const rxIndex = component.reactions.findIndex((r) => r.code === code);
      expect(rxIndex).toBeGreaterThanOrEqual(0);
      const rx = component.reactions[rxIndex];

      expect(rx.junction?.label).toBe(cfg.label);
      expect(rx.branches?.length).toBe(cfg.branchCount);

      // Geometry guard: junction pill must never overlap any metabolite tile box
      const j = rx.junction!;
      const halfW = (j.width ?? 52) / 2;
      const halfH = (j.height ?? 20) / 2;
      for (const met of HUMAN_METABOLITES) {
        const overlapsX = j.x + halfW > met.x && j.x - halfW < met.x + met.width;
        const overlapsY = j.y + halfH > met.y && j.y - halfH < met.y + met.height;
        expect(overlapsX && overlapsY).toBe(false);
      }

      // Clickability check: every branch hitbox and the junction pill select the reaction
      const rxGroup = reactionGroups[rxIndex];
      const hitboxes = Array.from(rxGroup.querySelectorAll('path.reaction-hitbox'));
      expect(hitboxes.length).toBe(cfg.branchCount);

      for (const hitbox of hitboxes) {
        component.selectedReaction.set(null);
        hitbox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        fixture.detectChanges();
        expect(component.selectedReaction()?.code).toBe(code);
      }

      const junctionEl = rxGroup.querySelector('g.reaction-junction');
      expect(junctionEl).toBeTruthy();
      component.selectedReaction.set(null);
      junctionEl!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();
      expect(component.selectedReaction()?.code).toBe(code);
    }
  });

  it('should render opposing dual lanes without marker-start for all reversible atlas reactions', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const reactionGroups = Array.from(el.querySelectorAll('g[ma-reaction-arrow]'));
    expect(reactionGroups.length).toBe(component.reactions.length);

    component.reactions.forEach((rx, idx) => {
      const groupEl = reactionGroups[idx];
      if (rx.isReversible) {
        const dualLines = groupEl.querySelectorAll('path.reaction-line--dual');
        const expectedSegments = rx.branches?.length ?? 1;
        expect(dualLines.length).toBe(expectedSegments * 2);
        dualLines.forEach((line) => {
          expect(line.getAttribute('marker-start')).toBeNull();
          expect(line.getAttribute('marker-end')).toBe('url(#rx-arrowhead-dual)');
        });
      }
    });
  });

  it('should hide covered corridor superhighways at LOD 2+ so reactions stay clickable cleanly', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.zoom.set(35);
    fixture.detectChanges();
    expect(component.lodLevel()).toBe(1);
    expect(component.visibleSuperHighways().some((h) => h.id === 'hw-gly-pdh')).toBe(true);
    expect(component.visibleSuperHighways().some((h) => h.id === 'hw-hub-tca')).toBe(true);

    component.zoom.set(80);
    fixture.detectChanges();
    expect(component.lodLevel()).toBe(2);
    expect(component.visibleSuperHighways().some((h) => h.id === 'hw-gly-pdh')).toBe(false);
    expect(component.visibleSuperHighways().some((h) => h.id === 'hw-hub-tca')).toBe(false);
  });

  it('should render simplified abbrev cards at LOD 1 and full tiles + enzyme badges at LOD 2+', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    const el = fixture.nativeElement as HTMLElement;

    component.zoom.set(35);
    fixture.detectChanges();
    expect(component.lodLevel()).toBe(1);
    expect(el.querySelectorAll('.metabolite-tile__abbrev').length).toBe(component.canvasMetabolites.length);
    expect(el.querySelectorAll('.metabolite-tile__formula').length).toBe(0);
    expect(el.querySelectorAll('g.reaction-enzyme-badge').length).toBe(0);

    component.zoom.set(80);
    fixture.detectChanges();
    expect(component.lodLevel()).toBe(2);
    expect(el.querySelectorAll('.metabolite-tile__abbrev').length).toBe(0);
    expect(el.querySelectorAll('.metabolite-tile__title').length).toBe(component.canvasMetabolites.length);
    expect(el.querySelectorAll('.metabolite-tile__formula').length).toBe(component.canvasMetabolites.length);
    // 37 reactions - 6 junction reactions - R_MPC (has dedicated gateway marker) = 30 enzyme arrow badges
    expect(el.querySelectorAll('g.reaction-enzyme-badge').length).toBe(30);
  });

  it('should render pathway labels, reversibility signs, and clickable allosteric effector chips in inspector', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    const el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    const pfk = HUMAN_REACTIONS.find((r) => r.code === 'R_PFK1')!;
    component.onReactionClick(pfk);
    fixture.detectChanges();

    expect(el.querySelector('.inspector-header__type')?.textContent).toContain('Гликолиз • Стадия 3 из 10');
    expect(el.querySelector('.rev-pill')?.textContent).toContain('Необратимая');
    expect(el.querySelector('.flux-divider-arrow')?.textContent?.trim()).toBe('➔');

    // Clickable allosteric inhibitor chip (e.g. Цитрат or АТФ) navigates directly to metabolite view
    const clickableChip = Array.from(el.querySelectorAll('button.reg-chip.is-clickable'))[0] as HTMLButtonElement;
    expect(clickableChip).toBeTruthy();
    clickableChip.click();
    fixture.detectChanges();
    expect(component.selectedMetabolite()).toBeTruthy();
    expect(component.selectedReaction()).toBeNull();

    // Reversible reaction updates inspector arrow, role badges, and localized Leloir header
    const galt = HUMAN_REACTIONS.find((r) => r.code === 'R_GALT')!;
    component.onReactionClick(galt);
    fixture.detectChanges();
    expect(el.querySelector('.inspector-header__type')?.textContent).toContain('Путь Лелуара');
    expect(el.querySelector('.rev-pill')?.textContent).toContain('Обратимая');
    expect(el.querySelector('.flux-divider-arrow')?.textContent?.trim()).toBe('⇄');
    expect(Array.from(el.querySelectorAll('.role-badge-text')).some((n) => n.textContent?.includes('⇄'))).toBe(true);
  });

  it('should render localized Russian enzyme labels on canvas badges, junctions, and MPC gateway and switch cleanly to EN', () => {
    const localeService = TestBed.inject(LocaleService);
    localeService.setLocale('ru');

    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    const el = fixture.nativeElement as HTMLElement;
    try {
      // Every reaction defines a localized Russian map label
      for (const rx of HUMAN_REACTIONS) {
        expect(rx.enzymeShortRu).toBeTruthy();
        if (rx.junction) {
          expect(rx.junction.labelRu).toBeTruthy();
        }
      }

      component.zoom.set(80);
      fixture.detectChanges();

      const ruBadges = Array.from(el.querySelectorAll('g.reaction-enzyme-badge-text, .reaction-enzyme-badge-text'))
        .map((n) => n.textContent?.trim() ?? '');
      expect(ruBadges).toContain('ФФК-1');
      expect(ruBadges).toContain('Енолаза');
      expect(ruBadges).toContain('Фумараза');
      expect(ruBadges).toContain('Сукц.-КоА синт.');
      expect(ruBadges).toContain('ПДХ');
      expect(ruBadges).toContain('УДФГ-пироф.');
      expect(ruBadges).toContain('Гликогенсинтаза');
      expect(ruBadges).toContain('Гликогенфосфор.');

      const ruJunctions = Array.from(el.querySelectorAll('.reaction-junction-label'))
        .map((n) => n.textContent?.trim() ?? '');
      expect(ruJunctions).toEqual(['АЛДО-A', 'ГАЛТ', 'АЛДО-B', 'ЦС', 'Лактаза', 'Сахараза']);
      expect(el.querySelector('.mpc-channel-text')?.textContent?.trim()).toBe('МПЦ1/2');

      localeService.setLocale('en');
      fixture.detectChanges();

      const enBadges = Array.from(el.querySelectorAll('.reaction-enzyme-badge-text'))
        .map((n) => n.textContent?.trim() ?? '');
      expect(enBadges).toContain('PFK-1');
      expect(enBadges).toContain('ENO1');
      expect(enBadges).toContain('FH');
      expect(enBadges).toContain('SUCLG2');
      expect(enBadges).toContain('PDH');
      expect(enBadges).toContain('UGP2');
      expect(enBadges).toContain('GYS1/2 + GBE1');
      expect(enBadges).toContain('PYGL/M + AGL');

      const enJunctions = Array.from(el.querySelectorAll('.reaction-junction-label'))
        .map((n) => n.textContent?.trim() ?? '');
      expect(enJunctions).toEqual(['ALDOA', 'GALT', 'ALDOB', 'CS', 'LCT', 'SI']);
      expect(el.querySelector('.mpc-channel-text')?.textContent?.trim()).toBe('MPC1/2');
    } finally {
      localeService.setLocale('ru');
    }
  });

  it('should support clickable UTP/UDP/PPi cofactors without Pi or UDP-Glc token collisions and clickable LOD 1 subpathway cards', () => {
    const atlasState = TestBed.inject(AtlasStateService);
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    const el = fixture.nativeElement as HTMLElement;

    const metUtp = component.allMetabolites.find((m) => m.code === 'MET_UTP')!;
    const metUdp = component.allMetabolites.find((m) => m.code === 'MET_UDP')!;
    const metPpi = component.allMetabolites.find((m) => m.code === 'MET_PPI')!;
    const metPi = component.allMetabolites.find((m) => m.code === 'MET_PI')!;
    expect(metUtp && metUdp && metPpi && metPi).toBeTruthy();

    // MET_UDP must match R_GYS product UDP without false-matching UDP-glucose in R_GALT/R_GALE/R_UGP2
    const udpRxs = component.getReactionsForMetabolite(metUdp.id).map((r) => r.rx.code);
    expect(udpRxs).toEqual(['R_GYS']);

    // MET_PPI must match R_UGP2 while MET_PI matches phosphorolysis R_PYG without matching PPi
    expect(component.getReactionsForMetabolite(metPpi.id).map((r) => r.rx.code)).toEqual(['R_UGP2']);
    const piRxCodes = component.getReactionsForMetabolite(metPi.id).map((r) => r.rx.code);
    expect(piRxCodes).toContain('R_PYG');
    expect(piRxCodes).not.toContain('R_UGP2');

    // Macro LOD 1 renders clickable subpathway anchor cards that select & focus PW-GLYCOGEN
    component.zoom.set(35);
    fixture.detectChanges();
    const cards = Array.from(el.querySelectorAll('.macro-subpathway-card'));
    expect(cards.length).toBe(3);

    const glycogenCard = cards.find((c) => c.getAttribute('aria-label')?.includes('гликоген')) as SVGElement;
    expect(glycogenCard).toBeTruthy();
    glycogenCard.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(atlasState.selectedPathwayId()).toBe('PW-GLYCOGEN');
    expect(component.selectedReaction()?.code).toBe('R_GYS');
  });

  it('should render OxPhos crista compartment, 5 decorative complexes, proton gradient, and focus camera on PW-OXPHOS', () => {
    const atlasState = TestBed.inject(AtlasStateService);
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    // Verify OxPhos Crista compartment & decorative complex structures in SVG
    expect(el.querySelector('.oxphos-cluster-rect')).toBeTruthy();
    expect(el.querySelector('.oxphos-ims-band')).toBeTruthy();
    expect(el.querySelectorAll('.membrane-complex-deco').length).toBe(5);

    // Verify localized complex labels in Russian
    const complexSubsRu = Array.from(el.querySelectorAll('.membrane-complex-deco .complex-sub')).map((s) => s.textContent?.trim());
    expect(complexSubsRu).toContain('НАДН-Q');
    expect(complexSubsRu).toContain('СДГ');
    expect(complexSubsRu).toContain('Цит. bc₁');
    expect(complexSubsRu).toContain('ЦОК');
    expect(complexSubsRu).toContain('F₁ АТФ');

    // Switch to English and verify localized labels
    const localeService = TestBed.inject(LocaleService);
    localeService.setLocale('en');
    fixture.detectChanges();

    const complexSubsEn = Array.from(el.querySelectorAll('.membrane-complex-deco .complex-sub')).map((s) => s.textContent?.trim());
    expect(complexSubsEn).toContain('NADH-Q');
    expect(complexSubsEn).toContain('SDH');
    expect(complexSubsEn).toContain('Cyt bc₁');
    expect(complexSubsEn).toContain('COX');
    expect(complexSubsEn).toContain('F₁ ATP');

    // Restore Russian
    localeService.setLocale('ru');
    fixture.detectChanges();

    // Verify Proton Gradient Layer & PMF badge
    expect(el.querySelector('.proton-gradient-layer')).toBeTruthy();
    expect(el.querySelector('.pmf-badge-bg')).toBeTruthy();
    expect(el.querySelectorAll('.proton-vector-line').length).toBeGreaterThanOrEqual(1);

    // Verify OxPhos metabolites exist on canvas with authentic formulas
    const qh2 = component.canvasMetabolites.find((m) => m.code === 'MET_QH2');
    const cytc = component.canvasMetabolites.find((m) => m.code === 'MET_CYT_C');
    const o2 = component.canvasMetabolites.find((m) => m.code === 'MET_O2');
    const h2o = component.canvasMetabolites.find((m) => m.code === 'MET_METABOLIC_H2O');
    expect(qh2 && cytc && o2 && h2o).toBeTruthy();
    expect(qh2?.formula).toBe('C₅₉H₉₂O₄');
    expect(o2?.formula).toBe('O₂');
    expect(h2o?.formula).toBe('H₂O');

    // Selecting PW-OXPHOS should center camera on crista and select Step 1 (Complex I)
    atlasState.selectPathway('PW-OXPHOS');
    fixture.detectChanges();

    expect(component.zoom()).toBe(75);
    expect(component.panY()).toBe(Math.round((1600 - 3020) * 0.75));
    expect(component.selectedReaction()?.code).toBe('R_ETC_CI');
    expect(component.activeTab()).toBe('reaction');

    // Context pill should display OxPhos localized text
    const pill = el.querySelector('.context-pill__label')?.textContent?.trim();
    expect(pill).toContain('Дыхательная цепь');

    // HUD quick OxPhos button
    component.zoom.set(100);
    component.focusOnOxphos();
    expect(component.zoom()).toBe(75);
    expect(component.panY()).toBe(Math.round((1600 - 3020) * 0.75));
  });
});
