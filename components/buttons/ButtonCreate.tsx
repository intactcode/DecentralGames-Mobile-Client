import { useState } from 'react';
import { Box } from '@mui/material';
import { useStoreState } from '../../store/Hooks';
import styles from '../../styles/Home.module.css';
// import { stat } from 'fs';

// import PokerGame from '../games/poker/PokerGame';

const ButtonCreate = () => {
  const state = useStoreState(); // returns current state from Context API store
  // define local variables
  const [message, setMessage] = useState('Create Table');

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  // helper functions

  async function clickedCreate() {
    const id = Math.floor(Math.random() * 99999);
    const result = await state.socket.emit('createTable', { tableId: id });

    if (result.connected) {
      // router.push('/poker');
      // redirect();

      console.log('Socker server response: New Table: ' + result.id);
    } else {
      setMessage('Failed to create new table');
    }
  }

  return (
    <>
      {console.log('Active table: ' + state.activeTable)}

      {state.userStatus >= 4 ? (
        <Box className={styles.connectWallet} onClick={() => clickedCreate()}>
          <Box>{message}</Box>
        </Box>
      ) : null}
    </>
  );
};

export default ButtonCreate;
