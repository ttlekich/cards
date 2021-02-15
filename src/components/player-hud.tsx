import React, { useState, useRef, useEffect } from "react";
import { NOT_PLAYING, PLAYING } from "../../src/entities/game-mode";
import { Hand } from "../../src/components/hand";
import { useGame } from "../hooks/useGame";
import type { Card, Suit } from "../crazy-eights/deck";
import type { UserGame } from "../entities/user-game";
import { TurnControls } from "./turn-controls";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";

type PlayerHUDContainerProps = {
    position: "TOP" | "RIGHT" | "BOTTOM" | "LEFT";
};

const PlayerHUDContainer = styled.div<PlayerHUDContainerProps>`
    display: flex;
    justify-content: space-space-between;
    align-items: center;
    padding: ${({ position }) => {
        switch (position) {
            case "LEFT":
            case "RIGHT":
                return "4rem";
            case "TOP":
            case "BOTTOM":
                return "2rem";
        }
    }};
    flex-direction: ${({ position }) => {
        switch (position) {
            case "LEFT":
                return "row-reverse";
            case "RIGHT":
                return "row";
            case "TOP":
                return "column-reverse";
            case "BOTTOM":
                return "column";
        }
    }};
    max-width: ${({ position }) => {
        switch (position) {
            case "LEFT":
            case "RIGHT":
                return null;
            case "TOP":
            case "BOTTOM":
                return "20rem";
        }
    }};
    max-height: ${({ position }) => {
        switch (position) {
            case "LEFT":
            case "RIGHT":
                return "20rem";
            case "TOP":
            case "BOTTOM":
                return null;
        }
    }};
`;

type PlayerOrientationProps = {
    position: "TOP" | "RIGHT" | "BOTTOM" | "LEFT";
};

const PlayerInformation = styled.div<PlayerOrientationProps>`
    writing-mode: ${({ position }) => {
        switch (position) {
            case "LEFT":
            case "RIGHT":
                return "vertical-rl";
            case "TOP":
            case "BOTTOM":
                return null;
        }
    }};
    display: flex;
    gap: 2rem;
`;

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
        <PlayerHUDContainer position={props.position}>
            <PlayerInformation position={props.position}>
                <div>
                    <b>Player: </b> {userGame.email}
                </div>
                <div>
                    <b>Score: </b> {userGame.score}
                </div>
            </PlayerInformation>
            {props.player.mode === PLAYING ? (
                <Hand
                    isFace={props.position === "BOTTOM"}
                    hand={props.player.hand}
                    selectedCard={selectedCard}
                    selectCard={selectCard}
                    parentWidth={width}
                    parentHeight={height}
                    position={props.position}
                ></Hand>
            ) : null}
            <div
                className={`"flex justify-center p-2 space-x-2
                        ${
                            isPlayer && isTurn && props.position === "BOTTOM"
                                ? "visible"
                                : "invisible"
                        }
            `}
            >
                <TurnControls
                    handleDrawCard={handleDrawCard}
                    handlePlayCard={handlePlayCard}
                    handleChooseSuit={handleChooseSuit}
                    handleSkip={handleSkip}
                    isTurn={isTurn}
                />
            </div>
        </PlayerHUDContainer>
    );
};
