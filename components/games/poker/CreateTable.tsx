import { useEffect } from 'react';
import { Box } from '@mui/material';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import ButtonLogin from '../../buttons/ButtonLogin';
import styles from '../../../styles/Home.module.css';
import { useStoreState } from '../../../store/Hooks';

const CreateTable = () => {
  const state = useStoreState();
  const router = useRouter();

  function redirect() {
    router.push('/poker');
  }

  useEffect(() => {
    if (state.socket) {
      redirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeTable]);

  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        <ButtonLogin />
      </Box>
    </main>
  );
};

export default CreateTable;
