import * as O from "fp-ts/lib/Option";
import { User } from "../entities/user";

type State = {
    user: O.Option<User>;
};

export const state: State = {
    user: O.none,
};
