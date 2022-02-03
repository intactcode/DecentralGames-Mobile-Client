import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import styles from './ButtonPlay.module.scss';

const ButtonPlay = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Button
        className={styles.button_play}
        onClick={() => {
          router.push('/connect');
        }}
      >
        Play Now
      </Button>
    </div>
  );
};

export default ButtonPlay;
