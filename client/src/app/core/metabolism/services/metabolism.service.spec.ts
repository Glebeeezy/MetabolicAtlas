import { TestBed } from '@angular/core/testing';
import { MetabolismService } from './metabolism.service';
import { MetabolismIndexService } from './metabolism-index.service';
import { LocalMetabolismRepository } from '../repositories/local-metabolism.repository';
import { firstValueFrom } from 'rxjs';

describe('MetabolismService & MetabolismIndexService', () => {
  let service: MetabolismService;
  let indexService: MetabolismIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetabolismService, MetabolismIndexService, LocalMetabolismRepository],
    });
    service = TestBed.inject(MetabolismService);
    indexService = TestBed.inject(MetabolismIndexService);
  });

  it('should provide full list of canvas metabolites (50 human + 17 cofactors = 67 total)', () => {
    expect(service.canvasMetabolites.length).toBe(50);
    expect(service.cofactorMetabolites.length).toBe(17);
    expect(service.allMetabolites.length).toBe(67);
  });

  it('should provide full list of reactions (49 total)', () => {
    expect(service.reactions.length).toBe(49);
  });

  it('should lookup metabolite by stable code (MET_GLUCOSE, MET_CITRATE, MET_ATP)', () => {
    const glucose = service.getMetaboliteByCode('MET_GLUCOSE');
    expect(glucose).toBeDefined();
    expect(glucose?.nameRu).toBe('D-Глюкоза');
    expect(glucose?.formula).toBe('C₆H₁₂O₆');

    const citrate = service.getMetaboliteByCode('MET_CITRATE');
    expect(citrate).toBeDefined();
    expect(citrate?.nameEn).toBe('Citrate');

    const atp = service.getMetaboliteByCode('MET_ATP');
    expect(atp).toBeDefined();
    expect(atp?.isCofactor).toBe(true);
  });

  it('should lookup reactions by pathway code (PW-GLYCOLISIS has 10, PW-TCA-CYCLE has 8, PW-UREA-CYCLE has 12)', () => {
    const glycolysis = service.getReactionsByPathway('PW-GLYCOLISIS');
    expect(glycolysis.length).toBe(10);
    expect(glycolysis.map((r) => r.code)).toContain('R_HK');
    expect(glycolysis.map((r) => r.code)).toContain('R_PK');

    const tca = service.getReactionsByPathway('PW-TCA-CYCLE');
    expect(tca.length).toBe(8);
    expect(tca.map((r) => r.code)).toContain('R_CS');
    expect(tca.map((r) => r.code)).toContain('R_MDH');

    const urea = service.getReactionsByPathway('PW-UREA-CYCLE');
    expect(urea.length).toBe(12);
    expect(urea.map((r) => r.code)).toContain('R_CPS1');
    expect(urea.map((r) => r.code)).toContain('R_ARG1');
  });

  it('should lookup reactions participating for a given metabolite (MET_ACETYL_COA participates in PDH and CS)', () => {
    const acetyl = service.getMetaboliteByCode('MET_ACETYL_COA');
    expect(acetyl).toBeDefined();

    const reactions = service.getReactionsForMetabolite(acetyl!.id);
    expect(reactions.length).toBeGreaterThanOrEqual(2);

    const pdhPart = reactions.find((p) => p.rx.code === 'R_PDH');
    expect(pdhPart).toBeDefined();
    expect(pdhPart?.role).toBe('product');

    const csPart = reactions.find((p) => p.rx.code === 'R_CS');
    expect(csPart).toBeDefined();
    expect(csPart?.role).toBe('substrate');
  });

  it('should stream data via Observable API (preparing for future ASP.NET Core 10 backend)', async () => {
    const metabolites = await firstValueFrom(service.getMetabolites$());
    expect(metabolites.length).toBe(67);

    const reactions = await firstValueFrom(service.getReactions$());
    expect(reactions.length).toBe(49);

    const canvasMetabolites = await firstValueFrom(service.getCanvasMetabolites$());
    expect(canvasMetabolites.length).toBe(50);
  });
});
