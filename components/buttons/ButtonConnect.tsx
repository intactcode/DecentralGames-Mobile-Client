/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from '../../store/Hooks';
import {
  connectWallet,
  disconnectWallet,
  assignToken,
} from '../../store/Wallet';
import styles from './Button.module.scss';

declare const window: any;

const ButtonConnect = () => {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store
  const [ethereum, setEthereum] = useState(undefined);

  useEffect(() => {
    setEthereum(window.ethereum);
  }, []);

  let buttonText = 'Connect Your Wallet';
  if (state.userStatus === 2) {
    buttonText = 'Sign Login Message';
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button_connect}
        onClick={() => {
          if (state.userStatus === 2 && state.web3Provider) {
            // user is in between connecting and signing message on mobile
            assignToken(dispatch, state.web3Provider);
          } else if (state.userAddress) {
            disconnectWallet(dispatch);
          } else {
            connectWallet(dispatch);
          }
        }}
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
      </button>
    </div>
  );
};

export default ButtonConnect;
