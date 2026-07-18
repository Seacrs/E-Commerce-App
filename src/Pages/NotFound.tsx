import { Link } from 'react-router-dom';
import errorImage from '../assets/error.png'

export default function NotFound(){
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            <img src={errorImage} className="w-xl" alt="" />
            <h1>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className='font-bold '>Go back to the homepage</Link>
        </div>
    )
}