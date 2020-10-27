import React from "react";
import { User } from "../entities/user";

type Props = {
    player: User;
};

export const Player = (props: Props) => {
    return <div>{props.player.email}</div>;
};
