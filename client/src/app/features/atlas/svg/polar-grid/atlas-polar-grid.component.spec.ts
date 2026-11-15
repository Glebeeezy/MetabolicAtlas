import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasPolarGridComponent } from './atlas-polar-grid.component';

@Component({
  standalone: true,
  imports: [AtlasPolarGridComponent],
  template: `<svg><g ma-polar-grid></g></svg>`,
})
class TestHostComponent {}

describe('AtlasPolarGridComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render polar grid circles and axes', () => {
    const circles = fixture.nativeElement.querySelectorAll('.polar-grid-circle');
    const lines = fixture.nativeElement.querySelectorAll('.polar-axis-line');
    expect(circles.length).toBe(4);
    expect(lines.length).toBe(2);
  });
});
