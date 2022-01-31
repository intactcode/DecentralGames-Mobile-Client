import styles from './CardBack.module.scss'

interface Props {
  transform: string;
  width?: number;
  height?: number;
}

const CardBack: React.FC<Props> = ({ transform, width = 32, height = 47 }) => {
  return (
    <section className={styles.cardBody} style={{ transform: transform, width: width, height: height }}>
      <img
        src={'/images/cardback.png'}
        width="13px"
        height="13px"
        alt="cardback"
      />
    </section>
  );
};

export default CardBack;