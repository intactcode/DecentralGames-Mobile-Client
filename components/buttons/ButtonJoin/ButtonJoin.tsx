import Link from 'next/link';
import styles from './ButtonJoin.module.scss';


const ButtonJoin = () => {
  return (
    <div className={styles.container}>
    <Link
      href="/join-poker"
    >
      <a className={styles.button_join}>Join Game</a>
    </Link>
  </div>
  );
};

export default ButtonJoin;
