import Link from 'next/link';
import styles from './Button.module.scss';

const ButtonJoin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button_connect}>
        <span className={styles.button_span}>
          <Link href="/join-poker">
            <a className={styles.button_text}>Join Game</a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ButtonJoin;
