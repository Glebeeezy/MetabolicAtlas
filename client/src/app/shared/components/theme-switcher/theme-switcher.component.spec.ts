import { TestBed } from '@angular/core/testing';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ThemeService } from '../../../core/services/theme.service';

describe('ThemeSwitcherComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
      providers: [ThemeService],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ThemeSwitcherComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle theme on button click', () => {
    const fixture = TestBed.createComponent(ThemeSwitcherComponent);
    const themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();

    const initialTheme = themeService.theme();
    const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    btn.click();

    expect(themeService.theme()).not.toBe(initialTheme);
  });
});
