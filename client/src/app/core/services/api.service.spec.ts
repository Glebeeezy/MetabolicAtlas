import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pathways list', () => {
    const mockPathways = [
      { id: '11111111-1111-1111-1111-111111111111', code: 'PWY_TCA', name: 'TCA Cycle', reactionsCount: 8 },
    ];

    service.getPathways().subscribe((pathways) => {
      expect(pathways.length).toBe(1);
      expect(pathways[0].code).toBe('PWY_TCA');
    });

    const req = httpTesting.expectOne('/api/v1/pathways');
    expect(req.request.method).toBe('GET');
    req.flush(mockPathways);
  });

  it('should fetch health check', () => {
    service.getHealth().subscribe((res) => {
      expect(res.status).toBe('Healthy');
    });

    const req = httpTesting.expectOne('/health');
    expect(req.request.method).toBe('GET');
    req.flush({ status: 'Healthy' });
  });
});

