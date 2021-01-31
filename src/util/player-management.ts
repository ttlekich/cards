import * as R from "ramda";

import { CLOCKWISE, COUNTER_CLOCKWISE, PlayDirection } from "../entities/game";
import type { UserGame, UserGameRecord } from "../entities/user-game";

const PLAYER_NUMBERS = [1, 2, 3, 4];

export const nextPlayerNumber = (userGameRecord: UserGameRecord) => {
    const players = R.sortBy(R.prop("playerNumber"), R.values(userGameRecord));
    const takenNumbers = R.map((player) => player.playerNumber, players);
    const untakenNumbers = R.difference(PLAYER_NUMBERS, takenNumbers);
    return R.isEmpty(untakenNumbers) ? null : untakenNumbers[0];
};

export const getNextPlayerNumber = (
    currentPlayerNumber: number,
    playDirection: PlayDirection,
    nPlayers: number
) => {
    switch (playDirection) {
        case CLOCKWISE:
            const temp = currentPlayerNumber - 1;
            if (temp <= 0) {
                return nPlayers;
            } else {
                return temp;
            }
        case COUNTER_CLOCKWISE:
            return (currentPlayerNumber % nPlayers) + 1;
    }
};

export const getNextPlayerNumbers = (
    incomingPlayerNumber: number,
    playDirection: PlayDirection,
    nPlayers: number
) => {
    const loop = (
        currentPlayerNumber: number,
        playerNumbers: number[]
    ): number[] => {
        const playerNumber = getNextPlayerNumber(
            currentPlayerNumber,
            playDirection,
            nPlayers
        );
        if (playerNumber !== incomingPlayerNumber) {
            return loop(playerNumber, [playerNumber, ...playerNumbers]);
        } else {
            return playerNumbers;
        }
    };
    return loop(incomingPlayerNumber, []);
};

export const userGamePositions = (
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
