import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useCallback,
    useRef,
} from "react";
import * as E from "fp-ts/Either";

import firebase, { db } from "../config/firebase";
import {
    DRAW_CARD,
    Game,
    GameFinished,
    GameNotPlaying,
    GamePlaying,
    Move,
    PLAY_CARD,
    SET_SUIT,
    SKIP_TURN,
} from "../entities/game";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import { nextPlayerNumber } from "../util/player-management";
import * as Crazy8s from "../crazy-eights/game";
import type { UserGameNotPlaying } from "../entities/user-game";
import type { Card, Suit } from "../crazy-eights/deck";

interface GameContext {
    game: Game | null;
}

const defaultGameContext = {
    game: null,
    isLoading: false,
    joinGame: () => Promise.resolve(),
    setIsReady: () => Promise.resolve(),
    updateGame: () => Promise.resolve(),
    leaveGame: () => Promise.resolve(),
    startGame: () => Promise.resolve(),
    chooseSuit: () => Promise.resolve(),
    skipTurn: () => Promise.resolve(),
    playCard: () => Promise.resolve(),
    drawCard: () => Promise.resolve(),
};

export const GameContext = createContext<ReturnType<typeof useGameProvider>>(
    defaultGameContext
);

export const useGameProvider = (user: firebase.User, gameId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [game, setGame] = useState<Game | null>(null);
    const [error, setError] = useState<string | null>(null);

    const id = useRef(gameId);

    const gameRef = useRef(db.ref(`game/${id.current}`));

    const updateGame = useCallback(
        async (game: Game) => {
            console.log(game);
            setIsLoading(true);
            await gameRef.current.update(game);
            setIsLoading(false);
        },
        [gameRef]
    );

    const joinOccupiedGame = useCallback(async (game: Game) => {
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
                                ready: false,
                            },
                        },
                    };
                    await updateGame(newGame);
                }
        }
    }, []);

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
                    ready: false,
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
                setGame(game.right);
            }
        });
    };

    const joinGame = useCallback(async (id: string) => {
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
    }, []);

    const setIsReady = useCallback(async (game: Game, user: firebase.User) => {
        const gameRef = db.ref(`game/${game.id}`);
        if (game.mode === NOT_PLAYING) {
            const prevUserGame: UserGameNotPlaying =
                game.userGameRecord[user.uid];
            const updatedGame: GameNotPlaying = {
                ...game,
                userGameRecord: {
                    ...game.userGameRecord,
                    [user.uid]: {
                        ...prevUserGame,
                        ready: true,
                    },
                },
            };
            await gameRef.update(updatedGame);
        }
    }, []);

    const startGame = () => {
        if (game && game.mode === NOT_PLAYING) {
            const updatedGame: GamePlaying | GameFinished = Crazy8s.update(
                Crazy8s.initialize(8)(game)
            );
            updateGame(updatedGame);
        }
    };

    const chooseSuit = (suit: Suit) => {
        if (game && game.mode === PLAYING && user) {
            const move: Move = {
                type: SET_SUIT,
                payload: suit,
            };
            const updatedGame: GamePlaying | GameFinished = Crazy8s.update(
                Crazy8s.move(game, move)
            );
            updateGame(updatedGame);
        }
    };

    const skipTurn = () => {
        if (game && game.mode === PLAYING && user) {
            const move: Move = {
                type: SKIP_TURN,
            };
            const updatedGame: GamePlaying | GameFinished = Crazy8s.update(
                Crazy8s.move(game, move)
            );
            updateGame(updatedGame);
        }
    };

    const playCard = (card: Card) => {
        if (
            game &&
            game.mode === PLAYING &&
            user
            // Crazy8s.isCardPlayable(game, card)
        ) {
            const move: Move = {
                type: PLAY_CARD,
                player: { uid: user.uid, email: user.email || "" },
                payload: card,
            };
            const updatedGame: GamePlaying | GameFinished = Crazy8s.update(
                Crazy8s.move(game, move)
            );
            updateGame(updatedGame);
        }
    };

    const drawCard = (nCards: number) => {
        if (game && game.mode === PLAYING && user) {
            const move: Move = {
                type: DRAW_CARD,
                payload: nCards,
                player: { uid: user.uid, email: user.email || "" },
            };
            const updatedGame: GamePlaying | GameFinished = Crazy8s.update(
                Crazy8s.move(game, move)
            );
            updateGame(updatedGame);
        }
    };

    const leaveGame = useCallback(() => {
        gameRef.current.off();
    }, [gameRef]);

    useEffect(() => {
        joinGame(id.current);
    }, [joinGame, id]);

    return {
        game,
        isLoading,
        joinGame,
        setIsReady,
        updateGame,
        leaveGame,
        startGame,
        chooseSuit,
        skipTurn,
        playCard,
        drawCard,
    };
};

type GameProviderProps = {
    children: ReactNode;
    gameId: string;
    user: firebase.User;
};

export const GameProvider: React.FC<GameProviderProps> = ({
    children,
    gameId,
    user,
}) => {
    const game = useGameProvider(user, gameId);
    return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export const useGame = () => {
    return useContext(GameContext);
};
