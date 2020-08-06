import { PLAY_CARD } from "./user-game.types";

const playCard = (card: string) => ({
    type: PLAY_CARD,
    payload: card,
});

export const UserGameAction = {};

export type UserGameAction = ReturnType<typeof playCard>;
