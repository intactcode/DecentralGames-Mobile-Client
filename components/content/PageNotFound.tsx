import { Box } from '@mui/material';
// import Image from 'next/image';
import ButtonHome from '../buttons/ButtonHome';
import styles from '../../styles/Home.module.css';

const PageNotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        <Box className={styles.playtitle}>
          The requested page could not be found.
        </Box>

        <ButtonHome page={'404'} />
      </Box>
    </main>
  );
};

export default PageNotFound;
