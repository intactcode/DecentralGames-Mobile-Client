import { useState } from 'react';
import { get } from 'lodash';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Image from 'next/image';
import CardBack from '../CardBack/CardBack';
import Card from '../Card/Card';
import InfoDialog from '../InfoDialog/InfoDialog';
import UserInfoDialog from '../UserInfoDialog/UserInfoDialog';
import { useStoreState } from '../../../../hooks/Hooks';
import styles from './Character.module.scss';

const results = [
  'High card',
  'Pair',
  'Two pair',
  'Three of a kind',
  'Straight',
  'Flush',
  'Full house',
  'Four of a kind',
  'Straight flush',
  'Royal flush',
];

interface Props {
  user?: any;
  index: number;
  items: any;
  ice?: number;
  xp?: number;
  dg?: number;
  data?: any;
  classString: string;
}

const Character: React.FC<Props> = ({
  user,
  index,
  items,
  ice,
  xp,
  dg,
  data,
  classString,
}) => {
  const state = useStoreState();
  const activePlayer = state.tableData?.active;
  const isInHand = state.tableData?.isInHand ?? [];
  const winners = state.winners;
  const winnerPair = get(winners, 'winners.0.0.1.cards', []);
  const ranking = get(winners, 'winners.0.0.1.ranking', 0);
  const winnerIndex = get(winners, 'winners.0.0.0', isInHand.indexOf(true));

  const isWon = state.isWon;

  const dealerx = ['-23px', '-20px', '-20px', '75px', '70px', '70px'];
  const dealery = ['-5px', '60px', '-20px', '60px', '-20px', '60px'];

  const [infomodalopen, setInfoModalOpen] = useState(false);

  return (
    <section
      style={{
        position: 'absolute',
        zIndex: infomodalopen ? 10010 : 20,
      }}
      className={styles[classString]}
    >
      {index === activePlayer && (
        <>
          <div className={styles.gradient} />
          <div className={styles.spinCircle}>
            <CountdownCircleTimer
              duration={30}
              strokeWidth={10}
              colors={[['#FFFFFF', 1]]}
              size={90}
              trailColor="transparent"
            />
          </div>
        </>
      )}
      {!user && (
        <InfoDialog
          open={infomodalopen}
          setOpen={setInfoModalOpen}
          items={items}
          index={index}
        />
      )}
      {user && (
        <UserInfoDialog
          open={infomodalopen}
          setOpen={setInfoModalOpen}
          items={items}
          ice={ice}
          xp={xp}
          dg={dg}
        />
      )}
      <div
        className={styles.playerCircle}
        onClick={() => setInfoModalOpen(!infomodalopen)}
      >
        <Image
          src={data?.image ?? '/images/character.png'}
          width="60px"
          height="60px"
          alt="player-circle"
        />
      </div>
      <div
        className={styles.dealerChip}
        style={{ left: dealerx[index], top: dealery[index] }}
      >
        <Image src="/images/DealerChip.svg" layout="fill" alt="dealer-chip" />
      </div>
      <div className={styles.playerInfo}>
        <div>{data?.name ?? `Waiting...${index}`}</div>
        {data && (
          <div className={styles.chipForBet}>
            <div className={styles.betAmount}>{data?.betSize}</div>
            <Image
              className={styles.chipImage}
              src="/images/freecoin.svg"
              width="16px"
              height="16px"
              alt="chipImage"
            />
          </div>
        )}
      </div>
      {!isWon && !user && isInHand[index] && !!state.cards.length && (
        <div className={styles.cardBackContainer}>
          <CardBack transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)" />
          <CardBack transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)" />
        </div>
      )}
      {!isWon && user && isInHand[index] && !!state.cards.length && (
        <div className={styles.cardContainer}>
          <Card
            type={state.cards[0].suit}
            number={state.cards[0].rank}
            transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)"
          />
          <Card
            type={state.cards[1].suit}
            number={state.cards[1].rank}
            transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)"
          />
        </div>
      )}
      {isWon && winners.cards[index] && (
        <div
          className={styles.winnerCardContainer}
          key={`winner_card_${index}`}
        >
          <div
            className={styles.winnerCardFrame}
            style={{
              borderColor: winnerPair.find(
                (winner: any) =>
                  winner.suit === winners.cards[index][0].suit &&
                  winner.rank === winners.cards[index][0].rank
              )
                ? 'red'
                : 'transparent',
            }}
          >
            <Card
              type={winners.cards[index][0].suit}
              number={winners.cards[index][0].rank}
            />
          </div>
          <div
            className={styles.winnerCardFrame}
            style={{
              borderColor: winnerPair.find(
                (winner: any) =>
                  winner.suit === winners.cards[index][1].suit &&
                  winner.rank === winners.cards[index][1].rank
              )
                ? 'red'
                : 'transparent',
            }}
          >
            <Card
              type={winners.cards[index][1].suit}
              number={winners.cards[index][1].rank}
            />
          </div>
        </div>
      )}
      {isWon && index === winnerIndex && (
        <div className={styles.fullhouse}>{results[ranking]}</div>
      )}
    </section>
  );
};

export default Character;
