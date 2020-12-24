import React from "react";
import styled from "styled-components";
import { Card as CardType } from "../crazy-eights/deck";
import { CardRank } from "./card-rank";
import { CardSuit } from "./card-suit";

type WrapperProps = {
    color: "red" | "black";
    isSelected: boolean;
};

const BackWrapper = styled.div`
    width: 48px;
    height: 80px;
    padding: 0.25rem;
    border-radius: 5px;
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
        linear-gradient(135deg, #ccc 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #ccc 75%),
        linear-gradient(135deg, transparent 75%, #ccc 75%);
    background-size: 5px 5px;
    background-position: 0 0, 2.5px 0, 2.5px -2.5px, 0px 2.5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const FrontWrapper = styled.div<WrapperProps>`
    display: flex;
    width: 48px;
    height: 80px;
    background-color: #fff;
    border-radius: 5px;
    padding: 0.25rem;
    color: ${(props) => props.color};
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition: ease 0.1s;
    transform: ${(props) =>
        props.isSelected ? `translate(0px, -8px) scale(1.1)` : `none`};
    &:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.23);
        transform: translate(0px, -8px) scale(1.1);
    }
`;

const CardTop = styled.div`
    display: flex;
    flex-grow: 1;
    flex-flow: column nowrap;
    align-items: flex-start;
`;

const CardBottom = styled.div`
    display: flex;
    flex-grow: 1;
    flex-flow: column nowrap;
    justify-content: flex-start;
    transform: rotate(-180deg);
`;

type Props = {
    card: CardType;
    face: "FRONT" | "BACK";
    isSelected: boolean;
    onClick?: () => void;
};

export const Card = (props: Props) => {
    const suitRecord = {
        S: { symbol: "♠︎", color: "black" },
        C: { symbol: "♣︎", color: "black" },
        D: { symbol: "♦︎", color: "red" },
        H: { symbol: "♥︎", color: "red" },
    } as const;

    const { suit, rank } = props.card;
    const suitDetails = suitRecord[suit];

    switch (props.face) {
        case "FRONT":
            return (
                <FrontWrapper
                    isSelected={props.isSelected}
                    color={suitDetails.color}
                    onClick={props.onClick}
                >
                    <CardTop>
                        <CardRank>{rank}</CardRank>
                        <CardSuit>{suitDetails.symbol}</CardSuit>
                    </CardTop>
                    <CardBottom>
                        <CardRank>{rank}</CardRank>
                        <CardSuit>{suitDetails.symbol}</CardSuit>
                    </CardBottom>
                </FrontWrapper>
            );
        case "BACK":
            return <BackWrapper></BackWrapper>;
    }
};
