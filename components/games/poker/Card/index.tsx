import Image from 'next/image';
import styles from './Card.module.scss';

interface Props {
  type: string;
  number: string;
  transform?: string;
}

const Card: React.FC<Props> = (props) => {
  const { transform, type, number } = props;
  return (
    <section className={styles.cardBody} style={{ transform: transform }}>
      <div
        className={
          type === 'hearts' || type === 'diamonds' ? styles.red : styles.black
        }
      >
        {number === 'T' ? '10' : number}
      </div>
      <Image
        src={`/images/${type}.svg`}
        width="19px"
        height="19px"
        alt="card"
      />
    </section>
  );
};

export default Card;
