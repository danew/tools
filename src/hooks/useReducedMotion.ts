import { useState, useEffect } from "react";

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function queryCnangeHandler(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }
  
    if(mediaQuery) {
      setReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", queryCnangeHandler);
      return () => mediaQuery.removeEventListener("change", queryCnangeHandler);
    }
  }, []);

  return reducedMotion;
};
