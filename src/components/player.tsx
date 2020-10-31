import React from "react";
import { UserGame } from "../entities/user-game";
import { useOvermind } from "../overmind";
import { Button } from "./button";

type Props = {
    player: UserGame;
};

export const Player = (props: Props) => {
    const { state, actions } = useOvermind();
    const handleOnClickReady = (event: React.SyntheticEvent) => {
        event.preventDefault();
        actions.setUserIsReady();
    };
    const userGame =
        state.game && state.user
            ? state.game.userGameRecord[state.user.email]
            : undefined;
    const isReady = Boolean(userGame?.isReady);
    return (
        <div>
            {props.player.email}
            {state.user?.email === props.player.email ? (
                <Button primary={isReady} onClick={handleOnClickReady}>
                    {isReady ? "Waiting..." : "I'm Ready"}
                </Button>
            ) : (
                <Button
                    primary={props.player.isReady}
                    onClick={handleOnClickReady}
                >
                    {props.player.isReady ? "Ready" : "I'm Ready"}
                </Button>
            )}
        </div>
    );
};
