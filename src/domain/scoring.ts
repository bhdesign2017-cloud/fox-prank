import type { Answer, FoxKind } from './types';

const foxOrder: FoxKind[] = ['sleepy', 'gamer', 'snack', 'social', 'adventure'];

export function scoreQuiz(answers: Answer[]): FoxKind {
  if (answers.length === 0) return 'sleepy';

  const scores = Object.fromEntries(foxOrder.map((kind) => [kind, 0])) as Record<FoxKind, number>;
  answers.forEach((answer) => {
    scores[answer.fox] += 1;
  });

  const highestScore = Math.max(...Object.values(scores));
  const tied = foxOrder.filter((kind) => scores[kind] === highestScore);
  const recentWinner = [...answers].reverse().find((answer) => tied.includes(answer.fox));

  return recentWinner?.fox ?? tied[0];
}
