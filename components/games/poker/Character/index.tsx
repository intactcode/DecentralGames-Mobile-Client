import { useState } from 'react';
import { get } from 'lodash';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Image from 'next/image';
import { Constants } from '@/components/common';
import {
  CardBack,
  Card,
  InfoDialog,
  UserInfoDialog,
} from '@/components/games/poker';
import { useStoreDispatch, useStoreState } from '@/hooks/Hooks';
import styles from './Character.module.scss';

interface CharacterProps {
  user?: any;
  index: number;
  items: any;
  ice?: number;
  xp?: number;
  dg?: number;
  data?: any;
  classString: string;
}

const Character: React.FC<CharacterProps> = ({
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
  const dispatch = useStoreDispatch();
  const activePlayer = state.tableData?.activePlayer;
  const currentPlayer = get(state, 'currentSeat.currentSeat', 0);
  const isInHand =
    state.tableData?.seats?.map((el: any) => el && el.isInHand) ?? [];
  const winners = state.winners;
  const winnerPair = get(winners, 'winners.0.0.1.cards', []);
  const ranking = get(winners, 'winners.0.0.1.ranking', 0);
  const winnerIndex = get(winners, 'winners.0.0.0', isInHand.indexOf(true));

  const isWon = state.isWon;

  const dealerx = ['-23px', '-20px', '-20px', '75px', '70px', '70px'];
  const dealery = ['-5px', '60px', '-20px', '60px', '-20px', '60px'];

  const [infomodalopen, setInfoModalOpen] = useState(false);

  const TimerIndicator: React.FC = () => {
    return index === activePlayer && !isWon ? (
      <>
        <div className={styles.gradient} />
        <div className={styles.spinCircle}>
          <CountdownCircleTimer
            isPlaying
            duration={15}
            strokeWidth={10}
            colors={[['#FFFFFF', 1]]}
            size={90}
            onComplete={() => {
              if (currentPlayer === index) {
                // already folded once
                if (!!state.foldedUser && !state.foldedUser.includes(index)) {
                  dispatch({
                    type: 'set_folded_user',
                    data: [...state.foldedUser, index],
                  });
                } else {
                  state.socket.leave();
                  dispatch({
                    type: 'set_is_loading',
                    data: true,
                  });
                }
              }
            }}
            trailColor="transparent"
          />
        </div>
      </>
    ) : (
      <></>
    );
  };

  const ModalIndicator: React.FC = () => {
    return user ? (
      <UserInfoDialog
        open={infomodalopen}
        setOpen={setInfoModalOpen}
        items={items}
        ice={ice}
        xp={xp}
        dg={dg}
      />
    ) : (
      <InfoDialog
        open={infomodalopen}
        setOpen={setInfoModalOpen}
        items={items}
        index={index}
      />
    );
  };

  const BetSize: React.FC = () => {
    return data && data?.betSize > 0 ? (
      <div className={styles.chipForBetContainer}>
        <div className={styles.chipForBet}>
          <div className={styles.betAmount}>{data?.betSize}</div>
          <div className={styles.chipImage}>
            <Image
              src="/images/freecoin.svg"
              width="12px"
              height="12px"
              alt="chipImage"
            />
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  };

  const PlayerAvatar: React.FC = () => {
    return (
      <>
        <div
          className={styles.playerCircle}
          onClick={() => setInfoModalOpen(!infomodalopen)}
        >
          <div className={isInHand[index] ? '' : styles.inactivePlayer}>
            <Image
              src={data?.image ?? '/images/character.png'}
              width="60px"
              height="60px"
              alt="player-circle"
            />
          </div>
        </div>
        <div
          className={styles.dealerChip}
          style={{ left: dealerx[index], top: dealery[index] }}
        >
          <Image src="/images/DealerChip.svg" layout="fill" alt="dealer-chip" />
        </div>
        <div className={styles.playerInfo}>
          <div className={isInHand[index] ? '' : styles.inactiveColor}>
            {data?.name ?? `Waiting...${index}`}
          </div>
          {data && (
            <div className={styles.chipForStack}>
              <div
                className={styles.betAmount}
                style={{ color: isInHand[index] ? 'white' : '#9A9A9A' }}
              >
                {data?.stack}
              </div>
              <div className={styles.chipImage}>
                <Image
                  className={`${isInHand[index] ? '' : styles.inactivePlayer}`}
                  src="/images/freecoin.svg"
                  width="12px"
                  height="12px"
                  alt="chipImage"
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const CardBackIndicator = () => {
    return !isWon && !user && isInHand[index] && !!state.cards.length ? (
      <div className={styles.cardBackContainer}>
        <CardBack transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)" />
        <CardBack transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)" />
      </div>
    ) : (
      <></>
    );
  };

  const CardFrontIndicator: React.FC = () => {
    return (
      <>
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
      </>
    );
  };

  const WinnerShow: React.FC = () => {
    return isWon && index === winnerIndex ? (
      <div className={styles.fullhouse}>{Constants.RESULTS[ranking]}</div>
    ) : (
      <></>
    );
  };

  return (
    <section
      style={{
        position: 'absolute',
        zIndex: infomodalopen ? 10010 : 20,
      }}
      className={styles[classString]}
    >
      <TimerIndicator />
      <ModalIndicator />
      <BetSize />
      <PlayerAvatar />
      <CardBackIndicator />
      <CardFrontIndicator />
      <WinnerShow />
    </section>
  );
};

export default Character;
