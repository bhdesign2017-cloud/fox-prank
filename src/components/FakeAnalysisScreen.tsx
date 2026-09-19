import { useEffect, useState } from 'react';
import heroFox from '../assets/fox-hero-web.png';

type FakeAnalysisScreenProps = {
  onDone(): void;
};

export function FakeAnalysisScreen({ onDone }: FakeAnalysisScreenProps) {
  const [progress, setProgress] = useState(12);
  const [stolen, setStolen] = useState(false);

  useEffect(() => {
    const progressTimer = window.setTimeout(() => setProgress(99), 1600);
    const stolenTimer = window.setTimeout(() => setStolen(true), 1800);
    const doneTimer = window.setTimeout(onDone, 2800);
    return () => {
      window.clearTimeout(progressTimer);
      window.clearTimeout(stolenTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <section className="screen analysis-screen" aria-labelledby="analysis-title">
      <p className="kicker">不要關掉</p>
      <h1 id="analysis-title">正在解密狐狸 DNA</h1>
      <div
        className="analysis-meter"
        role="progressbar"
        aria-label="狐狸 DNA 分析進度"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="analysis-number">{progress}%</p>
      <div className={`analysis-status ${stolen ? 'is-stolen' : ''}`} aria-live="assertive">
        {stolen ? (
          <>
            <img className="stealing-fox" src={heroFox} alt="" aria-hidden="true" />
            <strong>結果被狐狸叼走了。</strong>
          </>
        ) : (
          <span>正在比對可疑的生活習慣……</span>
        )}
      </div>
    </section>
  );
}
