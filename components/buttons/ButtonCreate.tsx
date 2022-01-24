import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { useRouter } from 'next/router';

import { useStoreState } from '../../store/Hooks';
import styles from '../../styles/Home.module.css';

// import PokerGame from '../games/poker/PokerGame';

const ButtonCreate = () => {
  const state = useStoreState(); // returns current state from Context API store

  // define local variables
  const [message, setMessage] = useState('Create Table');

  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  // helper functions

  async function clickedCreate() {
    const id = Math.floor(Math.random() * 99999);
    const result = await state.socket.emit('createTable', { tableId: id });

    console.log('Socker server response: New Table: ' + result.id);

    if (result.connected) {
      // router.push('/poker');
      // redirect();
    } else {
      setMessage('Failed to create new table');
    }
  }

  function redirect() {
    router.push('/poker');
  }

  useEffect(() => {
    state.socket.emit('joinTable');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.activeTable) {
      redirect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeTable]);

  return (
    <>
      {console.log('Active table: ' + state.activeTable)}

      {state.userStatus >= 4 ? (
        !state.activeTable ? (
          <Box className={styles.connectWallet} onClick={() => clickedCreate()}>
            <Box>{message}</Box>
          </Box>
        ) : (
          redirect()
        )
      ) : null}
    </>
  );
};

export default ButtonCreate;
