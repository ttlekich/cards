import React from "react";
import { useForm } from "react-hook-form";
import Form from "./form";
import RequiredFieldError from "./required-field-error";
import { useOvermind } from "../overmind";

type Inputs = {
    gameName: string;
};

export const NewGameForm = () => {
    const { actions } = useOvermind();
    const { register, handleSubmit, errors, reset } = useForm<Inputs>();
    const onSubmit = async ({ gameName }: Inputs) => {
        actions.joinGame(gameName);
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
