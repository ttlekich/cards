import React from "react";
import { UserGame } from "../entities/user-game";
import { useOvermind } from "../overmind";
import styled from "styled-components";
import { Card } from "./card";

type Props = {
    player: UserGame;
};

const Wrapper = styled.div``;

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

export const Player = (props: Props) => {
    const { state, actions } = useOvermind();
    const { player } = props;
    const userGame = props.player;
    const isPlaying = state.game?.isPlaying;
    const isPlayer = state.user?.email === player.email;
    return (
        <Wrapper>
            <PlayerInfo>
                <Field>{userGame?.playerNumber}</Field>
                <Field>{props.player.email}</Field>
            </PlayerInfo>
            <Hand>
                {isPlaying && (
                    <>
                        {props.player.hand.map((card) => (
                            <Card
                                face={isPlayer ? "FRONT" : "BACK"}
                                key={card.rank + card.suit}
                                card={card}
                            ></Card>
                        ))}
                    </>
                )}
            </Hand>
        </Wrapper>
    );
};
