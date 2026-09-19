import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { FakeAnalysisScreen } from './FakeAnalysisScreen';

afterEach(() => vi.useRealTimers());

it('分析停在 99% 後宣告結果被叼走', () => {
  vi.useFakeTimers();
  const onDone = vi.fn();
  render(<FakeAnalysisScreen onDone={onDone} />);

  act(() => vi.advanceTimersByTime(1900));
  expect(screen.getByText('結果被狐狸叼走了。')).toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '99');
  expect(onDone).not.toHaveBeenCalled();

  act(() => vi.advanceTimersByTime(1000));
  expect(onDone).toHaveBeenCalledTimes(1);
});
