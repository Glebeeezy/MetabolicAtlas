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
});
