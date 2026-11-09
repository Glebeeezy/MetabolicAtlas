import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AtlasShellComponent } from './atlas-shell.component';

describe('AtlasShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasShellComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create the atlas shell', () => {
    const fixture = TestBed.createComponent(AtlasShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

