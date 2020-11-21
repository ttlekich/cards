import React from "react";
import styled from "styled-components";
import { useOvermind } from "../overmind";
import { Card } from "./card";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const PileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export const DrawPile = () => {
    const { state } = useOvermind();
    if (!state.game) return <></>;
    switch (state.game.mode) {
        case PLAYING:
            const lastPlayed = state.game.discard[0];
            return (
                <>
                    {state.game && (
                        <Wrapper>
                            <div>Draw Pile</div>
                            <PileWrapper>
                                <Card
                                    card={{ suit: "S", rank: "A" }}
                                    face={"BACK"}
                                ></Card>
                                {lastPlayed && (
                                    <Card
                                        card={lastPlayed}
                                        face={"FRONT"}
                                    ></Card>
                                )}
                            </PileWrapper>
                        </Wrapper>
                    )}
                </>
            );
        case NOT_PLAYING:
            return <></>;
    }
};
