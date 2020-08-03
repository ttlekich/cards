import React from "react";
import AuthButton from "./auth-button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 25px;

    a {
        color: white;
        text-decoration: none;
    }
`;

const Options = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
`;

const Option = styled.div`
    padding: 10px 15px;
`;

const Navigation = () => (
    <Header>
        <Option>
            <Link to="/">Cards</Link>
        </Option>
        <Options>
            <Option>
                <Link to="/lobby">Lobby</Link>
            </Option>
            <Option>
                <AuthButton></AuthButton>
            </Option>
        </Options>
    </Header>
);

export default Navigation;
