import { useContext, useEffect, useState, useRef } from 'react';
import { debounce } from 'lodash';
import { GlobalContext } from '../store/Store';

export function useStoreDispatch(): any {
  const store = useContext(GlobalContext);

  if (!store) {
    return null;
  }

  return store[1];
}

export function useStoreState(): any {
  const store = useContext(GlobalContext);

  if (!store) {
    return null;
  }

  return store[0];
}

// export function usePrevious<T>(value: T): T {
//   const ref: any = useRef<T>();
//   useEffect(() => {
//     ref.current = value;
//   }, [value]);
//   return ref.current;
// }

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.visualViewport.height,
        });
      };

      // Add event listener
      window.addEventListener('resize', debounce(handleResize, 750));

      handleResize();

      return () =>
        window.removeEventListener('resize', debounce(handleResize, 750));
    }
  }, []);

  return windowSize;
};
