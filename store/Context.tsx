import { createContext } from 'react';

const GlobalContext = createContext([{}, () => {}]);

// eslint-disable-next-line import/prefer-default-export
export { GlobalContext };
