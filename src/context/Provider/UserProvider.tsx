import { useState } from 'react'
import { UserContext, type User } from '../index.ts'

interface UserProviderProps {
    children: React.ReactNode;
}

const userProvider = ({children}: UserProviderProps) => {
    const [user, setUser] = useState<User |null>(()=>{
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const addUser = (user: User) => {
        if(!user) return;
        localStorage.setItem("user", (JSON.stringify(user)))
        setUser(user);
    }

    const removeUser = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <UserContext value={{ user, addUser, removeUser}}>
            {children}
        </UserContext>
    )
}

export default userProvider;