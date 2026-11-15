import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasCrossroadsLayerComponent } from './atlas-crossroads-layer.component';
import { HUMAN_CROSSROADS, MetabolicCrossroad } from '../../atlas-data';

@Component({
  standalone: true,
  imports: [AtlasCrossroadsLayerComponent],
  template: `
    <svg>
      <g
        ma-crossroads-layer
        [crossroads]="crossroads"
        locale="ru"
      ></g>
    </svg>
  `,
})
class TestHostComponent {
  crossroads: readonly MetabolicCrossroad[] = HUMAN_CROSSROADS;
}

describe('AtlasCrossroadsLayerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render crossroad items, lines and badges', () => {
    const items = fixture.nativeElement.querySelectorAll('.crossroad-item');
    expect(items.length).toBe(HUMAN_CROSSROADS.length);

    const firstText = fixture.nativeElement.querySelector('.crossroad-text')?.textContent?.trim();
    expect(firstText).toBe(HUMAN_CROSSROADS[0].nameRu);
  });
});
