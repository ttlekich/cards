import React from "react";
import styled from "styled-components";
import { NewGameForm } from "../components/new-game-form";
import { useOvermind } from "../overmind";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
`;

export const LobbyPage = () => {
    const { actions } = useOvermind();
    const onSubmit = (gameId: string) => {
        actions.showGamePage({ gameId });
    };
    return (
        <Wrapper>
            Lobby
            <NewGameForm onSubmit={onSubmit}></NewGameForm>
        </Wrapper>
    );
};
