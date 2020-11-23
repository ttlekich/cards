import React from "react";
import styled from "styled-components";
import { useOvermind } from "../overmind";
import { Card } from "./card";
import { NOT_PLAYING, PLAYING } from "../entities/game-mode";
import * as R from "ramda";

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
            const lastPlayed = R.last(state.game.discard);
            console.log(lastPlayed);
            return (
                <>
                    {state.game && (
                        <Wrapper>
                            <div>Draw Pile</div>
                            <PileWrapper>
                                <Card
                                    card={{ suit: "S", rank: "A" }}
                                    face={"BACK"}
                                    isSelected={false}
                                ></Card>
                                {lastPlayed && (
                                    <Card
                                        card={lastPlayed}
                                        face={"FRONT"}
                                        isSelected={false}
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
