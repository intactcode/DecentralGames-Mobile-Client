import { useState } from 'react';
import { get } from 'lodash';
import cn from 'classnames';
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

interface TimerIndicatorProps {
  index: number
  activePlayer: number
  isWon: boolean
  currentPlayer: number
  foldedUser: any
  onLeave: () => void
  dispatch: ({ }: any) => void
}

const TimerIndicator = ({ index, activePlayer, isWon, currentPlayer, foldedUser, onLeave, dispatch }: TimerIndicatorProps) => {
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
              if (!!foldedUser && !foldedUser.includes(index)) {
                dispatch({
                  type: 'set_folded_user',
                  data: [...foldedUser, index],
                });
              } else {
                onLeave();
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

interface ModalIndicatorProps {
  index: number
  user: any
  infomodalopen: boolean
  setInfoModalOpen: any
  items: any
  ice?: number;
  xp?: number;
  dg?: number;
}
const ModalIndicator = ({ index, user, infomodalopen, setInfoModalOpen, items, ice, xp, dg }: ModalIndicatorProps) => {
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

interface BetSizeProps {
  data: any;
}
const BetSize = ({ data }: BetSizeProps) => {
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

interface PlayerAvatarProps {
  index: number
  winnerIndex: number
  isHandIndex: any
  data: any
  infomodalopen: boolean
  setInfoModalOpen: any
  dealerxIndex: any
  dealeryIndex: any

}
const PlayerAvatar = (
  {
    index,
    winnerIndex,
    isHandIndex,
    data,
    infomodalopen,
    setInfoModalOpen,
    dealerxIndex,
    dealeryIndex
  }: PlayerAvatarProps) => {
  return (
    <>
      <div
        className={cn(
          styles.playerCircle,
          index === winnerIndex ? styles.whiteBorder : null
        )}
        onClick={() => setInfoModalOpen(!infomodalopen)}
      >
        <div className={isHandIndex ? '' : styles.inactivePlayer}>
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
        style={{ left: dealerxIndex, top: dealeryIndex }}
      >
        <Image src="/images/DealerChip.svg" layout="fill" alt="dealer-chip" />
      </div>
      <div className={styles.playerInfo}>
        <div className={isHandIndex ? '' : styles.inactiveColor}>
          {data?.name ?? `Waiting...${index}`}
        </div>
        {data && (
          <div className={styles.chipForStack}>
            <div
              className={styles.betAmount}
              style={{ color: isHandIndex ? 'white' : '#9A9A9A' }}
            >
              {data?.stack}
            </div>
            <div className={styles.chipImage}>
              <Image
                className={`${isHandIndex ? '' : styles.inactivePlayer}`}
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

interface CardBackIndicatorProps {
  isWon: boolean
  user: any
  isHandIndex: any
  cardsLength: number
}
const CardBackIndicator = ({ isWon, user, isHandIndex, cardsLength }: CardBackIndicatorProps) => {
  return !isWon && !user && isHandIndex && !!cardsLength ? (
    <div className={styles.cardBackContainer}>
      <CardBack transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)" />
      <CardBack transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)" />
    </div>
  ) : (
    <></>
  );
};

interface CardFrontIndicatorProps {
  isWon: boolean
  user: any
  isHandIndex: any
  index: number
  cards: any
  winnersCards: any
  winnerIndex: number
}
const CardFrontIndicator = ({ isWon, user, isHandIndex, index, cards, winnersCards, winnerIndex }: CardFrontIndicatorProps) => {
  return (
    <>
      {!isWon && user && isHandIndex && !!cards.length && (
        <div className={styles.cardContainer}>
          <Card
            type={cards[0].suit}
            number={cards[0].rank}
            transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)"
          />
          <Card
            type={cards[1].suit}
            number={cards[1].rank}
            transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)"
          />
        </div>
      )}
      {isWon && winnersCards[index] && (
        <div
          className={styles.winnerCardContainer}
          key={`winner_card_${index}`}
        >
          <div
            className={styles.winnerCardFrame}
            style={{
              transform: `scale(${index === winnerIndex ? 1 : 0.75
                }) translateX(${index === winnerIndex ? 0 : '8px'})`,
            }}
          >
            <Card
              type={winnersCards[index][0].suit}
              number={winnersCards[index][0].rank}
            />
          </div>
          <div
            className={styles.winnerCardFrame}
            style={{
              transform: `scale(${index === winnerIndex ? 1 : 0.75
                }) translateX(${index === winnerIndex ? 0 : '-8px'})`,
            }}
          >
            <Card
              type={winnersCards[index][1].suit}
              number={winnersCards[index][1].rank}
            />
          </div>
        </div>
      )}
    </>
  );
};

interface WinnerShowProps {
  isWon: boolean
  data: any
  index: number
  winnerIndex: number
  ranking: any
}
const WinnerShow = ({ isWon, data, index, winnerIndex, ranking }: WinnerShowProps) => {
  return isWon && data?.name ? (
    <div
      className={cn(
        styles.fullhouse,
        index === winnerIndex ? '' : styles.blueBackground
      )}
    >
      {Constants.RESULTS[ranking]}
    </div>
  ) : (
    <></>
  );
};

interface WinnerChipsProps {
  index: number
  winnerIndex: number
  tableDataPot: number
}
const WinnerChips = ({ index, winnerIndex, tableDataPot }: WinnerChipsProps) => {
  return index === winnerIndex ? (
    <div className={styles.chipsForEarning}>
      <div className={styles.chipsEarnAmount}>+{tableDataPot}</div>
      <div className={styles.chipImage}>
        <Image
          src="/images/freecoin.svg"
          width="12px"
          height="12px"
          alt="chipImage"
        />
      </div>
    </div>
  ) : (
    <></>
  );
};


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
      <TimerIndicator
        index={index}
        activePlayer={activePlayer}
        isWon={isWon}
        currentPlayer={currentPlayer}
        foldedUser={state.foldedUser}
        onLeave={state.socket.leave}
        dispatch={dispatch}
      />
      <ModalIndicator
        index={index}
        user={user}
        infomodalopen={infomodalopen}
        setInfoModalOpen={setInfoModalOpen}
        items={items}
        ice={ice}
        xp={xp}
        dg={dg}
      />
      <BetSize data={data} />
      <PlayerAvatar
        index={index}
        winnerIndex={winnerIndex}
        isHandIndex={isInHand[index]}
        data={data}
        infomodalopen={infomodalopen}
        setInfoModalOpen={setInfoModalOpen}
        dealerxIndex={dealerx[index]}
        dealeryIndex={dealery[index]}
      />
      <CardBackIndicator
        isWon={isWon}
        user={user}
        isHandIndex={isInHand[index]}
        cardsLength={state.cards.length}
      />
      <CardFrontIndicator
        isWon={isWon}
        user={user}
        isHandIndex={isInHand[index]}
        index={index}
        cards={state.cards}
        winnersCards={winners.cards}
        winnerIndex={winnerIndex}
      />
      <WinnerShow
        isWon={isWon}
        data={data}
        index={index}
        winnerIndex={winnerIndex}
        ranking={ranking}
      />
      <WinnerChips
        index={index}
        winnerIndex={winnerIndex}
        tableDataPot={state.tableData?.pot}
      />
    </section>
  );
};

export default Character;
