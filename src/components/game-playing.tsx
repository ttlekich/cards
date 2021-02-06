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
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
        ". . ."
        ". . ."
        ". . .";
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
            <div className="col-span-3">
                <div className="flex justify-center">
                    {userGameTop && (
                        <PlayerHUD
                            player={userGameTop}
                            position={"TOP"}
                        ></PlayerHUD>
                    )}
                </div>
            </div>
            <div>
                <div className="flex justify-center">
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
                <div className="flex justify-center">
                    {userGameRight && (
                        <PlayerHUD
                            player={userGameRight}
                            position={"RIGHT"}
                        ></PlayerHUD>
                    )}
                </div>
            </div>
            <div className="col-span-3">
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
