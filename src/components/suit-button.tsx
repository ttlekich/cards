import React from "react";
import { Suit } from "../crazy-eights/deck";

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
        <button
            onClick={onClick}
            className="p-3 rounded-sm bg-blue-500 hover:bg-blue-700"
        >
            {suitRecord[suit].symbol}
        </button>
    );
};
