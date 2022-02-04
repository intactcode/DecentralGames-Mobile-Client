import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import styles from './ButtonJoin.module.scss';


const ButtonJoin = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Button
        className={styles.button_join}
        onClick={() => {
          router.push('/join-poker');
        }}
      >
        Join Game
      </Button>
    </div>
  );
};

export default ButtonJoin;
