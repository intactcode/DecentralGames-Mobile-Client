import { Box } from "@mui/material"
import { styled, createTheme, ThemeProvider } from '@mui/system';

interface Props {
    type: string,
    number: string,
    transform: string,
}


const CardBody = styled(Box)`
    background: #F2F2F2;
    border: 0.159898px solid #D2D2D2;
    box-sizing: border-box;
    /* Card Shadow */
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    width : 45px;
    height : 63px;
    display : flex;
    justify-content : center;
    flex-direction : column;
    align-items : center;
`


const ProgressBar: React.FC<Props> = ({ type, number, transform }) => {
    return (
        <CardBody style={{ transform: transform, margin: !transform && "5px" }}>
            <Box fontSize="28px" color={type == 'Carreau' ? "red" : "black"} fontWeight="bold">{number}</Box>
            <img src={`images/${type}.png`} width="19px" />
        </CardBody>
    );
};

export default ProgressBar;
