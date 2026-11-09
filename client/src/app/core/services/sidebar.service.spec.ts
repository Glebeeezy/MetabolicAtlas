import { TestBed } from '@angular/core/testing';
import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarService],
    });
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle sidebar state', () => {
    const initial = service.isOpen();
    service.toggle();
    expect(service.isOpen()).toBe(!initial);
    service.toggle();
    expect(service.isOpen()).toBe(initial);
  });

  it('should explicitly set sidebar state', () => {
    service.setOpen(false);
    expect(service.isOpen()).toBe(false);
    service.setOpen(true);
    expect(service.isOpen()).toBe(true);
  });
});

