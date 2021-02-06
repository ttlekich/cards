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
    position: "TOP" | "RIGHT" | "BOTTOM" | "LEFT";
};

export const PlayerHUD = (props: Props) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const { player } = props;
    const userGame = props.player;
    const { user } = useAuth();
    const { game, drawCard, playCard, skipTurn, chooseSuit } = useGame();

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
        skipTurn();
    };

    const handleChooseSuit = (suit: Suit) => (event: React.SyntheticEvent) => {
        event.preventDefault();
        chooseSuit(suit);
    };

    const handlePlayCard = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (selectedCard) {
            playCard(selectedCard);
            setSelectedCard(null);
        }
    };

    const handleDrawCard = (nCards: number) => (
        event: React.SyntheticEvent
    ) => {
        event.preventDefault();
        drawCard(nCards);
    };

    const isTurn =
        game?.mode === PLAYING &&
        player.playerNumber === game.currentPlayerNumber;

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
            {props.player.mode === PLAYING ? (
                <Hand
                    isFace={props.position === "BOTTOM"} // TODO
                    hand={props.player.hand}
                    selectedCard={selectedCard}
                    selectCard={selectCard}
                    parentWidth={width}
                    parentHeight={height}
                    position={props.position}
                ></Hand>
            ) : null}
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
        </div>
    );
};
