import { Box } from "@mui/material"
import { styled, createTheme, ThemeProvider } from '@mui/system';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import CardBack from './../components/CardBack';
import Card from './../components/Card';

interface Props {
    image: string,
    left: string,
    top: string,
    active: boolean,
    user?: any,
    raise?: any,
    turn: boolean
}

const Character: React.FC<Props> = ({ image, left, top, active, user, raise, turn }) => {
    return (
        <Box left={left} top={top} position="absolute" >
            {turn && <>
                <Gradient />
                <SpinCircle>
                    <CountdownCircleTimer
                        strokeWidth={10}
                        isPlaying
                        duration={10}
                        colors={[
                            ['#FFFFFF', 1],
                        ]}
                        size={90}
                        trailColor="transparent"
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                </SpinCircle>
            </>
            }
            <PlayerCircle active={active}>
                <img src={image} width="60px" />
            </PlayerCircle>
            {raise &&
                <RaiseMoney>
                    <Box fontWeight="bold" mt="-3px">300</Box>
                    <img src="images/freecoin.png" />
                </RaiseMoney>
            }
            <PlayerInfo active={active}>
                <Box >Guest#129</Box>
                <Box >
                    <Box fontWeight="bold" color="white">4000</Box>
                    <img src="images/freecoin.png" />
                </Box>
            </PlayerInfo>
            {active && !user && <Box display="flex" mt="-135px" ml="5px">
                <CardBack transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)" />
                <CardBack transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)" />
            </Box>}
            {active && user && <Box display="flex" mt="-160px" ml="-5px">
                <Card type="Carreau" number="A" transform="matrix(0.99, -0.14, 0.14, 0.99, 0, 0)" />
                <Card type="Carreau" number="A" transform="matrix(0.99, 0.14, -0.14, 0.99, 0, 0)" />
            </Box>}
        </Box>
    );
};


type PlayerCircleProps = {
    active: boolean;
}

const PlayerCircle = styled(Box)<PlayerCircleProps>(({ active }) => ({
    position: "relative",
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
        opacity: active ? "1" : "0.2"
    }
})
);

type PlayerInfoProps = {
    active: boolean;
}

const PlayerInfo = styled(Box)<PlayerInfoProps>(({ active }) => ({
    opacity: active ? "1" : "0.6",
    marginTop: "7px",
    [`& :nth-child(1)`]: {
        fontSize: "12px",
        color: "#FFFFFFBF",
        textAlign: "center",
        fontWeight: "bold"
    },

    [`& :nth-child(2)`]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})
);

const RaiseMoney = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 3px 8px 2px;
    z-index : 2;
    position: absolute;
    width: 53px;
    height: 24px;
    left: 58px;
    top: 20px;
    background: #ECFC7D;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
    border-radius: 29px;
`
const SpinCircle = styled(Box)`
    position : absolute;
    left : -9px;
    top : -9px;
    
`

const Gradient = styled(Box)`
    position : absolute;
    width : 72px;
    height : 72px;
    border-radius : 50%;
    box-shadow: 0px 0px 36px #FFE976;`
export default Character;
