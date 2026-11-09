import { TestBed } from '@angular/core/testing';
import { ArticlesShellComponent } from './articles-shell.component';

describe('ArticlesShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesShellComponent],
    }).compileComponents();
  });

  it('should create the articles shell', () => {
    const fixture = TestBed.createComponent(ArticlesShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

