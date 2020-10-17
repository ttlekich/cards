import React from "react";
import styled from "styled-components";
import { LoginForm } from "../components/login-form";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

export const LoginPage = () => {
    return (
        <Wrapper>
            <LoginForm></LoginForm>
        </Wrapper>
    );
};
