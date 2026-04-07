import { useEffect } from "react";
import { 
    Form,
    useActionData,
    type ActionFunctionArgs,
    redirect,

} from 'react-router-dom'
import { loginUser } from '../api.ts'
import type { LoginResponse } from "../api.ts";
import { useUser } from '../Hook/useUser.ts'


export async function action({ request } : ActionFunctionArgs){
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { foundUser, error } = await loginUser({ email, password});

    return { foundUser, error};
}

export default function App() {
    const actionData = useActionData<LoginResponse>()
    const { addUser } = useUser();

    useEffect(() => {
        if(actionData?.foundUser){
            try{
                addUser(actionData.foundUser.name);
                console.log("User added to context and localStorage");
            }
            catch (err){
                console.error("Failed to save user")
            }
        }
    },[actionData])

    return (
        <div className="grid grid-cols-2 gap-5 justify-center m-32 p-20 bg-gray-100 rounded-xl ">
            <div className='flex flex-col gap-5'>
                <h1 className="text-3xl font-bold">Sign in to your account</h1>
                {actionData?.error && <h3 className="text-red-400 text-xl">{actionData.error}</h3>}
            </div>
            
            <Form method='post' replace className="flex flex-col gap-4">
                <input className='w-sm px-5  py-3 pl-5 bg-white placeholder-gray-600 rounded-lg' name='email' type="email" placeholder='Enter your Email'  />
                <input className='w-sm px-5 mt-4 py-3 pl-5 bg-white placeholder-gray-600 rounded-lg' name='password' type="password" placeholder='Enter your Password'/>
                <button className="px-5 py-2 bg-amber-200 rounded-2xl self-end mt-5 mr-20">
                    Log in
                </button>
            </Form>
        </div>
    )
}