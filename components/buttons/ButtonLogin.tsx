/* eslint-disable @next/next/no-img-element */
// import styles from '../../styles/Home.module.css';
import { useStoreState, useStoreDispatch } from '../../store/Hooks';
import { connectWallet, disconnectWallet } from '../../store/Wallet';
import styles from './Button.module.scss';

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
    <div className={styles.container}>
    <div
      className={styles.button_connect}
      onClick={
        () =>
          state.userAddress
            ? disconnectWallet(dispatch)
            : connectWallet(dispatch)
        // eslint-disable-next-line react/jsx-curly-newline
      }
    >
      {/* <img
        src="/images/home/metamask.svg"
        alt="metamask"
        width={35}
        height={35}
      />

      <div>{buttonText}</div> */}
      <span className={styles.button_span}>
          <img
            className={styles.button_image}
            src="/images/home/metamask.svg"
            alt="metamask"
          />

          <p className={styles.button_text}>{buttonText}</p>
        </span>
    </div>
    </div>
  );
};

export default ButtonLogin;
