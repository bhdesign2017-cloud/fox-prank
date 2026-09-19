import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { foxResults } from '../domain/quizData';
import { ResultScreen } from './ResultScreen';

it('顯示真實狐狸結果、三項特質與被耍稱號', () => {
  render(<ResultScreen result={foxResults.gamer} onRestart={vi.fn()} />);

  expect(screen.getByRole('heading', { name: '你是電動狐狸' })).toBeInTheDocument();
  foxResults.gamer.traits.forEach((trait) => expect(screen.getByText(trait)).toBeInTheDocument());
  expect(screen.getByText('容易相信按鈕的被耍狐狸')).toBeInTheDocument();
});

it('可複製整人連結並顯示成功訊息', async () => {
  const user = userEvent.setup();
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  render(<ResultScreen result={foxResults.sleepy} onRestart={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: '複製整人連結' }));
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(screen.getByText('連結已複製，下一隻狐狸換誰？')).toBeInTheDocument();
});

it('複製失敗時顯示可手動複製的網址', async () => {
  const user = userEvent.setup();
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    configurable: true,
  });
  render(<ResultScreen result={foxResults.social} onRestart={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: '複製整人連結' }));
  expect(screen.getByLabelText('可手動複製的整人網址')).toHaveValue(window.location.href.split('#')[0]);
});

it('重新測驗按鈕會呼叫重置', async () => {
  const user = userEvent.setup();
  const onRestart = vi.fn();
  render(<ResultScreen result={foxResults.adventure} onRestart={onRestart} />);

  await user.click(screen.getByRole('button', { name: '再測一次' }));
  expect(onRestart).toHaveBeenCalledTimes(1);
});
