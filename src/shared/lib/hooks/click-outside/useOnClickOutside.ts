import React, { useEffect } from 'react';

export const useOnClickOutside = (ref: React.RefObject<any>, handler: (e: Event) => void) => {
  useEffect(() => {
    const listener = (e: Event) => {
      const el = ref?.current;
      if (!el || el.contains(e?.target || null)) return;
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
