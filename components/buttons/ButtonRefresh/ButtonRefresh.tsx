import { useRouter } from 'next/router';
import { useStoreState } from '../../../store/Hooks';
import styles from './ButtonRefresh.module.scss';
import { MdRefresh } from 'react-icons/md';


const ButtonRefresh = () => {
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
    <div className={styles.refresh} onClick={() => onReset()}>
      <MdRefresh style={{ fontSize: '22px' }} />
    </div>
  );
};

export default ButtonRefresh;