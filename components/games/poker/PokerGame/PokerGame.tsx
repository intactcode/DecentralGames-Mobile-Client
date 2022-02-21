import { useEffect, useState } from 'react';
import { maxBy, get, isEmpty } from 'lodash';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useStoreState } from '../../../../hooks/Hooks';
import Character from '../Character/Character';
import Setting from '../Setting/Setting';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import ProgressBar from '../ProgressBar/ProgressBar';
import RaiseSetting from '../RaiseSetting/RaiseSetting';
import Card from '../Card/Card';
import CardSpot from '../CardSpot/CardSpot';
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

  const [raiseamount, setRaiseAmount] = useState(50);
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

  const chipsAmount = get(state, `tableData.seats.${currentSeat}.stack`, 0);

  const isWon = state.isWon;
  const winnerPair = get(winners, 'winners.0.0.1.cards', []);
  const isInHand =
    state.tableData?.seats?.map((el: any) => el && el.isInHand) ?? [];
  const winnerIndex = get(winners, 'winners.0.0.0', isInHand.indexOf(true));
  const legalActions = get(state, 'tableData.legalActions.actions', []);
  const chipRange = get(state, 'tableData.legalActions.chipRange', {});

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  // if user is not logged-in send them to the join page
  useEffect(() => {
    if (isEmpty(state.socket)) {
      router.push('/join-poker');
    }
  }, [state.socket, router, state.game]);

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

  // ********** later we will fetch the ICE/DG amounts from the smart contract and the XP amount from the server **********
  useEffect(() => {
    const iceAmount = 1000;
    const xpAmount = 22;
    const dgAmount = 0.01;

    setICEAmount(iceAmount);
    setXPAmount(xpAmount);
    setDGAmount(dgAmount);

    console.log('ICE amount: ' + iceAmount);
    console.log('XP amount: ' + xpAmount);
    console.log('DG amount: ' + dgAmount);
  }, []);

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
  // helper functions

  function waitIndicator() {
    return (
      <>
        {!!state.waitTime && (
          <div className={styles.waitTime}>{state.waitTime}</div>
        )}
      </>
    );
  }

  function roundIndicator() {
    return (
      <>
        {overlayTimeout && (
          <div className={styles.roundOverlay}>{state.tableData.round}</div>
        )}
      </>
    );
  }

  function topButtons() {
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
  }

  function tableAndPot() {
    return (
      <>
        <div className={styles.table} />

        <div className={styles.potContainer}>
          <div className={styles.pot}>
            <div>Pot:</div>
            <div className={styles.amount}>{state.tableData?.pot || 0}</div>
          </div>
        </div>
      </>
    );
  }

  function communityCards() {
    const cards = get(state, 'tableData.community', []);
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
                winnerPair.find(
                  (winner: any) =>
                    winner.suit === card.suit && winner.rank === card.rank
                )
                  ? styles.borderRed
                  : styles.borderTransparent
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
  }

  function avatars() {
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
              data={players[i]}
            />
          );
        })}
      </>
    );
  }

  function yourTurn() {
    return (
      <div className={styles.buttonContainerParentBottom}>
        <div className={styles.turnButtonContainer}>
          {!isWon &&
            players[activePlayer] &&
            (activePlayer === currentSeat ? (
              <div className={styles.turnButton}>
                <div className={styles.title}>Your Turn</div>
                <div className={styles.dot} />
              </div>
            ) : (
              <div className={cn(styles.turnButton, styles.redBorder)}>
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
    );
  }

  function yourTotal() {
    return (
      <div className={styles.playerInfo}>
        <div>Chips Balance</div>

        <div className={styles.chipForBet}>
          {chipsAmount && <div className={styles.betAmount}>{chipsAmount}</div>}
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
    );
  }

  function activeButtons() {
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
  }

  function inactiveButtons() {
    return (
      <div className={styles.buttonContainerParentBottom}>
        <div className={styles.actionButtonGroup}>
          <button disabled>Fold</button>
          <button disabled>Check</button>
          <button disabled>Bet</button>
        </div>
      </div>
    );
  }

  function challenges() {
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
  }

  function settings() {
    return (
      <>
        <RaiseSetting
          open={raiseshow}
          setOpen={setRaiseShow}
          raiseamount={raiseamount}
          setRaiseAmount={setRaiseAmount}
          onRaise={onRaise}
        />
        <Setting open={issetting} setOpen={setIsSetting} />
        <LeaderBoard open={isleaderboard} setOpen={setIsLeaderBoard} />
      </>
    );
  }

  // function isWinner() {
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
      {waitIndicator()}
      {roundIndicator()}
      {communityCards()}
      {tableAndPot()}
      {topButtons()}
      {avatars()}
      {yourTurn()}
      <div className={styles.lowerContainer}>
        {yourTotal()}
        {activePlayer === currentSeat && !isEmpty(legalActions)
          ? activeButtons()
          : inactiveButtons()}
        {challenges()}
      </div>
      {settings()}
      {/* {isWinner()} */}
    </section>
  );
};

export default PokerGame;
