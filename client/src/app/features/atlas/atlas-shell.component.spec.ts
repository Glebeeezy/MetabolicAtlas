import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
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

  it('should reposition Acetyl-CoA above Reaction 1 without colliding with Reaction 8', () => {
    const acetyl = HUMAN_METABOLITES.find((m) => m.code === 'MET_ACETYL_COA')!;
    expect(acetyl.x).toBe(870);
    expect(acetyl.y).toBe(35);

    // Reaction 8 path connects Malate (x: 290..430) to OAA (x: 640), totally free from x: 870
    const mdh = HUMAN_REACTIONS.find((r) => r.code === 'R_MDH')!;
    expect(mdh.pathData).toContain('M 390 190');
  });

  it('should perform global cross-highlighting when a cofactor is selected', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    // Click on NADH cofactor
    component.onCofactorClick('НАДН');
    expect(component.selectedCofactorName()).toBe('НАДН');

    // Reactions 3, 4, 8 produce NADH -> must NOT be dimmed
    const rx3 = HUMAN_REACTIONS.find((r) => r.stepNumber === 3)!;
    const rx4 = HUMAN_REACTIONS.find((r) => r.stepNumber === 4)!;
    const rx8 = HUMAN_REACTIONS.find((r) => r.stepNumber === 8)!;
    expect(component.isReactionDimmed(rx3.id)).toBe(false);
    expect(component.isReactionDimmed(rx4.id)).toBe(false);
    expect(component.isReactionDimmed(rx8.id)).toBe(false);

    // Unrelated reactions (e.g. Step 1 CS, Step 2 ACO, Step 6 SDH) MUST be dimmed
    const rx1 = HUMAN_REACTIONS.find((r) => r.stepNumber === 1)!;
    const rx2 = HUMAN_REACTIONS.find((r) => r.stepNumber === 2)!;
    const rx6 = HUMAN_REACTIONS.find((r) => r.stepNumber === 6)!;
    expect(component.isReactionDimmed(rx1.id)).toBe(true);
    expect(component.isReactionDimmed(rx2.id)).toBe(true);
    expect(component.isReactionDimmed(rx6.id)).toBe(true);
  });

  it('should link cofactors to their participating TCA cycle reactions in inspector', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;

    const nadh = component.findMetaboliteByName('НАДН')!;
    const nadhRxs = component.getReactionsForMetabolite(nadh.id);
    expect(nadhRxs.length).toBe(3);
    expect(nadhRxs.every((item) => item.role === 'product')).toBe(true);

    const nad = component.findMetaboliteByName('НАД⁺')!;
    const nadRxs = component.getReactionsForMetabolite(nad.id);
    expect(nadRxs.length).toBe(3);
    expect(nadRxs.every((item) => item.role === 'substrate')).toBe(true);
  });
});
