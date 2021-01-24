import React from "react";
import {
    CHOOSE_SUIT,
    DrawCard,
    DRAW_CARD,
    PLAY_CARD,
    SKIP_TURN,
} from "../entities/game";
import { PLAYING } from "../entities/game-mode";
import * as R from "ramda";
import { SuitChooser } from "./suit-chooser";
import { useGameSelector } from "../hooks/useGame";
import type { Suit } from "../crazy-eights/deck";

type Props = {
    handlePlayCard: (event: React.SyntheticEvent) => void;
    handleDrawCard: (nCards: number) => (event: React.SyntheticEvent) => void;
    handleChooseSuit: (suit: Suit) => (event: React.SyntheticEvent) => void;
    handleSkip: (event: React.SyntheticEvent) => void;
    isTurn: boolean;
};

export const TurnControls: React.FC<Props> = ({
    handlePlayCard,
    handleDrawCard,
    handleChooseSuit,
    handleSkip,
    isTurn,
}) => {
    const game = useGameSelector();

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
                <button
                    className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-sm"
                    onClick={handlePlayCard}
                    disabled={!isTurn}
                >
                    Play Card
                </button>
            )}
            {drawCard && (
                <button
                    className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-sm"
                    onClick={handleDrawCard(drawCard.payload)}
                    disabled={!isTurn}
                >
                    {`Draw Card (${drawCard.payload})`}
                </button>
            )}
            {skipTurn && (
                <button
                    className="bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded text-sm"
                    onClick={handleSkip}
                    disabled={!isTurn}
                >
                    Skip Turn
                </button>
            )}
        </>
    );
};
