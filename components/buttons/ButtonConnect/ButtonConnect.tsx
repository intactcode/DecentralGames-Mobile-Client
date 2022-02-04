import { useStoreState, useStoreDispatch } from '../../../store/Hooks';
import { connectWallet, disconnectWallet } from '../../../store/Wallet';
import styles from './ButtonConnect.module.scss';

const ButtonLogin = () => {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

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
            src="/images/home/metamask.svg"
            alt="metamask"
          />
          <p className={styles.button_text}>Connect Your Wallet</p>
        </span>
      </button>
    </div>
  );
};

export default ButtonLogin;
