import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { HoldScreen } from './HoldScreen';

afterEach(() => vi.useRealTimers());

it('第一次長按在 99% 失敗，第二次成功', () => {
  vi.useFakeTimers();
  const onComplete = vi.fn();
  render(<HoldScreen onComplete={onComplete} />);
  const control = screen.getByRole('button', { name: '長按 3 秒取回結果' });

  fireEvent.pointerDown(control);
  act(() => vi.advanceTimersByTime(3000));
  expect(screen.getByText('你放太早了。狐狸說的。')).toBeInTheDocument();
  expect(onComplete).not.toHaveBeenCalled();

  fireEvent.pointerDown(control);
  act(() => vi.advanceTimersByTime(3000));
  expect(onComplete).toHaveBeenCalledTimes(1);
});

it('鍵盤使用者按兩次即可完成', async () => {
  const user = userEvent.setup();
  const onComplete = vi.fn();
  render(<HoldScreen onComplete={onComplete} />);
  const control = screen.getByRole('button', { name: '長按 3 秒取回結果' });

  control.focus();
  await user.keyboard('{Enter}');
  expect(screen.getByText('鍵盤狐狸不用長按，再確認一次。')).toBeInTheDocument();
  await user.keyboard('{Enter}');
  expect(onComplete).toHaveBeenCalledTimes(1);
});
