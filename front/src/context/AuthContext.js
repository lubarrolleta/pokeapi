import { createContext } from "react";
export const AuthContext = createContext({
    auth: null,
    favorites: null,
    openModal: true,
    closeModal: false
});