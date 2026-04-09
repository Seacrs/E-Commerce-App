import { useNavigate, NavLink } from "react-router-dom"
import clsx from 'clsx'
import { useUser } from '../context/Hook/useUser'

export default function Navbar(){
    const navigate = useNavigate();
    const { user, removeUser } = useUser();

    function logOut(){
        localStorage.clear();
        removeUser();
        navigate('/', {replace : true})
    }

    const activeStyles = ({ isActive } : { isActive : boolean}) => clsx(
        `no-underline text-gray-500 font-medium px-2 py-4 -ml-6 hover:text-gray-800 hover:underline hover:font-bold self-center`, 
        isActive && "font-bold underline text-gray-800 self-center")     

    return (
        <div className="bg-green-100">
            <div className="p-4 flex items-center justify-between px-10">
                <div className="justify-self-start pl-10">
                    <p className="text-2xl font-bold text-center">{ !user ? "E-commerce App" : `hi, ${user.name}` }</p>
                </div>
                <div className="">
                    <nav className="flex gap-3 justify-center">
                        <NavLink
                            to="/categories"
                            className={activeStyles}
                        >
                            Categories
                        </NavLink>
                        { user && <button onClick={logOut} className="px-5 py-2 bg-red-400 rounded-2xl self-center">Log Out</button>}
                        <div className="self-center">
                            {user && <img src={user.avatar} alt="" className="rounded-full w-10 h-10 object-cover"/>}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}