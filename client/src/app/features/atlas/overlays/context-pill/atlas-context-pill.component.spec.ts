import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtlasContextPillComponent } from './atlas-context-pill.component';

describe('AtlasContextPillComponent', () => {
  let component: AtlasContextPillComponent;
  let fixture: ComponentFixture<AtlasContextPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasContextPillComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtlasContextPillComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('selectedPathway', null);
    fixture.componentRef.setInput('selectedPathwayId', 'ALL');
    fixture.componentRef.setInput('locale', 'ru');
    fixture.componentRef.setInput('lodLevel', 1);
    fixture.detectChanges();
  });

  it('should create the context pill component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Все пути" in ru locale when selectedPathwayId is ALL', () => {
    const label = fixture.nativeElement.querySelector('.context-pill__label')?.textContent?.trim();
    expect(label).toContain('Все пути');
  });

  it('should display "All Pathways" in en locale when selectedPathwayId is ALL', () => {
    fixture.componentRef.setInput('locale', 'en');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.context-pill__label')?.textContent?.trim();
    expect(label).toContain('All Pathways');
  });

  it('should display LOD level in badge', () => {
    fixture.componentRef.setInput('lodLevel', 2);
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.lod-badge')?.textContent?.trim();
    expect(badge).toBe('LOD 2');
  });
});
