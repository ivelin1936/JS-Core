let result = (function () {
    const Suits = {
        CLUBS: "\u2663",    // ♣
        DIAMONDS: "\u2666", // ♦
        HEARTS: "\u2665",   // ♥
        SPADES: "\u2660"    // ♠
    };
    const Faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    class Card {
        constructor(face, suit) {
            if (!Faces.includes(face))
                throw new Error("Invalid card face: " + face);
            if (!Object.keys(Suits).map(k => Suits[k]).includes(suit))
                throw new Error("Invalid card suite: " + suit);
            this.face = face;
            this.suit = suit;
        }

        toString() {
            return `${this.face}${this.suit}`;
        }
    }

    return {
        Suits: Suits,
        Faces: Faces,
        Card: Card
    }
}());

let Card = result.Card;
let Suits = result.Suits;

let card = new Card("Q", Suits.CLUBS);
card.face = "A";
card.suit = Suits.DIAMONDS;
let card2 = new Card("1", Suits.DIAMONDS); //Should throw Error