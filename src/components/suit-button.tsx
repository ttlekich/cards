import React from "react";
import type { Suit } from "../crazy-eights/deck";

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
    const suitInfo = suitRecord[suit];
    return (
        <button
            className={`
                bg-gray-200
                hover:bg-gray-400
                px-2 py-1
                rounded
                text-lg
                ${suitInfo.color === "black" ? "text-gray-900" : "text-red-500"}
                `}
            onClick={onClick}
        >
            {suitRecord[suit].symbol}
        </button>
    );
};
