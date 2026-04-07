import { useEffect } from "react";
import { 
    Form,
    useActionData,
    useLoaderData,
    type ActionFunctionArgs,
    useNavigation,
    useNavigate,

} from 'react-router-dom'
import clsx from 'clsx';
import { loginUser } from '../api.ts'
import type { LoginResponse } from "../api.ts";
import { useUser } from '../Hook/useUser.ts'

export function loader({ request}: ActionFunctionArgs){
    return new URL(request.url).searchParams.get("message");
}


export async function action({ request } : ActionFunctionArgs){
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { foundUser, error } = await loginUser({ email, password});

    return { foundUser, error};
}

export default function App() {
    const actionData = useActionData<LoginResponse>()
    const message = useLoaderData<string>()
    const navigation = useNavigation();
    const navigate = useNavigate()
    const { addUser } = useUser();

    useEffect(() => {
        if(actionData?.foundUser){
            try{
                addUser(actionData.foundUser.name);
                navigate("/categories", { replace: true })
            }
            catch (err){
                console.error("Failed to save user")
            }
        }
    },[actionData])

    const isSubmitting = navigation.state === "submitting"
    const styles = clsx(isSubmitting ? "px-5 py-2 bg-gray-200 rounded-2xl self-end mt-5 mr-20 cursor-not-allowed opacity-60": "px-5 py-2 bg-green-200 rounded-2xl self-end mt-5 mr-20")

    return (
        <div className="grid grid-cols-2 gap-5 justify-center m-32 p-20 bg-gray-100 rounded-xl ">
            <div className='flex flex-col gap-5'>
                <h1 className="text-3xl font-bold">Sign in to your account</h1>
                {message && <h3 className="text-red-400 text-xl">{message}</h3>}
                {actionData?.error && <h3 className="text-red-400 text-xl">{actionData.error}</h3>}
            </div>
            
            <Form method='post' replace className="flex flex-col gap-4">
                <input className='w-sm px-5  py-3 pl-5 bg-white placeholder-gray-600 rounded-lg' name='email' type="email" placeholder='Enter your Email'  />
                <input className='w-sm px-5 mt-4 py-3 pl-5 bg-white placeholder-gray-600 rounded-lg' name='password' type="password" placeholder='Enter your Password'/>
                <button disabled={navigation.state === "submitting"} className={styles}>
                    {isSubmitting
                    ? "Logging in..."
                    : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}