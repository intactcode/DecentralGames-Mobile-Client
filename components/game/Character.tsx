import { Box } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/system';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import CardBack from './CardBack';
import Card from './Card';

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
}) => {
  const rpositionx = ['10px', '-40px', '-40px', '10px', '58px', '58px'];
  const rpositiony = ['-80px', '20px', '20px', '120px', '20px', '20px'];

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
            >
              {({ remainingTime }) => {
                if (remainingTime === 0) onFold();
              }}
            </CountdownCircleTimer>
          </SpinCircle>
        </>
      )}
      <PlayerCircle active={active}>
        <img src={image} width="60px" />
      </PlayerCircle>
      {raise && (
        <RaiseMoney left={rpositionx[index]} top={rpositiony[index]}>
          <Box fontWeight="bold" mt="-3px">
            {raise}
          </Box>
          <img src="images/freecoin.svg" width="15px" height="15px" />
        </RaiseMoney>
      )}
      <PlayerInfo active={active}>
        <Box>Guest#129</Box>
        <Box>
          <Box fontWeight="bold" color="white" mb="3px">
            4000
          </Box>
          <img src="images/freecoin.svg" width="15px" height="15px" />
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

type PlayerCircleProps = {
  active: boolean;
};

const PlayerCircle = styled(Box)<PlayerCircleProps>(({ active }) => ({
  position: 'relative',
  zIndex: 1,
  width: '72px',
  height: '72px',
  border: '6px solid #292929',
  boxSizing: 'border-box',
  borderRadius: '50%',
  backgroundColor: '#292929',
  filter: 'drop-shadow(0px 12px 12px rgba(0, 0, 0, 0.25))',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [`& >img`]: {
    opacity: active ? '1' : '0.2',
  },
}));

type PlayerInfoProps = {
  active: boolean;
};

const PlayerInfo = styled(Box)<PlayerInfoProps>(({ active }) => ({
  opacity: active ? '1' : '0.6',
  marginTop: '7px',
  [`& :nth-child(1)`]: {
    fontSize: '12px',
    color: '#FFFFFFBF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  [`& :nth-child(2)`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const RaiseMoney = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 8px 2px;
  z-index: 2;
  position: absolute;
  width: 53px;
  height: 24px;

  background: #ecfc7d;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 29px;
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
export default Character;