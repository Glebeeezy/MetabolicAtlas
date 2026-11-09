import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render pathway switcher links in header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.nav__link');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
