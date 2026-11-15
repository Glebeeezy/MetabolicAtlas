import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasSectorComponent } from './atlas-sector.component';
import { SECTOR_LAYOUT_CONFIGS, SectorLayoutConfig } from '../../atlas-data';

@Component({
  standalone: true,
  imports: [AtlasSectorComponent],
  template: `
    <svg>
      <g
        ma-sector
        [sector]="sector"
        [isActive]="isActive"
        [isHovered]="isHovered"
        [lodLevel]="1"
        (sectorClick)="clicked = $event"
      ></g>
    </svg>
  `,
})
class TestHostComponent {
  sector: SectorLayoutConfig = SECTOR_LAYOUT_CONFIGS[0];
  isActive = false;
  isHovered = false;
  clicked: SectorLayoutConfig | null = null;
}

describe('AtlasSectorComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render sector polygon and badge at LOD 1', () => {
    const poly = fixture.nativeElement.querySelector('.sector-polygon');
    expect(poly).toBeTruthy();

    const badge = fixture.nativeElement.querySelector('.sector-badge-card');
    expect(badge).toBeTruthy();
  });

  it('should emit sectorClick when polygon is clicked', () => {
    const poly = fixture.nativeElement.querySelector('.sector-polygon');
    poly.dispatchEvent(new MouseEvent('click'));
    expect(host.clicked).toBe(SECTOR_LAYOUT_CONFIGS[0]);
  });
});
