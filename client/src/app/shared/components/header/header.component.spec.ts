import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SidebarService } from '../../../core/services/sidebar.service';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [SidebarService],
    }).compileComponents();
  });

  it('should create the header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle sidebar when header toggle button is clicked', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const sidebarService = TestBed.inject(SidebarService);
    sidebarService.setOpen(true);
    fixture.detectChanges();

    const toggleBtn = fixture.nativeElement.querySelector('.header__sidebar-toggle') as HTMLButtonElement;
    expect(toggleBtn).toBeTruthy();
    toggleBtn.click();

    expect(sidebarService.isOpen()).toBe(false);
  });

  it('should render brand badge and switcher controls without the center pathway bar', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.header__title-badge')).toBeTruthy();
    expect(el.querySelector('.nav')).toBeNull();
    expect(el.querySelector('ma-locale-switcher')).toBeTruthy();
    expect(el.querySelector('ma-theme-switcher')).toBeTruthy();
  });
});
