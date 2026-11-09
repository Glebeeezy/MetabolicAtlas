import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { LocaleService } from '../../../core/services/locale.service';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        provideRouter([{ path: '**', component: DummyComponent }]),
        SidebarService,
        LocaleService,
      ],
    }).compileComponents();
  });

  it('should create the sidebar component', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render single navigation link to interactive map', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    fixture.detectChanges();

    const navLinks = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(1);

    const link = navLinks[0] as HTMLAnchorElement;
    expect(link.getAttribute('href') ?? link.getAttribute('routerLink')).toBe('/atlas');
    expect(link.textContent).toContain('Интерактивная карта');
  });

  it('should close on mobile when link is clicked', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const sidebarService = TestBed.inject(SidebarService);
    sidebarService.setOpen(true);
    fixture.detectChanges();

    // mock window.innerWidth < 1024
    vi.stubGlobal('innerWidth', 768);

    const link = fixture.nativeElement.querySelector('.nav-link') as HTMLElement;
    link.click();

    expect(sidebarService.isOpen()).toBe(false);
    vi.unstubAllGlobals();
  });
});
