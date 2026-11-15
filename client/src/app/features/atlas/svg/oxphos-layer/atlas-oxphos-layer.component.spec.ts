import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasOxPhosLayerComponent } from './atlas-oxphos-layer.component';

@Component({
  standalone: true,
  imports: [AtlasOxPhosLayerComponent],
  template: `
    <svg>
      <g ma-oxphos-layer [locale]="'ru'"></g>
    </svg>
  `,
})
class TestHostComponent {}

describe('AtlasOxPhosLayerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render oxphos boundary and proton gradient elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const boundary = compiled.querySelector('.oxphos-cluster-rect');
    const imsBand = compiled.querySelector('.oxphos-ims-band');
    const gradient = compiled.querySelector('.proton-gradient-layer');

    expect(boundary).toBeTruthy();
    expect(imsBand).toBeTruthy();
    expect(gradient).toBeTruthy();
  });
});
