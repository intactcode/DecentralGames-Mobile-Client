import { useEffect, useRef, useState } from 'react';
import { maxBy, get, isEmpty } from 'lodash';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useStoreState, useWindowSize } from '../../../../store/Hooks';
import Character from '../Character/Character';
import Setting from '../Setting/Setting';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import ProgressBar from '../ProgressBar/ProgressBar';
import RaiseSetting from '../RaiseSetting/RaiseSetting';
import TableCard from '../TableCardRename/TableCard';
import Card from '../Card/Card';
import ButtonRefresh from '../../../buttons/ButtonRefresh/ButtonRefresh';

import styles from './PokerGame.module.scss';

const positionx = [
  'calc(50% - 36px)',
  'calc(50% - 160px)',
  'calc(50% - 160px)',
  'calc(50% - 36px)',
  'calc(50% + 90px)',
  'calc(50% + 90px)',
];
const positiony = ['510px', '380px', '190px', '50px', '190px', '380px'];

const positionx_desktop = [
  'calc(50% - 380px)',
  'calc(50% + 110px)',
  'calc(50% + 110px)',
  'calc(50% + 300px)',
  'calc(50% - 190px)',
  'calc(50% - 190px)',
];
const positiony_desktop = ['250px', '420px', '55px', '250px', '55px', '420px'];

const image = [
  'images/character.png',
  'images/character.png',
  'images/character.png',
  'images/character.png',
  'images/character.png',
  'images/character.png',
];
const items = [
  ['/images/item1.svg'],
  ['/images/item1.svg'],
  ['/images/item1.svg', '/images/item1.svg', '/images/item1.svg'],
  ['/images/item1.svg', '/images/item1.svg', '/images/item1.svg'],
  ['/images/item1.svg'],
  [
    '/images/item1.svg',
    '/images/item1.svg',
    '/images/item1.svg',
    '/images/item1.svg',
    '/images/item1.svg',
  ],
];

const PokerGame = () => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  const [raiseamount, setRaiseAmount] = useState(600);
  const [raiseshow, setRaiseShow] = useState(false);
  const [raise, setRaise] = useState<number[]>([]);
  const [issetting, setIsSetting] = useState(false);
  const [isleaderboard, setIsLeaderBoard] = useState(false);
  const [iceamount, setIceAmount] = useState(22000); // eslint-disable-line
  const [xpamount, setXPAmount] = useState(22); // eslint-disable-line
  const [dgamount, setDGAmount] = useState(0.01); // eslint-disable-line
  const [players, setPlayers] = useState<any[]>([]);
  const [userPosition, setUserPosition] = useState(0);
  const forcedBets = state.currentSeat.forced || {};
  const currentPlayer = state.currentSeat.currentSeat || 0;
  const tablecard: any = useRef(null);
  const activePlayer = state.tableData.active;
  const winners = state.winners;
  const isWon = !isEmpty(winners.winners);
  const winnerPair = get(winners, 'winners.0.0.1.cards', []);
  const isInHand = state.tableData?.isInHand ?? [];
  const winnerIndex = get(winners, 'winners.0.0.0', isInHand.indexOf(true));

  const size = useWindowSize();
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  const onReset = () => {
    console.log('Set game parameters');

    setRaise([]);

    tablecard.current?.newRound();

    setTimeout(function () {
      tablecard.current?.progressDeal();
    }, 100);
  };

  useEffect(() => {
    return () => {
      // state.socket.leave();
    };
  }, [state.socket]);

  // if user is logged-in set game parameters, else send them to the join page
  useEffect(() => {
    if (Object.keys(state.socket).length !== 0) {
      onReset();
    } else {
      router.push('/join-poker');
    }
  }, [state.socket, router]);

  useEffect(() => {
    const setSeats = (seats: any) => {
      for (let i = 0; i < 6; i++) {
        if (seats[i] && seats[i].name == state.socket.id) {
          setUserPosition(i);
        }
      }

      setPlayers(Object.values(seats));
    };

    setSeats(state.tableData.seats || {});
  }, [state.tableData, state.socket.id]);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  const getMaxBet = () => {
    return get(maxBy(players, 'betSize'), 'betSize', 0);
  };

  // eslint-disable-next-line
  const getMinRaise = () => {
    return getMaxBet() + forcedBets.bigBlind;
  };

  // eslint-disable-next-line
  const canCall = () => {
    if (players[currentPlayer] === undefined) {
      return false;
    }
    const { betSize } = players[currentPlayer];
    const maxBetSize = getMaxBet();
    return betSize !== maxBetSize;
  };

  const canCheck = () => {
    if (players[currentPlayer] === undefined) {
      return false;
    }
    const { betSize } = players[currentPlayer];
    const maxBetSize = getMaxBet();
    return betSize === maxBetSize;
  };

  // eslint-disable-next-line
  const canRaise = (amount: number) => {
    if (amount < 0 || players[currentPlayer] === undefined) {
      return false;
    }

    const maxBetSize = getMaxBet();
    if (maxBetSize === 0) {
      return false;
    }

    const { totalChips } = players[currentPlayer];
    const minBet = maxBetSize + forcedBets.bigBlind;
    if (amount < minBet || amount > totalChips) {
      return false;
    }

    return amount >= minBet;
  };

  // eslint-disable-next-line
  const canBet = (amount: number) => {
    if (amount < 0 || players[currentPlayer] === undefined) {
      return false;
    }

    const maxBet = getMaxBet();
    if (maxBet > 0) {
      return false;
    }

    const { totalChips } = players[currentPlayer];
    const minBet = forcedBets.bigBlind;
    if (amount < minBet || amount > totalChips) {
      return false;
    }

    return totalChips >= minBet;
  };

  const onFold = () => {
    state.socket.send('foldTable');
  };

  const onCheck = () => {
    if (canCheck()) {
      state.socket.send('checkTable');
    }
  };

  const onRaise = () => {
    if (!canRaise(raiseamount)) {
      alert('Input correct amount');
      return;
    }
    state.socket.send('raiseTable', { raise: raiseamount });
  };

  const onCall = () => {
    state.socket.send('callTable');
  };

  const onBet = () => {
    state.socket.send('betTable', { bet: forcedBets.bigBlind });
  };

  return (
    <section className={styles.body}>
      {!!state.waitTime && (
        <div className={styles.waitTime}>{state.waitTime}</div>
      )}
      <TableCard ref={tablecard} />
      <div className={styles.styledCommunityCard}>
        {get(state, 'tableData.community', []).map(
          (card: any, index: number) => {
            return (
              <div
                className={styles.cardContainer}
                key={`card_${index}`}
                style={{
                  borderColor: winnerPair.find(
                    (winner: any) =>
                      winner.suit === card.suit && winner.rank === card.rank
                  )
                    ? 'red'
                    : 'transparent',
                }}
              >
                <Card type={card.suit} number={card.rank} />
              </div>
            );
          }
        )}
      </div>
      <div className={styles.table} />
      <div className={styles.potContainer}>
        <div className={styles.pot}>
          <div>Pot:</div>
          <div className={styles.amount}>{state.tableData?.pot || 0}</div>
        </div>
      </div>

      <div className={styles.links}>
        <ButtonRefresh />
        <div
          className={styles.blackEllipse}
          onClick={() => setIsLeaderBoard(!isleaderboard)}
        >
          <MdOutlineLeaderboard />
        </div>
      </div>

      {positionx.map((data, i) => {
        const userId = (i + 6 + userPosition) % 6;
        const classString = 'characterPos' + `${i}`;
        return (
          <Character
            key={300 + userId}
            image={image[userId]}
            classString = {classString}
            left={
              size.width < 768
                ? positionx[(i + 6 - currentPlayer) % 6]
                : positionx_desktop[(i + 6 - currentPlayer) % 6]
            }
            top={
              size.width < 768
                ? positiony[(i + 6 - currentPlayer) % 6]
                : positiony_desktop[(i + 6 - currentPlayer) % 6]
            }
            user={userId === 0}
            index={userId}
            raise={raise[userId]}
            onFold={onFold}
            items={items[userId]}
            ice={iceamount}
            xp={xpamount}
            dg={dgamount}
            data={players[userId]}
          />
        );
      })}

      <div className={styles.buttonContainerParentBottom}>
        <div className={styles.turnButtonContainer}>
          {!isWon &&
            players[activePlayer] &&
            (activePlayer === currentPlayer ? (
              <div className={styles.turnButton}>
                <div className={styles.title}>Your Turn</div>
                <div className={styles.dot} />
              </div>
            ) : (
              <div
                className={styles.turnButton}
                style={{borderColor: '#2a2a2a'}}
              >
                <div className={styles.title}>
                  {`${players[activePlayer]?.name}'s Turn`}
                </div>
              </div>
            ))}
          {isWon && (
            <div className={styles.turnButton}>
              <div className={styles.title} style={{ marginRight: '5px' }}>
                {`${players[winnerIndex]?.name} wins`}
              </div>
            </div>
          )}
        </div>
      </div>

      {activePlayer === currentPlayer ? (
        <div className={styles.buttonContainerParentBottom}>
          <div className={styles.actionButtonGroup}>
            <button disabled={isWon} onClick={() => onFold()}>
              FOLD
            </button>
            {canCall() ? (
              <button disabled={!canCall() || isWon} onClick={() => onCall()}>
                CALL
              </button>
            ) : (
              <button disabled={isWon} onClick={() => onCheck()}>
                CHECK
              </button>
            )}
            {canRaise(getMinRaise()) ? (
              <button disabled={isWon} onClick={() => setRaiseShow(true)}>
                RAISE
              </button>
            ) : canBet(forcedBets.bigBlind) ? (
              <button disabled={isWon} onClick={() => onBet()}>
                BET
              </button>
            ) : (
              <button disabled={isWon} onClick={() => onBet()}>
                BET
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.buttonContainerParentBottom}>
          <div className={styles.actionButtonGroup}>
            <button disabled onClick={() => onFold()}>
              FOLD
            </button>
            <button disabled onClick={() => onCheck()}>
              CHECK
            </button>
            <button disabled onClick={() => onBet()}>
              BET
            </button>
          </div>
        </div>
      )}
      <div
        className={styles.progressContainer}
        onClick={() => setIsSetting(!issetting)}
      >
        <div className={styles.progress}>
          <span>See the river 15 times</span>
          <ProgressBar type={0} percent={7 / 15} text="7/15" width="74px" />
        </div>
        <div className={styles.progress}>
          <span>Win the hand X times</span>
          <ProgressBar type={1} percent={1 / 8} text="1/8" width="74px" />
        </div>
        <div className={styles.progress}>
          <span>Get a three of a kind X times</span>
          <ProgressBar type={2} percent={3 / 4} text="3/4" width="74px" />
        </div>
      </div>
      <RaiseSetting
        open={raiseshow}
        setOpen={setRaiseShow}
        raiseamount={raiseamount}
        setRaiseAmount={setRaiseAmount}
        onRaise={onRaise}
      />
      <Setting open={issetting} setOpen={setIsSetting} />
      <LeaderBoard open={isleaderboard} setOpen={setIsLeaderBoard} />
      {isWon && (
        <div className={styles.wonImageContainer}>
          <Image
            src="/images/200ice.svg"
            alt="200ice"
            width={176}
            height={111}
          />
        </div>
      )}
    </section>
  );
};

export default PokerGame;
