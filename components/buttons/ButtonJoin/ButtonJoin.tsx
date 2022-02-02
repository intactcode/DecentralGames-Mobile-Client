import styles from './ButtonJoin.module.scss';
import { Button } from 'semantic-ui-react';


const ButtonJoin = () => {
  return (
    <div className={styles.container}>
      <Button
        className={styles.button_join}
        href="/join-poker"
      >
        Join Game
      </Button>
    </div>
  );
};

export default ButtonJoin;