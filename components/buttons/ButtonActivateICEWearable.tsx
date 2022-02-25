import Link from 'next/link';
import styles from './Button.module.scss';

const ButtonActivateICEWearable: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link href="/join-poker" passHref>
        <div className={styles.button_connect}>
          <span className={styles.button_span}>
            <a className={styles.button_text}>Activate ICE Wearable</a>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ButtonActivateICEWearable;
