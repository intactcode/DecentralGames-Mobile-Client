import React, { PureComponent } from 'react';
import CardContainer from './CardContainer';





const stack = i => ({
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
    .map(r => suits.map(s => ({ rank: r, suit: s })))
    .reduce((prev, curr) => prev.concat(curr));

class DeckContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { board: [], deck: [] };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.board) {
      this.setState({ board: nextProps.board });
    }
  }

  render() {
    const { board } = this.state;
    const { size, flipOnHover, boardYoffset, boardXoffset } = this.props;

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        {getInitialDeck().map((card, i) => {
          return (
            <div
              style={{ display: board.includes(card.rank + card.suit) ? '' : 'none' }}
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
  }
}

DeckContainer.defaultProps = {
  size: 200,
  boardXoffset: 475,
  boardYoffset: 300,
  flipOnHover: true,
};

export default DeckContainer;
