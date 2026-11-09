import { TestBed } from '@angular/core/testing';
import { EntitiesShellComponent } from './entities-shell.component';

describe('EntitiesShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitiesShellComponent],
    }).compileComponents();
  });

  it('should create the entities shell', () => {
    const fixture = TestBed.createComponent(EntitiesShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
