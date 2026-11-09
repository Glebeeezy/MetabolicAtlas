import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { PathwaysShellComponent } from './pathways-shell.component';

describe('PathwaysShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathwaysShellComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it('should create the pathways shell', () => {
    const fixture = TestBed.createComponent(PathwaysShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

