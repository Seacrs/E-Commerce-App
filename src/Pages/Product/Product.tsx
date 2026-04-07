import {Link, Outlet, NavLink, useLoaderData, type LoaderFunctionArgs } from 'react-router-dom'
import { requireAuth } from '../../util'

export async function loader({ params }: LoaderFunctionArgs){
    await requireAuth();
    const { id } = params;

    if(!id){
        throw new Response("Category ID is required", { status: 400 });
    }
    return 
}
export default function Product(){
    return (
        <div>

        </div>
    )
}