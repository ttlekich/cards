import React from "react";
import styled from "styled-components";
import { useOvermind } from "../overmind";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

export const GamePage = () => {
    const { actions } = useOvermind();
    return <Wrapper>Game</Wrapper>;
};
