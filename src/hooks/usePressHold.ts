import { useCallback, useEffect, useRef, useState } from 'react';

type UsePressHoldOptions = {
  duration: number;
  onComplete(): void;
};

export function usePressHold({ duration, onComplete }: UsePressHoldOptions) {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef(0);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  const clear = useCallback((resetProgress: boolean) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (resetProgress) setProgress(0);
  }, []);

  const start = useCallback((_event?: React.PointerEvent) => {
    clear(true);
    startedAtRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const next = Math.min(1, (Date.now() - startedAtRef.current) / duration);
      setProgress(next);
      if (next >= 1) {
        clear(false);
        completeRef.current();
      }
    }, 50);
  }, [clear, duration]);

  const cancel = useCallback(() => clear(true), [clear]);

  useEffect(() => () => clear(false), [clear]);

  return {
    progress,
    reset: () => setProgress(0),
    bind: {
      onPointerDown: start,
      onPointerUp: cancel,
      onPointerCancel: cancel,
      onPointerLeave: cancel,
      onContextMenu: (event: React.MouseEvent) => event.preventDefault(),
    },
  };
}
