import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import * as R from "ramda";
import { DrawPile } from "../components/draw-pile";
import { Navigation } from "../components/navigation";
import { PLAYING } from "../entities/game-mode";
import { CLOCKWISE } from "../entities/game";
import { getNextPlayerNumbers } from "../util/player-management";
import type { UserGame, UserGameRecord } from "../entities/user-game";
import { GameContext, useJoinGame } from "../hooks/useGame";
import { useSession } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/loading-spinner";
import { PlayerHUD } from "../components/player-hud";

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
    const history = useHistory();
    const match = useRouteMatch<{ id: string }>({
        path: "/game/:id",
    });
    const gameId = match?.params.id;
    if (!gameId) {
        history.push("/lobby");
        return <></>;
    }
    const user = useSession();
    if (!user) {
        history.push("/");
        return <></>;
    }

    const { joinGame, game } = useJoinGame(gameId, user);

    const userGame = game && user ? game?.userGameRecord[user.uid] : undefined;

    const [userGameLeft, userGameTop, userGameRight] =
        game && game.mode === PLAYING && userGame
            ? userGamePositions(game?.userGameRecord, userGame)
            : [undefined, undefined, undefined];

    return (
        <GameContext.Provider value={{ game }}>
            <div className="flex flex-col items-center h-full">
                <Navigation></Navigation>
                {joinGame.isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                ) : (
                    <div className="container grid grid-cols-3 p-5">
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
                                    ></PlayerHUD>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </GameContext.Provider>
    );
};
