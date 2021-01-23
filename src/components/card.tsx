import { position } from "polished";
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
    angle?: number;
    location?: "TOP" | "RIGHT" | "LEFT" | "BOTTOM";
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
            const left = {
                top: `${
                    (Math.abs(props.position) / props.position) *
                    -4 *
                    Math.abs(props.position) ** 1.05
                }px`,
                left: `${-(Math.abs(props.position) ** 1.12)}px`,
                transform: `rotate(${props.angle ? props.angle : 0}deg)`,
            };
            const top = {
                left: `${
                    (Math.abs(props.position) / props.position) *
                    -4 *
                    Math.abs(props.position) ** 1.05
                }px`,
                top: `${-(Math.abs(props.position) ** 1.12)}px`,
                transform: `rotate(${props.angle ? -props.angle : 0}deg)`,
            };
            const right = {
                left: `${
                    (Math.abs(props.position) / props.position) *
                    -4 *
                    Math.abs(props.position) ** 1.05
                }px`,
                top: `${-(Math.abs(props.position) ** 1.12)}px`,
                transform: `rotate(${props.angle ? -props.angle : 0}deg)`,
            };
            const positionStyle = props.position
                ? props.location === "TOP"
                    ? top
                    : props.location === "LEFT"
                    ? left
                    : props.location === "RIGHT"
                    ? right
                    : left
                : left;
            return (
                <div
                    className={`
                        bg-gradient-to-tr from-gray-900 gray-100 to-red-500
                        ${props.horizontal ? "w-24" : "w-16"}
                        ${props.horizontal ? "h-16" : "h-24"}
                        shadow-md
                        rounded
                        relative
                   `}
                    style={{
                        top: positionStyle.top,
                        left: positionStyle.left,
                        transform: positionStyle.transform,
                    }}
                >
                    {props.angle}
                </div>
            );
    }
};
