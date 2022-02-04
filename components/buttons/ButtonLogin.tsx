import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useStoreState, useStoreDispatch } from '../../store/Hooks';
import { connectWallet, disconnectWallet } from '../../store/Wallet';

const ButtonLogin = () => {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  // write the user's wallet address with ellipsis added
  const ellipsis = state.userAddress
    ? state.userAddress.substring(0, 5) +
      '...' +
      state.userAddress.substring(state.userAddress.length - 4)
    : '';

  let buttonText = 'Connect Your Wallet';
  if (state.userAddress) {
    buttonText = ellipsis;
  } else if (state.userStatus === 3) {
    buttonText = 'Connecting...';
  } else if (state.userStatus === 2) {
    buttonText = 'Reauthenticate';
  }

  return (
    <div
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
      <div>{buttonText}</div>
    </div>
  );
};

export default ButtonLogin;
