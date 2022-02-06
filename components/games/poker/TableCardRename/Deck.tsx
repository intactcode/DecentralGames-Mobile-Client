import { FC, useState, useEffect } from 'react';
import CardContainer from './CardContainer';

const stack = (i: any) => ({
  x: 0.1 * i,
  y: 0.1 * i,
  z: i,
});

const suits = ['d', 'c', 'h', 's'];
const ranks = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

const getInitialDeck = () =>
  ranks
    .map((r) => suits.map((s) => ({ rank: r, suit: s })))
    .reduce((prev, curr) => prev.concat(curr));

export interface DeckContainerProps {
  size: number;
  flipOnHover?: boolean;
  boardYoffset: number;
  boardXoffset: number;
  board: Array<string>;
}

const DeckContainer: FC<DeckContainerProps> = ({
  size = 200,
  flipOnHover = true,
  boardYoffset = 300,
  boardXoffset = 475,
  board: pBoard,
}) => {
  const [board, setBoard] = useState<Array<string>>([]);

  useEffect(() => {
    setBoard(pBoard);
  }, [pBoard]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      {getInitialDeck().map((card, i) => {
        return (
          <div
            style={{
              display: board.includes(card.rank + card.suit) ? '' : 'none',
            }}
            key={card.rank + card.suit}
          >
            <CardContainer
              index={i}
              board={board}
              card={card}
              faceDown={true}
              size={size}
              boardXoffset={boardXoffset} // board x offset relative to stack
              boardYoffset={boardYoffset} // board y offset relative to stack
              mapXYZ={stack}
              flipOnHover={flipOnHover}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DeckContainer;
