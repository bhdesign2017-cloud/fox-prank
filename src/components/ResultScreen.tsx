import { useState } from 'react';
import type { FoxResult } from '../domain/types';
import resultFoxes from '../assets/fox-results-web.png';

type ResultScreenProps = {
  result: FoxResult;
  onRestart(): void;
};

type CopyState = 'idle' | 'copied' | 'manual';

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [manualUrl, setManualUrl] = useState('');

  const copyLink = async () => {
    const url = window.location.href.split('#')[0];
    try {
      await navigator.clipboard.writeText(url);
      setCopyState('copied');
    } catch {
      setManualUrl(url);
      setCopyState('manual');
    }
  };

  return (
    <section
      className="screen result-screen"
      aria-labelledby="result-title"
      style={{ '--result-accent': result.accent } as React.CSSProperties}
    >
      <p className="kicker">官方認證（並沒有）</p>
      <div className="result-visual" aria-hidden="true">
        <div className="result-fox-crop">
          <img
            src={resultFoxes}
            alt=""
            style={{ '--fox-index': result.imagePosition } as React.CSSProperties}
          />
        </div>
        <span className="result-stamp">{result.shortTitle}</span>
      </div>
      <div className="result-copy">
        <p className="result-overline">測驗結果</p>
        <h1 id="result-title">你是{result.title}</h1>
        <p className="result-tagline">{result.tagline}</p>
      </div>
      <ul className="trait-list" aria-label="你的三項狐狸特質">
        {result.traits.map((trait) => <li key={trait}>{trait}</li>)}
      </ul>
      <blockquote>{result.roast}</blockquote>
      <div className="secret-result">
        <span>隱藏稱號解鎖</span>
        <strong>容易相信按鈕的被耍狐狸</strong>
      </div>
      <div className="result-actions">
        <button className="primary-button" type="button" onClick={copyLink}>複製整人連結</button>
        <button className="text-button" type="button" onClick={onRestart}>再測一次</button>
      </div>
      <div className="copy-feedback" aria-live="polite">
        {copyState === 'copied' && <p>連結已複製，下一隻狐狸換誰？</p>}
        {copyState === 'manual' && (
          <label>
            手動複製這串網址
            <input aria-label="可手動複製的整人網址" value={manualUrl} readOnly onFocus={(event) => event.currentTarget.select()} />
          </label>
        )}
      </div>
    </section>
  );
}
