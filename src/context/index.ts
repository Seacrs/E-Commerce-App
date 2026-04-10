import { createContext } from 'react';

export interface User {
    name: string;
    avatar: string;
}
export interface UserContextType{
    user: User | null;
    addUser: (user: User) => void;
    removeUser: () => void;
}

export interface ThemeContextType{
    theme: boolean;
    toggleTheme: () => void;
}

const UserContext = createContext<UserContextType | null>(null);
const ThemeContext = createContext<ThemeContextType | null>(null);

export { UserContext, ThemeContext }