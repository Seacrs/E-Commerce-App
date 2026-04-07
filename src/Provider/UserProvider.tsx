import { useState } from 'react'
import { UserContext } from '../context/index.ts'

interface UserProviderProps {
    children: React.ReactNode;
}

const userProvider = ({children}: UserProviderProps) => {
    const [user, setUser] = useState<string | null>(null);

    const addUser = (user: string) => {
        if(!user) return;
        localStorage.setItem("user", user)
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