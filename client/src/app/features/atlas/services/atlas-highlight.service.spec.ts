import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AtlasHighlightService } from './atlas-highlight.service';
import { AtlasStateService } from '../../../core/services/atlas-state.service';
import { MetabolismService } from '../../../core/metabolism';

describe('AtlasHighlightService', () => {
  let service: AtlasHighlightService;
  let stateService: AtlasStateService;
  let metabolismService: MetabolismService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AtlasHighlightService,
      ],
    });
    service = TestBed.inject(AtlasHighlightService);
    stateService = TestBed.inject(AtlasStateService);
    metabolismService = TestBed.inject(MetabolismService);
  });

  it('should be created with initial null selections and reaction tab', () => {
    expect(service).toBeTruthy();
    expect(service.selectedReaction()).toBeNull();
    expect(service.selectedMetabolite()).toBeNull();
    expect(service.activeTab()).toBe('reaction');
  });

  it('should switch between reaction and metabolite selection', () => {
    const rx = metabolismService.reactions[0];
    const met = metabolismService.canvasMetabolites[0];

    service.onReactionClick(rx);
    expect(service.selectedReaction()).toBe(rx);
    expect(service.selectedMetabolite()).toBeNull();
    expect(service.activeTab()).toBe('reaction');

    service.onMetaboliteClick(met);
    expect(service.selectedMetabolite()).toBe(met);
    expect(service.selectedReaction()).toBeNull();
    expect(service.activeTab()).toBe('molecule');

    service.closeInspector();
    expect(service.selectedReaction()).toBeNull();
    expect(service.selectedMetabolite()).toBeNull();
  });

  it('should find metabolites by name, code, abbreviation and synonyms', () => {
    const citrate = service.findMetaboliteByName('Цитрат');
    expect(citrate).toBeTruthy();
    expect(citrate?.code).toBe('MET_CITRATE');

    const oaa = service.findMetaboliteByName('Oxaloacetate');
    expect(oaa).toBeTruthy();
    expect(oaa?.code).toBe('MET_OAA');

    const byCode = service.findMetaboliteByName('MET_GLUCOSE');
    expect(byCode).toBeTruthy();
    expect(byCode?.code).toBe('MET_GLUCOSE');

    const nad = service.findMetaboliteByName('НАД⁺');
    expect(nad).toBeTruthy();
    expect(nad?.code).toBe('MET_NAD_PLUS');

    const nonexistent = service.findMetaboliteByName('НеизвестноеВещество');
    expect(nonexistent).toBeUndefined();
  });

  it('should toggle energy filter and select matching reaction', () => {
    expect(service.activeCarrierFilter()).toBeNull();

    service.toggleEnergyFilter('NADH');
    expect(service.activeCarrierFilter()).toBe('NADH');
    expect(service.selectedReaction()).toBeTruthy();

    service.toggleEnergyFilter('NADH');
    expect(service.activeCarrierFilter()).toBeNull();
  });

  it('should identify substrate and product of selected reaction and dim non-participants', () => {
    const rx = metabolismService.reactions.find((r) => r.code === 'R_CS')!;
    service.onReactionClick(rx);

    expect(service.isSubstrateOfSelected(rx.sourceMetaboliteId)).toBe(true);
    expect(service.isProductOfSelected(rx.targetMetaboliteId)).toBe(true);

    expect(service.isReactionDimmed(rx.id)).toBe(false);
    const otherRx = metabolismService.reactions.find((r) => r.code === 'R_HK')!;
    expect(service.isReactionDimmed(otherRx.id)).toBe(true);
  });

  it('should get reactions for a given metabolite', () => {
    const citrate = metabolismService.canvasMetabolites.find((m) => m.code === 'MET_CITRATE')!;
    const rxList = service.getReactionsForMetabolite(citrate.id);

    expect(rxList.length).toBeGreaterThan(0);
    const asProduct = rxList.some((item) => item.role === 'product');
    const asSubstrate = rxList.some((item) => item.role === 'substrate');
    expect(asProduct).toBe(true);
    expect(asSubstrate).toBe(true);
  });

  it('should sort pathways prioritizing the active pathway', () => {
    stateService.selectPathway('PW-TCA-CYCLE');
    const oaa = metabolismService.canvasMetabolites.find((m) => m.code === 'MET_OAA')!;
    const { current, others } = service.getSortedPathways(oaa);

    expect(current.some((p) => p.pathwayCode === 'PWY_TCA')).toBe(true);
  });
});
