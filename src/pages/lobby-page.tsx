import React from "react";
import styled from "styled-components";
import { NewGameForm } from "../components/new-game-form";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
`;

export const LobbyPage = () => {
    return (
        <Wrapper>
            Lobby
            <NewGameForm></NewGameForm>
        </Wrapper>
    );
};
