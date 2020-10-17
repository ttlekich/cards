import { mutate, Operator } from "overmind";
import { Page } from "../types";
import { User } from "../entities/user";
import * as O from "fp-ts/lib/Option";

export const setPage: <T>(page: Page) => Operator<T> = (page) =>
    mutate(function setPage({ state }) {
        window.history.pushState({}, "", `/${page}`);
        state.currentPage = page;
    });

export const setUser: <T>(user: O.Option<User>) => Operator<T> = (user) =>
    mutate(function setUser({ state }) {
        state.user = user;
    });
