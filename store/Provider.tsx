import { ReactChild, ReactFragment, ReactPortal, useReducer } from 'react';
import { GlobalContext } from './Context';

const initialState = {
  userStatus: 0,
  userAddress: '',
  web3Provider: null,
  game: '',
  tokenAmounts: {
    ICE_AMOUNT: 0,
    XP_AMOUNT: 0,
    DG_AMOUNT: 0,
  },
  socket: {},
  tableData: {},
  chipUpdate: {},
  currentSeat: {},
  playerSitDown: {},
  cards: [],
  waitTime: 0,
  winners: {},
  foldedUser: [],
  isWon: false,
  refreshBalances: false,
  isLoading: false,
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
    case 'web3_provider': {
      return {
        ...state,
        web3Provider: action.data,
      };
    }
    case 'game_type': {
      return {
        ...state,
        game: action.data,
      };
    }
    case 'token_amounts': {
      return {
        ...state,
        tokenAmounts: action.data,
      };
    }
    case 'socket_instance': {
      return {
        ...state,
        socket: action.data,
      };
    }
    case 'table_data': {
      return {
        ...state,
        tableData: action.data,
      };
    }
    case 'chip_update': {
      return {
        ...state,
        chipUpdate: action.data,
      };
    }
    case 'current_seat': {
      return {
        ...state,
        currentSeat: action.data,
      };
    }
    case 'player_sit_down': {
      return {
        ...state,
        playerSitDown: action.data,
      };
    }
    case 'cards': {
      return {
        ...state,
        cards: action.data,
      };
    }
    case 'wait_time': {
      return {
        ...state,
        waitTime: action.data,
        isWon: action.data === 0 ? false : state.isWon,
      };
    }
    case 'set_folded_user': {
      return {
        ...state,
        foldedUser: action.data,
      };
    }
    case 'set_winner': {
      return {
        ...state,
        winners: action.data,
        isWon: true,
      };
    }
    case 'refresh_balances':
      return {
        ...state,
        refreshBalances: action.data,
      };
    case 'set_is_loading': {
      return {
        ...state,
        isLoading: action.data,
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

export default Provider;
