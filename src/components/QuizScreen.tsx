import { useState } from 'react';
import { questions } from '../domain/quizData';
import type { Answer } from '../domain/types';

type QuizScreenProps = {
  onComplete(answers: Answer[]): void;
};

export function QuizScreen({ onComplete }: QuizScreenProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const question = questions[questionIndex];

  const choose = (optionIndex: number) => {
    const option = question.options[optionIndex];
    const nextAnswers = [
      ...answers,
      { questionId: question.id, optionIndex, fox: option.fox },
    ];

    if (questionIndex === questions.length - 1) {
      onComplete(nextAnswers);
      return;
    }

    setAnswers(nextAnswers);
    setQuestionIndex((current) => current + 1);
  };

  return (
    <section className="screen quiz-screen" aria-labelledby={`question-${question.id}`}>
      <header className="quiz-header">
        <p className="progress-label">第 {questionIndex + 1} 題，共 {questions.length} 題</p>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </header>
      <div className="question-copy">
        <p className="kicker">{question.eyebrow}</p>
        <h2 id={`question-${question.id}`}>{question.prompt}</h2>
      </div>
      <div className="answer-list">
        {question.options.map((option, index) => (
          <button className="answer-button" type="button" key={option.label} onClick={() => choose(index)}>
            <span className="answer-emoji" aria-hidden="true">{option.emoji}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
