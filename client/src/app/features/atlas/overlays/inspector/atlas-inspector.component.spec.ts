import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtlasInspectorComponent } from './atlas-inspector.component';
import { HUMAN_REACTIONS, HUMAN_METABOLITES } from '../../atlas-data';

describe('AtlasInspectorComponent', () => {
  let component: AtlasInspectorComponent;
  let fixture: ComponentFixture<AtlasInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasInspectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtlasInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the atlas inspector component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeInspector when close button is clicked', () => {
    let closed = false;
    component.closeInspector.subscribe(() => {
      closed = true;
    });

    const closeBtn = fixture.nativeElement.querySelector('.inspector-close-btn');
    closeBtn.click();
    expect(closed).toBe(true);
  });

  it('should render reaction header and compartment when selectedReaction is provided', () => {
    fixture.componentRef.setInput('selectedReaction', HUMAN_REACTIONS[0]);
    fixture.componentRef.setInput('locale', 'ru');
    fixture.detectChanges();

    const dot = fixture.nativeElement.querySelector('.live-dot--rx');
    expect(dot).toBeTruthy();
    const typeText = fixture.nativeElement.querySelector('.type-text')?.textContent;
    expect(typeText).toBeTruthy();
  });

  it('should render metabolite header when selectedMetabolite is provided', () => {
    fixture.componentRef.setInput('selectedReaction', null);
    fixture.componentRef.setInput('selectedMetabolite', HUMAN_METABOLITES[0]);
    fixture.componentRef.setInput('locale', 'ru');
    fixture.detectChanges();

    const dot = fixture.nativeElement.querySelector('.live-dot--met');
    expect(dot).toBeTruthy();
  });

  it('should show copyFeedback toast when copyFeedback has a value', () => {
    fixture.componentRef.setInput('copyFeedback', 'Текст скопирован!');
    fixture.detectChanges();

    const toast = fixture.nativeElement.querySelector('.copy-feedback-toast');
    expect(toast?.textContent).toContain('Текст скопирован!');
  });
});
