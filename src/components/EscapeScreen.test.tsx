import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { EscapeScreen } from './EscapeScreen';

it('前七次點擊逃跑，第八次才完成', async () => {
  const user = userEvent.setup();
  const onCaught = vi.fn();
  render(<EscapeScreen onCaught={onCaught} />);
  const button = screen.getByRole('button', { name: '查看我的狐狸' });

  for (let attempt = 0; attempt < 7; attempt += 1) {
    await user.click(button);
    expect(onCaught).not.toHaveBeenCalled();
  }

  expect(screen.getByText('好啦，這次真的不跑。大概。')).toBeInTheDocument();
  await user.click(button);
  expect(onCaught).toHaveBeenCalledTimes(1);
});

it('鍵盤使用者確認兩次即可完成', async () => {
  const user = userEvent.setup();
  const onCaught = vi.fn();
  render(<EscapeScreen onCaught={onCaught} />);
  const button = screen.getByRole('button', { name: '查看我的狐狸' });

  button.focus();
  await user.keyboard('{Enter}');
  expect(screen.getByText('鍵盤狐狸很聰明，再按一次確認。')).toBeInTheDocument();
  await user.keyboard('{Enter}');
  expect(onCaught).toHaveBeenCalledTimes(1);
});
