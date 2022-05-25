import { useState, useCallback, MutableRefObject } from 'react';
import { useDidMount } from './useDidMount';
import { useMutationObserver } from './useMutationObserver';

export function useBoundingclientrect(ref: MutableRefObject<HTMLElement | null>): DOMRect | null {
  const [value, setValue] = useState<DOMRect | null>(null);

  const update = useCallback(() => {
    setValue(ref.current ? ref.current.getBoundingClientRect() : null);
  }, []);

  useDidMount(() => {
    update();
  });

  useMutationObserver(ref, update);

  return value;
}
