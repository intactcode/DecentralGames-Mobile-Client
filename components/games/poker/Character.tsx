import { Box } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/system';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Image from 'next/image';
import CardBack from './CardBack';
import Card from './Card';
import InfoDialog from './InfoDialog';
import UserInfoDialog from './UserInfoDialog';


type PlayerCircleProps = {
  active: boolean;
};

const PlayerCircle = styled(Box)<PlayerCircleProps>(({ active }) => ({
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,
  width: '72px',
  height: '72px',
  border: '6px solid #292929',
  boxSizing: 'border-box',
  borderRadius: '50%',
  backgroundColor: '#292929',
  boxShadow: '0px 12px 12px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [' > span > img']: {
    opacity: active ? '1' : '0.2',
  },
}));

type PlayerInfoProps = {
  active: boolean;
};

const PlayerInfo = styled(Box)<PlayerInfoProps>(({ active }) => ({
  opacity: active ? '1' : '0.6',
  marginTop: '8px',
  ['& :nth-of-type(1)']: {
    color: '#FFFFFFBF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  ['& :nth-of-type(2)']: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const RaiseMoney = styled(Box)`
  display: flex;
  padding: 3px 0px 0px 6px;
  z-index: 2;
  position: absolute;
  width: 53px;
  height: 24px;
  background: #ecfc7d;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 29px;
`;

const RaiseAmount = styled(Box)`
  margin-top: 3px !important;
`;

const SpinCircle = styled(Box)`
  position: absolute;
  left: -9px;
  top: -9px;
`;

const Gradient = styled(Box)`
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  box-shadow: 0px 0px 36px #ffe976;
`;

const ChipImage = styled(Image)`
  margin-top: -1px !important;
`;

interface Props {
  image: string;
  left: string;
  top: string;
  active: boolean;
  user?: any;
  raise?: any;
  turn: boolean;
  index: number;
  onFold: any;
  items: any;
  ice?: number;
  xp?: number;
  dg?: number;
  data?: any;
}

const Character: React.FC<Props> = ({
  image,
  left,
  top,
  active,
  user,
  raise,
  turn,
  index,
  onFold,
  items,
  ice,
  xp,
  dg,
  data,
}) => {
  const rpositionx = ['10px', '-40px', '-40px', '10px', '58px', '58px'];
  const rpositiony = ['-80px', '20px', '20px', '120px', '20px', '20px'];

  const dealerx = ['-23px', '-20px', '-20px', '75px', '70px', '70px'];
  const dealery = ['-5px', '60px', '-20px', '60px', '-20px', '60px'];

  const [infomodalopen, setInfoModalOpen] = useState(false);

  return (
    <Box left={left} top={top} position="absolute">
      {turn && (
        <>
          <Gradient />
          <SpinCircle>
            <CountdownCircleTimer
              strokeWidth={10}
              isPlaying
              duration={10}
              colors={[['#FFFFFF', 1]]}
              size={90}
              trailColor="transparent"
              onComplete={() => {
                onFold();
              }}
            />
          </SpinCircle>
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
      <PlayerCircle
        active={active}
        onClick={() => setInfoModalOpen(!infomodalopen)}
      >
        <Image
          src={`/${image}`}
          width="60px"
          height="60px"
          alt="player-circle"
        />
      </PlayerCircle>
      {raise && (
        <RaiseMoney left={rpositionx[index]} top={rpositiony[index]}>
          <RaiseAmount fontWeight="bold" mt="-3px" color="black">
            {raise}
          </RaiseAmount>
          <Image
            src="/images/freecoin.svg"
            width="18px"
            height="18px"
            alt="freecoin"
          />
        </RaiseMoney>
      )}
      <Box position="relative" left={dealerx[index]} top={dealery[index]}>
        <Image src="/images/DealerChip.svg" layout="fill" alt="dealer-chip" />
      </Box>
      <PlayerInfo active={active}>
        <Box> {data?.name || 'Guest'} </Box>
        <Box fontSize="14px">
          <Box style={{ paddingTop: '2px' }} fontWeight="bold" color="white" mb="2px">
            4000
          </Box>
          <ChipImage
            src="/images/freecoin.svg"
            width="15px"
            height="15px"
            className="chip"
          />
        </Box>
      </PlayerInfo>
      {active && !user && (
        <Box display="flex" mt="-135px" ml="5px">
          <CardBack transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)" />
          <CardBack transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)" />
        </Box>
      )}
      {active && user && (
        <Box display="flex" mt="-160px" ml="-5px">
          <Card
            type="Carreau"
            number="A"
            transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)"
          />
          <Card
            type="Carreau"
            number="A"
            transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)"
          />
        </Box>
      )}
    </Box>
  );
};

export default Character;
