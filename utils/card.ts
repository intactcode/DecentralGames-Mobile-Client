export default class Card {
  card: string;
  value: number;
  suit: string;
  position: number;
  flipped: boolean;
  placeHolder?: any;

  constructor(card: string) {
    this.card = card;
    const cardValues: any = {
      'Ace of Hearts': 1,
      '2 of Hearts': 2,
      '3 of Hearts': 3,
      '4 of Hearts': 4,
      '5 of Hearts': 5,
      '6 of Hearts': 6,
      '7 of Hearts': 7,
      '8 of Hearts': 8,
      '9 of Hearts': 9,
      '10 of Hearts': 10,
      'Jack of Hearts': 11,
      'Queen of Hearts': 12,
      'King of Hearts': 13,
      'Ace of Diamonds': 1,
      '2 of Diamonds': 2,
      '3 of Diamonds': 3,
      '4 of Diamonds': 4,
      '5 of Diamonds': 5,
      '6 of Diamonds': 6,
      '7 of Diamonds': 7,
      '8 of Diamonds': 8,
      '9 of Diamonds': 9,
      '10 of Diamonds': 10,
      'Jack of Diamonds': 11,
      'Queen of Diamonds': 12,
      'King of Diamonds': 13,
      'Ace of Clubs': 1,
      '2 of Clubs': 2,
      '3 of Clubs': 3,
      '4 of Clubs': 4,
      '5 of Clubs': 5,
      '6 of Clubs': 6,
      '7 of Clubs': 7,
      '8 of Clubs': 8,
      '9 of Clubs': 9,
      '10 of Clubs': 10,
      'Jack of Clubs': 11,
      'Queen of Clubs': 12,
      'King of Clubs': 13,
      'Ace of Spades': 1,
      '2 of Spades': 2,
      '3 of Spades': 3,
      '4 of Spades': 4,
      '5 of Spades': 5,
      '6 of Spades': 6,
      '7 of Spades': 7,
      '8 of Spades': 8,
      '9 of Spades': 9,
      '10 of Spades': 10,
      'Jack of Spades': 11,
      'Queen of Spades': 12,
      'King of Spades': 13,
    };

    this.value = cardValues[card];
    this.suit = card.substring(card.indexOf(' of ') + 4);
    this.flipped = false;

    const suits: any = { Hearts: 0, Diamonds: 13, Clubs: 26, Spades: 39 };
    this.position = suits[this.suit] + this.value; //Position in a sorted deck
  }

  displayCard(flipped = true) {
    this.flipped = flipped;
  }

  flip() {
    if (this.flipped) {
      this.flipped = false;
    } else {
      this.flipped = true;
    }
  }
}
