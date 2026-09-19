import { foxResults, questions, taunts } from './quizData';

it('提供五題且每題四個選項', () => {
  expect(questions).toHaveLength(5);
  questions.forEach((question) => expect(question.options).toHaveLength(4));
});

it('提供五種狐狸結果與七句升級嘲諷', () => {
  expect(Object.keys(foxResults)).toEqual(['sleepy', 'gamer', 'snack', 'social', 'adventure']);
  expect(taunts).toHaveLength(7);
});

it('每種狐狸在題庫中恰好出現四次', () => {
  const counts = questions.flatMap((question) => question.options).reduce<Record<string, number>>((all, option) => {
    all[option.fox] = (all[option.fox] ?? 0) + 1;
    return all;
  }, {});

  expect(counts).toEqual({ sleepy: 4, gamer: 4, snack: 4, adventure: 4, social: 4 });
});
