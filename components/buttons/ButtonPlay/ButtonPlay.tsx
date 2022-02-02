import styles from './ButtonPlay.module.scss';
import { Button } from 'semantic-ui-react';


const ButtonPlay = () => {
  return (
    <div className={styles.container}>
      <Button
        className={styles.button_play}
        href="/connect"
      >
        Play Now
      </Button>
    </div>
  );
};

export default ButtonPlay;