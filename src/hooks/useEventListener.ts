import { useRef, useEffect, useCallback, RefObject } from 'react';

function getRefElement<T>(element?: RefObject<Element> | T): Element | T | undefined | null {
  if (element && 'current' in element) {
    return element.current;
  }
  return element;
}

interface UseEventListener {
  type: keyof WindowEventMap;
  listener: EventListener;
  element?: RefObject<Element> | Document | Window | null;
  options?: AddEventListenerOptions;
}

export const useEventListener = ({
  type,
  listener,
  element = typeof window === 'undefined' ? undefined : window,
  options,
}: UseEventListener): void => {
  const savedListener = useRef<EventListener>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  const handleEventListener = useCallback((event: Event) => {
    savedListener.current?.(event);
  }, []);

  useEffect(() => {
    const target = getRefElement(element);
    target?.addEventListener(type, handleEventListener, options);
    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, options, handleEventListener]);
};
