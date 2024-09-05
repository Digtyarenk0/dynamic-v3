import { useCallback, useEffect, useState } from 'react';

export const useAppPath = () => {
  const [path, setPath] = useState(window.location.pathname);

  const listenToPopstate = useCallback(() => {
    const winPath = window.location.pathname;
    setPath(winPath);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, []);

  return path;
};
