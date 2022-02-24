import Image from 'next/image';
import styles from './CardBack.module.scss';

interface CardBackProps {
  transform: string;
  width?: number;
  height?: number;
}

const CardBack: React.FC<CardBackProps> = (props) => {
  const { transform, width = 32, height = 47 } = props;
  return (
    <section
      className={styles.cardBody}
      style={{ transform: transform, width: width, height: height }}
    >
      <Image
        src={'/images/cardback.png'}
        width="13px"
        height="13px"
        alt="cardback"
      />
    </section>
  );
};

export default CardBack;
