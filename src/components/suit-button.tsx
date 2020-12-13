import React from "react";
import { Suit } from "../crazy-eights/deck";
import { Button, ButtonKind } from "./button";

type Props = {
    suit: Suit;
    onClick: (event: React.SyntheticEvent) => void;
};

export const SuitButton: React.FC<Props> = ({ suit, onClick }) => {
    const suitRecord = {
        S: { symbol: "♠︎", color: "black" },
        C: { symbol: "♣︎", color: "black" },
        D: { symbol: "♦︎", color: "red" },
        H: { symbol: "♥︎", color: "red" },
    } as const;
    return (
        <Button
            kind={ButtonKind.PRIMARY}
            style={{
                color: suitRecord[suit].color,
            }}
            onClick={onClick}
        >
            {suitRecord[suit].symbol}
        </Button>
    );
};
