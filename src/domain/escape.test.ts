import { getEscapePosition } from './escape';

it('產生的按鈕座標永遠留在手機安全範圍', () => {
  const bounds = { width: 390, height: 844, top: 0, bottomInset: 34 };
  const button = { width: 180, height: 56 };

  for (let seed = 1; seed <= 20; seed += 1) {
    const point = getEscapePosition(bounds, button, { x: 100, y: 400 }, seed);
    expect(point.x).toBeGreaterThanOrEqual(16);
    expect(point.y).toBeGreaterThanOrEqual(120);
    expect(point.x + button.width).toBeLessThanOrEqual(bounds.width - 16);
    expect(point.y + button.height).toBeLessThanOrEqual(bounds.height - bounds.bottomInset - 16);
  }
});

it('新座標與舊座標維持可感知距離', () => {
  const point = getEscapePosition(
    { width: 390, height: 844, top: 0, bottomInset: 34 },
    { width: 180, height: 56 },
    { x: 100, y: 400 },
    4,
  );

  expect(Math.hypot(point.x - 100, point.y - 400)).toBeGreaterThan(50);
});
