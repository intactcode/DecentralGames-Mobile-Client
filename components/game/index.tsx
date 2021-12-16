import { Box, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Card from './Card';
import Character from './Character';
import Setting from './Setting';
import ProgressBar from '../ProgressBar';

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
  margin-top: 60px;
  font-family: 'Larsseit';
`;

const Table = styled(Box)`
  background-image: url('images/Table.png');
  width: 100%;
  max-width: 374px;
  height: 568px;
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
  ['& >div']: {
    borderRadius: '8px',
    width: '103px',
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
  ['& :nth-of-type(1)']: {
    background: '#A82822',
  },
  ['& :nth-of-type(2)']: {
    background: '#3D86A6',
  },
  ['& :nth-of-type(3)']: {
    background: '#3DA65A',
  },
}));

const TurnButton = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;

  width: 84px;
  height: 31px;

  border: 1px solid #67dd6c;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;

  margin-left: calc(100% - 90px);
  zindex: 10;
  position: relative;
`;

const Dot = styled(Box)`
  margin-top: 2px;
  background: #00ff0a;
  box-shadow: 0px 0px 4px rgba(4, 235, 68, 0.5);
  border-radius: 50%;
  width: 7px;
  height: 7px;
`;
const CardPanel = styled(Box)`
  position: absolute;
  top: 200px;
  left: calc(50% - 80px);
`;

const RaisePanel = styled(Box)`
  padding: 0px 16px 0px 16px;
  margin-top: 20px;
  background: #1f1f1f;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0px 0px;
  width: 374px;
  height: 156px;
`;

const RaiseInput = styled(Box)`
  margin-top: 16px;
  padding: 6px 6px 6px 18px;
  display: flex;
  align-items: center;
  border: 1px solid #2a2a2a;
  box-sizing: border-box;
  border-radius: 16px;
  height: 58px;
`;

const RaiseButton = styled(Box)`
  background: #3da65a;
  color: white;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 46px;
  cursor: pointer;
`;

const RaiseAction = styled(Box)`
  > div {
    background: #2a2a2a;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 80px;
    height: 48px;
  }
  margin-top: 12px;
  color: white;
  fontweight: bold;
  display: flex;
  justify-content: space-between;
`;

export default function Gameplay() {
  const [turn, setTurn] = useState(0);
  const [active, setActive] = useState<boolean[]>([]);
  const [raiseamount, setRaiseAmount] = useState(600);
  const [raiseshow, setRaiseShow] = useState(false);
  const [raise, setRaise] = useState<number[]>([]);
  const [issetting, setIsSetting] = useState(false);
  const [iceamount, setIceAmount] = useState(22000); // eslint-disable-line
  const [xpamount, setXPAmount] = useState(22); // eslint-disable-line
  const [dgamount, setDGAmount] = useState(0.01); // eslint-disable-line

  useEffect(() => {
    let temp = [...active];
    for (let i = 0; i < 6; i++) temp[i] = true;
    setActive(temp);
  }, [active]);

  const setNextTurn = () => {
    let temp = (turn + 1) % 6;
    while (active[temp] === false && temp !== turn) temp = (temp + 1) % 6;
    if (temp === turn) setTurn(-1);
    else setTurn(temp);
  };
  const onFold = () => {
    let tempactive = [...active];
    tempactive[turn] = false;
    setActive(tempactive);
    setNextTurn();
  };

  const onRaise = () => {
    if (raiseamount == 0) {
      alert('Input correct amount');
      return;
    }
    let temp = [...raise];
    temp[turn] = raiseamount;
    setRaise(temp);
    setNextTurn();
    setRaiseShow(false);
  };

  const onCall = () => {
    let temp = [...raise];
    temp[turn] = 300;
    setRaise(temp);
    setNextTurn();
  };

  const onReset = () => {
    let temp = [...active];
    for (let i = 0; i < 6; i++) temp[i] = true;
    setActive(temp);
    setRaise([]);
    setTurn(0);
  };
  const positionx = [
    'calc(50% - 36px)',
    'calc(50% + 90px)',
    'calc(50% + 90px)',
    'calc(50% - 36px)',
    'calc(50% - 160px)',
    'calc(50% - 160px)',
  ];
  const positiony = ['460px', '330px', '140px', '0px', '140px', '330px'];
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

  return (
    <Body>
      <Table />
      <Links>
        <Link href="/" passHref={true}>
          <BlackEllipse left="40px">
            <BsBoxArrowLeft />
          </BlackEllipse>
        </Link>
        <BlackEllipse right="40px" onClick={() => onReset()}>
          <MdOutlineLeaderboard />
        </BlackEllipse>
      </Links>
      {positionx.map((data, i) => {
        return (
          <Character
            key={data}
            image="/images/character.png"
            left={positionx[i]}
            top={positiony[i]}
            active={active[i]}
            user={i === 0}
            turn={turn == i}
            index={i}
            raise={raise[i]}
            onFold={onFold}
            items={items[i]}
            ice={iceamount}
            xp={xpamount}
            dg={dgamount}
          />
        );
      })}
      <CardPanel>
        <Box display="flex">
          <Card type="Carreau" number="A" />
          <Card type="Pique" number="J" />
          <Card type="Carreau" number="A" />
        </Box>
        <Box display="flex" pl="30px">
          <Card type="Carreau" number="A" />
          <Card type="Carreau" number="A" />
        </Box>
      </CardPanel>

      <Box display="flex" justifyContent="center">
        <Box pt="540px" px="20px" width="374px">
          <TurnButton>
            <Box color="white" fontSize="11px" mr="5px">
              Your Turn
            </Box>
            <Dot />
          </TurnButton>
        </Box>
      </Box>

      {raiseshow ? (
        <Box display="flex" justifyContent="center">
          <RaisePanel>
            <RaiseInput>
              <Box color="#FFFFFF80" width="85px" fontWeight="bold" mr="5px">
                Your Bet:
              </Box>
              <TextField
                className="raise"
                inputProps={{
                  style: {
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '30px',
                    width: '100px',
                  },
                }}
                variant="standard"
                type="number"
                value={raiseamount}
                onChange={(event) => setRaiseAmount(Number(event.target.value))}
              />
              <Image src="/images/freecoin.svg" alt="free-coin" />
              <RaiseButton ml="10px" onClick={() => onRaise()}>
                Raise
              </RaiseButton>
            </RaiseInput>
            <RaiseAction>
              <Box>1/2</Box>
              <Box>3/4</Box>
              <Box>Pot</Box>
              <Box>Max</Box>
            </RaiseAction>
          </RaisePanel>
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="center">
            <ActionButtonGroup turn={turn === -1 ? 1 : 0}>
              <Box onClick={() => turn !== -1 && onFold()}>Fold</Box>
              <Box onClick={() => onCall()}>Call 300</Box>
              <Box onClick={() => setRaiseShow(true)}>Raise</Box>
            </ActionButtonGroup>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            onClick={() => setIsSetting(!issetting)}
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
          {issetting && <Setting />}
        </>
      )}
    </Body>
  );
}
