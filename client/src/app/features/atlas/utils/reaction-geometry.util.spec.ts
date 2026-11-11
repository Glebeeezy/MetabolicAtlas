import { describe, expect, it } from 'vitest';
import { computeDualArrowPaths } from './reaction-geometry.util';

describe('computeDualArrowPaths', () => {
  it('offsets vertical downward line horizontally by ±offset in opposite directions', () => {
    const { forwardPath, reversePath } = computeDualArrowPaths('M 1600 280 L 1600 366', 4.5);

    // Downward tangent (0, 1) -> left normal (-1, 0)
    expect(forwardPath).toBe('M 1595.5 280 L 1595.5 366');
    // Reverse goes bottom -> top along right-hand side (+4.5)
    expect(reversePath).toBe('M 1604.5 366 L 1604.5 280');
  });

  it('offsets horizontal line vertically by ±offset in opposite directions', () => {
    const { forwardPath, reversePath } = computeDualArrowPaths('M 860 -77 L 1175 -77', 4.5);

    // Rightward tangent (1, 0) -> left normal (0, 1)
    expect(forwardPath).toBe('M 860 -72.5 L 1175 -72.5');
    expect(reversePath).toBe('M 1175 -81.5 L 860 -81.5');
  });

  it('offsets diagonal straight line perpendicularly while preserving exact distance', () => {
    const { forwardPath, reversePath } = computeDualArrowPaths('M 0 0 L 30 40', 5);

    // Tangent (0.6, 0.8) -> left normal (-0.8, 0.6) -> offset * normal = (-4, 3)
    expect(forwardPath).toBe('M -4 3 L 26 43');
    expect(reversePath).toBe('M 34 37 L 4 -3');
  });

  it('produces concentric circular arcs for clockwise TCA cycle segments', () => {
    // R_MDH canonical clockwise arc centered at (1600, 2190) with R = 420
    const { forwardPath, reversePath } = computeDualArrowPaths(
      'M 1222 2005 A 420 420 0 0 1 1368 1840',
      4.5
    );

    expect(forwardPath).toMatch(/^M [\d.-]+ [\d.-]+ A 424\.5 424\.5 0 0 1 [\d.-]+ [\d.-]+$/);
    expect(reversePath).toMatch(/^M [\d.-]+ [\d.-]+ A 415\.5 415\.5 0 0 0 [\d.-]+ [\d.-]+$/);

    // Verify start/end radii from center (1600, 2190)
    const fwdMatch = forwardPath.match(/^M ([\d.-]+) ([\d.-]+) A/);
    const revMatch = reversePath.match(/^M ([\d.-]+) ([\d.-]+) A/);
    expect(fwdMatch).toBeTruthy();
    expect(revMatch).toBeTruthy();

    const fwdDist = Math.hypot(parseFloat(fwdMatch![1]) - 1600, parseFloat(fwdMatch![2]) - 2190);
    const revDist = Math.hypot(parseFloat(revMatch![1]) - 1600, parseFloat(revMatch![2]) - 2190);
    // Original start (1222, 2005) sits at ~420.84px from center (1600, 2190);
    // original end (1368, 1840) sits at ~419.91px.
    expect(fwdDist).toBeGreaterThan(424);
    expect(revDist).toBeLessThan(417);
  });

  it('produces concentric circular arcs for counter-clockwise circular arcs', () => {
    const { forwardPath, reversePath } = computeDualArrowPaths(
      'M 100 0 A 100 100 0 0 0 0 100',
      4.5
    );

    // Center of M 100 0 A 100 100 0 0 0 0 100 in SVG y-down coords is (100, 100)
    expect(forwardPath).toBe('M 100 4.5 A 95.5 95.5 0 0 0 4.5 100');
    expect(reversePath).toBe('M -4.5 100 A 104.5 104.5 0 0 1 100 -4.5');
  });

  it('offsets single cubic Bezier curves into reversed opposing smooth cubic chains', () => {
    const { forwardPath, reversePath } = computeDualArrowPaths(
      'M 860 -77 C 920 -77, 945 -124, 991 -124',
      4.5
    );

    expect(forwardPath.startsWith('M ')).toBe(true);
    expect(reversePath.startsWith('M ')).toBe(true);
    expect(forwardPath).toContain(' C ');
    expect(reversePath).toContain(' C ');

    // Start tangent is (1, 0) -> left normal is (0, 1) -> forward starts at (860, -72.5)
    expect(forwardPath.startsWith('M 860 -72.5 ')).toBe(true);
    // Reverse starts near the end (991, -124 - 4.5) = (991, -128.5)
    expect(reversePath.startsWith('M 991 -128.5 ')).toBe(true);
  });

  it('offsets chained cubic Bezier curves continuously', () => {
    const { forwardPath, reversePath } = computeDualArrowPaths(
      'M 0 0 C 40 0, 60 50, 100 50 C 140 50, 160 0, 200 0',
      4
    );

    expect(forwardPath.startsWith('M 0 4 ')).toBe(true);
    expect(reversePath.startsWith('M 200 -4 ')).toBe(true);
    expect(forwardPath.endsWith(' 200 4')).toBe(true);
    expect(reversePath.endsWith(' 0 -4')).toBe(true);
  });
});
