import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasSuperhighwayComponent } from './atlas-superhighway.component';
import { PATHWAY_SUPER_HIGHWAYS, PathwaySuperHighway } from '../../atlas-data';

@Component({
  standalone: true,
  imports: [AtlasSuperhighwayComponent],
  template: `
    <svg>
      <g
        ma-superhighway
        [hw]="hw"
        [isSelected]="false"
        [isHovered]="false"
        [isAnimated]="true"
        (highwayClick)="clicked = $event"
      ></g>
    </svg>
  `,
})
class TestHostComponent {
  hw: PathwaySuperHighway = PATHWAY_SUPER_HIGHWAYS[0];
  clicked: PathwaySuperHighway | null = null;
}

describe('AtlasSuperhighwayComponent', () => {
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

  it('should render hitbox, glow, and core paths', () => {
    const hitbox = fixture.nativeElement.querySelector('.superhighway-hitbox');
    const glow = fixture.nativeElement.querySelector('.superhighway-glow');
    const core = fixture.nativeElement.querySelector('.superhighway-core');

    expect(hitbox).toBeTruthy();
    expect(glow).toBeTruthy();
    expect(core).toBeTruthy();
    expect(core.classList.contains('is-animated')).toBe(true);
  });

  it('should emit highwayClick when hitbox is clicked', () => {
    const hitbox = fixture.nativeElement.querySelector('.superhighway-hitbox');
    hitbox.dispatchEvent(new MouseEvent('click'));
    expect(host.clicked).toBe(PATHWAY_SUPER_HIGHWAYS[0]);
  });
});
