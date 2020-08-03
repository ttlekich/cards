import React from "react";
import { useForm } from "react-hook-form";
import Form from "./form";
import RequiredFieldError from "./required-field-error";
import { auth, createUserDocument } from "../firebase/config";

type Inputs = {
    email: string;
    password: string;
    passwordConfirm: string;
};

const RegisterForm = () => {
    const { register, handleSubmit, errors, reset, watch } = useForm<Inputs>();
    const onSubmit = async (data: Inputs) => {
        const { email, password } = data;
        try {
            // Actually creates a user.
            // TODO - display error in form.
            // TODO - loading states.
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            // Save user to a document.
            if (user) {
                await createUserDocument(user);
            }
        } catch (error) {
            console.error(error);
        }
        reset();
    };

    return (
        <div>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
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
                    ref={register({
                        required: "You must specify a password.",
                        minLength: {
                            value: 6,
                            message:
                                "Password must have at least 6 characters.",
                        },
                    })}
                ></input>
                {errors.password && (
                    <RequiredFieldError>
                        {errors.password.message || "This is a required field."}
                    </RequiredFieldError>
                )}
                <input
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    ref={register({
                        required: true,
                        validate: (value) =>
                            value === watch("password") ||
                            "The passwords do not match.",
                    })}
                ></input>
                {errors.passwordConfirm && (
                    <RequiredFieldError>
                        {errors.passwordConfirm.message ||
                            "This is a required field."}
                    </RequiredFieldError>
                )}
                <button type="submit">{"Register"}</button>
            </Form>
        </div>
    );
};

export default RegisterForm;
