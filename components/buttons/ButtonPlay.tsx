import { useRouter } from 'next/router';
import styles from './Button.module.scss';

const ButtonPlay = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.button_connect} onClick={() => router.push('/connect')}>
        <span className={styles.button_span}>
          <p className={styles.button_text}>Play Now</p>
        </span>
      </div>
    </div>
  );
};

export default ButtonPlay;
