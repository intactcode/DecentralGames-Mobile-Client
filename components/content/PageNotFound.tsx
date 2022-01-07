import { Box } from '@mui/material';
// import Image from 'next/image';
import styles from '../../styles/Home.module.css';

const PageNotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        <Box className={styles.playtitle}>
          You are offline. Please connect to the Internet.
        </Box>
      </Box>
    </main>
  );
};

export default PageNotFound;
