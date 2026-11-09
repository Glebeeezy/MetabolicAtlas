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

    // Verify concentric coordinate model: rect is centered at -w/2 and text has text-anchor="middle"
    const rect = chips[0].querySelector('rect');
    const text = chips[0].querySelector('text');
    expect(rect).toBeTruthy();
    expect(text).toBeTruthy();
    const rectWidth = parseFloat(rect?.getAttribute('width') || '0');
    const rectX = parseFloat(rect?.getAttribute('x') || '0');
    expect(rectX).toBeCloseTo(-rectWidth / 2, 1);
    expect(text?.getAttribute('text-anchor')).toBe('middle');
    expect(text?.getAttribute('dominant-baseline')).toBe('central');
  });

  describe('Cofactor Arc Geometric Alignment & Regression Shield', () => {
    it('should mathematically guarantee that every human reaction cofactor arc connects to the reaction arrow', async () => {
      const { HUMAN_REACTIONS } = await import('../../atlas-data');

      const sampleCubicBezier = (
        p0: [number, number],
        p1: [number, number],
        p2: [number, number],
        p3: [number, number],
        steps = 150
      ): [number, number][] => {
        const pts: [number, number][] = [];
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const mt = 1 - t;
          const x = mt * mt * mt * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t * t * t * p3[0];
          const y = mt * mt * mt * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t * t * t * p3[1];
          pts.push([x, y]);
        }
        return pts;
      };

      for (const rx of HUMAN_REACTIONS) {
        if (!rx.cofactorArc?.path) continue;

        // Parse reaction path: M x0 y0 C x1 y1, x2 y2, x3 y3
        const rxMatch = rx.pathData.match(
          /M\s*([\d.]+)\s+([\d.]+)\s+C\s*([\d.]+)\s+([\d.]+),\s*([\d.]+)\s+([\d.]+),\s*([\d.]+)\s+([\d.]+)/
        );
        expect(rxMatch, `Reaction ${rx.code} must have valid cubic pathData`).toBeTruthy();
        if (!rxMatch) continue;

        const rxCurvePts = sampleCubicBezier(
          [parseFloat(rxMatch[1]), parseFloat(rxMatch[2])],
          [parseFloat(rxMatch[3]), parseFloat(rxMatch[4])],
          [parseFloat(rxMatch[5]), parseFloat(rxMatch[6])],
          [parseFloat(rxMatch[7]), parseFloat(rxMatch[8])]
        );

        // Extract numbers from cofactor arc path
        const arcNumbers = rx.cofactorArc.path.replace(/[MC]/g, ' ').trim().split(/\s+/).map(Number);
        let minDistanceToRx = Infinity;

        for (let i = 0; i < arcNumbers.length; i += 2) {
          const ax = arcNumbers[i];
          const ay = arcNumbers[i + 1];
          for (const [rxX, rxY] of rxCurvePts) {
            const dist = Math.hypot(ax - rxX, ay - rxY);
            if (dist < minDistanceToRx) {
              minDistanceToRx = dist;
            }
          }
        }

        // Clean architecture invariant: cofactor arc MUST connect to the reaction path within 2.0px
        expect(
          minDistanceToRx,
          `Cofactor arc for reaction ${rx.code} (Step ${rx.stepNumber}) must touch the reaction arrow (minDistance was ${minDistanceToRx.toFixed(2)}px)`
        ).toBeLessThan(2.0);
      }
    });
  });
});

