import { Box } from "@mui/material"
import { styled, createTheme, ThemeProvider } from '@mui/system';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import CardBack from './../components/CardBack';
import Card from './../components/Card';

interface Props {
    image: string,
    left: number,
    top: number,
    active: boolean,
    user: boolean,
    raise: number,
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
            <PlayerCircle position="relative" zIndex={1}>
                <img src={image} width="60px" style={{ opacity: active ? "1" : "0.2" }} />
            </PlayerCircle>
            {raise && <RaiseMoney>
                <Box fontWeight="bold">300</Box>
                <img src="images/freecoin.png" />
            </RaiseMoney>}
            <Box style={{ opacity: active ? "1" : "0.6" }} mt="7px">
                <Box sx={{ fontSize: "12px", color: "#FFFFFFBF", textAlign: "center", fontWeight: "bold" }}>Guest#129</Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box fontWeight="bold" color="white">4000</Box>
                    <img src="images/freecoin.png" />
                </Box>
            </Box>
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

const PlayerCircle = styled(Box)`
    width : 72px;
    height : 72px;
    border: 6px solid #292929;
    box-sizing: border-box;
    border-radius : 50%;
    background-color : #292929;
    filter: drop-shadow(0px 12px 12px rgba(0, 0, 0, 0.25));
    display : flex;
    justify-content : center;
    align-items : center;
    overflow : hidden;
`
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
