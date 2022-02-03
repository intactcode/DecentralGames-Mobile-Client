import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import { useStoreState } from '../../store/Hooks';

declare const window: any;

const ButtonHome = (props: { page: string }) => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  // helper functions

  async function clickedHome() {
    console.log('Clicked home: ' + props.page);

    // Segment: track MetaMask home button event
    window.analytics.track('Clicked home: ' + props.page, {
      userAddress: state.userAddress,
    });

    router.push('/');
  }

  return (
    <Box className={styles.connectWallet} onClick={() => clickedHome()}>
      Back to Home
    </Box>
  );
};

export default ButtonHome;
