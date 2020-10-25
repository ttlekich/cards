import React from "react";
import styled from "styled-components";
import { LoginForm } from "../components/login-form";
import { withRouter } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

export const LoginPage = withRouter((props) => {
    const onSubmit = () => {
        props.history.push("/");
    };
    return (
        <Wrapper>
            <LoginForm onSubmit={onSubmit}></LoginForm>
        </Wrapper>
    );
});
