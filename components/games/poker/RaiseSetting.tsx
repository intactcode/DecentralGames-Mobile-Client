import { Box, TextField } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

const CloseIcon = styled(Box)<{ open: boolean }>`
  top: 6px;
  left: 15px;
  position: absolute;
  background: #1f1f1f;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.24);
  border-radius: 24px;
  width: 48px;
  height: 48px;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 20;
`;

const RaiseField = styled(Box)<{ open: boolean }>`
  display: flex;
  justify-content: center;
  position: absolute;
  margin-top: -72px;
  max-height: ${({ open }) => (open ? '400px' : '0px')};
  transition: max-height 0.5s;
  overflow: hidden;
  z-index: 20;
`;

const RaisePanel = styled(Box)`
  padding: 0px 16px;
  margin-top: 60px;
  background: #1f1f1f;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0px 0px;
  width: 100vw;
  height: 156px;
`;

const RaiseInput = styled(Box)`
  margin-top: 16px;
  padding: 6px 6px 6px 18px;
  justify-content: space-between;
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
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 46px;
  cursor: pointer;
  z-index: 1;
  margin-bottom: 2px;
`;

const RaiseButtonBack = styled(Box)`
  background: #2b8c46;
  color: white;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 46px;
  cursor: pointer;
  margin-left: -90px;
  margin-top: 2px;
  z-index: 0;
`;

const RaiseAction = styled(Box)`
  > div {
    background: #2a2a2a;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: calc(25% - 4px);
    height: 48px;
  }
  margin-top: 12px;
  color: white;
  fontweight: bold;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  open: boolean;
  setOpen: any;
  setRaiseAmount: any;
  raiseamount: number;
  onRaise: any;
}

const RaiseSetting: React.FC<Props> = ({
  open,
  setOpen,
  raiseamount,
  setRaiseAmount,
  onRaise,
}) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  return (
    <div>
      {!keyboardOpen ? (
        <RaiseField open={open} style={{ bottom: '0px' }}>
          <RaisePanel>
            <CloseIcon
              onClick={() => {
                setOpen(false);
                setKeyboardOpen(false);
              }}
              open={open}
            >
              <FaChevronDown fontSize="20px" />
            </CloseIcon>
            <RaiseInput>
              <Box
                color="#FFFFFF80"
                width="85px"
                fontWeight="bold"
                mr="5px"
                mt="5px"
              >
                Your Bet:
              </Box>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginTop: '6px',
                }}
              >
                <TextField
                  className="raise"
                  inputProps={{
                    style: {
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '30px',
                      width: '90px',
                      fontWeight: 'Bold',
                      marginTop: '-6px',
                    },
                    inputMode: 'numeric',
                  }}
                  variant="standard"
                  type="number"
                  value={raiseamount}
                  onChange={(event) => {
                    setRaiseAmount(Number(event.target.value));
                  }}
                  onClick={() => setKeyboardOpen(true)}
                />
                <Image
                  src="/images/freecoin.svg"
                  alt="freecoin"
                  width={44}
                  height={44}
                />
              </span>
              <span style={{ display: 'flex' }}>
                <RaiseButton
                  onClick={() => {
                    onRaise();
                    setOpen(false);
                    setKeyboardOpen(false);
                  }}
                >
                  Raise
                </RaiseButton>
                <RaiseButtonBack />
              </span>
            </RaiseInput>
            <RaiseAction>
              <Box>1/2</Box>
              <Box>3/4</Box>
              <Box>Pot</Box>
              <Box>Max</Box>
            </RaiseAction>
          </RaisePanel>
        </RaiseField>
      ) : (
        <RaiseField open={open} style={{ bottom: '0px' }}>
          <RaisePanel>
            <CloseIcon
              onClick={() => {
                setOpen(false);
                setKeyboardOpen(false);
              }}
              open={open}
            >
              <FaChevronDown fontSize="20px" />
            </CloseIcon>
            <RaiseInput>
              <Box
                color="#FFFFFF80"
                width="85px"
                fontWeight="bold"
                mr="5px"
                mt="5px"
              >
                Your Bet:
              </Box>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginTop: '6px',
                }}
              >
                <TextField
                  className="raise"
                  inputProps={{
                    style: {
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '30px',
                      width: '90px',
                      fontWeight: 'Bold',
                      marginTop: '-6px',
                    },
                    inputMode: 'numeric',
                  }}
                  variant="standard"
                  type="number"
                  value={raiseamount}
                  onChange={(event) => {
                    setRaiseAmount(Number(event.target.value));
                  }}
                  onClick={() => setKeyboardOpen(true)}
                />
                <Image
                  src="/images/freecoin.svg"
                  alt="freecoin"
                  width={44}
                  height={44}
                />
              </span>
              <span style={{ display: 'flex' }}>
                <RaiseButton
                  onClick={() => {
                    onRaise();
                    setOpen(false);
                    setKeyboardOpen(false);
                  }}
                >
                  Raise
                </RaiseButton>
                <RaiseButtonBack />
              </span>
            </RaiseInput>
            <RaiseAction>
              <Box>1/2</Box>
              <Box>3/4</Box>
              <Box>Pot</Box>
              <Box>Max</Box>
            </RaiseAction>
          </RaisePanel>
        </RaiseField>
      )}
    </div>
  );
};

export default RaiseSetting;
