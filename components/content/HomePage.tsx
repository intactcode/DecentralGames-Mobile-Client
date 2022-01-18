import { Box } from '@mui/material';
import Image from 'next/image';
import ButtonLogin from '../buttons/ButtonLogin';
import styles from '../../styles/Home.module.css';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.gradient} />
      <div className={styles.back} />

      <Box position="relative" zIndex={30}>
        <Box className={styles.playtitle}>
          Free To Play.
          <br />
          Play To Earn.
          <br />
          Poker.
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          position="relative"
          mt="32px"
        >
          <Box display="flex" justifyContent="space-between" width="70%">
            <Box
              width={64}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Image
                src="/images/home/cloth.png"
                alt="cloth"
                width={34}
                height={31}
              />
              <Box
                textAlign="center"
                fontWeight="bold"
                fontSize="14px"
                mt="12px"
              >
                Get a Wearable
              </Box>
            </Box>

            <Box
              width={64}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Image
                src="/images/home/freepoker.png"
                alt="cloth"
                width={28}
                height={36}
              />
              <Box
                textAlign="center"
                fontWeight="bold"
                fontSize="14px"
                mt="12px"
              >
                Play Free Poker
              </Box>
            </Box>

            <Box
              width={58}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Image
                src="/images/home/earnice.png"
                alt="cloth"
                width={38}
                height={35}
              />
              <Box
                textAlign="center"
                fontWeight="bold"
                fontSize="14px"
                mt="12px"
              >
                Earn ICE
              </Box>
            </Box>
          </Box>
        </Box>

        <ButtonLogin />
      </Box>
    </main>
  );
};

export default HomePage;
