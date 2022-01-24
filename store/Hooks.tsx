import { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from './Store';

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

export function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
