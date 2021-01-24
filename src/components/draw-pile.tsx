import React from "react";
import { Card } from "./card";
import { FINISHED, NOT_PLAYING, PLAYING } from "../entities/game-mode";
import * as R from "ramda";
import { useGameSelector } from "../hooks/useGame";

export const DrawPile = () => {
    const game = useGameSelector();
    if (!game) return <></>;
    switch (game.mode) {
        case PLAYING:
            const lastPlayed = R.last(game.discard);
            return (
                <>
                    {game && (
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
                    )}
                </>
            );
        case FINISHED:
        case NOT_PLAYING:
            return <></>;
    }
};
