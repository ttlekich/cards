import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOvermind } from "../overmind";
import { LoadingSpinner } from "./loading-spinner";

import { useMutation } from "react-query";
import { auth } from "../overmind/effects";
import { FormWrapper } from "./form-wrapper";

type Inputs = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false);

    const login = useMutation(async ({ email, password }: Inputs) => {
        try {
            const token = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            return token;
        } catch (error) {
            throw new Error("email or password is invalid.");
        }
    });

    const { register, handleSubmit, reset } = useForm<Inputs>();

    const { actions } = useOvermind();

    useEffect(() => {
        if (login.isSuccess && login.data) {
            actions.setUser(login.data);
        }
    }, [login, actions]);

    const onSubmit = (data: Inputs) => {
        reset();
        login.mutate(data);
    };

    return (
        <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-4">
                    <span className="text-sm text-red-400 text-center">
                        {login.isError ? `${login.error}` : ""}
                    </span>
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
                    {login.isLoading ? (
                        <LoadingSpinner></LoadingSpinner>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </form>
        </FormWrapper>
    );
};
