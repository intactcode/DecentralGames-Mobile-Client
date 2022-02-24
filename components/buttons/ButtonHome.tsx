import { useRouter } from 'next/router';
import { useStoreState } from '@/hooks/Hooks';
import styles from './Button.module.scss';

declare const window: any;

const ButtonHome = (props: { page: string }) => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  async function clickedHome() {
    console.log('Clicked home: ' + props.page);

    // Segment: track home button event
    window.analytics.track('Clicked home: ' + props.page, {
      userAddress: state.userAddress,
    });

    router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.button_connect} onClick={() => clickedHome()}>
        <span className={styles.button_span}>
          <p className={styles.button_text}>Back to Home</p>
        </span>
      </div>
    </div>
  );
};

export default ButtonHome;
