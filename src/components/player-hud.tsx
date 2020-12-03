import React, { useState } from "react";
import { UserGame } from "../entities/user-game";
import { useOvermind } from "../overmind";
import styled from "styled-components";
import { Card } from "./card";
import { PLAYING } from "../entities/game-mode";
import { Card as CardType } from "../crazy-eights/deck";
import { Button, ButtonKind } from "./button";

type Props = {
    player: UserGame;
};

type WrapperProps = {
    isTurn: boolean;
};

const Wrapper = styled.div<WrapperProps>`
    border: ${(props) => `2px solid ${props.isTurn ? "red" : "transparent"}`};
`;

const PlayerInfo = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
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
        console.log("here");
        setSelectedCard(card);
    };

    const areCardsEqual = (card1: CardType) => (card2: CardType) => {
        return card1.suit === card2.suit && card1.rank === card2.rank;
    };

    const handlePlayCard = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (selectedCard) {
            actions.playCard(selectedCard);
        }
    };

    const handleDrawCard = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (selectedCard) {
            actions.drawCard(selectedCard);
        }
    };

    const canStart =
        state.game &&
        !(state.game.mode === PLAYING) &&
        userGame.playerNumber === 1;

    const handleStartGame = (event: React.SyntheticEvent) => {
        event.preventDefault();
        actions.startGame();
    };

    const isTurn =
        state.game?.mode === PLAYING &&
        player.playerNumber === state.game.currentPlayerNumber;

    return (
        <Wrapper isTurn={isTurn}>
            <PlayerInfo>
                <Field>{userGame?.playerNumber}</Field>
                <Field>{props.player.email}</Field>
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
                <Button
                    kind={ButtonKind.PRIMARY}
                    onClick={handlePlayCard}
                    disabled={!isTurn}
                >
                    Play Card
                </Button>
                <Button
                    kind={ButtonKind.PRIMARY_INVERTED}
                    onClick={handleDrawCard}
                    disabled={!isTurn}
                >
                    Draw Card
                </Button>

                {canStart ? (
                    <Button
                        kind={ButtonKind.SECONDARY}
                        onClick={handleStartGame}
                    >
                        Start Game
                    </Button>
                ) : null}
            </PlayerControls>
        </Wrapper>
    );
};