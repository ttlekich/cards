import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { PlayerHUD } from "../components/player-hud";
import { useOvermind } from "../overmind";
import * as R from "ramda";
import { DrawPile } from "../components/draw-pile";
import { Navigation } from "../components/navigation";
import { OtherPlayerHUD } from "../components/other-player-hud";
import { UserGame, UserGameRecord } from "../entities/user-game";
import { PLAYING } from "../entities/game-mode";
import { CLOCKWISE } from "../entities/game";
import { getNextPlayerNumbers } from "../util/player-management";

const userGamePositions = (
    userGameRecord: UserGameRecord,
    currentUserGame: UserGame
) => {
    const nPlayers = R.keys(userGameRecord).length;
    const otherUserGames = R.sortBy(
        R.prop("playerNumber"),
        R.reject(
            (userGame: UserGame) =>
                userGame.userUID === currentUserGame.userUID,
            R.values(userGameRecord)
        )
    );
    const currentPlayerNumber = currentUserGame.playerNumber;
    const nextPlayerNumbers = getNextPlayerNumbers(
        currentPlayerNumber,
        CLOCKWISE,
        nPlayers
    );
    switch (nPlayers) {
        case 4:
            return [
                R.find(
                    (userGame) =>
                        userGame.playerNumber === nextPlayerNumbers[0],
                    otherUserGames
                ),
                R.find(
                    (userGame) =>
                        userGame.playerNumber === nextPlayerNumbers[1],
                    otherUserGames
                ),
                R.find(
                    (userGame) =>
                        userGame.playerNumber === nextPlayerNumbers[2],
                    otherUserGames
                ),
            ];
        case 3:
            return [
                R.find(
                    (userGame) =>
                        userGame.playerNumber === nextPlayerNumbers[0],
                    otherUserGames
                ),
                R.find(
                    (userGame) =>
                        userGame.playerNumber === nextPlayerNumbers[1],
                    otherUserGames
                ),
                undefined,
            ];
        case 2:
            return [undefined, otherUserGames[0], undefined];
        case 1:
        default:
            return [undefined, undefined, undefined];
    }
};

export const GamePage = () => {
    const match = useRouteMatch<{ id: string }>({
        path: "/game/:id",
    });
    const gameId = match?.params.id;
    const { state, actions } = useOvermind();
    const joinGame = actions.joinGame;

    useEffect(() => {
        joinGame(gameId);
    }, [joinGame, gameId]);

    const userGame =
        state.game && state.user
            ? state.game?.userGameRecord[state.user.uid]
            : undefined;

    const [userGameLeft, userGameTop, userGameRight] =
        state.game && state.game.mode === PLAYING && userGame
            ? userGamePositions(state.game?.userGameRecord, userGame)
            : [undefined, undefined, undefined];

    console.log(userGameLeft, userGameTop, userGameRight);

    return (
        <div className="flex flex-col items-center h-full w-full">
            <Navigation></Navigation>
            <div className="container grid grid-cols-3">
                <div className="col-span-3">
                    {userGameTop && <OtherPlayerHUD userGame={userGameTop} />}
                </div>
                <div>
                    {userGameLeft && (
                        <OtherPlayerHUD userGame={userGameLeft} isSide={true} />
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <DrawPile></DrawPile>
                </div>
                <div>
                    {userGameRight && (
                        <OtherPlayerHUD
                            userGame={userGameRight}
                            isSide={true}
                        />
                    )}
                </div>
                <div className="col-span-3">
                    {userGame && (
                        <div className="flex justify-center">
                            <PlayerHUD
                                key={userGame.email}
                                player={userGame}
                            ></PlayerHUD>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
