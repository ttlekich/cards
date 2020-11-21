import { mutate, Operator } from "overmind";
import { User } from "../entities/user";

export const setUser: <T>(user: User) => Operator<T> = (user) =>
    mutate(function setUser({ state }) {
        state.user = user;
    });
