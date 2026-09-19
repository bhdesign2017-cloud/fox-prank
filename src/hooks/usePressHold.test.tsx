import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { usePressHold } from './usePressHold';

afterEach(() => {
  vi.useRealTimers();
});

it('持續按壓指定時間後完成', () => {
  vi.useFakeTimers();
  const onComplete = vi.fn();
  const { result } = renderHook(() => usePressHold({ duration: 3000, onComplete }));

  act(() => result.current.bind.onPointerDown());
  act(() => vi.advanceTimersByTime(3000));

  expect(onComplete).toHaveBeenCalledTimes(1);
});

it('中途取消會歸零且不完成', () => {
  vi.useFakeTimers();
  const onComplete = vi.fn();
  const { result } = renderHook(() => usePressHold({ duration: 3000, onComplete }));

  act(() => result.current.bind.onPointerDown());
  act(() => vi.advanceTimersByTime(1000));
  act(() => result.current.bind.onPointerCancel());
  act(() => vi.advanceTimersByTime(3000));

  expect(result.current.progress).toBe(0);
  expect(onComplete).not.toHaveBeenCalled();
});
