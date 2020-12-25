import React, { useState } from "react";
import { UserGame } from "../entities/user-game";
import { useOvermind } from "../overmind";
import styled from "styled-components";
import { Card } from "./card";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import { Card as CardType, Suit } from "../crazy-eights/deck";
import { TurnControls } from "./turn-controls";
import { Button, ButtonKind } from "./button";
import { ACCENT, DARK_GRAY } from "../styles/colors";

type Props = {
    player: UserGame;
};

type WrapperProps = {
    isTurn: boolean;
};

const Wrapper = styled.div`
    max-width: 800px;
`;

const PlayerInfo = styled.div<WrapperProps>`
    display: flex;
    color: ${(props) => (props.isTurn ? `${ACCENT};` : `${DARK_GRAY};`)}
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
`;

const Hand = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem;
`;

const Field = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PlayerControls = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem;
`;

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
        <Wrapper>
            <PlayerInfo isTurn={isTurn}>
                <Field>
                    <b>Player:</b> {props.player.email}
                </Field>
                <Field>
                    <b>Score:</b> {props.player.score}
                </Field>
            </PlayerInfo>
            <Hand>
                {props.player.mode === PLAYING ? (
                    <>
                        {props.player.hand.map((card) => (
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
                            ></Card>
                        ))}
                    </>
                ) : null}
            </Hand>
            <PlayerControls>
                {isPlayer && isTurn && (
                    <TurnControls
                        handleDrawCard={handleDrawCard}
                        handlePlayCard={handlePlayCard}
                        handleChooseSuit={handleChooseSuit}
                        handleSkip={handleSkip}
                        isTurn={isTurn}
                    />
                )}
            </PlayerControls>
            {canStart ? (
                <button
                    onClick={handleStartGame}
                    className="p-3 rounded-sm bg-blue-500 hover:bg-blue-700"
                >
                    Start Game
                </button>
            ) : null}
        </Wrapper>
    );
};
