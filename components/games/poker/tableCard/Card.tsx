import { FC, memo } from 'react';
import styles from './Card.module.css';
import CardBack from '../CardBack/CardBack';
import RealCard from '../Card/Card';

export interface CardProps {
  card: Array<string>;
  faceDown: boolean;
  rotationY: string;
  size?: string;
  index: any;
  doubleBacked: any;
  type: any;
}

const cards: any = {
  D: 'diamonds',
  C: 'clubs',
  H: 'hearts',
  S: 'spades',
};

const Card: FC<CardProps> = ({ card, faceDown, rotationY }) => {
  let type: string = cards[card[card.length - 1]];

  return (
    <div
      id="card"
      style={{ transform: `rotateY(${rotationY}deg)` }}
      className={styles.card}
    >
      <div
        className={faceDown === true ? styles.front : styles.back}
        style={{ width: '100%', height: '100%' }}
      >
        <CardBack transform="none" width={45} height={63} />
      </div>
      <div
        className={faceDown === true ? styles.back : styles.front}
        style={{ width: '100%', height: '100%' }}
      >
        <RealCard type={type} number={card.length === 3 ? '10' : card[0]} />
      </div>
    </div>
  );
};

export default memo(Card, (props, nextProps) => {
  if (props.rotationY !== nextProps.rotationY) {
    return false;
  }

  if (props.size === nextProps.size) {
    return false;
  }

  return true;
});
