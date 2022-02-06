export default class Deck {
  deck: Array<string | number>;
  constructor() {
    this.deck = [];
    this.reset(); //Add 52 cards to the deck
    this.shuffle(); //Suffle the deck
  }

  reset() {
    this.deck = [];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    suits.map((suit: any) => {
      values.map((value: any) => {
        this.deck.push(values[value] + ' of ' + suits[suit]);
      });
    });
  }

  shuffle() {
    let numberOfCards = this.deck.length;
    for (let i = 0; i < numberOfCards; i++) {
      let j = Math.floor(Math.random() * numberOfCards);
      let tmp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = tmp;
    }
  }

  deal() {
    return this.deck.pop();
  }

  isEmpty() {
    return this.deck.length == 0;
  }

  length() {
    return this.deck.length;
  }
}
