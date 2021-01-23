import React from "react";
import { Card as CardType, Hand as HandType } from "../crazy-eights/deck";
import { Card } from "./card";

type Props = {
    hand: HandType;
    isFace: boolean;
    selectedCard: CardType | null;
    selectCard: (card: CardType) => () => void;
    parentWidth: number;
    parentHeight: number;
    direction: "VERTICAL" | "HORIZONTAL";
};

export const Hand: React.FC<Props> = ({
    hand,
    isFace,
    selectCard,
    selectedCard,
    parentWidth,
    parentHeight,
    direction,
}) => {
    const areCardsEqual = (card1: CardType) => (card2: CardType) => {
        return card1.suit === card2.suit && card1.rank === card2.rank;
    };

    const nCards = hand.length;

    const spacing =
        direction === "HORIZONTAL"
            ? (parentWidth - 24) / nCards
            : (parentHeight - 24) / nCards;

    return (
        <div className="relative -left-1/2">
            {hand.map((card, i) => (
                <div
                    className="absolute"
                    style={{
                        zIndex: 1000 + i,
                        left:
                            direction === "HORIZONTAL"
                                ? `${i * spacing}px`
                                : "",
                        top: direction === "VERTICAL" ? `${i * spacing}px` : "",
                    }}
                >
                    <Card
                        face={isFace ? "FRONT" : "BACK"}
                        key={card.rank + card.suit}
                        card={card}
                        isSelected={
                            selectedCard
                                ? areCardsEqual(card)(selectedCard)
                                : false
                        }
                        onClick={selectCard(card)}
                        direction={
                            direction === "VERTICAL" ? "HORIZONTAL" : "VERTICAL"
                        }
                    ></Card>
                </div>
            ))}
        </div>
    );
};
