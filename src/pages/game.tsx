import React, { useState } from "react";
import styled from "styled-components";
import OtherPlayerContainer from "../components/other-player-container";
import DeckContainer from "../components/deck-container";
import PlayerContainer from "../components/player-container";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
`;

const OtherPlayerContainers = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Game = () => {
    const [userGames, setUserGames] = useState([
        {
            id: 0,
            username: "Player 1",
            cardsLeft: 4,
        },
        {
            id: 1,
            username: "Player 2",
            cardsLeft: 5,
        },
        {
            id: 2,
            username: "Player 3",
            cardsLeft: 6,
        },
    ]);
    return (
        <Wrapper>
            <h1>Game</h1>
            <OtherPlayerContainers>
                {userGames.map((userGame) => (
                    <OtherPlayerContainer
                        key={userGame.id}
                        userGame={userGame}
                    ></OtherPlayerContainer>
                ))}
            </OtherPlayerContainers>
            <DeckContainer></DeckContainer>
            <PlayerContainer></PlayerContainer>
        </Wrapper>
    );
};
export default Game;
