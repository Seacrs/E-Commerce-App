import { 
    Form,
    useActionData,
    type ActionFunctionArgs,
} from 'react-router-dom'


export async function action({ request } : ActionFunctionArgs){
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    try{
        if(!email || !password){
            throw new Error("Please fill in all fields")
        }
    } catch (error){
        if(error instanceof Error){
            return error.message
        }
    }

    console.log({"email": email, "password": password})
}

export default function App() {
    const errorMessage = useActionData<string | null>()

    return (
        <div className="grid grid-cols-2 gap-5 justify-center m-32 p-20 bg-gray-100 rounded-xl ">
            <div className='flex flex-col gap-5'>
                <h1 className="text-3xl font-bold">Sign in to your account</h1>
                {errorMessage && <h3 className="text-red-400 text-xl">{errorMessage}</h3>}
            </div>
            
            <Form method='post' className="flex flex-col gap-4">
                <input className='w-sm px-5  py-3 pl-5 bg-white placeholder-gray-600 rounded-lg' name='email' type="email" placeholder='Enter your Email'  />
                <input className='w-sm px-5 mt-4 py-3 pl-5 bg-white placeholder-gray-600 rounded-lg' name='password' type="password" placeholder='Enter your Password'/>
                <button className="px-5 py-2 bg-amber-200 rounded-2xl self-end mt-5 mr-20">
                    Log in
                </button>
            </Form>
        </div>
    )
}