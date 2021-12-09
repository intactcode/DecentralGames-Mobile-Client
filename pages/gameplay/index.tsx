import { Box, } from "@mui/material"
import { styled } from '@mui/system'
import { MdOutlineLeaderboard } from 'react-icons/md';
import { BsBoxArrowLeft } from 'react-icons/bs'
import { useEffect, useState } from "react";
import Link from 'next/link';

import Character from "../../components/Character"
import ProgressBar from "../../components/ProgressBar";
import Card from "../../components/Card";


export default function Gameplay() {
    const [turn, setTurn] = useState(0);
    const [active, setActive] = useState<boolean[]>([]);
    useEffect(() => {
        let temp = [...active];
        temp[0] = true;
        temp[5] = true;
        setActive(temp);
    }, [])

    return <Body >
        <Table />
        <Links>
            <Link href="/"><BlackEllipse left="40px"><BsBoxArrowLeft /></BlackEllipse></Link>
            <BlackEllipse right="40px"><MdOutlineLeaderboard /></BlackEllipse>
        </Links>

        <Character image="images/character.png" left="calc(50% - 36px)" top="460px" active={active[0]} user turn={turn == 0} />
        <Character image="images/character.png" left="calc(50% + 90px)" top="330px" active={active[1]} turn={turn == 1} />
        <Character image="images/character.png" left="calc(50% + 90px)" top="120px" active={active[2]} turn={turn == 2} />
        <Character image="images/character.png" left="calc(50% - 36px)" top="0px" active={active[3]} turn={turn == 3} />
        <Character image="images/character.png" left="calc(50% - 160px)" top="120px" active={active[4]} turn={turn == 4} />
        <Character image="images/character.png" left="calc(50% - 160px)" top="330px" active={active[5]} raise={300} turn={turn == 5} />

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
                <TurnButton onClick={() => {
                    setTurn((turn + 1) % 6);
                    let temp = [...active];
                    temp[(turn + 1) % 6] = true;
                    setActive(temp);
                }}
                >
                    <Box color="white" fontSize="11px" mr="5px">Your Turn</Box>
                    <Dot />
                </TurnButton>
                <ActionButtonGroup turn={turn}>
                    <Box>Fold</Box>
                    <Box>Call 300</Box>
                    <Box>Raise</Box>
                </ActionButtonGroup>
            </Box>
        </Box>

        <Box display="flex" justifyContent="center">
            <Progress>
                <Box>See the river 15 times</Box>
                <ProgressBar type={0} percent={7 / 15} text="7/15" />
            </Progress>
            <Progress>
                <Box>Win the hand X times</Box>
                <ProgressBar type={1} percent={1 / 8} text="1/8" />
            </Progress>
            <Progress>
                <Box >Get a three of a kind X times</Box>
                <ProgressBar type={2} percent={3 / 4} text="3/4" />
            </Progress>
        </Box>
    </Body >
}

const Progress = styled(Box)`
    display : flex;
    align-items : center;
    flex-direction : column;
    margin : 10px;
    >div {
        color : #FFFFFFBF;
        font-size : 8px;
    }
`


const Body = styled(Box)`
    position:relative;
    margin-top : 20px;
    font-family: 'Larsseit';
`

const Table = styled(Box)`
    background-image: url("images/Table.png");
    width : 100%;
    max-width : 374px;
    height : 568px;
    position : absolute;
    left : calc(50% - 187px);
`
const Links = styled(Box)`
    position : absolute;
    width : 340px;
    display : flex;
    justify-content : space-between;
    left : calc(50% - 170px)
`
const BlackEllipse = styled(Box)`
    cursor : pointer;
    width : 40px;
    height : 40px;
    background : #2A2A2A;
    border-radius : 50%;
    color : #616161;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 20px;
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.16));
`

type ActionButtonGroupProps = {
    turn: number;
}

const ActionButtonGroup = styled(Box)<ActionButtonGroupProps>(({ turn }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    opacity: turn === 0 ? 1 : 0.2,
    [`& >div`]: {
        borderRadius: "8px",
        width: "103px",
        height: "69px",
        cursor: "pointer",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '5px',
        color: 'white',
    },
    [`& :nth-child(1)`]: {
        background: '#A82822'
    },
    [`& :nth-child(2)`]: {
        background: '#3D86A6'
    },
    [`& :nth-child(3)`]: {
        background: '#3DA65A'
    }
})
);

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

    margin-left : calc(100% - 90px);
    zIndex : 10;
    position : relative
`

const Dot = styled(Box)`
    margin-top : 2px;
    background: #00FF0A;
    box-shadow: 0px 0px 4px rgba(4, 235, 68, 0.5);
    border-radius : 50%;
    width : 7px;
    height : 7px;
`
const CardPanel = styled(Box)`
    position : absolute;
    top : 200px;
    left : calc(50% - 80px);
`