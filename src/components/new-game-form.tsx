import React from "react";
import { useForm } from "react-hook-form";
import Form from "./form";
import RequiredFieldError from "./required-field-error";
import { useHistory } from "react-router-dom";
import { RootState } from "../redux/root.reducer";
import { connect, ConnectedProps } from "react-redux";
import { GameAction } from "../redux/game/game.actions";
import { Dispatch } from "redux";

type Inputs = {
    gameName: string;
};

const mapState = (state: RootState) => ({ game: state.game });
const mapDispatch = (dispatch: Dispatch<GameAction>) => ({
    newGame: (name: string) => dispatch(GameAction.newGame(name)),
});
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const NewGameForm = (props: Props) => {
    const { newGame } = props;
    const { register, handleSubmit, errors, reset } = useForm<Inputs>();
    let history = useHistory();
    const onSubmit = async (data: Inputs) => {
        history.push(`/game/${data.gameName.toLowerCase()}`);
        reset();
        newGame(data.gameName.toLowerCase());
    };

    return (
        <div>
            <h1>Join or Start a Game</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="gameName"
                    placeholder="Game Name"
                    type="text"
                    ref={register({})}
                ></input>
                {errors.gameName && (
                    <RequiredFieldError>
                        {errors.gameName.message}
                    </RequiredFieldError>
                )}
                <button type="submit">{"Join"}</button>
            </Form>
        </div>
    );
};

export default connector(NewGameForm);
