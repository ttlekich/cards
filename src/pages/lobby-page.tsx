import React from "react";
import styled from "styled-components";
import { NewGameForm } from "../components/new-game-form";
import { withRouter } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    max-width: 600px;
`;

export const LobbyPage = withRouter((props) => {
    const onSubmit = (gameId: string) => {
        props.history.push(`/game/${gameId}`);
    };
    return (
        <Wrapper>
            Lobby
            <NewGameForm onSubmit={onSubmit}></NewGameForm>
        </Wrapper>
    );
});
