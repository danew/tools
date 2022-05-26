import { useEffect } from 'react';

export function useLog(value: unknown) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}
