import Link from 'next/link';
import styles from './Button.module.scss';

const ButtonJoin = () => {
  return (
    <div className={styles.container}>
      <Link href="/join-poker" passHref>
        <div className={styles.button_connect}>
          <span className={styles.button_span}>
            <a className={styles.button_text}>Join Game</a>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ButtonJoin;
