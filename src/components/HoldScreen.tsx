import { useState } from 'react';
import { usePressHold } from '../hooks/usePressHold';

type HoldScreenProps = {
  onComplete(): void;
};

export function HoldScreen({ onComplete }: HoldScreenProps) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const [keyboardConfirm, setKeyboardConfirm] = useState(0);
  const hold = usePressHold({
    duration: 3000,
    onComplete: () => {
      if (attempt === 0) {
        setAttempt(1);
        setFailed(true);
        hold.reset();
        return;
      }
      onComplete();
    },
  });
  const visibleProgress = failed ? 0.99 : hold.progress;

  return (
    <section className="screen hold-screen" aria-labelledby="hold-title">
      <p className="kicker">最後一道手續（騙你的）</p>
      <h1 id="hold-title">把結果搶回來</h1>
      <p className="hold-instruction">按住不放。狐狸聞得到猶豫。</p>
      <button
        className="hold-control"
        type="button"
        aria-label="長按 3 秒取回結果"
        style={{ '--hold-progress': `${visibleProgress * 360}deg` } as React.CSSProperties}
        {...hold.bind}
        onClick={(event) => {
          if (event.detail !== 0) return;
          if (keyboardConfirm === 0) {
            setKeyboardConfirm(1);
            return;
          }
          onComplete();
        }}
        onPointerDown={(event) => {
          setFailed(false);
          hold.bind.onPointerDown(event);
        }}
      >
        <span aria-hidden="true">{failed ? '99%' : `${Math.round(hold.progress * 100)}%`}</span>
        <strong>{failed ? '差一點' : '按住'}</strong>
      </button>
      <p className="hold-message" aria-live="polite">
        {keyboardConfirm > 0
          ? '鍵盤狐狸不用長按，再確認一次。'
          : failed
            ? '你放太早了。狐狸說的。'
            : attempt > 0
              ? '再來一次，這次真的算。'
              : '要整整三秒，不能偷放。'}
      </p>
    </section>
  );
}
