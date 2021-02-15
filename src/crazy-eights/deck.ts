import * as t from "io-ts";
import * as R from "ramda";
import { shuffle } from "../util/shuffle";

export const Suit = t.union([
    t.literal("S"),
    t.literal("H"),
    t.literal("C"),
    t.literal("D"),
]);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Suit = t.TypeOf<typeof Suit>;
export const Suits: Suit[] = ["S", "H", "C", "D"];

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
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
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
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Card = t.TypeOf<typeof Card>;

export const WILD_CARD = "WILD_CARD";
export const NONE = "NONE";

export const WildCard = t.type({
    suit: t.union([Suit, t.literal(WILD_CARD), t.literal(NONE)]),
    rank: t.union([Rank, t.literal(WILD_CARD), t.literal(NONE)]),
});
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type WildCard = t.TypeOf<typeof WildCard>;

export const Deck = t.array(Card);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Deck = t.TypeOf<typeof Deck>;

export const Hand = Deck;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Hand = Deck;

export const card = (suit: Suit) => (rank: Rank) => {
    return {
        suit,
        rank,
    };
};
export const newDeck = (): Deck => {
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
