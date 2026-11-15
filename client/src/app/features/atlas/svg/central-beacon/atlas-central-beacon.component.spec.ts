import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasCentralBeaconComponent } from './atlas-central-beacon.component';

@Component({
  standalone: true,
  imports: [AtlasCentralBeaconComponent],
  template: `<svg><g ma-central-beacon></g></svg>`,
})
class TestHostComponent {}

describe('AtlasCentralBeaconComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render pulse halo circle', () => {
    const circle = fixture.nativeElement.querySelector('.beacon-pulse-halo');
    expect(circle).toBeTruthy();
    expect(circle.getAttribute('r')).toBe('160');
  });
});
