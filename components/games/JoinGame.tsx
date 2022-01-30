import { useEffect } from 'react';
import { Box } from '@mui/material';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import { useStoreState } from '../../store/Hooks';
import { useStoreDispatch } from '../../store/Hooks';
import ButtonLogin from '../buttons/ButtonLogin';
import styles from '../../styles/Home.module.css';

const JoinGame = (props: any) => {
  const state = useStoreState(); // returns current state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store
  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (state.userStatus >= 4) {
      console.log('Joining game: ' + props.gameType);

      dispatch({
        type: 'game_type',
        data: props.gameType,
      });
    }
  }, [state.userStatus, dispatch, props.gameType]);

  useEffect(() => {
    if (Object.keys(state.socket).length !== 0) {
      console.log('socket...');
      console.log(state.socket);

      router.push('/' + props.gameType);
    }
  }, [state.socket, router, props.gameType]);

  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        {state.userStatus >= 4 ? (
          <Box className={styles.playtitle}>
            Joining Game [{Object.keys(state.socket).length}]
          </Box>
        ) : (
          <ButtonLogin />
        )}
      </Box>
    </main>
  );
};

export default JoinGame;
