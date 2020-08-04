import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px solid red;
    width: 100%;
    min-height: 200px;
`;

const PlayerContainer = () => {
    return <Wrapper>Player</Wrapper>;
};

export default PlayerContainer;
