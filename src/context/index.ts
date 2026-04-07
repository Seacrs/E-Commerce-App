import { createContext } from 'react';

export interface UserContextType{
    user: string | null;
    addUser: (user: string) => void;
    removeUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export { UserContext }