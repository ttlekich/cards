import React from "react";
import AuthButton from "./auth-button";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../redux/root.reducer";
import { connect, ConnectedProps } from "react-redux";

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

const mapState = (state: RootState) => ({ user: state.user });
const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Navigation = (props: Props) => {
    const { user } = props.user;
    return (
        <Header>
            <Option>
                <Link to="/">Cards</Link>
            </Option>
            <Options>
                {user && (
                    <Option>
                        <Link to="/lobby">Lobby</Link>
                    </Option>
                )}
                <Option>
                    <AuthButton></AuthButton>
                </Option>
            </Options>
        </Header>
    );
};

export default connector(Navigation);
