import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    outline: 1px solid red;
    width: 100%;
    min-height: 150px;
`;

const CardsLeft = styled.span``;

type Props = {
    userGame: {
        id: number;
        cardsLeft: number;
        username: string;
    };
};

const OtherPlayerContainer: React.FC<Props> = (props: Props) => {
    const { userGame } = props;
    return (
        <Wrapper>
            <span>{userGame.username}</span>
            <CardsLeft>Cards Remaining: {userGame.cardsLeft}</CardsLeft>
        </Wrapper>
    );
};

export default OtherPlayerContainer;
