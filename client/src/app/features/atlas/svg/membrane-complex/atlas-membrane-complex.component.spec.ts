import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasMembraneComplexComponent } from './atlas-membrane-complex.component';

@Component({
  standalone: true,
  imports: [AtlasMembraneComplexComponent],
  template: `
    <svg>
      <g ma-membrane-complex [complexId]="'I'" [x]="100" [y]="200" [locale]="'ru'"></g>
      <g ma-membrane-complex [complexId]="'V'" [x]="300" [y]="400" [locale]="'ru'"></g>
    </svg>
  `,
})
class TestHostComponent {}

describe('AtlasMembraneComplexComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render complex I and complex V structures', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const complexes = compiled.querySelectorAll('.membrane-complex-deco');
    expect(complexes.length).toBe(2);

    const labels = compiled.querySelectorAll('.complex-label');
    expect(labels[0].textContent).toContain('I');
    expect(labels[1].textContent).toContain('V');
  });
});
