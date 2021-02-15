import React from "react";
import { Card } from "./card";
import { FINISHED, NOT_PLAYING, PLAYING } from "../entities/game-mode";
import * as R from "ramda";
import { useGame } from "../hooks/useGame";
import { getCurrentSuit } from "../crazy-eights/game";

export const DrawPile = () => {
    const { game } = useGame();
    if (!game) return <></>;

    const suitRecord = {
        S: { symbol: "♠︎", color: "black" },
        C: { symbol: "♣︎", color: "black" },
        D: { symbol: "♦︎", color: "red" },
        H: { symbol: "♥︎", color: "red" },
    } as const;

    switch (game.mode) {
        case PLAYING:
            const lastPlayed = R.last(game.discard);
            const suit = getCurrentSuit(game);
            const suitDetails = suit && suitRecord[suit];
            return (
                <>
                    {game && (
                        <div className="flex flex-col justify-center items-center gap-2">
                            <span
                                className={`text-2xl ${
                                    suitDetails ? "visible" : "invisible"
                                }
                                
                        ${
                            suitDetails && suitDetails.color === "black"
                                ? "text-gray-900"
                                : "text-red-500"
                        }
                                `}
                            >
                                {suitDetails && suitDetails.symbol}
                            </span>
                            <div className="flex justify-center items-center gap-4">
                                <Card
                                    card={{ suit: "S", rank: "A" }}
                                    face={"BACK"}
                                    isSelected={false}
                                    direction={"VERTICAL"}
                                ></Card>
                                {lastPlayed && (
                                    <Card
                                        card={lastPlayed}
                                        face={"FRONT"}
                                        isSelected={false}
                                        direction={"VERTICAL"}
                                    ></Card>
                                )}
                            </div>
                        </div>
                    )}
                </>
            );
        case FINISHED:
        case NOT_PLAYING:
            return <></>;
    }
};
