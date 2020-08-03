import { createContext } from "react";

export interface User extends firebase.User {
    id: string;
}

export const UserContext = createContext<User | null>(null);
