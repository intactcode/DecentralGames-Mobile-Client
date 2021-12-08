import { Box } from "@mui/material"
import { styled, createTheme, ThemeProvider } from '@mui/system';
import Lead from 'react-icons/md';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { BsBoxArrowLeft } from 'react-icons/bs'

import Character from "../../components/Character"
import ProgressBar from "../../components/ProgressBar";
import Card from "../../components/Card";
import { useEffect, useState } from "react";

export default function gameplay() {
    const [turn, setTurn] = useState(0);
    const [active, setActive] = useState([]);
    useEffect(() => {
        let temp = [...active];
        temp[0] = true;
        temp[5] = true;
        setActive(temp);
    }, [])

    return <Box position="relative" mt="20px">
        <Table />
        <BlackEllipse left="40px" cursor="pointer"><BsBoxArrowLeft /></BlackEllipse>
        <BlackEllipse right="40px" cursor="pointer"><MdOutlineLeaderboard /></BlackEllipse>
        <Character image="images/character.png" left="calc(50% - 36px)" top="0px" active={active[3]} turn={turn == 3} />
        <Character image="images/character.png" left="calc(50% - 160px)" top="120px" active={active[4]} turn={turn == 4} />
        <Character image="images/character.png" left="calc(50% + 90px)" top="120px" active={active[2]} turn={turn == 2} />
        <Character image="images/character.png" left="calc(50% - 160px)" top="330px" active={active[5]} raise={300} turn={turn == 5} />
        <Character image="images/character.png" left="calc(50% + 90px)" top="330px" active={active[1]} turn={turn == 1} />
        <Character image="images/character.png" left="calc(50% - 36px)" top="460px" active={active[0]} user turn={turn == 0} />
        <Box position="absolute" top="200px" left="calc(50% - 80px)">
            <Box display="flex">
                <Card type="Carreau" number="A" />
                <Card type="Pique" number="J" />
                <Card type="Carreau" number="A" />
            </Box>
            <Box display="flex" pl="30px">
                <Card type="Carreau" number="A" />
                <Card type="Carreau" number="A" />
            </Box>
        </Box>
        <Box display="flex" justifyContent="center">
            <Box pt="540px" px="20px" width="374px">
                <TurnButton ml="calc(100% - 90px)" zIndex={10} position="relative" onClick={() => {
                    setTurn((turn + 1) % 5);
                    let temp = [...active];
                    temp[(turn + 1) % 5] = true;
                    setActive(temp);
                }}
                >
                    <Box color="white" fontSize="11px" mr="5px">Your Turn</Box>
                    <Dot mt="2px" />
                </TurnButton>
                <Box display="flex" justifyContent="space-between" mt="10px" style={{ opacity: turn == 0 ? 1 : 0.2 }}>
                    <ActionButton backgroundColor="#A82822">Fold</ActionButton>
                    <ActionButton backgroundColor="#3D86A6">Call 300</ActionButton>
                    <ActionButton backgroundColor="#3DA65A">Raise</ActionButton>
                </Box>
            </Box>
        </Box>

        <Box display="flex" justifyContent="center">
            <Box display="flex" alignItems="center" flexDirection="column" margin="10px">
                <Box color="#FFFFFFBF" fontSize="8px" >See the river 15 times</Box>
                <ProgressBar type={0} percent={7 / 15} text="7/15" />
            </Box>
            <Box display="flex" alignItems="center" flexDirection="column" margin="10px">
                <Box color="#FFFFFFBF" fontSize="8px" >Win the hand X times</Box>
                <ProgressBar type={1} percent={1 / 8} text="1/8" />
            </Box>
            <Box display="flex" alignItems="center" flexDirection="column" margin="10px">
                <Box color="#FFFFFFBF" fontSize="8px" >Get a three of a kind X times</Box>
                <ProgressBar type={2} percent={3 / 4} text="3/4" />
            </Box>
        </Box>
    </Box >
}

const Table = styled(Box)`
    background-image: url("images/Table.png");
    width : 100%;
    max-width : 374px;
    height : 568px;
    position : absolute;
    left : calc(50% - 187px);
`
const BlackEllipse = styled(Box)`
    width : 40px;
    height : 40px;
    background : #2A2A2A;
    border-radius : 50%;
    color : #616161;
    position : absolute;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 20px;
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.16));
`
const ActionButton = styled(Box)`
    border-radius : 8px;
    width : 103px;
    height : 69px;
    cursor : pointer;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 16px;
    font-weight : bold;
    margin : 5px;
    color :white;
`

const TurnButton = styled(Box)`
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;

    width: 84px;
    height: 31px;

    border: 1px solid #67DD6C;
    box-sizing: border-box;
    border-radius: 8px;
    cursor : pointer;
`

const Dot = styled(Box)`
    background: #00FF0A;
    box-shadow: 0px 0px 4px rgba(4, 235, 68, 0.5);
    border-radius : 50%;
    width : 7px;
    height : 7px;
`