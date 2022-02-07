import Image from 'next/image';
import { useRouter } from 'next/router';
import { useStoreState } from '../../store/Hooks';
import styles from '../../styles/Home.module.css';

declare const window: any;

const Logo = () => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  const clickedLogo = () => {
    console.log('Clicked the logo');

    // Segment: track MetaMask home button event
    window.analytics.track('Clicked logo', {
      userAddress: state.userAddress,
    });

    router.push('/');
  };

  return (
    <div className={styles.logo} onClick={() => clickedLogo()}>
      <Image src="/images/dg-logo.png" alt="logo" width={40} height={40} />
    </div>
  );
};

export default Logo;
