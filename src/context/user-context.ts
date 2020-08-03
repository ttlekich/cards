import { createContext } from "react";

export const UserContext = createContext<firebase.User | null>(null);
