import { createContext, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import * as E from "fp-ts/Either";

import firebase, { db } from "../config/firebase";
import { Game, GameNotPlaying } from "../entities/game";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import { nextPlayerNumber } from "../util/player-management";
import { UserGameRecordFinished } from "../entities/user-game";

interface State {
    game: Game | null;
}

export const GameContext = createContext<State>({
    game: null,
});

export const useGame = (id: string, user: firebase.User) => {
    const { game } = useContext(GameContext);

    const updateGame = async (game: Game) => {
        const gameRef = db.ref(`game/${game.id}`);
        await gameRef.update(game);
    };

    const joinOccupiedGame = async (game: Game) => {
        switch (game.mode) {
            case PLAYING:
                return;
            case NOT_PLAYING:
                const playerNumber = nextPlayerNumber(game.userGameRecord);
                if (game.userGameRecord[user.uid]) {
                    return;
                }
                if (playerNumber) {
                    const newGame: GameNotPlaying = {
                        ...game,
                        userGameRecord: {
                            ...game.userGameRecord,
                            [user.uid]: {
                                mode: NOT_PLAYING,
                                userUID: user.uid,
                                email: user.email ? user.email : "",
                                playerNumber,
                                score: 0,
                            },
                        },
                    };
                    await updateGame(newGame);
                    return;
                } else {
                    return;
                }
        }
    };

    const joinEmptyGame = async (id: string) => {
        const game: GameNotPlaying = {
            mode: NOT_PLAYING,
            id,
            userGameRecord: {
                [user.uid]: {
                    mode: NOT_PLAYING,
                    userUID: user.uid,
                    email: user.email ? user.email : "",
                    playerNumber: 1,
                    score: 0,
                },
            },
        };
        await updateGame(game);
    };

    const subscribeToGame = (gameRef: firebase.database.Reference) => {
        gameRef.on("value", (snapshot) => {
            const value = snapshot.val();
            const game = Game.decode(value);
            if (!value || E.isLeft(game)) {
                gameRef.off();
                throw Error("Cannot subscribe to game.");
            } else {
                onGameSnapshot(game.right);
            }
        });
    };

    // const onGameSnapshot(game: Game) {

    // }

    const joinGame = useMutation(async (id: string) => {
        try {
            const gameRef = db.ref(`game/${id}`);
            const value = await gameRef.once("value");
            if (value.val()) {
                const game = Game.decode(value.val());
                if (E.isLeft(game)) {
                    throw Error("Invalid Game State");
                }
                await joinOccupiedGame(game.right);
            } else {
                await joinEmptyGame(id);
            }
            subscribeToGame(gameRef);
        } catch (error) {
            throw new Error(error.message);
        }
    });

    useEffect(() => {
        joinGame.mutate(id);
    }, [id]);

    return { joinGame, game };
};
