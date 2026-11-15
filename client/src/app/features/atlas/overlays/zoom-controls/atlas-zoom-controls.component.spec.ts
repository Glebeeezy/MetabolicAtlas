import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtlasZoomControlsComponent } from './atlas-zoom-controls.component';

describe('AtlasZoomControlsComponent', () => {
  let component: AtlasZoomControlsComponent;
  let fixture: ComponentFixture<AtlasZoomControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasZoomControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AtlasZoomControlsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('zoom', 100);
    fixture.componentRef.setInput('locale', 'ru');
    fixture.detectChanges();
  });

  it('should create the zoom controls component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the zoom percentage correctly', () => {
    const zoomText = fixture.nativeElement.querySelector('.hud-zoom-value')?.textContent?.trim();
    expect(zoomText).toBe('100%');
  });

  it('should emit zoomIn when + button is clicked', () => {
    let emitted = false;
    component.zoomIn.subscribe(() => {
      emitted = true;
    });

    const buttons = fixture.nativeElement.querySelectorAll('.hud-btn');
    // Button 0 is Macro, Button 1 is Zoom In, Button 2 is Zoom Out
    buttons[1].click();
    expect(emitted).toBe(true);
  });

  it('should emit zoomOut when - button is clicked', () => {
    let emitted = false;
    component.zoomOut.subscribe(() => {
      emitted = true;
    });

    const buttons = fixture.nativeElement.querySelectorAll('.hud-btn');
    buttons[2].click();
    expect(emitted).toBe(true);
  });

  it('should emit resetZoom when zoom value button is clicked', () => {
    let emitted = false;
    component.resetZoom.subscribe(() => {
      emitted = true;
    });

    const zoomBtn = fixture.nativeElement.querySelector('.hud-zoom-value');
    zoomBtn.click();
    expect(emitted).toBe(true);
  });

  it('should emit zoomToMacro when macro button is clicked', () => {
    let emitted = false;
    component.zoomToMacro.subscribe(() => {
      emitted = true;
    });

    const buttons = fixture.nativeElement.querySelectorAll('.hud-btn');
    buttons[0].click();
    expect(emitted).toBe(true);
  });
});
