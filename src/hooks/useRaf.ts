import { useRef, useEffect } from 'react';

type RafCallback = (timeElapsed: number) => void;

export function useRaf(callback: RafCallback, isActive: boolean = true): void {
  const savedCallback = useRef<(timeElapsed: number) => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let animationFrame: number;

    function tick(time: number) {
      animationFrame = requestAnimationFrame(tick);
      if (typeof savedCallback.current === 'function') {
        savedCallback.current?.(time);
      }
    }

    if (isActive) {
      animationFrame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isActive]);
}
