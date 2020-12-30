import React from "react";
import styled from "styled-components";
import { Card as CardType } from "../crazy-eights/deck";

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

type Props = {
    card: CardType;
    face: "FRONT" | "BACK";
    isSelected: boolean;
    onClick?: () => void;
    horizontal?: boolean;
    position: number;
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
                        w-12 h-20 
                        flex 
                        justify-between
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
                        ${props.horizontal ? "w-20" : "w-12"}
                        ${props.horizontal ? "h-12" : "h-20"}
                        shadow-md
                        rounded
                        ${props.horizontal ? "col-start-1" : ""}
                        ${props.horizontal ? "row-start-1" : ""}
                        ${props.horizontal ? `mt-${props.position * 8}` : ""}
                   `}
                    style={}
                ></div>
            );
    }
};
