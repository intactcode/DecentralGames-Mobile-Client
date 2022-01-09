import { Box } from '@mui/material';
// import Image from 'next/image';
import ButtonLogin from '../buttons/ButtonLogin';
import styles from '../../styles/Home.module.css';

const PlayerStats = () => {
  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        <Box className={styles.playtitle}>Player Statistics.</Box>

        <ButtonLogin page={'statistics'} />
      </Box>
    </main>
  );
};

export default PlayerStats;