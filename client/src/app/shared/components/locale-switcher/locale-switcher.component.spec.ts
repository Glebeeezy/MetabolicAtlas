import { TestBed } from '@angular/core/testing';
import { LocaleSwitcherComponent } from './locale-switcher.component';
import { LocaleService } from '../../../core/services/locale.service';

describe('LocaleSwitcherComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleSwitcherComponent],
      providers: [LocaleService],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LocaleSwitcherComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle locale on button click', () => {
    const fixture = TestBed.createComponent(LocaleSwitcherComponent);
    const localeService = TestBed.inject(LocaleService);
    fixture.detectChanges();

    const initialLocale = localeService.locale();
    const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    btn.click();

    expect(localeService.locale()).not.toBe(initialLocale);
  });
});

