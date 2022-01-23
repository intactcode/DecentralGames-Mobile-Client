import { Box } from '@mui/material';
// import Image from 'next/image';
import ButtonCreate from '../../buttons/ButtonCreate';
import ButtonLogin from '../../buttons/ButtonLogin';
import styles from '../../../styles/Home.module.css';

const CreateTable = () => {
  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        <ButtonCreate />

        <ButtonLogin />
      </Box>
    </main>
  );
};

export default CreateTable;
