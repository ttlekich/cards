import React from "react";
import type { Card as CardType, Hand as HandType } from "../crazy-eights/deck";
import { Card } from "./card";
import styled from "styled-components";
import * as Crazy8s from "../crazy-eights/game";

const SPACING = 64;

type CardContainerProps = {
    index: number;
    middle: number;
    position: "TOP" | "RIGHT" | "BOTTOM" | "LEFT";
};

type HandContainerProps = {
    position: "TOP" | "RIGHT" | "BOTTOM" | "LEFT";
};

const HandContainer = styled.ul<HandContainerProps>`
    position: relative;
    height: ${({ position }) => {
        switch (position) {
            case "LEFT":
            case "RIGHT":
                return "0rem";
            case "TOP":
            case "BOTTOM":
                return "10rem";
        }
    }};
    width: ${({ position }) => {
        switch (position) {
            case "LEFT":
            case "RIGHT":
                return "8rem";
            case "TOP":
            case "BOTTOM":
                return "0rem";
        }
    }};
`;

const CardContainer = styled.li<CardContainerProps>`
    position: absolute;
    left: ${({ index, middle, position }) => {
        if (position === "TOP" || position === "BOTTOM") {
            if (index === middle) {
                return "0px";
            }
            if (index > middle) {
                return `${
                    (index - middle) *
                    Math.min(SPACING, (SPACING / (middle + 1)) * 4)
                }px`;
            }
            if (index < middle) {
                return `-${
                    (middle - index) *
                    Math.min(SPACING, (SPACING / (middle + 1)) * 4)
                }px`;
            }
        } else if (position === "LEFT") {
            return "0";
        } else {
            return null;
        }
    }};
    top: ${({ index, middle, position }) => {
        if (position === "LEFT" || position === "RIGHT") {
            if (index === middle) {
                return "0px";
            }
            if (index > middle) {
                return `${
                    (index - middle) *
                    Math.min(SPACING, (SPACING / (middle + 1)) * 4)
                }px`;
            }
            if (index < middle) {
                return `-${
                    (middle - index) *
                    Math.min(SPACING, (SPACING / (middle + 1)) * 4)
                }px`;
            }
        } else if (position === "TOP") {
            return "0";
        } else {
            return null;
        }
    }};
    bottom: ${({ position }) => (position === "BOTTOM" ? "0" : null)};
    right: ${({ position }) => (position === "RIGHT" ? "0" : null)};
    transform: ${({ position }) =>
        position === "TOP" || position === "BOTTOM"
            ? "translate(-50%)"
            : "translate(-50%, -50%)"};
`;

type Props = {
    hand: HandType;
    isFace: boolean;
    selectedCard: CardType | null;
    selectCard: (card: CardType) => () => void;
    parentWidth: number;
    parentHeight: number;
    position: "TOP" | "RIGHT" | "BOTTOM" | "LEFT";
};

export const Hand: React.FC<Props> = ({
    hand,
    isFace,
    selectCard,
    selectedCard,
    position,
}) => {
    const areCardsEqual = (card1: CardType) => (card2: CardType) => {
        return card1.suit === card2.suit && card1.rank === card2.rank;
    };

    const nCards = hand.length;
    const middle = nCards / 2 - 0.5;

    const cardDirection =
        position === "TOP" || position === "BOTTOM" ? "VERTICAL" : "HORIZONTAL";

    const hearts = hand.filter((card) => card.suit === "H");
    const sortedHearts = hearts.sort(Crazy8s.sortByRank);
    const spades = hand.filter((card) => card.suit === "S");
    const sortedSpades = spades.sort(Crazy8s.sortByRank);
    const clubs = hand.filter((card) => card.suit === "C");
    const sortedClubs = clubs.sort(Crazy8s.sortByRank);
    const diamonds = hand.filter((card) => card.suit === "D");
    const sortedDiamonds = diamonds.sort(Crazy8s.sortByRank);

    const sortedHand = [
        ...sortedHearts,
        ...sortedSpades,
        ...sortedDiamonds,
        ...sortedClubs,
    ];

    return (
        <HandContainer position={position}>
            {sortedHand.map((card, i) => (
                <CardContainer
                    index={i}
                    middle={middle}
                    position={position}
                    key={`${card.rank}-${card.suit}`}
                >
                    <Card
                        face={isFace ? "FRONT" : "BACK"}
                        card={card}
                        isSelected={
                            selectedCard
                                ? areCardsEqual(card)(selectedCard)
                                : false
                        }
                        onClick={selectCard(card)}
                        direction={cardDirection}
                    ></Card>
                </CardContainer>
            ))}
        </HandContainer>
    );
};
