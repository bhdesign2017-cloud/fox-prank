export type FoxKind = 'sleepy' | 'gamer' | 'snack' | 'social' | 'adventure';

export type Answer = {
  questionId: string;
  optionIndex: number;
  fox: FoxKind;
};

export type QuestionOption = {
  label: string;
  fox: FoxKind;
  emoji: string;
};

export type Question = {
  id: string;
  eyebrow: string;
  prompt: string;
  options: QuestionOption[];
};

export type FoxResult = {
  title: string;
  shortTitle: string;
  tagline: string;
  traits: [string, string, string];
  roast: string;
  accent: string;
  imagePosition: number;
};

export type AppStage = 'intro' | 'quiz' | 'escape' | 'fake-analysis' | 'hold' | 'result';

export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export type Rect = { width: number; height: number; top: number; bottomInset: number };
