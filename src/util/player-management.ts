import * as R from "ramda";
import { UserGameRecord } from "../entities/user-game";

const PLAYER_NUMBERS = [1, 2, 3, 4];

export const nextPlayerNumber = (userGameRecord: UserGameRecord) => {
    const players = R.sortBy(R.prop("playerNumber"), R.values(userGameRecord));
    const takenNumbers = R.map((player) => player.playerNumber, players);
    const untakenNumbers = R.difference(PLAYER_NUMBERS, takenNumbers);
    return R.isEmpty(untakenNumbers) ? null : untakenNumbers[0];
};
