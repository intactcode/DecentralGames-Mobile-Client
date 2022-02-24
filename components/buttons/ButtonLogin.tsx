/* eslint-disable @next/next/no-img-element */
// import styles from '../../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from '@/hooks/Hooks';
import { connectWallet } from '@/store/Wallet';
import styles from './Button.module.scss';

declare const window: any;

const ButtonLogin: React.FC = () => {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store
  const [ethereum, setEthereum] = useState(undefined);

  useEffect(() => {
    setEthereum(window.ethereum);
  }, []);

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
    <div className={styles.container}>
      <div
        className={styles.button_connect}
        onClick={
          () => connectWallet(dispatch)
          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <span className={styles.button_span}>
          <img
            className={styles.button_image}
            src={
              ethereum
                ? '/images/home/metamask.svg'
                : '/images/home/walletconnect-circle-white.svg'
            }
            alt="wallet-image"
          />

          <p className={styles.button_text}>{buttonText}</p>
        </span>
      </div>
    </div>
  );
};

export default ButtonLogin;
