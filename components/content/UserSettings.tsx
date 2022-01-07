import { Box } from '@mui/material';
// import Image from 'next/image';
import ButtonLogin from '../buttons/ButtonLogin';
import styles from '../../styles/Home.module.css';

const UserSettings = () => {
  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        <Box className={styles.playtitle}>User Settings.</Box>

        <ButtonLogin page={'settings'} />
      </Box>
    </main>
  );
};

export default UserSettings;
