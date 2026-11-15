import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactionInspectorComponent } from './reaction-inspector.component';
import { HUMAN_REACTIONS, ALL_METABOLITES } from '../../../atlas-data';

describe('ReactionInspectorComponent', () => {
  let component: ReactionInspectorComponent;
  let fixture: ComponentFixture<ReactionInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactionInspectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactionInspectorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('reaction', HUMAN_REACTIONS[0]);
    fixture.componentRef.setInput('locale', 'ru');
    fixture.componentRef.setInput('metabolites', ALL_METABOLITES);
    fixture.detectChanges();
  });

  it('should create the reaction inspector', () => {
    expect(component).toBeTruthy();
  });

  it('should display the reaction title and code', () => {
    const title = fixture.nativeElement.querySelector('.rx-title')?.textContent?.trim();
    expect(title).toBe(HUMAN_REACTIONS[0].nameRu);

    const code = fixture.nativeElement.querySelector('.code-font')?.textContent?.trim();
    expect(code).toBe(HUMAN_REACTIONS[0].code);
  });

  it('should display substrate and product cards', () => {
    const subCard = fixture.nativeElement.querySelector('.flux-card--substrate');
    const prodCard = fixture.nativeElement.querySelector('.flux-card--product');
    expect(subCard).toBeTruthy();
    expect(prodCard).toBeTruthy();
  });

  it('should emit metaboliteClick when clicking a linked participant', () => {
    let clickedMet: any = null;
    component.metaboliteClick.subscribe((m) => {
      clickedMet = m;
    });

    const clickableRow = fixture.nativeElement.querySelector('.participant-row.is-clickable');
    if (clickableRow) {
      clickableRow.click();
      expect(clickedMet).toBeTruthy();
    }
  });

  it('should switch language to en correctly', () => {
    fixture.componentRef.setInput('locale', 'en');
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.rx-title')?.textContent?.trim();
    expect(title).toBe(HUMAN_REACTIONS[0].nameEn);
  });
});
