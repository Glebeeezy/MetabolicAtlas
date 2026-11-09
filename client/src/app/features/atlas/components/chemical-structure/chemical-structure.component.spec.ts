import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ChemicalStructureComponent } from './chemical-structure.component';

describe('ChemicalStructureComponent', () => {
  let component: ChemicalStructureComponent;
  let fixture: ComponentFixture<ChemicalStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemicalStructureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChemicalStructureComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.componentRef.setInput('svgContent', '<svg><circle cx="10" cy="10" r="5"/></svg>');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render SVG markup safely into container', () => {
    const testSvg = '<svg viewBox="0 0 100 100"><line x1="0" y1="0" x2="50" y2="50" class="chem-bond"/></svg>';
    fixture.componentRef.setInput('svgContent', testSvg);
    fixture.componentRef.setInput('altText', 'Структура воды');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const container = element.querySelector('.molecule-structure-container');
    expect(container).toBeTruthy();
    expect(container?.getAttribute('aria-label')).toBe('Структура воды');
    expect(container?.innerHTML).toContain('<svg');
    expect(container?.innerHTML).toContain('class="chem-bond"');
  });

  it('should handle empty SVG content gracefully', () => {
    fixture.componentRef.setInput('svgContent', '');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const container = element.querySelector('.molecule-structure-container');
    expect(container).toBeTruthy();
    expect(container?.innerHTML).toBe('');
  });
});
