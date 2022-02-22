import { useRouter } from 'next/router';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import { useStoreState, useStoreDispatch } from '../../../hooks/Hooks';
import styles from './ButtonRefresh.module.scss';

declare const window: any;

const ButtonRefresh = () => {
  const state = useStoreState(); // returns global state from Context API store
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store
  const router = useRouter();

  const onReset = () => {
    console.log('Clicked back/reset');

    if (!isEmpty(state.socket)) {
      state.socket.leave();
    }

    // Segment: track back/reset button event
    window.analytics.track('Clicked back/reset', {
      userAddress: state.userAddress,
    });

    dispatch({
      type: 'game_type',
      data: '',
    });

    dispatch({
      type: 'socket_instance',
      data: {},
    });

    dispatch({
      type: 'set_folded_user',
      data: [],
    });

    router.push('/');
  };

  return (
    <div className={styles.refresh} onClick={() => onReset()}>
      <Image src="/images/exit.svg" width={20} height={20} alt={'exit'} />
    </div>
  );
};

export default ButtonRefresh;
