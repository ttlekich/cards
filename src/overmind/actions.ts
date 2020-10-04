import { Action } from "overmind";

export const noArgAction: Action = (context, value) => {
    return value; // this becomes "void"
};

export const argAction: Action<string> = (context, value) => {
    console.log(value);
};

export const noArgWithReturnTypeAction: Action<void, string> = (
    context,
    value
) => {
    return "foo";
};

export const argWithReturnTypeAction: Action<string, string> = (
    context,
    value
) => {
    return value + "!!!";
};
