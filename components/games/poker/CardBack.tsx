import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

interface Props {
  transform: string;
  width?: number;
  height?: number;
}

const CardBody = styled(Box)<{ width: number; height: number }>`
  background: #252525;
  border: 2.5px solid #ffffff;
  box-sizing: border-box;
  border-radius: 3.70921px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardBack: React.FC<Props> = ({ transform, width = 32, height = 47 }) => {
  return (
    <CardBody style={{ transform: transform }} width={width} height={height}>
      <Image
        src="/images/cardback.png"
        width="13px"
        height="13px"
        alt="cardback"
      />
    </CardBody>
  );
};

export default CardBack;
