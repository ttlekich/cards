import React from "react";
import { PLAYING } from "../entities/game-mode";
import { useAuth } from "../hooks/useAuth";
import { useGame } from "../hooks/useGame";
import { userGamePositions } from "../util/player-management";
import { DrawPile } from "./draw-pile";
import { PlayerHUD } from "./player-hud";
import styled from "styled-components";

const GameContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

export const GamePlaying = () => {
    const { game } = useGame();
    const { user } = useAuth();

    const userGame = game && user ? game?.userGameRecord[user.uid] : undefined;

    const [userGameLeft, userGameTop, userGameRight] =
        game && game.mode === PLAYING && userGame
            ? userGamePositions(game?.userGameRecord, userGame)
            : [undefined, undefined, undefined];

    return (
        <GameContainer>
            <div className="flex flex-col justify-end col-span-3">
                <div
                    className={`flex justify-center ${
                        !userGameTop && "invisible"
                    }`}
                >
                    {userGameTop ? (
                        <PlayerHUD
                            player={userGameTop}
                            position={"TOP"}
                        ></PlayerHUD>
                    ) : userGame ? (
                        <PlayerHUD
                            player={userGame}
                            position={"TOP"}
                        ></PlayerHUD>
                    ) : null}
                </div>
            </div>
            <div>
                <div className="flex">
                    {userGameLeft && (
                        <PlayerHUD
                            player={userGameLeft}
                            position={"LEFT"}
                        ></PlayerHUD>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <DrawPile></DrawPile>
            </div>
            <div>
                <div
                    className={`flex justify-center ${
                        !userGameRight && "invisible"
                    }`}
                >
                    {userGameRight ? (
                        <PlayerHUD
                            player={userGameRight}
                            position={"RIGHT"}
                        ></PlayerHUD>
                    ) : userGameLeft ? (
                        <PlayerHUD
                            player={userGameLeft}
                            position={"RIGHT"}
                        ></PlayerHUD>
                    ) : null}
                </div>
            </div>
            <div className="flex flex-col justify-start col-span-3">
                {userGame && (
                    <div className="flex justify-center">
                        <PlayerHUD
                            key={userGame.email}
                            player={userGame}
                            position={"BOTTOM"}
                        ></PlayerHUD>
                    </div>
                )}
            </div>
        </GameContainer>
    );
};
