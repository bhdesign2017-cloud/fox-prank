import type { Point, Rect, Size } from './types';

export function getEscapePosition(
  bounds: Rect,
  button: Size,
  previous: Point,
  seed: number,
): Point {
  const margin = 16;
  const minY = Math.max(bounds.top + margin, 120);
  const maxX = Math.max(margin, bounds.width - button.width - margin);
  const maxY = Math.max(minY, bounds.height - bounds.bottomInset - button.height - margin);
  const wave = (Math.sin(seed * 999) + 1) / 2;
  const zig = (Math.cos(seed * 577) + 1) / 2;
  const next = {
    x: Math.round(margin + wave * (maxX - margin)),
    y: Math.round(minY + zig * (maxY - minY)),
  };

  if (Math.hypot(next.x - previous.x, next.y - previous.y) >= 90) return next;

  const corners = [
    { x: margin, y: minY },
    { x: maxX, y: minY },
    { x: margin, y: maxY },
    { x: maxX, y: maxY },
  ];

  return corners.sort(
    (a, b) => Math.hypot(b.x - previous.x, b.y - previous.y) - Math.hypot(a.x - previous.x, a.y - previous.y),
  )[0];
}
