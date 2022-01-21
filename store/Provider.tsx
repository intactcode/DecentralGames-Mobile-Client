/* eslint-disable indent */
import { ReactChild, ReactFragment, ReactPortal, useReducer } from 'react';
import { GlobalContext } from './Context';

const initialState = {
  userStatus: 0,
  userAddress: '',
  userInfo: {
    name: '',
    id: 0,
    balancePLAY: 0,
    count: '',
    email: '',
  },
  tokenAmounts: {
    ICE_AMOUNT: 0,
    XP_AMOUNT: 0,
  },
  socketConnect: false,
  createTable: false,
};

const reducer = (state: any, action: { type: any; data: any }) => {
  switch (action.type) {
    case 'update_status': {
      return {
        ...state,
        userStatus: action.data,
      };
    }
    case 'user_address': {
      return {
        ...state,
        userAddress: action.data,
      };
    }
    case 'user_info': {
      return {
        ...state,
        userInfo: action.data,
      };
    }
    case 'token_amounts': {
      return {
        ...state,
        tokenAmounts: action.data,
      };
    }
    case 'socket_connect': {
      return {
        ...state,
        socketConnect: action.data,
      };
    }
    case 'create_table': {
      return {
        ...state,
        createTable: action.data,
      };
    }
    default: {
      throw new Error('Wrong action type got dispatched');
    }
  }
};

const Provider = (props: {
  store: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { Provider };
