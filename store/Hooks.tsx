import { useContext } from 'react';
import { GlobalContext } from './index';

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
