import React, { useState, useRef, useEffect } from "react";
import { NOT_PLAYING, PLAYING } from "../../src/entities/game-mode";
import { Hand } from "../../src/components/hand";
import { useGame } from "../hooks/useGame";
import type { Card, Suit } from "../crazy-eights/deck";
import type { UserGame } from "../entities/user-game";
import { TurnControls } from "./turn-controls";
import { useAuth } from "../hooks/useAuth";

type Props = {
    player: UserGame;
    position?: "TOP" | "LEFT" | "RIGHT";
};

export const PlayerHUD = (props: Props) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const { player } = props;
    const userGame = props.player;
    const { user } = useAuth();
    const { game } = useGame();

    const isPlayer = user?.email === player.email;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }
    }, [ref]);

    const selectCard = (card: Card) => () => {
        setSelectedCard(card);
    };

    const handleSkip = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // actions.skipTurn();
    };

    const handleChooseSuit = (suit: Suit) => (event: React.SyntheticEvent) => {
        event.preventDefault();
        // actions.chooseSuit(suit);
    };

    const handlePlayCard = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log(selectedCard);
        if (selectedCard) {
            // actions.playCard(selectedCard);
            setSelectedCard(null);
        }
    };

    const handleDrawCard = (nCards: number) => (
        event: React.SyntheticEvent
    ) => {
        event.preventDefault();
        // actions.drawCard(nCards);
    };

    // const canStart = Boolean(
    //     game && game.mode === NOT_PLAYING && userGame.playerNumber === 1
    // );

    // const handleStartGame = (event: React.SyntheticEvent) => {
    //     event.preventDefault();
    //     // actions.startGame();
    // };

    const isTurn =
        game?.mode === PLAYING &&
        player.playerNumber === game.currentPlayerNumber;

    const direction = props.position
        ? props.position === "RIGHT" || props.position === "LEFT"
            ? "VERTICAL"
            : "HORIZONTAL"
        : "HORIZONTAL";

    const hw = direction === "VERTICAL" ? "w-28 h-80" : "w-96 h-36";

    return (
        <div className="flex flex-col p-5 items-center">
            <div className="flex flex-row justify-center gap-2 p-2">
                <div>
                    <b>Player: </b> {userGame.email}
                </div>
                <div>
                    <b>Score: </b> {userGame.score}
                </div>
            </div>
            <div
                className={`flex flex-row justify-center gap-2 p-2 ${hw}`}
                ref={ref}
            >
                {props.player.mode === PLAYING ? (
                    <Hand
                        isFace={!Boolean(props.position)}
                        hand={props.player.hand}
                        selectedCard={selectedCard}
                        selectCard={selectCard}
                        parentWidth={width}
                        parentHeight={height}
                        direction={direction}
                    ></Hand>
                ) : null}
            </div>
            <div className="flex justify-center gap-2 p-2">
                {isPlayer && isTurn && (
                    <TurnControls
                        handleDrawCard={handleDrawCard}
                        handlePlayCard={handlePlayCard}
                        handleChooseSuit={handleChooseSuit}
                        handleSkip={handleSkip}
                        isTurn={isTurn}
                    />
                )}
            </div>
            {/* {canStart ? (
                <button
                    onClick={handleStartGame}
                    className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-md"
                >
                    Start Game
                </button>
            ) : null} */}
        </div>
    );
};
