import type { MutableRefObject } from "react";
import { useEffect } from "react";

const config: MutationObserverInit = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
};

export function useMutationObserver(
  ref: MutableRefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = config
): void {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);

      observer.observe(ref.current, options);

      return () => {
        observer.disconnect();
      };
    }
  }, [callback, options]);
}
