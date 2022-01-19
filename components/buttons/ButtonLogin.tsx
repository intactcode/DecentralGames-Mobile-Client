import { Box } from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useStoreState, useStoreDispatch } from '../../store/Hooks';
import { connectWallet, disconnectWallet } from '../../store/Wallet';

const ButtonLogin = () => {
  const state = useStoreState(); // returns current state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  // write the user's wallet address with ellipsis added
  const ellipsis = state.userAddress
    ? state.userAddress.substring(0, 5) +
      '...' +
      state.userAddress.substring(state.userAddress.length - 4)
    : '';

  return (
    <Box
      className={styles.connectWallet}
      onClick={
        () =>
          state.userAddress
            ? disconnectWallet(dispatch)
            : connectWallet(dispatch)
        // eslint-disable-next-line react/jsx-curly-newline
      }
    >
      <Image
        src="/images/home/metamask.svg"
        alt="metamask"
        width={35}
        height={35}
      />
      <Box>
        {state.userAddress
          ? ellipsis
          : state.userStatus === 3
          ? 'Connecting...'
          : 'Connect Your Wallet'}
      </Box>
    </Box>
  );
};

export default ButtonLogin;
