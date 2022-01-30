import { useEffect } from 'react';
import { Box } from '@mui/material';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import { useStoreState } from '../../../store/Hooks';
import { useStoreDispatch } from '../../../store/Hooks';
import ButtonLogin from '../../buttons/ButtonLogin';
import styles from '../../../styles/Home.module.css';

const JoinTable = () => {
  const state = useStoreState(); // returns current state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store
  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (state.userStatus >= 4) {
      console.log('Joining poker');

      dispatch({
        type: 'game',
        data: 'poker',
      });
    }
  }, [state.userStatus, dispatch]);

  useEffect(() => {
    if (Object.keys(state.socket).length !== 0) {
      router.push('/poker');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.userStatus, state.socket]);

  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        {state.userStatus >= 4 ? (
          <Box className={styles.playtitle}>Joining Table...</Box>
        ) : (
          <ButtonLogin />
        )}
      </Box>
    </main>
  );
};

export default JoinTable;
