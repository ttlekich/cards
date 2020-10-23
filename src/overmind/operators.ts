import { mutate, Operator } from "overmind";
import { Page } from "../types";
import { User } from "../entities/user";

export const setPage: <T>(page: Page) => Operator<T> = (page) =>
    mutate(function setPage({ state }) {
        window.history.pushState({}, "", `/${page}`);
        state.currentPage = page;
    });

export const setUser: <T>(user: User) => Operator<T> = (user) =>
    mutate(function setUser({ state }) {
        state.user = user;
    });
