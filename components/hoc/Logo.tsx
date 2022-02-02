import Image from 'next/image';
import { useRouter } from 'next/router';
import { useStoreState } from '../../store/Hooks';
import styles from '../../styles/Home.module.css';

const Logo = () => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  const onReset = () => {
    if (Object.keys(state.socket).length !== 0) {
      console.log('Reset game session');

      state.socket.send('playerLeaveTable');
      router.push('/');
    }
  };

  return (
    // <a href="https://decentral.games" rel="noreferrer" target="_blank">
    <div className={styles.logo} onClick={() => onReset()}>
      <Image src="/images/dg-logo.png" alt="logo" width={40} height={40} />
    </div>
    // </a>
  );
};

export default Logo;
