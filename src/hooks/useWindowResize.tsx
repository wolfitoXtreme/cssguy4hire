import { useCallback, useEffect, useRef, useState } from 'react';

import { throttle } from 'lodash';

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export type Resized = boolean | undefined;

export const useWindowResize = (action?: () => void) => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  });
  const resizing = useRef(false);

  const callAction = useCallback(() => {
    action && action();
  }, [action]);

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    resizing.current = true;
  }, []);

  useEffect(() => {
    window.addEventListener(
      'resize',
      throttle(() => {
        handleResize();
      }, 200)
    );

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      resizing.current = false;
    };
  }, [handleResize]);

  useEffect(() => {
    callAction();
  }, [callAction]);

  return {
    width: windowSize.width,
    height: windowSize.height,
    resizing: resizing.current
  };
};
