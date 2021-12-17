import { Box } from '@mui/material';
import { styled } from '@mui/system';
import ProgressBar from '../ProgressBar';

interface Props {}

const BottomSetting = styled(Box)`
  display: flex;
  justify-content: space-between;
  > div {
    font-size: 11px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: rgb(255, 255, 255, 0.75);
    align-items: center;
  }
`;

interface ItemFieldProps {
  type?: number;
}

const ItemField = styled(Box)<ItemFieldProps>(({ type }) => ({
  background: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '800',
  flexDirection: type === 0 ? 'column' : 'row',
  fontSize: type === 0 ? '8px' : '12px',
  fontStyle: type === 0 ? 'italic' : 'unset',
  lineHeight: '15px',
  color: 'white',
  width: type === 0 ? '40px' : type === 1 ? '116px' : '90px',
  height: type === 0 ? '40px' : type === 1 ? '100px' : '36px',
}));

const SettingField = styled(Box)`
  background: #1f1f1f;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0px 0px;
  padding: 24px;
  width: 374px;
  :nth-of-type(1) {
    font-weight: 800;
    font-size: 24px;
    line-height: 33px;
    color: white;
  }
`;
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

const Setting: React.FC<Props> = ({}) => {
  return (
    <Box display="flex" justifyContent="center">
      <SettingField>
        <Box>Daily ICE Challenges & Tournament Info</Box>
        <Box display="flex" justifyContent="space-between">
          <Progress justifyContent="none!important">
            <Box>See the flop 15 times</Box>
            <ProgressBar
              type={0}
              percent={7 / 15}
              text="7 of 15"
              width="179px"
            />
          </Progress>
          <Box mt="15px" display="flex">
            <ItemField type={0}>
              <Box mt="-5px">200</Box>
              <img src="/images/diamond.svg" />
            </ItemField>
            <ItemField ml="10px" type={0}>
              <Box mt="-5px">1</Box>
              <img src="/images/xp.svg" />
            </ItemField>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Progress justifyContent="none!important">
            <Box>Win a hand 5 times</Box>
            <ProgressBar type={1} percent={0 / 5} text="0 of 5" width="179px" />
          </Progress>
          <Box mt="15px" display="flex">
            <ItemField type={0}>
              <Box mt="-5px">750</Box>
              <img src="/images/diamond.svg" />
            </ItemField>
            <ItemField ml="10px" type={0}>
              <Box mt="-5px">2</Box>
              <img src="/images/xp.svg" />
            </ItemField>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Progress justifyContent="none!important">
            <Box>Get a 3 of a kind 2 times</Box>
            <ProgressBar type={2} percent={0 / 2} text="0 of 2" width="179px" />
          </Progress>
          <Box mt="15px" display="flex">
            <ItemField type={0}>
              <Box mt="-5px">1000</Box>
              <img src="/images/diamond.svg" />
            </ItemField>
            <ItemField ml="10px" type={0}>
              <Box mt="-5px">3</Box>
              <img src="/images/xp.svg" />
            </ItemField>
          </Box>
        </Box>

        <BottomSetting>
          <Box>
            <Box> Expected ICE Earned</Box>
            <ItemField type={1}>
              <Box>- -&nbsp;&nbsp;</Box>
              <Box mt="5px">
                <img src="/images/diamond.svg" width="18px" height="18px" />
              </Box>
            </ItemField>
          </Box>
          <Box>
            <Box> Net Chips</Box>
            <ItemField type={2}>
              <Box>+0</Box>
              <Box mt="5px">
                <img src="/images/freecoin.svg" width="18px" height="18px" />
              </Box>
            </ItemField>
            <Box>ICE Multiplier</Box>
            <ItemField type={2}>
              <Box>1.45x</Box>
            </ItemField>
          </Box>
          <Box>
            <Box> Percentile</Box>
            <ItemField type={2}>
              <Box>Top 10%</Box>
            </ItemField>
            <Box> Next Tier</Box>
            <ItemField type={2}>
              <Box>+4,291</Box>
              <Box mt="5px">
                <img src="/images/freecoin.svg" width="18px" height="18px" />
              </Box>
            </ItemField>
          </Box>
        </BottomSetting>
      </SettingField>
    </Box>
  );
};

export default Setting;
