import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.clear === 'function') {
        localStorage.clear();
      }
    } catch {
      // Ignore in Node environment
    }
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created with light theme as default', () => {
    expect(service).toBeTruthy();
    expect(service.theme()).toBe('light');
  });

  it('should toggle theme between light and dark', () => {
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  it('should explicitly set theme', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
  });
});
