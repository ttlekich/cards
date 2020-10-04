import React from "react";
import { useForm } from "react-hook-form";
import RequiredFieldError from "./required-field-error";
import Form from "./form";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { UserAction, UserLoginPayload } from "../redux/user/user.types";
import { userLogin } from "../redux/user/user.actions";

type Inputs = {
    email: string;
    password: string;
};

const mapDispatch = (dispatch: Dispatch<UserAction>) => ({
    userLogin: (payload: UserLoginPayload) => dispatch(userLogin(payload)),
});
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const LoginForm = (props: Props) => {
    const { register, handleSubmit, errors, reset } = useForm<Inputs>();
    const { userLogin } = props;
    let history = useHistory();
    const onSubmit = async (data: Inputs) => {
        const { email, password } = data;
        userLogin({
            email,
            password,
            history,
        });
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

export default connector(LoginForm);