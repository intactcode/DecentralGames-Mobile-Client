import { useEffect, useState } from 'react';
import { maxBy, get } from 'lodash';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useStoreState } from '../../../../hooks/Hooks';
import Character from '../Character/Character';
import Setting from '../Setting/Setting';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import ProgressBar from '../ProgressBar/ProgressBar';
import RaiseSetting from '../RaiseSetting/RaiseSetting';
import Card from '../Card/Card';
import ButtonRefresh from '../../../buttons/ButtonRefresh/ButtonRefresh';
import styles from './PokerGame.module.scss';

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
  const [issetting, setIsSetting] = useState(false);
  const [isleaderboard, setIsLeaderBoard] = useState(false);
  const [iceamount, setIceAmount] = useState(22000); // eslint-disable-line
  const [xpamount, setXPAmount] = useState(22); // eslint-disable-line
  const [dgamount, setDGAmount] = useState(0.01); // eslint-disable-line
  const [players, setPlayers] = useState<any[]>([]);
  const [overlayTimeout, setOverlayTimeout] = useState(false);
  const forcedBets = state.currentSeat.forced || {};
  const currentPlayer = state.currentSeat.currentSeat || 0;
  const activePlayer = state.tableData.active;
  const winners = state.winners;
  const isWon = state.isWon;
  const winnerPair = get(winners, 'winners.0.0.1.cards', []);
  const isInHand = state.tableData?.isInHand ?? [];
  const winnerIndex = get(winners, 'winners.0.0.0', isInHand.indexOf(true));
  const legalActions = get(state, 'tableData.legalActions.actions', []);
  const chipRange = get(state, 'tableData.legalActions.chipRange', {});

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  const onReset = () => {
    console.log('Set game parameters');
  };

  // useEffect(() => {
  //   return () => {
  //     // state.socket.leave();
  //   };
  // }, [state.socket]);

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
      setPlayers(Object.values(seats));
    };

    setSeats(state.tableData.seats || {});
  }, [state.tableData, state.socket.id]);

  useEffect(() => {
    if (state.tableData.round) {
      setOverlayTimeout(true);
      setTimeout(() => {
        setOverlayTimeout(false);
      }, 5000);
    }
  }, [state.tableData.round]);

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
    return legalActions.includes('call');
  };

  const canCheck = () => {
    return legalActions.includes('check');
  };

  const canRaise = (amount: number) => {
    return amount >= chipRange.min && amount <= chipRange.max;
  };

  const canBet = (amount: number) => {
    return amount >= chipRange.min && amount <= chipRange.max;
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
    if (!canBet(forcedBets.bigBlind)) {
      alert('Input correct amount');
      return;
    }
    state.socket.send('betTable', { bet: forcedBets.bigBlind });
  };

  return (
    <section className={styles.body}>
      {!!state.waitTime && (
        <div className={styles.waitTime}>{state.waitTime}</div>
      )}
      {overlayTimeout && (
        <div className={styles.roundOverlay}>{state.tableData.round}</div>
      )}
      <div className={styles.styledCommunityCard}>
        {get(state, 'tableData.community', []).map(
          (card: any, index: number) => {
            return (
              <div
                className={styles.cardContainer}
                key={`card_${index}`}
                style={{
                  opacity: winnerPair.find(
                    (winner: any) =>
                      winner.suit === card.suit && winner.rank === card.rank
                  )
                    ? '0.7'
                    : '1',
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

      {new Array(6).fill(0).map((data, i) => {
        const classString = 'characterPos' + `${(i + 6 - currentPlayer) % 6}`;
        return (
          <Character
            key={`character_${i}`}
            classString={classString}
            user={i === currentPlayer}
            index={i}
            items={items[i]}
            ice={iceamount}
            xp={xpamount}
            dg={dgamount}
            data={players[i]}
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
                style={{ borderColor: '#2a2a2a' }}
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
      <div className={styles.playerInfo}>
        <div>Your Total</div>
        <div className={styles.chipForBet}>
          {iceamount && (
            <div className={styles.betAmount}>
              {iceamount}
              <Image
                className={styles.chipImage}
                src="/images/freecoin.svg"
                width="15px"
                height="15px"
                alt="chipImage"
              />
            </div>
          )}
        </div>
      </div>
      {activePlayer === currentPlayer ? (
        <div className={styles.buttonContainerParentBottom}>
          <div className={styles.actionButtonGroup}>
            <button disabled={isWon} onClick={() => onFold()}>
              Fold
            </button>
            {canCall() && (
              <button disabled={isWon} onClick={() => onCall()}>
                Call
              </button>
            )}
            {canCheck() && (
              <button disabled={isWon} onClick={() => onCheck()}>
                Check
              </button>
            )}
            {legalActions.includes('raise') && (
              <button disabled={isWon} onClick={() => setRaiseShow(true)}>
                Raise
              </button>
            )}
            {legalActions.includes('bet') && (
              <button disabled={isWon} onClick={() => onBet()}>
                Bet
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.buttonContainerParentBottom}>
          <div className={styles.actionButtonGroup}>
            <button disabled onClick={() => onFold()}>
              Fold
            </button>
            <button disabled onClick={() => onCheck()}>
              Check
            </button>
            <button disabled onClick={() => onBet()}>
              Bet
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
          <span className={styles.potValueText}>
            {state.tableData?.pot || 0}
          </span>
        </div>
      )}
    </section>
  );
};

export default PokerGame;
