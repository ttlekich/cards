import React, { useState, Dispatch } from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../redux/root.reducer";
import { GameUpdatePayload, GameAction } from "../redux/game/game.types";
import { gameUpdate } from "../redux/game/game.actions";

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

const mapState = (state: RootState) => ({ user: state.user, game: state.game });
const mapDispatch = (dispatch: Dispatch<GameAction>) => ({
    gameUpdate: (payload: GameUpdatePayload) => dispatch(gameUpdate(payload)),
});
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const PlayerContainer = (props: Props) => {
    const [localReady] = useState(props.game.isReady);

    const handleClick = (_: React.SyntheticEvent) => {
        props.gameUpdate({
            game: {
                isReady: true,
            },
        });
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
