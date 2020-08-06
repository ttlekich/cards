import React, { useState } from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../redux/root.reducer";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px solid red;
    width: 100%;
    min-height: 200px;
`;

const Cards = styled.div`
    width: 75%;
`;

const Controls = styled.div`
    width: 25%;
`;

const mapState = (state: RootState) => ({ user: state.user });
const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const PlayerContainer = (props: Props) => {
    const user = props.user;
    const [localReady, setLocalReady] = useState(false);

    const handleClick = (_: React.SyntheticEvent) => {
        setLocalReady(!localReady);
    };

    return (
        <Wrapper>
            <Cards>You Cards</Cards>
            <Controls>
                <button onClick={handleClick}>
                    {localReady ? "Cancel" : "Ready"}
                </button>
            </Controls>
        </Wrapper>
    );
};

export default connector(PlayerContainer);
