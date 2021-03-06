import React from "react";
import type { Card as CardType } from "../crazy-eights/deck";

type Props = {
    card: CardType;
    face: "FRONT" | "BACK";
    isSelected: boolean;
    onClick?: () => void;
    direction: "VERTICAL" | "HORIZONTAL";
    animate: boolean;
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
                <div
                    className={`
                        h-32
                        w-20
                        text-2xl
                        bg-white
                        flex 
                        justify-between
                        p-1
                        ${
                            suitDetails.color === "black"
                                ? "text-gray-900"
                                : "text-red-500"
                        }
                        shadow-md
                        border
                        rounded
                        leading-tight
                        ${props.animate ? "cursor-pointer" : ""}
                        ${props.animate ? "transform" : ""}
                        ${
                            props.isSelected && props.animate
                                ? "-translate-y-2 -translate-x-2"
                                : "hover:-translate-y-2 hover:-translate-x-2"
                        }
                        duration-200
                   `}
                    onClick={props.onClick}
                >
                    <div className="flex flex-col items-center">
                        <div>{rank}</div>
                        <div className="text-4xl">{suitDetails.symbol}</div>
                    </div>
                    <div className="flex flex-col items-center justify-start transform rotate-180">
                        <div>{rank}</div>
                        <div className="text-4xl">{suitDetails.symbol}</div>
                    </div>
                </div>
            );
        case "BACK":
            return (
                <div
                    className={`
                        bg-white
                        ${props.direction === "HORIZONTAL" ? "w-32" : "w-20"}
                        ${props.direction === "HORIZONTAL" ? "h-20" : "h-32"}
                        border
                        border-gray
                        shadow-md
                        rounded
                   `}
                ></div>
            );
    }
};
