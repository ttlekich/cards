import React from "react";
import { useOvermind } from "../overmind";
import { Card } from "./card";
import { FINISHED, NOT_PLAYING, PLAYING } from "../entities/game-mode";
import * as R from "ramda";

export const DrawPile = () => {
    const { state } = useOvermind();
    if (!state.game) return <></>;
    switch (state.game.mode) {
        case PLAYING:
            const lastPlayed = R.last(state.game.discard);
            return (
                <>
                    {state.game && (
                        <div className="flex justify-center items-center gap-4">
                            <Card
                                card={{ suit: "S", rank: "A" }}
                                face={"BACK"}
                                isSelected={false}
                                position={0}
                            ></Card>
                            {lastPlayed && (
                                <Card
                                    card={lastPlayed}
                                    face={"FRONT"}
                                    isSelected={false}
                                    position={0}
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
