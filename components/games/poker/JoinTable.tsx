import { useEffect } from 'react';
import { Box } from '@mui/material';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import ButtonLogin from '../../buttons/ButtonLogin';
import styles from '../../../styles/Home.module.css';
import { useStoreState } from '../../../store/Hooks';

const JoinTable = () => {
  const state = useStoreState(); // returns current state from Context API store
  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (Object.keys(state.socket).length !== 0) {
      router.push('/poker');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.socket]);

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
