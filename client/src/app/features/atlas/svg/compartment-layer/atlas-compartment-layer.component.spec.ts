import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AtlasCompartmentLayerComponent } from './atlas-compartment-layer.component';

@Component({
  standalone: true,
  imports: [AtlasCompartmentLayerComponent],
  template: `
    <svg>
      <g ma-compartment-layer [locale]="'ru'"></g>
    </svg>
  `,
})
class TestHostComponent {}

describe('AtlasCompartmentLayerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render compartment backdrops and zone banners', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cytosol = compiled.querySelector('.compartment-rect--cytosol');
    const matrix = compiled.querySelector('.compartment-rect--matrix');
    const tcaRing = compiled.querySelector('.tca-guide-ring');
    const mpc = compiled.querySelector('.mpc-channel-marker');

    expect(cytosol).toBeTruthy();
    expect(matrix).toBeTruthy();
    expect(tcaRing).toBeTruthy();
    expect(mpc).toBeTruthy();
  });
});
