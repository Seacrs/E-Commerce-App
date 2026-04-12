import { useState, useEffect } from 'react'
import { ThemeContext } from "../index";

export interface ThemeProviderProps{
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<boolean>(()=>{
        return localStorage.getItem("dark") === "true";
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme);
        document.body.classList.toggle('dark', theme);
        localStorage.setItem("dark", String(theme))
    }, [theme]);

    const toggleTheme = () => setTheme(prev =>{
        return !prev
    })

    return (
        <ThemeContext value={{theme, toggleTheme}}>
            { children }
        </ThemeContext>
    )
}

export default ThemeProvider