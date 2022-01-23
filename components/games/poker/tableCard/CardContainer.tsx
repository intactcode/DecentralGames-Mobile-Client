import { FC, useState, useEffect, memo } from 'react';
import { Motion, spring } from 'react-motion';
import { usePrevious } from '../../../../store/Hooks';
import styles from './Card.module.css';
import Card from './Card';

export interface CardContainerProps {
  index: any;
  size: any;
  card: any;
  boardXoffset: number;
  boardYoffset: number;
  flipOnHover: boolean;
  board: Array<string>;
  doubleBacked?: boolean;
  faceDown: any;
  mapXYZ: any;
}

const dealBoard = (
  value: string,
  board: Array<string>,
  card: any,
  size: number,
  boardX: number,
  boardY: number
) => {
  return () => ({
    x:
      board.indexOf(card.rank + card.suit) > 2
        ? boardX + size * board.indexOf(value) - 150
        : boardX + size * board.indexOf(value),
    y: board.indexOf(card.rank + card.suit) > 2 ? boardY + 80 : boardY,
    z: 0,
  });
};

const getStyle = (
  x: number,
  y: number,
  width: number,
  height: number,
  zIndex: number
) => ({
  WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
  transform: `translate3d(${x}px,${y}px, 0)  rotate(${0}deg)`,
  position: 'absolute' as 'absolute',
  width: `${width}px`,
  height: `${height}px`,
  zIndex: `${zIndex}`,
});

const springConfig = {
  stiffness: 340,
  damping: 88,
  precision: 0.0001,
};

const getSprings = (x: any, y: any) => ({
  x: spring(x, springConfig),
  y: spring(y, springConfig),
});

const isNewBoardCard = (
  currBoard: Array<string>,
  nextBoard: Array<string>,
  card: string
) => {
  const noNewItems = nextBoard?.length - currBoard?.length;
  const newIndexes = nextBoard.length - noNewItems;
  const cardIndex = nextBoard.indexOf(card);

  if (cardIndex >= newIndexes) {
    return true;
  }
  return false;
};

const CardContainer: FC<CardContainerProps> = ({
  index,
  size,
  card,
  boardXoffset,
  boardYoffset,
  flipOnHover,
  board,
  doubleBacked,
  faceDown,
  mapXYZ,
}) => {
  const width = (size / 63) * 45;
  const height = size;
  const cardValue = card.rank + card.suit;
  let nMapXYZ = mapXYZ;
  if (board.includes(cardValue) === true) {
    nMapXYZ = dealBoard(
      cardValue,
      board,
      card,
      size,
      boardXoffset,
      boardYoffset
    );
  }
  const [rotationY, setRotationY] = useState<any>(0);
  const [boardCard, setBoardCard] = useState<boolean>(false);
  const [zIndex, setZIndex] = useState<number>(1);
  const { x, y } = nMapXYZ(index, card); // coords to interpolate to
  const sprungRange = getSprings(x, y);

  if (boardCard) {
    doubleBacked = false;
  }

  const flipCard = () => {
    const currentDegrees = rotationY;
    const nextDegrees = currentDegrees === 0 ? 180 : 0;
    setRotationY(nextDegrees);
  };

  const currentBoard = usePrevious(board);

  useEffect(() => {
    const nextBoard = board;
    const currBoard = currentBoard;
    const newCard = card.rank + card.suit;
    const isBoardCard = isNewBoardCard(currBoard, nextBoard, newCard);

    if (isBoardCard) {
      const flipDelayScale = 1 / (1 + nextBoard.indexOf(card)) / 10 + 1; // delay based on distance to travel to board
      setTimeout(() => flipCard(), 500 * flipDelayScale);
    }

    if (nextBoard?.length === 0 && currBoard?.includes(card)) {
      flipCard();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  useEffect(() => {
    const cardValue = card.rank + card.suit;
    const boardIndex = board.indexOf(cardValue);
    setBoardCard(boardIndex !== -1);
    setZIndex(boardIndex === -1 ? 1 : boardIndex + 1);
  }, [board, card]);

  return (
    <div
      onMouseEnter={
        flipOnHover
          ? () => (board.includes(cardValue) ? flipCard() : undefined)
          : undefined
      }
      onMouseLeave={
        flipOnHover
          ? () => (board.includes(cardValue) ? flipCard() : undefined)
          : undefined
      }
    >
      <Motion defaultStyle={{ x: 0, y: 0 }} style={sprungRange}>
        {(
          { x, y } // interpolated x, y values
        ) => (
          <div
            style={getStyle(x, y, width, height, zIndex)}
            className={styles.container}
          >
            <Card
              size={size}
              index={index}
              card={cardValue.toUpperCase()}
              faceDown={faceDown}
              doubleBacked={doubleBacked}
              rotationY={rotationY}
              type={board.indexOf(card.rank + card.suit)}
            />
          </div>
        )}
      </Motion>
    </div>
  );
};

export default memo(CardContainer, (props, nextProps) => {
  const nextBoard = nextProps.board;
  const currBoard = props.board;
  const card = props.card.rank + props.card.suit;
  const isBoardCard = isNewBoardCard(currBoard, nextBoard, card);
  if (!isBoardCard && (nextBoard.length !== 0 || !currBoard.includes(card))) {
    return true;
  } else {
    return false;
  }
});
