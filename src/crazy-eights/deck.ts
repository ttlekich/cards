import * as t from "io-ts";
import * as R from "ramda";
import { shuffle } from "../util/shuffle";

export const Suit = t.union([
    t.literal("S"),
    t.literal("H"),
    t.literal("C"),
    t.literal("D"),
]);
export type Suit = t.TypeOf<typeof Suit>;
const Suits: Suit[] = ["S", "H", "C", "D"];

export const Rank = t.union([
    t.literal("A"),
    t.literal("2"),
    t.literal("3"),
    t.literal("4"),
    t.literal("5"),
    t.literal("6"),
    t.literal("7"),
    t.literal("8"),
    t.literal("9"),
    t.literal("10"),
    t.literal("J"),
    t.literal("Q"),
    t.literal("K"),
]);
export type Rank = t.TypeOf<typeof Rank>;
const Ranks: Rank[] = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

export const Card = t.type({
    suit: Suit,
    rank: Rank,
});
export type Card = t.TypeOf<typeof Card>;

export const Deck = t.array(Card);
export type Deck = t.TypeOf<typeof Deck>;

export const Hand = Deck;
export type Hand = Deck;

export const card = (suit: Suit) => (rank: Rank) => {
    return {
        suit,
        rank,
    };
};
export const newDeck = () => {
    const unshuffled: Deck = R.chain(
        (suit) =>
            R.map(
                (rank) => ({
                    suit,
                    rank,
                }),
                Ranks
            ),
        Suits
    );
    const shuffled = shuffle(unshuffled);
    return shuffled;
};
