import { TestBed } from '@angular/core/testing';
import { AtlasShellComponent } from './atlas-shell.component';

describe('AtlasShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasShellComponent],
    }).compileComponents();
  });

  it('should create the atlas shell', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
