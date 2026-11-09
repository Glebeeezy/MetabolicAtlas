import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { LocaleService } from '../../../core/services/locale.service';

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([]), SidebarService, LocaleService],
    }).compileComponents();
  });

  it('should create the sidebar component', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle sidebar when collapse button is clicked', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const sidebarService = TestBed.inject(SidebarService);
    sidebarService.setOpen(true);
    fixture.detectChanges();

    const collapseBtn = fixture.nativeElement.querySelector('.sidebar__collapse-btn') as HTMLButtonElement;
    expect(collapseBtn).toBeTruthy();
    collapseBtn.click();

    expect(sidebarService.isOpen()).toBe(false);
  });
});

