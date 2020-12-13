import React from "react";
import styled from "styled-components";
import { Suit, Suits } from "../crazy-eights/deck";
import { SuitButton } from "./suit-button";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`;

type Props = {
    handleChooseSuit: (suit: Suit) => (event: React.SyntheticEvent) => void;
};

export const SuitChooser: React.FC<Props> = ({ handleChooseSuit }) => {
    return (
        <Wrapper>
            {Suits.map((suit) => (
                <SuitButton
                    key={suit}
                    suit={suit}
                    onClick={handleChooseSuit(suit)}
                ></SuitButton>
            ))}
        </Wrapper>
    );
};
