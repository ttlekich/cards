import React from "react";
import { useForm } from "react-hook-form";
import RequiredFieldError from "./required-field-error";
import Form from "./form";

type Inputs = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const { register, handleSubmit, errors, reset } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => {
        console.log(data);
        reset();
    };

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    ref={register({ required: "You must specify an email." })}
                ></input>
                {errors.email && (
                    <RequiredFieldError>
                        {errors.email.message}
                    </RequiredFieldError>
                )}
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    ref={register({ required: "You must specify a password." })}
                ></input>
                {errors.password && (
                    <RequiredFieldError>
                        {errors.password.message}
                    </RequiredFieldError>
                )}
                <button type="submit">{"Login"}</button>
            </Form>
        </div>
    );
};

export default LoginForm;
