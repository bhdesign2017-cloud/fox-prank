import { useRef, useState } from 'react';
import { getEscapePosition } from '../domain/escape';
import { taunts } from '../domain/quizData';
import type { Point } from '../domain/types';
import { useReducedMotion } from '../hooks/useReducedMotion';

type EscapeScreenProps = {
  onCaught(): void;
};

export function EscapeScreen({ onCaught }: EscapeScreenProps) {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState<Point | null>(null);
  const [keyboardConfirms, setKeyboardConfirms] = useState(0);
  const arenaRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const blockedClick = useRef(false);
  const reducedMotion = useReducedMotion();

  const dodge = () => {
    if (attempts >= taunts.length) {
      blockedClick.current = false;
      return;
    }

    blockedClick.current = true;
    const arena = arenaRef.current?.getBoundingClientRect();
    const button = buttonRef.current?.getBoundingClientRect();
    if (arena && button) {
      const previous = position ?? { x: (arena.width - button.width) / 2, y: arena.height - 140 };
      setPosition(getEscapePosition(
        { width: arena.width, height: arena.height, top: 0, bottomInset: 20 },
        { width: button.width, height: button.height },
        previous,
        attempts + 1,
      ));
    }

    setAttempts((count) => count + 1);
    if (typeof navigator.vibrate === 'function') navigator.vibrate(18);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) {
      if (keyboardConfirms === 0) {
        setKeyboardConfirms(1);
        return;
      }
      onCaught();
      return;
    }

    if (blockedClick.current) {
      blockedClick.current = false;
      return;
    }
    onCaught();
  };

  const status = keyboardConfirms > 0
    ? '鍵盤狐狸很聰明，再按一次確認。'
    : attempts > 0
      ? taunts[Math.min(attempts - 1, taunts.length - 1)]
      : '你的答案很有問題。結果更有問題。';

  return (
    <section
      className="screen escape-screen"
      aria-labelledby="escape-title"
      ref={arenaRef}
      data-reduced-motion={reducedMotion || undefined}
    >
      <div className="escape-copy">
        <p className="kicker">分析完成</p>
        <h1 id="escape-title">狐狸 DNA 已解析</h1>
        <p className="taunt" aria-live="polite">{status}</p>
        <p className="attempt-counter" aria-hidden="true">MISS {String(attempts).padStart(2, '0')}</p>
      </div>
      <button
        className={`primary-button runaway-button ${position ? 'is-positioned' : ''}`}
        type="button"
        ref={buttonRef}
        onPointerDown={dodge}
        onClick={handleClick}
        style={position ? { left: position.x, top: position.y } : undefined}
      >
        查看我的狐狸
      </button>
    </section>
  );
}
