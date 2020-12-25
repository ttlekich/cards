import React from "react";
import { useForm } from "react-hook-form";
import { useOvermind } from "../overmind";

type Inputs = {
    gameName: string;
};

type Props = {
    onSubmit: (gameId: string) => void;
};

export const NewGameForm = (props: Props) => {
    const { actions } = useOvermind();
    const { register, handleSubmit, errors, reset } = useForm<Inputs>();
    const onSubmit = async ({ gameName }: Inputs) => {
        actions.joinGame(gameName);
        reset();
        props.onSubmit(gameName);
    };

    return (
        <div className="w-1/2 py-10 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-4">
                    <label
                        className="mb-1 uppercase font-bold text-sm text-gray-600"
                        htmlFor="game_name"
                    >
                        Join A Game
                    </label>
                    <input
                        className="mb-4 border rounded py-2 px-2 text-gray-900"
                        name="game_name"
                        id="game_name"
                        placeholder="Game Name"
                        type="text"
                        ref={register({})}
                    ></input>
                    <button
                        className="rounded py-1 px-2 bg-gray-900 hover:bg-gray-700 text-white"
                        type="submit"
                    >
                        Join
                    </button>
                </div>
            </form>
        </div>
    );
};
