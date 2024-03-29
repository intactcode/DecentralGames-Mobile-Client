import Image from 'next/image';
import { isEmpty } from 'lodash';
import { useStoreDispatch, useStoreState } from '@/hooks/Hooks';
import styles from './ButtonRefresh.module.scss';

declare const window: any;

const ButtonRefresh: React.FC = () => {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  const onReset = () => {
    console.log('Clicked back/reset');

    if (!isEmpty(state.socket)) {
      state.socket.leave();
      dispatch({
        type: 'set_is_loading',
        data: true,
      });
    }

    // Segment: track back/reset button event
    window.analytics.track('Clicked back/reset', {
      userAddress: state.userAddress,
    });
  };

  return (
    <div className={styles.refresh} onClick={() => onReset()}>
      <Image src="/images/exit.svg" width={20} height={20} alt={'exit'} />
    </div>
  );
};

export default ButtonRefresh;
