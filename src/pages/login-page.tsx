import React from "react";
import styled from "styled-components";
import { LoginForm } from "../components/login-form";
import { useOvermind } from "../overmind";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

export const LoginPage = () => {
    const { actions } = useOvermind();
    const onSubmit = () => {
        actions.showHomePage();
    };
    return (
        <Wrapper>
            <LoginForm onSubmit={onSubmit}></LoginForm>
        </Wrapper>
    );
};
