import { useEffect } from 'react';

type DidMountCallback = () => unknown;

export function useDidMount(callback: DidMountCallback): void {
  useEffect(() => {
    if (typeof callback === 'function') {
      callback();
    }
  }, []);
}
