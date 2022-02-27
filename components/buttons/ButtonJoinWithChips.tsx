import Link from 'next/link';
import styles from './Button.module.scss';
import Image from 'next/image';

interface ButtonJoinWithChipsProps {
  chipAmount: number;
}

const ButtonJoinWithChips: React.FC<ButtonJoinWithChipsProps> = (props) => {
  const { chipAmount } = props;

  return (
    <div className={styles.container}>
      <Link href="/join-poker" passHref>
        <div className={styles.button_connect}>
          <span className={styles.button_span}>
            <a className={styles.button_text}>Join With {chipAmount}</a>
            <div className={styles.chip_image}>
              <Image
                src="/images/freecoin.svg"
                width="18px"
                height="18px"
                alt="chipImage"
              />
            </div>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ButtonJoinWithChips;
