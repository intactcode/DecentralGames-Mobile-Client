import { FC, useState } from 'react';

import Deck from './Deck';

const range = (start: any, count: any) =>
  Array.apply(0, Array(count)).map((element, index) => {
    return index + start;
  });

function shuffle(array: any) {
  const copy = [];
  let n = array.length;
  let i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}

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

const getDeck = () =>
  shuffle(
    ranks
      .map((r) => suits.map((s) => r + s))
      .reduce((prev, curr) => prev.concat(curr))
  );

export interface TableCardProps {}

const TableCard: FC<TableCardProps> = () => {
  const [board, setBoard] = useState<any>([]);
  const [deck, setDeck] = useState<Array<string>>([]);

  const newRound = () => {
    const newDeck = getDeck();
    setBoard([]);
    setDeck(newDeck);
  };

  const dealFlop = () => {
    const flop = range(0, 3).map(() => deck.pop());
    setBoard(flop);
    setDeck(deck);
  };

  const dealCard = () => {
    const card = deck.pop();
    setDeck(deck);
    setBoard(board.concat(card));
  };

  //eslint-disable-next-line
  const progressDeal = () => {
    if (board.length === 0) {
      dealFlop();
      return;
    }

    if (board.length === 5) {
      newRound();
    } else {
      dealCard();
    }
  };

  return (
    <div style={{ left: 'calc(50% - 32px)', top: '0', position: 'absolute' }}>
      <Deck board={board} boardXoffset={-50} boardYoffset={200} size={63} />
    </div>
  );
};

export default TableCard;
