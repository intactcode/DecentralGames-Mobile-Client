import { useRouter } from 'next/router';
import styles from './ButtonPlay.module.scss';

const ButtonPlay = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button
        className={styles.button_play}
        onClick={() => {
          router.push('/connect');
        }}
      >
        Play Now
      </button>
    </div>
  );
};

export default ButtonPlay;
