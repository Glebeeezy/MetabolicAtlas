export interface DualArrowPaths {
  forwardPath: string;
  reversePath: string;
}

interface Point2D {
  x: number;
  y: number;
}

function roundCoord(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return Object.is(rounded, -0) ? '0' : String(rounded);
}

function normalize(vx: number, vy: number): Point2D {
  const len = Math.hypot(vx, vy);
  if (len < 1e-6) {
    return { x: 0, y: 0 };
  }
  return { x: vx / len, y: vy / len };
}

function sampleCubicPoint(
  p0: Point2D,
  p1: Point2D,
  p2: Point2D,
  p3: Point2D,
  t: number
): Point2D {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  };
}

function sampleCubicTangent(
  p0: Point2D,
  p1: Point2D,
  p2: Point2D,
  p3: Point2D,
  t: number
): Point2D {
  const mt = 1 - t;
  let tx =
    3 * mt * mt * (p1.x - p0.x) +
    6 * mt * t * (p2.x - p1.x) +
    3 * t * t * (p3.x - p2.x);
  let ty =
    3 * mt * mt * (p1.y - p0.y) +
    6 * mt * t * (p2.y - p1.y) +
    3 * t * t * (p3.y - p2.y);

  if (Math.hypot(tx, ty) < 1e-5) {
    // Handle zero-length handles at endpoints by checking chord fallback
    if (t < 0.5) {
      tx = p2.x - p0.x;
      ty = p2.y - p0.y;
    } else {
      tx = p3.x - p1.x;
      ty = p3.y - p1.y;
    }
    if (Math.hypot(tx, ty) < 1e-5) {
      tx = p3.x - p0.x;
      ty = p3.y - p0.y;
    }
  }

  return normalize(tx, ty);
}

/**
 * Converts a sequence of sampled points + endpoint tangents into a smooth chained cubic Bezier path.
 */
function fitSmoothCubicPath(points: Point2D[], startTangent: Point2D, endTangent: Point2D): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${roundCoord(points[0].x)} ${roundCoord(points[0].y)}`;
  if (points.length === 2) {
    return `M ${roundCoord(points[0].x)} ${roundCoord(points[0].y)} L ${roundCoord(points[1].x)} ${roundCoord(points[1].y)}`;
  }

  const last = points.length - 1;
  const parts: string[] = [`M ${roundCoord(points[0].x)} ${roundCoord(points[0].y)}`];

  for (let i = 0; i < last; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const segLen = Math.hypot(p1.x - p0.x, p1.y - p0.y);

    let c1: Point2D;
    if (i === 0) {
      c1 = {
        x: p0.x + (startTangent.x * segLen) / 3,
        y: p0.y + (startTangent.y * segLen) / 3,
      };
    } else {
      const prev = points[i - 1];
      c1 = {
        x: p0.x + (p1.x - prev.x) / 6,
        y: p0.y + (p1.y - prev.y) / 6,
      };
    }

    let c2: Point2D;
    if (i === last - 1) {
      c2 = {
        x: p1.x - (endTangent.x * segLen) / 3,
        y: p1.y - (endTangent.y * segLen) / 3,
      };
    } else {
      const next = points[i + 2];
      c2 = {
        x: p1.x - (next.x - p0.x) / 6,
        y: p1.y - (next.y - p0.y) / 6,
      };
    }

    parts.push(
      `C ${roundCoord(c1.x)} ${roundCoord(c1.y)}, ${roundCoord(c2.x)} ${roundCoord(c2.y)}, ${roundCoord(p1.x)} ${roundCoord(p1.y)}`
    );
  }

  return parts.join(' ');
}

function offsetCircularArc(
  x0: number,
  y0: number,
  rx: number,
  ry: number,
  xAxisRot: number,
  largeArc: number,
  sweep: number,
  x1: number,
  y1: number,
  offset: number
): DualArrowPaths | null {
  if (Math.abs(rx - ry) > 0.5 || xAxisRot !== 0 || rx < 1) {
    return null;
  }

  const r = rx;
  const dx2 = (x0 - x1) / 2;
  const dy2 = (y0 - y1) / 2;
  const rSq = r * r;
  const distSq = dx2 * dx2 + dy2 * dy2;
  if (distSq < 1e-6) {
    return null;
  }

  const factor = (largeArc === sweep ? -1 : 1) * Math.sqrt(Math.max(0, rSq / distSq - 1));
  const cx = factor * dy2 + (x0 + x1) / 2;
  const cy = factor * -dx2 + (y0 + y1) / 2;

  const u0 = normalize(x0 - cx, y0 - cy);
  const u1 = normalize(x1 - cx, y1 - cy);

  // For clockwise arcs (sweep === 1), left-hand normal points radially outward (+offset).
  // For counter-clockwise arcs (sweep === 0), left-hand normal points radially inward (-offset).
  const dir = sweep === 1 ? 1 : -1;
  const rFwd = Math.max(4, r + dir * offset);
  const rRev = Math.max(4, r - dir * offset);

  const fwdStart = { x: x0 + dir * offset * u0.x, y: y0 + dir * offset * u0.y };
  const fwdEnd = { x: x1 + dir * offset * u1.x, y: y1 + dir * offset * u1.y };

  const revStart = { x: x1 - dir * offset * u1.x, y: y1 - dir * offset * u1.y };
  const revEnd = { x: x0 - dir * offset * u0.x, y: y0 - dir * offset * u0.y };

  return {
    forwardPath: `M ${roundCoord(fwdStart.x)} ${roundCoord(fwdStart.y)} A ${roundCoord(rFwd)} ${roundCoord(rFwd)} 0 ${largeArc} ${sweep} ${roundCoord(fwdEnd.x)} ${roundCoord(fwdEnd.y)}`,
    reversePath: `M ${roundCoord(revStart.x)} ${roundCoord(revStart.y)} A ${roundCoord(rRev)} ${roundCoord(rRev)} 0 ${largeArc} ${1 - sweep} ${roundCoord(revEnd.x)} ${roundCoord(revEnd.y)}`,
  };
}

/**
 * Computes two parallel/concentric opposing SVG paths (`forwardPath` and `reversePath`)
 * from a canonical centerline `pathData` for reversible metabolic reactions.
 *
 * Supports straight lines (`M ... L ...`), circular arcs (`M ... A ...`),
 * and single or chained cubic Bezier curves (`M ... C ...`).
 */
export function computeDualArrowPaths(pathData: string, offset = 4.5): DualArrowPaths {
  const trimmed = pathData.trim();

  // 1. Single straight line: M x0 y0 L x1 y1
  const lineMatch = trimmed.match(
    /^M\s*(-?[\d.]+)\s+(-?[\d.]+)\s+L\s*(-?[\d.]+)\s+(-?[\d.]+)$/
  );
  if (lineMatch) {
    const x0 = parseFloat(lineMatch[1]);
    const y0 = parseFloat(lineMatch[2]);
    const x1 = parseFloat(lineMatch[3]);
    const y1 = parseFloat(lineMatch[4]);
    const tangent = normalize(x1 - x0, y1 - y0);
    const nx = -tangent.y;
    const ny = tangent.x;

    return {
      forwardPath: `M ${roundCoord(x0 + nx * offset)} ${roundCoord(y0 + ny * offset)} L ${roundCoord(x1 + nx * offset)} ${roundCoord(y1 + ny * offset)}`,
      reversePath: `M ${roundCoord(x1 - nx * offset)} ${roundCoord(y1 - ny * offset)} L ${roundCoord(x0 - nx * offset)} ${roundCoord(y0 - ny * offset)}`,
    };
  }

  // 2. Circular SVG arc: M x0 y0 A rx ry rot large sweep x1 y1
  const arcMatch = trimmed.match(
    /^M\s*(-?[\d.]+)\s+(-?[\d.]+)\s+A\s*(-?[\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s+([01])\s+([01])\s+(-?[\d.]+)\s+(-?[\d.]+)$/
  );
  if (arcMatch) {
    const res = offsetCircularArc(
      parseFloat(arcMatch[1]),
      parseFloat(arcMatch[2]),
      parseFloat(arcMatch[3]),
      parseFloat(arcMatch[4]),
      parseFloat(arcMatch[5]),
      parseInt(arcMatch[6], 10),
      parseInt(arcMatch[7], 10),
      parseFloat(arcMatch[8]),
      parseFloat(arcMatch[9]),
      offset
    );
    if (res) {
      return res;
    }
  }

  // 3. Cubic Bezier (single or chained): M x0 y0 C ... [C ...]
  const tokens = trimmed.replace(/,/g, ' ').split(/\s+/);
  const segments: { p0: Point2D; p1: Point2D; p2: Point2D; p3: Point2D }[] = [];
  let cursor: Point2D = { x: 0, y: 0 };

  for (let i = 0; i < tokens.length; ) {
    const cmd = tokens[i];
    if (cmd === 'M' && i + 2 < tokens.length) {
      cursor = { x: parseFloat(tokens[i + 1]), y: parseFloat(tokens[i + 2]) };
      i += 3;
    } else if (cmd === 'C' && i + 6 < tokens.length) {
      const p1 = { x: parseFloat(tokens[i + 1]), y: parseFloat(tokens[i + 2]) };
      const p2 = { x: parseFloat(tokens[i + 3]), y: parseFloat(tokens[i + 4]) };
      const p3 = { x: parseFloat(tokens[i + 5]), y: parseFloat(tokens[i + 6]) };
      segments.push({ p0: cursor, p1, p2, p3 });
      cursor = p3;
      i += 7;
    } else if (cmd === 'L' && i + 2 < tokens.length) {
      const p3 = { x: parseFloat(tokens[i + 1]), y: parseFloat(tokens[i + 2]) };
      const p1 = {
        x: cursor.x + (p3.x - cursor.x) / 3,
        y: cursor.y + (p3.y - cursor.y) / 3,
      };
      const p2 = {
        x: cursor.x + ((p3.x - cursor.x) * 2) / 3,
        y: cursor.y + ((p3.y - cursor.y) * 2) / 3,
      };
      segments.push({ p0: cursor, p1, p2, p3 });
      cursor = p3;
      i += 3;
    } else {
      i++;
    }
  }

  if (segments.length > 0) {
    const fwdPts: Point2D[] = [];
    const revPts: Point2D[] = [];
    const stepsPerSeg = 14;

    segments.forEach((seg, sIdx) => {
      const startStep = sIdx === 0 ? 0 : 1;
      for (let step = startStep; step <= stepsPerSeg; step++) {
        const t = step / stepsPerSeg;
        const pt = sampleCubicPoint(seg.p0, seg.p1, seg.p2, seg.p3, t);
        const tan = sampleCubicTangent(seg.p0, seg.p1, seg.p2, seg.p3, t);
        const nx = -tan.y;
        const ny = tan.x;
        fwdPts.push({ x: pt.x + nx * offset, y: pt.y + ny * offset });
        revPts.push({ x: pt.x - nx * offset, y: pt.y - ny * offset });
      }
    });

    const firstSeg = segments[0];
    const lastSeg = segments[segments.length - 1];
    const startTan = sampleCubicTangent(firstSeg.p0, firstSeg.p1, firstSeg.p2, firstSeg.p3, 0);
    const endTan = sampleCubicTangent(lastSeg.p0, lastSeg.p1, lastSeg.p2, lastSeg.p3, 1);

    const revOrdered = [...revPts].reverse();
    return {
      forwardPath: fitSmoothCubicPath(fwdPts, startTan, endTan),
      reversePath: fitSmoothCubicPath(
        revOrdered,
        { x: -endTan.x, y: -endTan.y },
        { x: -startTan.x, y: -startTan.y }
      ),
    };
  }

  return { forwardPath: trimmed, reversePath: trimmed };
}

