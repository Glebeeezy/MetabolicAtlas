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

  it('should switch to molecule tab and select metabolite on metabolite click', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const citrate = HUMAN_METABOLITES.find((m) => m.code === 'MET_CITRATE')!;
    component.onMetaboliteClick(citrate);

    expect(component.selectedMetabolite()?.code).toBe('MET_CITRATE');
    expect(component.activeTab()).toBe('molecule');
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
