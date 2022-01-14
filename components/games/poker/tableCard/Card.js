import React, { PureComponent } from 'react';
import styles from './Card.module.css';
import CardBack from '../CardBack';
import RealCard from '../Card';

class Card extends PureComponent {
  shouldComponentUpdate(nextProps) {
    if (nextProps.rotationY !== this.props.rotationY) {
      return true;
    }

    if (nextProps.size !== this.props.size) {
      return true;
    }

    return false;
  }
  render() {
    const { card, faceDown, rotationY } = this.props;
    let type;
    console.log(card);
    switch (card[card.length - 1]) {
      case 'D':
        type = 'Carreau';
        break;
      case 'C':
        type = 'Trefle';
        break;
      case 'H':
        type = 'Coeur';
        break;
      case 'S':
        type = 'Pique';
        break;
      default:
        break;
    }
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div id="card" style={{ transform: `rotateY(${rotationY}deg)` }} className={styles.card}>
        <div className={faceDown === true ? styles.front : styles.back}
          style={{ width: '100%', height: '100%' }}
        >
          <CardBack transform="none" width={45} height={63} />
        </div>
        <div className={faceDown === true ? styles.back : styles.front}
          style={{ width: '100%', height: '100%' }}
        >
          <RealCard type={type} number={card.length === 3 ? 10 : card[0]} />
        </div>
      </div>
    );
  }
}

export default Card;
