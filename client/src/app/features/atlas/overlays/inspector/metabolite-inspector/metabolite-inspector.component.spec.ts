import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetaboliteInspectorComponent } from './metabolite-inspector.component';
import { HUMAN_METABOLITES, HUMAN_REACTIONS } from '../../../atlas-data';

describe('MetaboliteInspectorComponent', () => {
  let component: MetaboliteInspectorComponent;
  let fixture: ComponentFixture<MetaboliteInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaboliteInspectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetaboliteInspectorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metabolite', HUMAN_METABOLITES[0]);
    fixture.componentRef.setInput('locale', 'ru');
    fixture.componentRef.setInput('activePathwayId', 'ALL');
    fixture.componentRef.setInput('relatedReactions', [
      { rx: HUMAN_REACTIONS[0], role: 'substrate' as const },
    ]);
    fixture.detectChanges();
  });

  it('should create the metabolite inspector', () => {
    expect(component).toBeTruthy();
  });

  it('should display molecule name and formula', () => {
    const title = fixture.nativeElement.querySelector('.molecule-title')?.textContent?.trim();
    expect(title).toBe(HUMAN_METABOLITES[0].nameRu);

    const formula = fixture.nativeElement.querySelector('.structure-visual-card__formula')?.textContent?.trim();
    expect(formula).toBe(HUMAN_METABOLITES[0].formula);
  });

  it('should emit copyText when copy button is clicked', () => {
    let copied: { text: string; label: string } | null = null;
    component.copyText.subscribe((data) => {
      copied = data;
    });

    const copyBtn = fixture.nativeElement.querySelector('.quick-copy-btn');
    copyBtn.click();
    expect(copied).toBeTruthy();
    expect(copied!.text).toBe(HUMAN_METABOLITES[0].formula);
  });

  it('should render related reactions and emit reactionClick', () => {
    let clickedRx: any = null;
    component.reactionClick.subscribe((rx) => {
      clickedRx = rx;
    });

    const rxItem = fixture.nativeElement.querySelector('.related-rx-item');
    expect(rxItem).toBeTruthy();
    rxItem.click();
    expect(clickedRx).toBe(HUMAN_REACTIONS[0]);
  });
});
