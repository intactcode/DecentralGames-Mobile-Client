import { useEffect, useRef, useState } from 'react';
import { maxBy, get, isEmpty } from 'lodash';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useStoreState } from '../../../../store/Hooks';
import Character from '../Character/Character';
import Setting from '../Setting/Setting';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import ProgressBar from '../ProgressBar/ProgressBar';
import RaiseSetting from '../RaiseSetting/RaiseSetting';
import TableCard from '../tableCard/TableCard';
import Card from '../Card/Card';
import ButtonRefresh from '../../../buttons/ButtonRefresh/ButtonRefresh';

import gameboardstyles from '../../poker/GameBoard/GameBoard.module.scss';

type ActionButtonGroupProps = {
  turn: number;
};

const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({
  children,
  turn,
}) => {
  return (
    <div
      className={gameboardstyles.actionButtonGroup}
      style={{ opacity: turn === 0 ? 1 : 0.2 }}
    >
      {children}
    </div>
  );
};

// Hooks
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      function handleResize(): void {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return windowSize;
}

const positionx = [
  'calc(50% - 36px)',
  'calc(50% - 160px)',
  'calc(50% - 160px)',
  'calc(50% - 36px)',
  'calc(50% + 90px)',
  'calc(50% + 90px)',
];
const positiony = ['460px', '330px', '140px', '0px', '140px', '330px'];

const positionx_desktop = [
  'calc(50% - 380px)',
  'calc(50% + 110px)',
  'calc(50% + 110px)',
  'calc(50% + 300px)',
  'calc(50% - 190px)',
  'calc(50% - 190px)',
];
const positiony_desktop = ['200px', '395px', '30px', '200px', '30px', '395px'];

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

  const [turn, setTurn] = useState(0);
  const [active, setActive] = useState<boolean[]>(new Array(6).fill(true));
  const [raiseamount, setRaiseAmount] = useState(600);
  const [raiseshow, setRaiseShow] = useState(false);
  const [raise, setRaise] = useState<number[]>([]);
  const [issetting, setIsSetting] = useState(false);
  const [isleaderboard, setIsLeaderBoard] = useState(false);
  const [iceamount, setIceAmount] = useState(22000); // eslint-disable-line
  const [xpamount, setXPAmount] = useState(22); // eslint-disable-line
  const [dgamount, setDGAmount] = useState(0.01); // eslint-disable-line
  const [win, setWin] = useState<boolean[]>(new Array(6).fill(false));
  const [players, setPlayers] = useState<any[]>([]);
  const [userPosition, setUserPosition] = useState(0);
  const forcedBets = state.currentSeat.forced || {};
  const currentPlayer = state.currentSeat.currentSeat || 0;
  const tablecard: any = useRef(null);
  const activePlayer = state.tableData.active;
  const winners = state.winners;
  const winnerPair = get(winners, 'winners.0.0.1.cards', []);
  const isInHand = state.tableData?.isInHand ?? [];
  const winnerIndex = get(winners, '0.0.0', isInHand.indexOf(true));
  const isWon = !isEmpty(winners);

  const size = useWindowSize();
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  const onReset = () => {
    console.log('Set game parameters');

    setRaise([]);
    setTurn(0);
    setWin(new Array(6).fill(false));
    setActive(new Array(6).fill(true));

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
    <div className={gameboardstyles.gameboardBody}>
      {!!state.waitTime && (
        <h2
          style={{
            marginLeft: 6,
            marginTop: 3,
            position: 'absolute',
            fontSize: '6rem',
            fontWeight: 300,
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            lineHeight: 1.167,
            letterSpacing: '-0.01562em',
          }}
        >
          {state.waitTime}
        </h2>
      )}
      <TableCard ref={tablecard} />
      <div className={gameboardstyles.styledCommunityCard}>
        {get(state, 'tableData.community', []).map(
          (card: any, index: number) => {
            return (
              <div
                key={`card_${index}`}
                style={{
                  borderColor: winnerPair.find(
                    (winner: any) =>
                      winner.suit === card.suit && winner.rank === card.rank
                  )
                    ? 'red'
                    : 'transparent',
                  borderStyle: 'solid',
                  borderWidth: '2px',
                  borderRadius: '7px',
                  marginRight: 0.5,
                  marginLeft: 0.5,
                  marginTop: 1,
                }}
              >
                <Card type={card.suit} number={card.rank} />
              </div>
            );
          }
        )}
      </div>
      <div className={gameboardstyles.gameboardTable}></div>
      <h2
        style={{
          marginLeft: 10,
          fontWeight: 400,
          fontSize: '2.125rem',
          lineHeight: 1.235,
          letterSpacing: '0.00735em',
        }}
      >
        Pot: {state.tableData?.pot || 0}
      </h2>

      <div className={gameboardstyles.gameboardLinks}>
        <ButtonRefresh />
        <div
          className={gameboardstyles.gameboardBlackEllipse}
          style={{ right: '40px' }}
          onClick={() => setIsLeaderBoard(!isleaderboard)}
        >
          <MdOutlineLeaderboard />
        </div>
      </div>

      {positionx.map((data, i) => {
        const userId = (i + 6 + userPosition) % 6;
        return (
          <Character
            key={300 + userId}
            image={image[userId]}
            left={size.width < 768
              ? positionx[(i + 6 - currentPlayer) % 6]
              : positionx_desktop[(i + 6 - currentPlayer) % 6]}
            top={size.width < 768
              ? positiony[(i + 6 - currentPlayer) % 6]
              : positiony_desktop[(i + 6 - currentPlayer) % 6]}
            active={active[userId]}
            user={userId === 0}
            turn={turn == userId}
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

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            paddingTop: '575px',
            paddingLeft: '20px',
            paddingRight: '20px',
            width: '374px',
          }}
        >
          {!isWon &&
            players[activePlayer] &&
            (activePlayer === currentPlayer ? (
              <div className={gameboardstyles.turnButton}>
                <div
                  style={{ marginTop: '2px', color: 'white', fontSize: '11px' }}
                >
                  Your Turn
                </div>
                <div className={gameboardstyles.dot} />
              </div>
            ) : (
              <div className={gameboardstyles.turnButton}>
                <div
                  style={{ marginTop: '2px', color: 'white', fontSize: '11px' }}
                >
                  {`${players[activePlayer]?.name}'s Turn`}
                </div>
              </div>
            ))}
          {isWon && (
            <div className={gameboardstyles.turnButton}>
              <div
                style={{
                  marginTop: '2px',
                  color: 'white',
                  fontSize: '11px',
                  marginRight: '5px',
                }}
              >
                {`${players[winnerIndex]?.name} wins`}
              </div>
            </div>
          )}
        </div>
      </div>
      {activePlayer === currentPlayer ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ActionButtonGroup turn={turn === -1 ? 1 : 0}>
            <button
              className={gameboardstyles.button_fold}
              onClick={() => turn !== -1 && onFold()}
            >
              Fold
            </button>
            {canCall() ? (
              <button
                className={gameboardstyles.button_check}
                onClick={() => turn !== -1 && onCall()}
              >
                Call
              </button>
            ) : (
              <button
                className={gameboardstyles.button_check}
                onClick={() => turn !== -1 && onCheck()}
              >
                Check
              </button>
            )}
            {canRaise(getMinRaise()) ? (
              <button
                className={gameboardstyles.button_bet}
                onClick={() => turn !== -1 && setRaiseShow(true)}
              >
                Raise
              </button>
            ) : canBet(forcedBets.bigBlind) ? (
              <button
                className={gameboardstyles.button_bet}
                onClick={() => turn !== -1 && onBet()}
              >
                Bet
              </button>
            ) : (
              <button
                className={gameboardstyles.button_bet}
                onClick={() => turn !== -1 && onBet()}
              >
                Bet
              </button>
            )}
          </ActionButtonGroup>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ActionButtonGroup turn={turn === -1 ? 1 : 0}>
            <button
              disabled
              className={gameboardstyles.button_fold}
              onClick={() => turn !== -1 && onFold()}
            >
              Fold
            </button>
            <button
              className={gameboardstyles.button_check}
              onClick={() => turn !== -1 && onCheck()}
            >
              Check
            </button>
            <button
              className={gameboardstyles.button_bet}
              onClick={() => turn !== -1 && onBet()}
            >
              Bet
            </button>
          </ActionButtonGroup>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '15px',
        }}
        onClick={() => setIsSetting(!issetting)}
      >
        <div className={gameboardstyles.progressbarsContainer}>
          <div>See the river 15 times</div>
          <ProgressBar type={0} percent={7 / 15} text="7/15" width="74px" />
        </div>
        <div className={gameboardstyles.progressbarsContainer}>
          <div>Win the hand X times</div>
          <ProgressBar type={1} percent={1 / 8} text="1/8" width="74px" />
        </div>
        <div className={gameboardstyles.progressbarsContainer}>
          <div>Get a three of a kind X times</div>
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
      {win[0] && (
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 90px)',
            top: '570px',
          }}
        >
          <Image
            src="/images/200ice.svg"
            alt="200ice"
            width={176}
            height={111}
          />
        </div>
      )}
      {win[0] && (
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 43px)',
            top: '450px',
            zIndex: 19,
          }}
        >
          <Image
            src="/images/fullhouse.svg"
            alt="fullhouse"
            width={84}
            height={35}
          />
        </div>
      )}
    </div>
  );
};

export default PokerGame;
