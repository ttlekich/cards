import React from "react";
import { Card as CardType } from "../crazy-eights/deck";

type Props = {
    card: CardType;
    face: "FRONT" | "BACK";
    isSelected: boolean;
    onClick?: () => void;
    horizontal?: boolean;
    position: number;
    total?: number;
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
    const total = props.total || 1;

    switch (props.face) {
        case "FRONT":
            return (
                <div
                    className={`
                        w-16 h-24
                        flex 
                        justify-between
                        text-lg
                        px-1
                        ${
                            suitDetails.color === "black"
                                ? "text-gray-900"
                                : "text-red-500"
                        }
                        rounded shadow-md 
                        cursor-pointer
                        leading-tight
                        transform 
                        ${
                            props.isSelected
                                ? "-translate-y-2"
                                : "hover:-translate-y-2"
                        }
                   `}
                    onClick={props.onClick}
                >
                    <div className="flex flex-col items-center">
                        <div>{rank}</div>
                        <div>{suitDetails.symbol}</div>
                    </div>
                    <div className="flex flex-col items-center justify-start transform rotate-180">
                        <div>{rank}</div>
                        <div>{suitDetails.symbol}</div>
                    </div>
                </div>
            );
        case "BACK":
            return (
                <div
                    className={`
                        bg-gradient-to-tr from-gray-900 gray-100 to-red-500
                        ${props.horizontal ? "w-24" : "w-16"}
                        ${props.horizontal ? "h-16" : "h-24"}
                        shadow-md
                        rounded
                   `}
                    style={{
                        top: props.horizontal
                            ? `${Math.floor((props.position * 88) / total)}%`
                            : undefined,
                        left: props.horizontal
                            ? undefined
                            : `${Math.floor((props.position * 88) / total)}%`,
                    }}
                ></div>
            );
    }
};
