import React from "react";
import { useForm } from "react-hook-form";
import RequiredFieldError from "./required-field-error";
import Form from "./form";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";

type Inputs = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const { register, handleSubmit, errors, reset } = useForm<Inputs>();
    let history = useHistory();
    const onSubmit = async (data: Inputs) => {
        const { email, password } = data;
        // TODO - loading/error states.
        await auth.signInWithEmailAndPassword(email, password);
        history.push("/lobby");
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
