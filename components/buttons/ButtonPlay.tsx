import { useRouter } from 'next/router';
import { useStoreState } from '@/hooks/Hooks';
import styles from './Button.module.scss';

declare const window: any;

const ButtonPlay: React.FC = () => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  const clickedPlay = () => {
    console.log('Clicked play');

    // Segment: track play button event
    window.analytics.track('Clicked play', {
      userAddress: state.userAddress,
    });

    router.push('/connect');
  };

  return (
    <div className={styles.container}>
      <div className={styles.button_connect} onClick={() => clickedPlay()}>
        <span className={styles.button_span}>
          <p className={styles.button_text}>Play Now</p>
        </span>
      </div>
    </div>
  );
};

export default ButtonPlay;
