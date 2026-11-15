import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TextbookShellComponent, TEXTBOOK_CHAPTERS } from './textbook-shell.component';

describe('TextbookShellComponent', () => {
  let component: TextbookShellComponent;
  let fixture: ComponentFixture<TextbookShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextbookShellComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TextbookShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the textbook shell component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all chapters', () => {
    const cards = fixture.nativeElement.querySelectorAll('.chapter-card');
    expect(cards.length).toBe(TEXTBOOK_CHAPTERS.length);
  });

  it('should contain links to interactive map for chapters', () => {
    const mapLinks = fixture.nativeElement.querySelectorAll('.action-btn--map');
    expect(mapLinks.length).toBe(TEXTBOOK_CHAPTERS.length);
    expect(mapLinks[0].getAttribute('href')).toBe('/atlas');
  });
});
