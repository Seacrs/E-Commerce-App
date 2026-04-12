import { useNavigate, NavLink } from "react-router-dom"
import clsx from 'clsx'
import { useUser } from '../context/Hook/useUser'
import { useTheme } from '../context/Hook/useTheme'
import moon from '../assets/moon.svg'
import sun from '../assets/icons8-brightness.svg'

export default function Navbar(){
    const navigate = useNavigate();
    const { user, removeUser } = useUser();
    const { theme, toggleTheme } = useTheme();

    function logOut(){
        localStorage.clear();
        removeUser();
        navigate('/', {replace : true})
    }

    const activeStyles = ({ isActive }: { isActive: boolean }) => clsx(
    "font-medium no-underline px-2 py-4 -ml-6 self-center",
    "text-gray-500 dark:text-white",
    "hover:dark:text-green-200 hover:text-gray-800 hover:underline hover:font-bold",
    isActive && "font-bold underline text-gray-800 dark:text-white"
)

    return (
        <div className="bg-green-200 dark:bg-slate-700">
            <div className="p-2 flex items-center justify-between px-10">
                <div className="justify-self-start pl-10">
                    <p className="text-2xl font-bold dark:text-white text-center">{ !user ? "my Shop" : `hi, ${user.name}` }</p>
                </div>
                <div className="">
                    <nav className="flex gap-3 justify-center">
                        <NavLink
                            to="/categories"
                            className={activeStyles}
                        >
                            Categories
                        </NavLink>
                        { user && <button onClick={logOut} className="px-5 py-2 bg-red-400 dark:bg-white dark:text-red-500 hover:bg-white hover:text-red-500 hover:dark:bg-red-400 hover:dark:text-slate-950 rounded-2xl self-center">Log Out</button>}
                        <div className="self-center">
                            {user && <img src={user.avatar} alt="" className="rounded-full w-10 h-10 object-cover"/>}
                        </div>
                        <div className="self-stretch w-px bg-gray-400" />
                        <button onClick={toggleTheme}>
                            <img src={theme ? sun : moon} alt="" className="w-6"/>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}