import { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { QuizScreen } from './components/QuizScreen';
import { EscapeScreen } from './components/EscapeScreen';
import { FakeAnalysisScreen } from './components/FakeAnalysisScreen';
import { HoldScreen } from './components/HoldScreen';
import { ResultScreen } from './components/ResultScreen';
import { foxResults } from './domain/quizData';
import { scoreQuiz } from './domain/scoring';
import type { Answer, AppStage, FoxKind } from './domain/types';

export default function App() {
  const [stage, setStage] = useState<AppStage>('intro');
  const [, setAnswers] = useState<Answer[]>([]);
  const [resultKind, setResultKind] = useState<FoxKind>('sleepy');

  const handleQuizComplete = (nextAnswers: Answer[]) => {
    setAnswers(nextAnswers);
    setResultKind(scoreQuiz(nextAnswers));
    setStage('escape');
  };

  const restart = () => {
    setAnswers([]);
    setResultKind('sleepy');
    setStage('intro');
  };

  return (
    <main className="app-shell">
      {stage === 'intro' && <IntroScreen onStart={() => setStage('quiz')} />}
      {stage === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {stage === 'escape' && <EscapeScreen onCaught={() => setStage('fake-analysis')} />}
      {stage === 'fake-analysis' && <FakeAnalysisScreen onDone={() => setStage('hold')} />}
      {stage === 'hold' && <HoldScreen onComplete={() => setStage('result')} />}
      {stage === 'result' && <ResultScreen result={foxResults[resultKind]} onRestart={restart} />}
    </main>
  );
}
