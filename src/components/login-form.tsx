import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useOvermind } from "../overmind";
import { LoadingSpinner } from "./loading-spinner";

import { useQuery, useMutation, QueryClient } from "react-query";
import { auth } from "../overmind/effects";

const queryClient = new QueryClient();

type Props = {
    onSubmit: () => void;
};

type Inputs = {
    email: string;
    password: string;
};

// const loginUser = async (email: string, password: string) => {
//     const token = await api.auth.signInWithEmailAndPassword(email, password);
//     const user = User.decode(token.user);
//     if (E.isLeft(user)) {
//         return undefined;
//     }
//     cookies.saveUser(user.right);
//     return user.right;
// };

export const LoginForm = (props: Props) => {
    const [isRegister, setIsRegister] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const login = useMutation(async ({ email, password }: Inputs) => {
        const token = await auth.signInWithEmailAndPassword(email, password);
        console.log(token);
        return token;
    });

    const { register, handleSubmit, errors, reset } = useForm<Inputs>();

    const { actions } = useOvermind();

    const onSubmit = async (data: Inputs) => {
        await login.mutate(data);
        console.log(login.isSuccess);
        if (login.isSuccess && login.data) {
            actions.loginUser(login.data);
        }
        reset();
        props.onSubmit();
    };

    return (
        <div
            className={`w-1/2 pt-10 ${
                submitted ? "pb-10" : "pb-5"
            } px-10 mt-10 mx-auto shadow-md rounded`}
        >
            {login.isLoading ? (
                <LoadingSpinner />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-4">
                        <label
                            className="mb-1 uppercase font-bold text-sm text-gray-600"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="mb-4 border rounded py-2 px-2 text-gray-900"
                            name="email"
                            id="email"
                            placeholder="Email"
                            type="email"
                            ref={register({
                                required: "You must specify an email.",
                            })}
                        ></input>
                        <label
                            className="mb-1 uppercase font-bold text-sm text-gray-600"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="mb-4 border rounded py-2 px-2 text-gray-900"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Password"
                            ref={register({
                                required: "You must specify a password.",
                            })}
                        ></input>
                        {isRegister && (
                            <>
                                <label
                                    className="mb-1 uppercase font-bold text-sm text-gray-600"
                                    htmlFor="confirm_password"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    className="mb-4 border rounded py-2 px-2 text-gray-900"
                                    name="confirm_password"
                                    id="confirm_password"
                                    type="password"
                                    placeholder="Confirm Password"
                                    ref={register({
                                        required:
                                            "You must specify a password.",
                                    })}
                                ></input>
                            </>
                        )}
                        <button
                            className="rounded py-1 px-2 bg-gray-900 hover:bg-gray-700 text-white"
                            type="submit"
                        >
                            {isRegister ? "Sign Up" : "Login"}
                        </button>
                        <button
                            className="mx-auto mt-2 p-2 text-sm hover:bg-gray-200 rounded"
                            onClick={(event: React.SyntheticEvent) => {
                                event.preventDefault();
                                setIsRegister(!isRegister);
                            }}
                        >
                            {isRegister ? "Login" : "Sign Up"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
