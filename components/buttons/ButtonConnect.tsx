/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { useStoreState, useStoreDispatch } from '../../hooks/Hooks';
import { connectWallet, disconnectWallet } from '../../store/Wallet';
import styles from './Button.module.scss';

declare const window: any;

const ButtonConnect = () => {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store
  const [ethereum, setEthereum] = useState(undefined);

  useEffect(() => {
    setEthereum(window.ethereum);
  }, []);

  return (
    <div className={styles.container}>
      <button
        className={styles.button_connect}
        onClick={() => {
          state.userAddress
            ? disconnectWallet(dispatch)
            : connectWallet(dispatch);
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

          <p className={styles.button_text}>Connect Your Wallet</p>
        </span>
      </button>
    </div>
  );
};

export default ButtonConnect;
