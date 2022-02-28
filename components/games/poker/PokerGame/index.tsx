import { useEffect, useState } from 'react';
import { maxBy, get, isEmpty } from 'lodash';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useStoreState } from '@/hooks/Hooks';
import {
  Character,
  Setting,
  LeaderBoard,
  ProgressBar,
  RaiseSetting,
  Card,
  CardSpot,
} from '@/components/games/poker';
import { ButtonRefresh } from '@/components/buttons';
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

interface WaitIndicatorProps {
  waitTime: number
}
const WaitIndicator = ({ waitTime }: WaitIndicatorProps) => {
  return (
    <>
      {console.log('waitTime', waitTime)}
      {!!waitTime && (
        <div className={styles.waitTime}>{waitTime}</div>
      )}
    </>
  );
};

interface RoundIndicatorProps {
  overlayTimeout: boolean
  tableDataRound: number
}
const RoundIndicator = ({ overlayTimeout, tableDataRound }: RoundIndicatorProps) => {
  return (
    <>
      {overlayTimeout && (
        <div className={styles.roundOverlay}>{tableDataRound}</div>
      )}
    </>
  );
};

interface TableAndPotProps {
  tableDataPot: number
}
const TableAndPot = ({ tableDataPot }: TableAndPotProps) => {
  return (
    <>
      <div className={styles.table} />

      <div className={styles.potContainer}>
        <div className={styles.pot}>
          <div>Pot:</div>
          <div className={styles.amount}>{tableDataPot}</div>
        </div>
      </div>
    </>
  );
};


interface TopButtonsProps {
  setIsLeaderBoard: any
  isleaderboard: boolean
}

const TopButtons = ({ setIsLeaderBoard, isleaderboard }: TopButtonsProps) => {
  return (
    <div className={styles.links}>
      <ButtonRefresh />
      <div
        className={styles.blackEllipse}
        onClick={() => setIsLeaderBoard(!isleaderboard)}
      >
        <Image
          src="/images/leaderboard.svg"
          width={20}
          height={20}
          alt={'leaderboard'}
        />
      </div>
    </div>
  );
};

interface AvatarsProps {
  currentSeat: number
  iceAmount: number
  xpAmount: number
  dgAmount: number
  playerData: any[]
}
const Avatars = ({ currentSeat, iceAmount, xpAmount, dgAmount, playerData }: AvatarsProps) => {
  return (
    <>
      {new Array(6).fill(0).map((data, i) => {
        const classString =
          'characterPos' + `${Math.abs(6 - i + currentSeat) % 6}`;

        return (
          <Character
            key={`character_${i}`}
            classString={classString}
            user={i === currentSeat}
            index={i}
            items={items[i]}
            ice={iceAmount}
            xp={xpAmount}
            dg={dgAmount}
            data={playerData[i]}
          />
        );
      })}
    </>
  );
};

interface CommunityCardsProps {
  cards: []
  isWon: boolean
  winnerPair: []
}
const CommunityCards = ({ cards, isWon, winnerPair }: CommunityCardsProps) => {

  let spots: number[] = [];
  for (let i = 0; i < 5 - cards.length; i++) {
    spots.push(i);
  }

  return (
    <div className={styles.styledCommunityCard}>
      {cards.map((card: any, index: number) => {
        return (
          <div
            className={cn(
              styles.cardContainer,
              !isWon ||
                winnerPair.find(
                  (winner: any) =>
                    winner.suit === card.suit && winner.rank === card.rank
                )
                ? styles.opacity100
                : styles.opacity20
            )}
            key={`card_${index}`}
          >
            <Card type={card.suit} number={card.rank} />
          </div>
        );
      })}

      {spots.length > 0 &&
        spots.map((n: number, index: number) => {
          return (
            <div
              className={cn(styles.cardContainer, styles.borderTransparent)}
              key={`cardspot_${index}`}
            >
              <CardSpot />
            </div>
          );
        })}
    </div>
  );
};

interface YourTotalAndTurnProps {
  chipsAmount: number
  isWon: boolean
  players: any[]
  activePlayer: number
  currentSeat: number
  winnerIndex: number
}
const YourTotalAndTurn = ({ chipsAmount, isWon, players, activePlayer, currentSeat, winnerIndex }: YourTotalAndTurnProps) => {
  return (
    <div className={styles.buttonContainerParentBottom}>
      <div className={styles.turnButtonContainer}>
        <div className={styles.yourTotal}>
          <div className={styles.total}>Your Total</div>
          <div className={styles.chipForBet}>
            {chipsAmount && (
              <div className={styles.betAmount}>{chipsAmount}</div>
            )}
            {chipsAmount && (
              <Image
                src="/images/freecoin.svg"
                width="12px"
                height="12px"
                alt="chipImage"
              />
            )}
          </div>
        </div>

        {!isWon &&
          players[activePlayer] &&
          (activePlayer === currentSeat ? (
            <div className={styles.turnButton}>
              <div className={styles.title}>Your Turn</div>
              <div className={styles.dot} />
            </div>
          ) : (
            <div className={cn(styles.turnButton, styles.greyBorder)}>
              <div className={styles.title}>
                {`${players[activePlayer]?.name}'s Turn`}
              </div>
            </div>
          ))}

        {isWon && (
          <div className={cn(styles.turnButton, styles.greyBorder)}>
            <div className={styles.title} style={{ marginRight: '5px' }}>
              {`${players[winnerIndex]?.name} wins`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ActiveButtonsProps {
  isWon: boolean
  onFold: () => void
  onCall: () => void
  onCheck: () => void
  onBet: () => void
  canCall: () => boolean
  canCheck: () => boolean
  legalActions: any
  setRaiseShow: any
}
const ActiveButtons = ({ isWon, onFold, onCall, onCheck, onBet, canCall, canCheck, legalActions, setRaiseShow }: ActiveButtonsProps) => {
  return (
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
  );
};

const InactiveButtons = () => {
  return (
    <div className={styles.buttonContainerParentBottom}>
      <div className={styles.actionButtonGroup}>
        <button disabled>Fold</button>
        <button disabled>Check</button>
        <button disabled>Bet</button>
      </div>
    </div>
  );
};

interface ChallengesProps {
  setIsSetting: any
  issetting: boolean
}
const Challenges = ({ setIsSetting, issetting }: ChallengesProps) => {
  return (
    <>
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
    </>
  );
};

interface SettingProps {
  setRaiseShow: any
  raiseshow: boolean
  setRaiseAmount: any
  raiseamount: number
  onRaise: () => void
  tableDataPot: number
  setIsSetting: any
  issetting: boolean
  setIsLeaderBoard: any
  isleaderboard: boolean
  maxBalanceStack: number
}
const Settings = (
  {
    setRaiseShow,
    raiseshow,
    setRaiseAmount,
    raiseamount,
    onRaise,
    tableDataPot,
    setIsSetting,
    issetting,
    setIsLeaderBoard,
    isleaderboard,
    maxBalanceStack,
  }: SettingProps) => {
  return (
    <>
      <RaiseSetting
        open={raiseshow}
        setOpen={setRaiseShow}
        raiseamount={raiseamount}
        setRaiseAmount={setRaiseAmount}
        onRaise={onRaise}
        pot={tableDataPot}
        maxBalance={maxBalanceStack}
      />
      <Setting open={issetting} setOpen={setIsSetting} />
      <LeaderBoard open={isleaderboard} setOpen={setIsLeaderBoard} />
    </>
  );
};

const PokerGame: React.FC = () => {
  const state = useStoreState(); // returns global state from Context API store
  const router = useRouter();

  const [raiseamount, setRaiseAmount] = useState(0);
  const [raiseshow, setRaiseShow] = useState(false);
  const [issetting, setIsSetting] = useState(false);
  const [isleaderboard, setIsLeaderBoard] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [overlayTimeout, setOverlayTimeout] = useState(false);

  const [iceAmount, setICEAmount] = useState(0);
  const [xpAmount, setXPAmount] = useState(0);
  const [dgAmount, setDGAmount] = useState(0);

  const forcedBets = get(state, 'currentSeat.forced', {});
  const currentSeat = get(state, 'currentSeat.currentSeat', 0);
  const activePlayer = get(state, 'tableData.activePlayer', 0);
  const winners = state.winners;

  const chipsAmount = state.chipUpdate.accountBalance;

  const isWon = state.isWon;
  const winnerPair = get(winners, 'winners.0.0.1.cards', []);
  const isInHand =
    state.tableData?.seats?.map((el: any) => el && el.isInHand) ?? [];
  const winnerIndex = get(winners, 'winners.0.0.0', isInHand.indexOf(true));
  const legalActions = get(state, 'tableData.legalActions.actions', []);
  const chipRange = get(state, 'tableData.legalActions.chipRange', {});
  const cards = get(state, 'tableData.community', []);
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  // if user is not logged-in send them to the join page
  useEffect(() => {
    if (isEmpty(state.socket)) {
      router.push('/');
    }
  }, [state.socket, router]);

  useEffect(() => {
    if (!isNaN(state.tableData.callAmount)) {
      setRaiseAmount(state.tableData.callAmount * 2);
    }
  }, [state.tableData]);

  useEffect(() => {
    setPlayers(Object.values(state.tableData.seats || {}));
  }, [state.tableData, state.socket.id]);

  useEffect(() => {
    if (state.tableData.round) {
      setOverlayTimeout(true);
      setTimeout(() => {
        setOverlayTimeout(false);
      }, 5000);
    }
  }, [state.tableData.round]);

  useEffect(() => {
    setICEAmount(state.tokenAmounts.ICE_AMOUNT);
    setXPAmount(state.tokenAmounts.XP_AMOUNT);
    setDGAmount(state.tokenAmounts.DG_AMOUNT);
  }, [state.tokenAmounts]);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  // ********** we will use front-end validation later **********
  const getMaxBet = () => {
    return get(maxBy(players, 'betSize'), 'betSize', 0);
  };

  // ********** we will use front-end validation later **********
  // eslint-disable-next-line
  const getMinRaise = () => {
    return getMaxBet() + forcedBets.bigBlind;
  };

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
    console.log('Clicked Fold');

    state.socket.send('foldTable');
  };

  const onCheck = () => {
    console.log('Clicked Check');

    if (canCheck()) {
      state.socket.send('checkTable');
    }
  };

  const onCall = () => {
    console.log('Clicked Call');

    state.socket.send('callTable');
  };

  const onBet = () => {
    console.log('Clicked Bet');

    if (!canBet(forcedBets.bigBlind)) {
      alert('Input correct amount');
      return;
    }
    state.socket.send('betTable', { bet: forcedBets.bigBlind });
  };

  const onRaise = () => {
    console.log('Clicked Raise');

    if (!canRaise(raiseamount)) {
      alert('Input correct amount');
      return;
    }
    state.socket.send('raiseTable', { raise: raiseamount });
  };

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  // helper consts

  // const isWinner() {
  //   return (
  //     <>
  //       {isWon && (
  //         <div className={styles.wonImageContainer}>
  //           <Image
  //             src="/images/200ice.svg"
  //             alt="200ice"
  //             width={176}
  //             height={111}
  //           />
  //           <span className={styles.potValueText}>
  //             {state.tableData?.pot || 0}
  //           </span>
  //         </div>
  //       )}
  //     </>
  //   );
  // }

  return (
    <section className={styles.body}>
      <WaitIndicator waitTime={state.waitTime} />
      <RoundIndicator
        overlayTimeout={overlayTimeout}
        tableDataRound={state.tableData.round}
      />
      <CommunityCards
        cards={cards}
        isWon={isWon}
        winnerPair={winnerPair}
      />
      <TableAndPot
        tableDataPot={state.tableData?.pot || 0}
      />
      <TopButtons
        setIsLeaderBoard={setIsLeaderBoard}
        isleaderboard={isleaderboard}
      />
      <Avatars
        currentSeat={currentSeat}
        iceAmount={iceAmount}
        xpAmount={xpAmount}
        dgAmount={dgAmount}
        playerData={players}
      />
      <YourTotalAndTurn
        chipsAmount={chipsAmount}
        isWon={isWon}
        players={players}
        activePlayer={activePlayer}
        currentSeat={currentSeat}
        winnerIndex={winnerIndex}
      />
      <div className={styles.lowerContainer}>
        {activePlayer === currentSeat && !isEmpty(legalActions) ? (
          <ActiveButtons
            isWon={isWon}
            onFold={onFold}
            onCall={onCall}
            onCheck={onCheck}
            onBet={onBet}
            canCall={canCall}
            canCheck={canCheck}
            legalActions={legalActions}
            setRaiseShow={setRaiseShow}
          />
        ) : (
          <InactiveButtons />
        )}
        <Challenges setIsSetting={setIsSetting} issetting={issetting} />
      </div>
      <Settings
        setRaiseShow={setRaiseShow}
        raiseshow={raiseshow}
        setRaiseAmount={setRaiseAmount}
        raiseamount={raiseamount}
        onRaise={onRaise}
        tableDataPot={state.tableData?.pot || 0}
        setIsSetting={setIsSetting}
        issetting={issetting}
        setIsLeaderBoard={setIsLeaderBoard}
        isleaderboard={isleaderboard}
        maxBalanceStack={players[currentSeat]?.stack}
      />
      {/* {isWinner()} */}
    </section>
  );
};

export default PokerGame;
