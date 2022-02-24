import Image from 'next/image';
import { useRouter } from 'next/router';
import { useStoreState } from '@/hooks/Hooks';
import styles from '@/styles/Home.module.scss';

declare const window: any;

const Logo: React.FC = () => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  const clickedLogo = () => {
    console.log('Clicked logo');

    // Segment: track logo button event
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
