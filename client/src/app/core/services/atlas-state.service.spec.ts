import { TestBed } from '@angular/core/testing';
import { AtlasStateService } from './atlas-state.service';

describe('AtlasStateService', () => {
  let service: AtlasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasStateService);
  });

  it('should be created with ALL as default selected pathway', () => {
    expect(service).toBeTruthy();
    expect(service.selectedPathwayId()).toBe('ALL');
    expect(service.selectedPathway().code).toBe('ALL');
  });

  it('should update selected pathway and set map focus target', () => {
    service.selectPathway('PW-GLYCOLISIS');
    expect(service.selectedPathwayId()).toBe('PW-GLYCOLISIS');
    expect(service.selectedPathway().code).toBe('GLY');

    const focus = service.mapFocusTarget();
    expect(focus).toBeTruthy();
    expect(focus?.pathwayId).toBe('PW-GLYCOLISIS');
    expect(focus?.targetCode).toBe('MET_AC_COA');
    expect(focus?.crossroadId).toBe('cr-pdh-in');
  });

  it('should toggle flux and chemical structure flags', () => {
    const initialFlux = service.isFluxAnimated();
    service.toggleFlux();
    expect(service.isFluxAnimated()).toBe(!initialFlux);

    const initialStructures = service.showStructures();
    service.toggleStructures();
    expect(service.showStructures()).toBe(!initialStructures);
  });

  it('should manage search query', () => {
    service.setSearchQuery('  Pyruvate  ');
    expect(service.searchQuery()).toBe('Pyruvate');
    service.clearSearch();
    expect(service.searchQuery()).toBe('');
  });
});
