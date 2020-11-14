import React from "react";
import styled from "styled-components";
import { useOvermind } from "../overmind";
import { Card } from "./card";
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
    const lastPlayed = state.game && R.head(state.game.discard);
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
                            <Card card={lastPlayed} face={"FRONT"}></Card>
                        )}
                    </PileWrapper>
                </Wrapper>
            )}
        </>
    );
};
