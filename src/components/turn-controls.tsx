import React from "react";
import { DrawCard, DRAW_CARD, PLAY_CARD, SKIP_TURN } from "../entities/game";
import { PLAYING } from "../entities/game-mode";
import { useOvermind } from "../overmind";
import { Button, ButtonKind } from "./button";
import * as R from "ramda";

type Props = {
    handlePlayCard: (event: React.SyntheticEvent) => void;
    handleDrawCard: (nCards: number) => (event: React.SyntheticEvent) => void;
    handleStartGame: (event: React.SyntheticEvent) => void;
    isTurn: boolean;
    canStart: boolean;
};

export const TurnControls: React.FC<Props> = ({
    handlePlayCard,
    handleDrawCard,
    handleStartGame,
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

    return (
        <>
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
                    onClick={handleDrawCard(3)}
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
