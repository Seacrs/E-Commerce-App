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

const UserContext = createContext<UserContextType | null>(null);

export { UserContext }