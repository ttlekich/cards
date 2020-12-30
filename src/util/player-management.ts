import * as R from "ramda";
import { UserGameRecord } from "../entities/user-game";

import { CLOCKWISE, COUNTER_CLOCKWISE, PlayDirection } from "../entities/game";

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
