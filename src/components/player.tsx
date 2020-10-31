import React from "react";
import { User } from "../entities/user";
import { useOvermind } from "../overmind";
import { Button } from "./button";

type Props = {
    player: User;
};

export const Player = (props: Props) => {
    const { state, actions } = useOvermind();
    const handleOnClickReady = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };
    return (
        <div>
            {props.player.email}
            {state.user?.email === props.player.email && (
                <Button primary={false} onClick={handleOnClickReady}>
                    Ready
                </Button>
            )}
        </div>
    );
};
