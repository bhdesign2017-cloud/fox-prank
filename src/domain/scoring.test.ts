import type { Answer, FoxKind } from './types';
import { scoreQuiz } from './scoring';

const answer = (fox: FoxKind, index = 0): Answer => ({
  questionId: `q-${index}`,
  optionIndex: index,
  fox,
});

it('回傳得分最高的狐狸', () => {
  expect(scoreQuiz([answer('gamer', 1), answer('gamer', 2), answer('sleepy', 3)])).toBe('gamer');
});

it('同分時使用最後出現的候選狐狸', () => {
  expect(scoreQuiz([answer('sleepy', 1), answer('gamer', 2)])).toBe('gamer');
});

it('空答案安全回傳睏睏狐狸', () => {
  expect(scoreQuiz([])).toBe('sleepy');
});

it('相同答案每次產生相同結果', () => {
  const answers = [answer('snack', 1), answer('social', 2), answer('snack', 3)];
  expect(scoreQuiz(answers)).toBe(scoreQuiz(answers));
});
