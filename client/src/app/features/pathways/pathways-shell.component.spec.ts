import { TestBed } from '@angular/core/testing';
import { PathwaysShellComponent } from './pathways-shell.component';

describe('PathwaysShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathwaysShellComponent],
    }).compileComponents();
  });

  it('should create the pathways shell', () => {
    const fixture = TestBed.createComponent(PathwaysShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

