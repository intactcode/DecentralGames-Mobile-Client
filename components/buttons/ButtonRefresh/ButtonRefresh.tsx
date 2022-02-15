import { useRouter } from 'next/router';
import Image from 'next/image';
import { useStoreState } from '../../../hooks/Hooks';
import styles from './ButtonRefresh.module.scss';

declare const window: any;

const ButtonRefresh = () => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  const onReset = () => {
    console.log('Clicked back/reset');

    if (Object.keys(state.socket).length !== 0) {
      state.socket.leave();
    }

    // Segment: track back/reset button event
    window.analytics.track('Clicked back/reset', {
      userAddress: state.userAddress,
    });

    router.push('/');
  };

  return (
    <div className={styles.refresh} onClick={() => onReset()}>
      <Image
        src="/images/exit.svg"
        width={20}
        height={20}
        alt={'exit'}
      />
    </div>
  );
};

export default ButtonRefresh;
