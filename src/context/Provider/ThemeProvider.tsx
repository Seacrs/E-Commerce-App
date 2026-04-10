import { useState } from 'react'
import { ThemeContext } from "../index";

export interface ThemeProviderProps{
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<boolean>(false);

    const toggleTheme = () => {
        setTheme(prev => !prev)
    }

    return (
        <ThemeContext value={{theme, toggleTheme}}>
            { children }
        </ThemeContext>
    )
}

export default ThemeProvider
