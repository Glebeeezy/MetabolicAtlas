import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ReactionArrowComponent, ReactionArrowData } from './reaction-arrow.component';

@Component({
  standalone: true,
  imports: [ReactionArrowComponent],
  template: `
    <svg>
      <g ma-reaction-arrow
        [reaction]="testReaction"
        [isSelected]="isSelected"
        (reactionClick)="clicked = $event"
        (cofactorClick)="clickedCofactor = $event"
      ></g>
    </svg>
  `,
})
class TestHostComponent {
  testReaction: ReactionArrowData = {
    id: 'test-rx-1',
    stepNumber: 1,
    code: 'R_TEST',
    nameRu: 'Тестовая реакция',
    nameEn: 'Test reaction',
    sourceMetaboliteId: 'met-1',
    targetMetaboliteId: 'met-2',
    pathData: 'M 10 10 L 100 100',
    tooltipX: 50,
    tooltipY: 50,
    enzymeRu: 'Тест-фермент',
    enzymeEn: 'Test enzyme',
    enzymeShort: 'TE',
    ecNumber: '1.1.1.1',
    gene: 'TEST1',
    uniprotId: 'P12345',
    isReversible: false,
    deltaG0: '-10 kJ/mol',
    substrates: [{ name: 'Субстрат 1', formula: 'C6H12O6' }],
    products: [{ name: 'Продукт 1', formula: 'C3H6O3' }],
    cofactorArc: {
      preset: 'tangent-swoop',
      path: 'M 30 20 Q 50 50 70 20',
      inCofactor: 'НАД⁺',
      inText: 'НАД⁺',
      outCofactor: 'НАДН',
      outText: 'НАДН',
    },
    mechanismRu: 'Тест механизм',
  };
  isSelected = false;
  clicked: ReactionArrowData | null = null;
  clickedCofactor: string | null = null;
}

describe('ReactionArrowComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
  });

  it('should render reaction arrow and emit click event on reaction', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const host = fixture.componentInstance;
    const hitbox = fixture.nativeElement.querySelector('.reaction-hitbox');
    expect(hitbox).toBeTruthy();

    hitbox.dispatchEvent(new MouseEvent('click'));
    expect(host.clicked?.code).toBe('R_TEST');
  });

  it('should emit cofactorClick when clicking a cofactor pill', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const host = fixture.componentInstance;
    const cofactorPills = fixture.nativeElement.querySelectorAll('.cofactor-pill-group');
    expect(cofactorPills.length).toBe(2);

    cofactorPills[0].dispatchEvent(new MouseEvent('click'));
    expect(host.clickedCofactor).toBe('НАД⁺');
  });

  it('should render independent chips when inItems and outItems are present', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    host.testReaction = {
      ...host.testReaction,
      cofactorArc: {
        preset: 'tangent-swoop',
        path: 'M 30 20 Q 50 50 70 20',
        inItems: [
          { name: 'НАД⁺', text: 'НАД⁺', dx: 0 },
          { name: 'Кофермент A (КоА-SH)', text: 'КоА', dx: 40 },
        ],
        outItems: [
          { name: 'НАДН', text: 'НАДН', dx: 0, isEnergy: true },
          { name: 'Углекислый газ (CO₂)', text: 'CO₂ ↑', dx: 45 },
        ],
      },
    };
    fixture.detectChanges();

    const chips = fixture.nativeElement.querySelectorAll('.cofactor-pill-item');
    expect(chips.length).toBe(4);

    chips[1].dispatchEvent(new MouseEvent('click'));
    expect(host.clickedCofactor).toBe('Кофермент A (КоА-SH)');

    chips[3].dispatchEvent(new MouseEvent('click'));
    expect(host.clickedCofactor).toBe('Углекислый газ (CO₂)');
  });
});

