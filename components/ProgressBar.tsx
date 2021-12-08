import { Box } from "@mui/material"
import { styled, createTheme, ThemeProvider } from '@mui/system';

interface Props {
    type: number,
    percent: number,
    text: string,
}


const ProgressBarBack = styled(Box)`
margin-top : 5px;
    border-radius : 24px;
    background : #000000E5;
    width : 77px;
    height : 20px;
`
const Progress = styled(Box)`
    height : 20px;
    box-shadow: inset 0px -4px 8px rgba(255, 255, 255, 0.05);
    border-radius: 24px;
`;

const ProgressBar: React.FC<Props> = ({ type, percent, text }) => {
    const backgrounds = ["radial-gradient(227.45% 196.14% at 21.78% -82.5%, #FF8FD9 0%, #865DFF 56.25%, #4021FF 94.65%)",
        "radial-gradient(195.01% 168.18% at 22.02% -54.55%, #93F8FF 0%, #5882FF 62.16%, #2144FF 94.65%)",
        "radial-gradient(166.55% 143.64% at 22.09% -30%, #C6FFEA 0%, #5CDAEA 56.25%, #21AFFF 94.65%)"];
    return (
        <ProgressBarBack position="relative">
            <Progress width={percent} style={{ background: backgrounds[type] }} />
            <Box position="absolute" fontSize="8px" right="5px" top="5px" color="white">{text}</Box>
        </ProgressBarBack >
    );
};

export default ProgressBar;
