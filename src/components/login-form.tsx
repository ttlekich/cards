import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "./loading-spinner";

import { FormWrapper } from "./form-wrapper";
import { useRegisterUser, useSession, useLoginUser } from "../hooks/useAuth";

type Inputs = {
    email: string;
    password: string;
    confirm_password?: string;
};

export const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const { register, handleSubmit, reset, watch, errors } = useForm<Inputs>();

    const registerUser = useRegisterUser();
    const loginUser = useLoginUser();

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data: Inputs) => {
        reset();
        if (isRegister) {
            registerUser.mutate(data);
        } else {
            loginUser.mutate(data);
        }
    };

    return (
        <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-4">
                    <span className="text-sm text-red-400 text-center">
                        {loginUser.isError ? `${loginUser.error}` : ""}
                        {registerUser.isError ? `${registerUser.error}` : ""}
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
                            required: "You must specify a password",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must have at least 8 characters",
                            },
                        })}
                    ></input>
                    <span className="text-sm text-red-400 text-center">
                        {errors.password && <p>{errors.password.message}</p>}
                    </span>
                    {loginUser.isLoading || registerUser.isLoading ? (
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
                                            validate: (value) =>
                                                value === password.current ||
                                                "The passwords do not match",
                                        })}
                                    ></input>
                                    <span className="text-sm text-red-400 text-center">
                                        {errors.confirm_password && (
                                            <p>
                                                {
                                                    errors.confirm_password
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </span>
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
