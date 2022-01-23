import { useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useStoreState, useStoreDispatch } from '../../store/Hooks';
import styles from '../../styles/Home.module.css';

const ButtonCreate = () => {
  const state = useStoreState(); // returns current state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

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

    // dispatch active table ID to global state
    dispatch({
      type: 'active_table',
      data: result.id,
    });

    if (result.connected) {
      router.push('/poker');
    } else {
      setMessage('Failed to create new table');
    }
  }

  return (
    <Box className={styles.connectWallet} onClick={() => clickedCreate()}>
      {message}
    </Box>
  );
};

export default ButtonCreate;
