import React from "react";
import { useForm } from "react-hook-form";
import Form from "./form";
import RequiredFieldError from "./required-field-error";
import { useHistory } from "react-router-dom";

type Inputs = {
    gameName: string;
};

const NewGameForm = () => {
    const { register, handleSubmit, errors, reset } = useForm<Inputs>();
    let history = useHistory();
    const onSubmit = async (data: Inputs) => {
        history.push(`/game/${data.gameName}`);
        reset();
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

export default NewGameForm;
