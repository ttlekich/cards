import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useOvermind } from "../overmind";
import { Button, ButtonKind } from "./button";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0.5rem;
`;

export const Title = styled.div``;

export const Controls = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

export const Navigation = () => {
    const history = useHistory();
    const { actions } = useOvermind();

    const handleLeaveGame = (event: React.SyntheticEvent) => {
        event.preventDefault();
        actions.leaveGame();
        history.push("/lobby");
    };

    const handleSignOut = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        await actions.logoutUser();
        history.push("/login");
    };

    return (
        <Wrapper>
            <Title>Crazy 8's</Title>
            <Controls>
                <Button
                    size={"s"}
                    kind={ButtonKind.PRIMARY}
                    onClick={handleLeaveGame}
                >
                    Leave Game
                </Button>
                <Button
                    size={"s"}
                    kind={ButtonKind.PRIMARY}
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            </Controls>
        </Wrapper>
    );
};
