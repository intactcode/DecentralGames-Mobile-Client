import { useEffect, useRef, useState } from 'react';
import { maxBy, get, isEmpty } from 'lodash';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useStoreState } from '../../../store/Hooks';
import Character from './Character/Character';
import Setting from './Setting/Setting';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import ProgressBar from './ProgressBar/ProgressBar';
import RaiseSetting from './RaiseSetting';
import TableCard from './tableCard/TableCard';
import Card from './Card/Card';
import ButtonRefresh from '../../buttons/ButtonRefresh/ButtonRefresh';

const Progress = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  > div {
    color: #ffffffbf;
    font-size: 8px;
    line-height: normal;
    font-weight: normal;
  }
`;

const Body = styled(Box)`
  width: 100%;
  position: relative;
  margin-top: 72px;
  font-family: 'Larsseit';
  height: calc(100vh - 72px);
`;

const Table = styled(Box)`
  background-image: url('images/Table.svg');
  width: 100%;
  max-width: 374px;
  height: 578px;
  position: absolute;
  left: calc(50% - 187px);
`;

const Links = styled(Box)`
  position: absolute;
  width: 340px;
  display: flex;
  justify-content: space-between;
  left: calc(50% - 170px);
`;

const BlackEllipse = styled(Box)`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: #2a2a2a;
  border-radius: 50%;
  color: #616161;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.16));
`;

type ActionButtonGroupProps = {
  turn: number;
};

const ActionButtonGroup = styled(Box)<ActionButtonGroupProps>(({ turn }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
  opacity: turn === 0 ? 1 : 0.2,
  ['& > div']: {
    borderRadius: '8px',
    width: '110px',
    height: '69px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '5px',
    color: 'white',
  },
  ['& div:nth-of-type(1)']: {
    background: '#A82822',
  },
  ['& div:nth-of-type(2)']: {
    background: '#3D86A6',
  },
  ['& div:nth-of-type(3)']: {
    background: '#3DA65A',
  },
  ['& div:nth-of-type(4)']: {
    background: '#3DA65A',
  },
}));

const StyledCommunityCard = styled(Box)`
  left: 50%;
  z-index: 10000;
  transform: translateX(-50%);
  top: 200px;
  max-width: 180px;
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
`;

const TurnButton = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 11px;

  width: 110px;
  height: 31px;

  border: 1px solid #67dd6c;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;

  margin-left: 232px;
  margin-top: -30px;
  zindex: 10;
  position: absolute;
`;

const Dot = styled(Box)`
  margin-top: 0px;
  background: #00ff0a;
  box-shadow: 0px 0px 4px rgba(4, 235, 68, 0.5);
  border-radius: 50%;
  width: 7px;
  height: 7px;
`;

const positionx = [
  'calc(50% - 36px)',
  'calc(50% - 160px)',
  'calc(50% - 160px)',
  'calc(50% - 36px)',
  'calc(50% + 90px)',
  'calc(50% + 90px)',
];
const positiony = ['460px', '330px', '140px', '0px', '140px', '330px'];
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
      state.socket.leave();
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
    <Body>
      {!!state.waitTime && (
        <Typography
          variant="h1"
          component="h2"
          ml={6}
          mt={3}
          position="absolute"
        >
          {state.waitTime}
        </Typography>
      )}
      <TableCard ref={tablecard} />
      <StyledCommunityCard display="flex" position="absolute">
        {get(state, 'tableData.community', []).map(
          (card: any, index: number) => {
            return (
              <Box
                key={`card_${index}`}
                mr={0.5}
                ml={0.5}
                mt={1}
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
                }}
              >
                <Card type={card.suit} number={card.rank} />
              </Box>
            );
          }
        )}
      </StyledCommunityCard>
      <Table />
      <Typography variant="h4" component="h5" ml={6}>
        Pot: {state.tableData?.pot || 0}
      </Typography>

      <Links>
        <ButtonRefresh />

        <BlackEllipse
          right="40px"
          onClick={() => setIsLeaderBoard(!isleaderboard)}
        >
          <MdOutlineLeaderboard />
        </BlackEllipse>
      </Links>

      {positionx.map((data, i) => {
        const userId = (i + 6 + userPosition) % 6;
        return (
          <Character
            key={300 + userId}
            image={image[userId]}
            left={positionx[(i + 6 - currentPlayer) % 6]}
            top={positiony[(i + 6 - currentPlayer) % 6]}
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

      <Box display="flex" justifyContent="center">
        <Box pt="575px" px="20px" width="374px">
          {!isWon &&
            players[activePlayer] &&
            (activePlayer === currentPlayer ? (
              <TurnButton>
                <Box style={{ marginTop: '2px' }} color="white" fontSize="11px">
                  Your Turn
                </Box>
                <Dot />
              </TurnButton>
            ) : (
              <TurnButton>
                <Box style={{ marginTop: '2px' }} color="white" fontSize="11px">
                  {`${players[activePlayer]?.name}'s Turn`}
                </Box>
              </TurnButton>
            ))}
          {isWon && (
            <TurnButton>
              <Box
                style={{ marginTop: '2px' }}
                color="white"
                fontSize="11px"
                mr="5px"
              >
                {`${players[winnerIndex]?.name} wins`}
              </Box>
            </TurnButton>
          )}
        </Box>
      </Box>

      {activePlayer === currentPlayer ? (
        <Box display="flex" justifyContent="center">
          <ActionButtonGroup turn={turn === -1 ? 1 : 0}>
            <Button
              variant="contained"
              component="div"
              onClick={() => turn !== -1 && onFold()}
            >
              Fold
            </Button>
            {canCall() ? (
              <Button
                variant="contained"
                component="div"
                disabled={!canCall()}
                onClick={() => turn !== -1 && onCall()}
              >
                Call
              </Button>
            ) : (
              <Button
                variant="contained"
                component="div"
                onClick={() => turn !== -1 && onCheck()}
              >
                Check
              </Button>
            )}
            {canRaise(getMinRaise()) ? (
              <Button
                variant="contained"
                component="div"
                onClick={() => turn !== -1 && setRaiseShow(true)}
              >
                Raise
              </Button>
            ) : canBet(forcedBets.bigBlind) ? (
              <Button
                variant="contained"
                component="div"
                onClick={() => turn !== -1 && onBet()}
              >
                Bet
              </Button>
            ) : (
              <Button
                variant="contained"
                component="div"
                onClick={() => turn !== -1 && onBet()}
              >
                Bet
              </Button>
            )}
          </ActionButtonGroup>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <ActionButtonGroup turn={turn === -1 ? 1 : 0}>
            <Button
              disabled
              variant="contained"
              component="div"
              onClick={() => turn !== -1 && onFold()}
            >
              Fold
            </Button>
            <Button
              disabled
              variant="contained"
              component="div"
              onClick={() => turn !== -1 && onCheck()}
            >
              Check
            </Button>
            <Button
              disabled
              variant="contained"
              component="div"
              onClick={() => turn !== -1 && onBet()}
            >
              Bet
            </Button>
          </ActionButtonGroup>
        </Box>
      )}

      <Box
        display="flex"
        justifyContent="center"
        onClick={() => setIsSetting(!issetting)}
        mb="15px"
      >
        <Progress>
          <Box>See the river 15 times</Box>
          <ProgressBar type={0} percent={7 / 15} text="7/15" width="74px" />
        </Progress>
        <Progress>
          <Box>Win the hand X times</Box>
          <ProgressBar type={1} percent={1 / 8} text="1/8" width="74px" />
        </Progress>
        <Progress>
          <Box>Get a three of a kind X times</Box>
          <ProgressBar type={2} percent={3 / 4} text="3/4" width="74px" />
        </Progress>
      </Box>
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
        <Box position="absolute" left="calc(50% - 90px)" top="570px">
          <Image
            src="/images/200ice.svg"
            alt="200ice"
            width={176}
            height={111}
          />
        </Box>
      )}
      {win[0] && (
        <Box
          position="absolute"
          left="calc(50% - 43px)"
          top="450px"
          zIndex={19}
        >
          <Image
            src="/images/fullhouse.svg"
            alt="fullhouse"
            width={84}
            height={35}
          />
        </Box>
      )}
    </Body>
  );
};

export default PokerGame;
