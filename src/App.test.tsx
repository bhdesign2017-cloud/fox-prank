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
    '打開遊戲，每日登入獎勵不能漏！',
    '關掉其他 App，遊戲可不能斷線！',
    '遊戲點數卡區，不買也要看一下！',
    '等我打完這局！真的，最後一局！',
    '換個方法試試，說不定有新發現！',
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
