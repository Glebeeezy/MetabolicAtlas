import { TestBed } from '@angular/core/testing';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(() => {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.clear === 'function') {
        localStorage.clear();
      }
    } catch {
      // Ignore in Node environment
    }
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleService);
  });

  it('should be created with Russian (ru) as default locale', () => {
    expect(service).toBeTruthy();
    expect(service.locale()).toBe('ru');
  });

  it('should toggle locale between ru and en', () => {
    service.toggleLocale();
    expect(service.locale()).toBe('en');
    service.toggleLocale();
    expect(service.locale()).toBe('ru');
  });

  it('should explicitly set locale', () => {
    service.setLocale('en');
    expect(service.locale()).toBe('en');
  });
});
