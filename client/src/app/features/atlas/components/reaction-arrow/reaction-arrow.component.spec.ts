import { TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { LocaleService } from '../../../../core/services/locale.service';
import { ReactionArrowComponent, ReactionArrowData } from './reaction-arrow.component';

@Component({
  standalone: true,
  imports: [ReactionArrowComponent],
  template: `
    <svg>
      <g ma-reaction-arrow
        [reaction]="testReaction"
        [isSelected]="isSelected()"
        [isHovered]="isHovered()"
        [isDimmed]="isDimmed()"
        [isFluxAnimated]="isFluxAnimated()"
        [showEnzymeLabel]="showEnzymeLabel()"
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
  isSelected = signal(false);
  isHovered = signal(false);
  isDimmed = signal(false);
  isFluxAnimated = signal(false);
  showEnzymeLabel = signal(false);
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

      const sampleArc = (
        x0: number,
        y0: number,
        rx: number,
        ry: number,
        large: number,
        sweep: number,
        x1: number,
        y1: number,
        steps = 150
      ): [number, number][] => {
        const dx2 = (x0 - x1) / 2;
        const dy2 = (y0 - y1) / 2;
        const rxSq = rx * rx;
        const rySq = ry * ry;
        const x1pSq = dx2 * dx2;
        const y1pSq = dy2 * dy2;
        const sign = large === sweep ? -1 : 1;
        const num = Math.max(0, rxSq * rySq - rxSq * y1pSq - rySq * x1pSq);
        const den = rxSq * y1pSq + rySq * x1pSq;
        const factor = sign * Math.sqrt(num / den);
        const cxp = factor * ((rx * dy2) / ry);
        const cyp = factor * (-(ry * dx2) / rx);
        const cx = cxp + (x0 + x1) / 2;
        const cy = cyp + (y0 + y1) / 2;
        const ang = (ux: number, uy: number, vx: number, vy: number): number =>
          (ux * vy - uy * vx < 0 ? -1 : 1) *
          Math.acos(Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy)))));
        const t1 = ang(1, 0, (dx2 - cxp) / rx, (dy2 - cyp) / ry);
        let dt = ang((dx2 - cxp) / rx, (dy2 - cyp) / ry, (-dx2 - cxp) / rx, (-dy2 - cyp) / ry);
        if (!sweep && dt > 0) dt -= 2 * Math.PI;
        if (sweep && dt < 0) dt += 2 * Math.PI;
        const pts: [number, number][] = [];
        for (let i = 0; i <= steps; i++) {
          const th = t1 + (i / steps) * dt;
          pts.push([cx + rx * Math.cos(th), cy + ry * Math.sin(th)]);
        }
        return pts;
      };

      for (const rx of HUMAN_REACTIONS) {
        if (!rx.cofactorArc?.path) continue;

        // Parse reaction path: M x0 y0 C ..., M x0 y0 A ..., or M x0 y0 L x1 y1 (supports negative coords)
        let rxCurvePts: [number, number][] = [];
        const cubicMatch = rx.pathData.match(
          /M\s*(-?[\d.]+)\s+(-?[\d.]+)\s+C\s*(-?[\d.]+)\s+(-?[\d.]+),\s*(-?[\d.]+)\s+(-?[\d.]+),\s*(-?[\d.]+)\s+(-?[\d.]+)/
        );
        const arcMatch = rx.pathData.match(
          /M\s*(-?[\d.]+)\s+(-?[\d.]+)\s+A\s*(-?[\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s+([01])\s+([01])\s+(-?[\d.]+)\s+(-?[\d.]+)/
        );
        if (cubicMatch) {
          rxCurvePts = sampleCubicBezier(
            [parseFloat(cubicMatch[1]), parseFloat(cubicMatch[2])],
            [parseFloat(cubicMatch[3]), parseFloat(cubicMatch[4])],
            [parseFloat(cubicMatch[5]), parseFloat(cubicMatch[6])],
            [parseFloat(cubicMatch[7]), parseFloat(cubicMatch[8])]
          );
        } else if (arcMatch) {
          rxCurvePts = sampleArc(
            parseFloat(arcMatch[1]),
            parseFloat(arcMatch[2]),
            parseFloat(arcMatch[3]),
            parseFloat(arcMatch[4]),
            parseFloat(arcMatch[6]),
            parseFloat(arcMatch[7]),
            parseFloat(arcMatch[8]),
            parseFloat(arcMatch[9])
          );
        } else {
          const lineMatch = rx.pathData.match(/M\s*(-?[\d.]+)\s+(-?[\d.]+)\s+L\s*(-?[\d.]+)\s+(-?[\d.]+)/);
          expect(lineMatch, `Reaction ${rx.code} must have valid pathData (cubic Bezier, Arc, or Line)`).toBeTruthy();
          if (!lineMatch) continue;
          const x0 = parseFloat(lineMatch[1]);
          const y0 = parseFloat(lineMatch[2]);
          const x1 = parseFloat(lineMatch[3]);
          const y1 = parseFloat(lineMatch[4]);
          for (let i = 0; i <= 150; i++) {
            const t = i / 150;
            rxCurvePts.push([x0 + t * (x1 - x0), y0 + t * (y1 - y0)]);
          }
        }

        // Sample cofactor arc path (supports M x0 y0 C ... [C ...])
        const arcTokens = rx.cofactorArc.path.replace(/,/g, ' ').trim().split(/\s+/);
        const cofPts: [number, number][] = [];
        let cur: [number, number] = [0, 0];
        for (let tIdx = 0; tIdx < arcTokens.length; ) {
          const cmd = arcTokens[tIdx];
          if (cmd === 'M') {
            cur = [parseFloat(arcTokens[tIdx + 1]), parseFloat(arcTokens[tIdx + 2])];
            cofPts.push(cur);
            tIdx += 3;
          } else if (cmd === 'C') {
            const p1: [number, number] = [parseFloat(arcTokens[tIdx + 1]), parseFloat(arcTokens[tIdx + 2])];
            const p2: [number, number] = [parseFloat(arcTokens[tIdx + 3]), parseFloat(arcTokens[tIdx + 4])];
            const p3: [number, number] = [parseFloat(arcTokens[tIdx + 5]), parseFloat(arcTokens[tIdx + 6])];
            cofPts.push(...sampleCubicBezier(cur, p1, p2, p3, 40));
            cur = p3;
            tIdx += 7;
          } else {
            tIdx++;
          }
        }

        let minDistanceToRx = Infinity;
        for (const [ax, ay] of cofPts) {
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

  it('should render single arrow for irreversible and two opposing dual-lane arrows for reversible reactions', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const irrevLines = el.querySelectorAll('path.reaction-line');
    expect(irrevLines.length).toBe(1);
    expect(irrevLines[0].getAttribute('marker-start')).toBeNull();
    expect(irrevLines[0].getAttribute('marker-end')).toBe('url(#rx-arrowhead)');
    expect(el.querySelectorAll('path.reaction-line--dual').length).toBe(0);

    const revFixture = TestBed.createComponent(TestHostComponent);
    revFixture.componentInstance.testReaction = {
      ...revFixture.componentInstance.testReaction,
      id: 'test-rx-rev',
      isReversible: true,
    };
    revFixture.componentInstance.isFluxAnimated.set(true);
    revFixture.detectChanges();

    const revEl = revFixture.nativeElement as HTMLElement;
    const dualLines = revEl.querySelectorAll('path.reaction-line--dual');
    expect(dualLines.length).toBe(2);
    expect(revEl.querySelector('path.reaction-line--forward')).toBeTruthy();
    expect(revEl.querySelector('path.reaction-line--reverse')).toBeTruthy();

    dualLines.forEach((line) => {
      expect(line.getAttribute('marker-start')).toBeNull();
      expect(line.getAttribute('marker-end')).toBe('url(#rx-arrowhead-dual)');
    });

    expect(revEl.querySelectorAll('path.reaction-flux-flow--dual').length).toBe(2);
  });

  it('should apply selected, hovered, and dimmed classes on internal reaction-arrow-root with matching dual markers', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.testReaction = {
      ...fixture.componentInstance.testReaction,
      id: 'test-rx-state',
      isReversible: true,
    };
    fixture.componentInstance.isHovered.set(true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const root = el.querySelector('g.reaction-arrow-root')!;
    expect(root.classList.contains('is-hovered')).toBe(true);
    expect(root.classList.contains('is-selected')).toBe(false);
    expect(
      el.querySelector('path.reaction-line--forward')?.getAttribute('marker-end')
    ).toBe('url(#rx-arrowhead-dual-hover)');

    fixture.componentInstance.isSelected.set(true);
    fixture.componentInstance.isDimmed.set(true);
    fixture.detectChanges();

    expect(root.classList.contains('is-selected')).toBe(true);
    expect(root.classList.contains('is-dimmed')).toBe(true);
    expect(
      el.querySelector('path.reaction-line--forward')?.getAttribute('marker-end')
    ).toBe('url(#rx-arrowhead-dual-active)');
    expect(
      el.querySelector('path.reaction-line--reverse')?.getAttribute('marker-end')
    ).toBe('url(#rx-arrowhead-dual-active)');
  });

  it('should render clickable branches and junction pill for structured multi-branch reactions', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.testReaction = {
      ...fixture.componentInstance.testReaction,
      id: 'test-rx-branched',
      code: 'R_BRANCHED',
      isReversible: true,
      junction: { x: 100, y: 100, label: 'GALT', width: 54, height: 22 },
      branches: [
        { id: 'b1', role: 'in', metaboliteId: 'm1', pathData: 'M 0 100 L 73 100' },
        { id: 'b2', role: 'out', metaboliteId: 'm2', pathData: 'M 127 100 L 200 100' },
        { id: 'b3', role: 'out', metaboliteId: 'm3', pathData: 'M 100 89 L 100 20' },
      ],
    };
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const hitboxes = Array.from(el.querySelectorAll('path.reaction-hitbox'));
    expect(hitboxes.length).toBe(3);
    expect(el.querySelectorAll('path.reaction-line--dual').length).toBe(6);

    const host = fixture.componentInstance;
    for (const hitbox of hitboxes) {
      host.clicked = null;
      hitbox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect((host.clicked as ReactionArrowData | null)?.code).toBe('R_BRANCHED');
    }

    const junction = el.querySelector('g.reaction-junction')!;
    expect(junction).toBeTruthy();
    expect(junction.textContent?.trim()).toBe('GALT');
    host.clicked = null;
    junction.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect((host.clicked as ReactionArrowData | null)?.code).toBe('R_BRANCHED');
  });

  it('should render permanent clickable enzyme badge with regulatory indicator and dynamic hover tooltip when showEnzymeLabel is true', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    host.testReaction = {
      ...host.testReaction,
      id: 'test-rx-badge',
      code: 'R_PFK1',
      enzymeShort: 'PFK-1',
      enzymeRu: 'Фосфофруктокиназа-1 (ключевой регуляторный шаг гликолиза)',
      isReversible: false,
      activatorsRu: ['АМФ'],
    };
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('g.reaction-enzyme-badge')).toBeNull();

    host.showEnzymeLabel.set(true);
    fixture.detectChanges();

    const badge = el.querySelector('g.reaction-enzyme-badge')!;
    expect(badge).toBeTruthy();
    expect(badge.textContent?.trim()).toBe('PFK-1');
    expect(badge.querySelector('.reaction-enzyme-badge-reg')).toBeTruthy();

    host.clicked = null;
    badge.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect((host.clicked as ReactionArrowData | null)?.code).toBe('R_PFK1');

    host.isHovered.set(true);
    fixture.detectChanges();

    const tooltip = el.querySelector('g.reaction-tooltip')!;
    expect(tooltip).toBeTruthy();
    expect(tooltip.getAttribute('transform')).toBe('translate(50,32)');
    const tooltipRect = tooltip.querySelector('rect.tooltip-bg')!;
    expect(Number(tooltipRect.getAttribute('width'))).toBeGreaterThan(220);
  });

  it('should switch enzyme badge, junction label, and hover tooltip between RU and EN locales', () => {
    const localeService = TestBed.inject(LocaleService);
    localeService.setLocale('ru');

    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    try {
      host.testReaction = {
        ...host.testReaction,
        id: 'test-rx-i18n',
        code: 'R_ENO',
        enzymeShort: 'ENO1',
        enzymeShortRu: 'Енолаза',
        enzymeRu: 'Енолаза',
        enzymeEn: 'Enolase (Phosphopyruvate hydratase)',
      };
      host.showEnzymeLabel.set(true);
      host.isHovered.set(true);
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('g.reaction-enzyme-badge')?.textContent?.trim()).toBe('Енолаза');
      expect(el.querySelector('g.reaction-tooltip')?.textContent?.trim()).toBe('Енолаза • Енолаза');

      localeService.setLocale('en');
      fixture.detectChanges();
      expect(el.querySelector('g.reaction-enzyme-badge')?.textContent?.trim()).toBe('ENO1');
      expect(el.querySelector('g.reaction-tooltip')?.textContent?.trim()).toBe(
        'ENO1 • Enolase (Phosphopyruvate hydratase)'
      );

      // Junction labels also adapt per locale
      const junctionFixture = TestBed.createComponent(TestHostComponent);
      junctionFixture.componentInstance.testReaction = {
        ...junctionFixture.componentInstance.testReaction,
        junction: { x: 100, y: 100, label: 'CS', labelRu: 'ЦС', width: 38, height: 20 },
      };
      junctionFixture.detectChanges();
      const junction = (junctionFixture.nativeElement as HTMLElement).querySelector('g.reaction-junction')!;
      expect(junction.textContent?.trim()).toBe('CS');
      expect(junction.getAttribute('aria-label')).toBe('CS');

      localeService.setLocale('ru');
      junctionFixture.detectChanges();
      expect(junction.textContent?.trim()).toBe('ЦС');
      expect(junction.getAttribute('aria-label')).toBe('ЦС');
    } finally {
      localeService.setLocale('ru');
    }
  });
});

