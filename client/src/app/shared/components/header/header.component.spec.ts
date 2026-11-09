import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AtlasStateService } from '../../../core/services/atlas-state.service';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({ standalone: true, template: '' })
class DummyComponent {}

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([{ path: '**', component: DummyComponent }]),
        AtlasStateService,
        SidebarService,
      ],
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

  it('should render pathway switcher links in header with ALL as the first item', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.nav__link');
    expect(links.length).toBeGreaterThanOrEqual(2);

    const firstCode = links[0].querySelector('.nav__code')?.textContent?.trim();
    expect(firstCode).toBe('ALL');
  });

  it('should render horizontal scroll buttons', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const prevBtn = fixture.nativeElement.querySelector('.nav__scroll-btn--prev');
    const nextBtn = fixture.nativeElement.querySelector('.nav__scroll-btn--next');
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
  });

  it('should select pathway when clicking a pill', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const atlasStateService = TestBed.inject(AtlasStateService);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('.nav__link');
    links[1].click();

    expect(atlasStateService.selectedPathwayId()).toBe('PW-TCA-CYCLE');
  });
});
