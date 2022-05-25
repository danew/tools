import { RefObject, useEffect, useRef } from 'react'

import { useIsomorphicEffect } from './useIsomorphicEffect'

type ElementType = HTMLElement | Document;

function unwrap(value: unknown) {
  if (value && typeof value === 'object' && 'current' in value) {
    return (value as any).current;
  } else {
    return value;
  }
}

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
): void

export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends ElementType = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T>,
): void

export function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends ElementType | void = void,
>(
  eventName: KW | KH,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event,
  ) => void,
  element?: T extends HTMLElement ? RefObject<T> : Document,
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler)

  useIsomorphicEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = unwrap(element) ?? element ?? window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = event => savedHandler.current(event)

    targetElement.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

