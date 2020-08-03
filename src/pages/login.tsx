import React from "react";
import LoginForm from "../components/login-form";
import RegisterForm from "../components/register-form";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

const Login = () => {
    return (
        <Wrapper>
            <LoginForm></LoginForm>
            <RegisterForm></RegisterForm>
        </Wrapper>
    );
};

export default Login;
