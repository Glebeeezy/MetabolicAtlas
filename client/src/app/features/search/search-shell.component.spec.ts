import { TestBed } from '@angular/core/testing';
import { SearchShellComponent } from './search-shell.component';

describe('SearchShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchShellComponent],
    }).compileComponents();
  });

  it('should create the search shell', () => {
    const fixture = TestBed.createComponent(SearchShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

