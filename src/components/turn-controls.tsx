import React from "react";
import {
    CHOOSE_SUIT,
    DrawCard,
    DRAW_CARD,
    PLAY_CARD,
    SKIP_TURN,
} from "../entities/game";
import { PLAYING } from "../entities/game-mode";
import { useOvermind } from "../overmind";
import { Button, ButtonKind } from "./button";
import * as R from "ramda";
import { Suit } from "../crazy-eights/deck";
import { SuitChooser } from "./suit-chooser";

type Props = {
    handlePlayCard: (event: React.SyntheticEvent) => void;
    handleDrawCard: (nCards: number) => (event: React.SyntheticEvent) => void;
    handleStartGame: (event: React.SyntheticEvent) => void;
    handleChooseSuit: (suit: Suit) => (event: React.SyntheticEvent) => void;
    handleSkip: (event: React.SyntheticEvent) => void;
    isTurn: boolean;
    canStart: boolean;
};

export const TurnControls: React.FC<Props> = ({
    handlePlayCard,
    handleDrawCard,
    handleStartGame,
    handleChooseSuit,
    handleSkip,
    isTurn,
    canStart,
}) => {
    const { state } = useOvermind();
    const { game } = state;

    const turnOptions = game?.mode === PLAYING ? game.turnOptions : [];

    const playCard = R.head(
        R.filter((turnOption) => turnOption.type === PLAY_CARD, turnOptions)
    );

    const drawCard = R.head(
        R.filter((turnOption) => turnOption.type === DRAW_CARD, turnOptions)
    ) as DrawCard | undefined;

    const skipTurn = R.head(
        R.filter((turnOption) => turnOption.type === SKIP_TURN, turnOptions)
    );

    const chooseSuit = R.head(
        R.filter((turnOption) => turnOption.type === CHOOSE_SUIT, turnOptions)
    );

    return (
        <>
            {chooseSuit && (
                <SuitChooser handleChooseSuit={handleChooseSuit}></SuitChooser>
            )}
            {playCard && (
                <Button
                    kind={ButtonKind.PRIMARY}
                    onClick={handlePlayCard}
                    disabled={!isTurn}
                >
                    Play Card
                </Button>
            )}
            {drawCard && (
                <Button
                    kind={ButtonKind.PRIMARY_INVERTED}
                    onClick={handleDrawCard(drawCard.payload)}
                    disabled={!isTurn}
                >
                    {`Draw Card (${drawCard.payload})`}
                </Button>
            )}
            {skipTurn && (
                <Button
                    kind={ButtonKind.PRIMARY_INVERTED}
                    onClick={handleSkip}
                    disabled={!isTurn}
                >
                    Skip Turn
                </Button>
            )}
            {canStart ? (
                <Button
                    kind={ButtonKind.PRIMARY_INVERTED}
                    onClick={handleStartGame}
                >
                    Start Game
                </Button>
            ) : null}
        </>
    );
};
