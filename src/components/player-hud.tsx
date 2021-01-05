import React, { useState } from "react";
import { UserGame } from "../entities/user-game";
import { useOvermind } from "../overmind";
import { Card } from "./card";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import { Card as CardType, Suit } from "../crazy-eights/deck";
import { TurnControls } from "./turn-controls";

type Props = {
    player: UserGame;
};

export const PlayerHUD = (props: Props) => {
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
    const { state, actions } = useOvermind();
    const { player } = props;
    const userGame = props.player;
    const isPlayer = state.user?.email === player.email;

    const selectCard = (card: CardType) => () => {
        setSelectedCard(card);
    };

    const areCardsEqual = (card1: CardType) => (card2: CardType) => {
        return card1.suit === card2.suit && card1.rank === card2.rank;
    };

    const handleSkip = (event: React.SyntheticEvent) => {
        event.preventDefault();
        actions.skipTurn();
    };

    const handleChooseSuit = (suit: Suit) => (event: React.SyntheticEvent) => {
        event.preventDefault();
        actions.chooseSuit(suit);
    };

    const handlePlayCard = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (selectedCard) {
            actions.playCard(selectedCard);
            setSelectedCard(null);
        }
    };

    const handleDrawCard = (nCards: number) => (
        event: React.SyntheticEvent
    ) => {
        event.preventDefault();
        actions.drawCard(nCards);
    };

    const canStart = Boolean(
        state.game &&
            state.game.mode === NOT_PLAYING &&
            userGame.playerNumber === 1
    );

    const handleStartGame = (event: React.SyntheticEvent) => {
        event.preventDefault();
        actions.startGame();
    };

    const isTurn =
        state.game?.mode === PLAYING &&
        player.playerNumber === state.game.currentPlayerNumber;

    return (
        <div className="flex flex-col p-2">
            <div className="flex flex-row justify-center gap-2 p-2 text-sm">
                <div>
                    <span className="font-semibold">Player: </span>{" "}
                    {userGame.email}
                </div>
                <div>
                    <span className="font-semibold">Score: </span>{" "}
                    {userGame.score}
                </div>
            </div>
            <div className="flex flex-row justify-center gap-2 p-2">
                {props.player.mode === PLAYING ? (
                    <>
                        {props.player.hand.map((card, i) => (
                            <Card
                                face={isPlayer ? "FRONT" : "BACK"}
                                key={card.rank + card.suit}
                                card={card}
                                isSelected={
                                    selectedCard
                                        ? areCardsEqual(card)(selectedCard)
                                        : false
                                }
                                onClick={selectCard(card)}
                                position={i}
                            ></Card>
                        ))}
                    </>
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
            {canStart ? (
                <button
                    onClick={handleStartGame}
                    className="p-3 rounded-sm bg-blue-500 hover:bg-blue-700"
                >
                    Start Game
                </button>
            ) : null}
        </div>
    );
};
