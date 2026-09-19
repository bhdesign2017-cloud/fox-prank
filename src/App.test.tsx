import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

it('顯示狐狸測驗開場', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: '測出你是哪種狐狸？' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '開始測驗' })).toBeInTheDocument();
});

it('完成五題後進入狐狸 DNA 結果入口', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: '開始測驗' }));
  expect(screen.getByText('第 1 題，共 5 題')).toBeInTheDocument();

  const answers = [
    '領每日登入獎勵',
    '關掉全部 App，只留遊戲',
    '遊戲點數卡，只看不買也開心',
    '我這局打完。真的最後一局',
    '換條路，搞不好更有趣',
  ];

  for (const [index, label] of answers.entries()) {
    await user.click(screen.getByRole('button', { name: new RegExp(label) }));
    if (index < 4) {
      expect(screen.getByText(`第 ${index + 2} 題，共 5 題`)).toBeInTheDocument();
    }
  }

  expect(screen.getByRole('heading', { name: '狐狸 DNA 已解析' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '查看我的狐狸' })).toBeInTheDocument();
});
