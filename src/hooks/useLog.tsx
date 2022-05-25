import React from 'react';

export function useLog(value: unknown) {
  React.useEffect(() => {
    console.log(value);
  }, [value]);
}
