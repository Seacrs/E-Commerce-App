import {Link, Outlet, NavLink, useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import clsx from 'clsx';
import { requireAuth } from '../../util';
import { getProduct, type ProductResponse } from "../../api";

export async function loader({ params }: LoaderFunctionArgs){
    await requireAuth();
    const { id } = params;

    if(!id){
        throw new Response("Category ID is required", { status: 400 });
    }

    return getProduct(id);
}
export default function Product(){
    const data = useLoaderData<ProductResponse>();
    const activeStyles = ({ isActive } : { isActive : boolean}) => clsx(
        `no-underline text-gray-500 font-medium px-2 py-4 -ml-6 hover:text-gray-800 hover:underline hover:font-bold`, 
        isActive && "font-bold underline text-gray-800")        
    return (
        <div>
            <Link to=".."
                relative="path"
                className="decoration-0 mt-14 ml-7"
                >&larr; 
                <span>Back to all vans</span>
            </Link>
            {data.error && <h3 className="text-red-400 text-xl">{data.error}</h3>}
            {!data.error && data.product && 
                <div className='p-6 mx-7 my-6 bg-white'>
                    <div className='flex flex-col gap-3'>
                        <img src={data.product.images[0]} alt="" />
                        <div>
                            <h3 className='mt-6 mb-1 text-xl text-gray-900'>{data.product.title}</h3>
                            <h4 className='text-lg text-gray-900'>${data.product.price}</h4>
                        </div>
                    </div>
                    <nav className='flex gap-2 my-6'>
                        <NavLink
                            to="."
                            className={activeStyles}
                        >
                            Details
                        </NavLink>
                        <NavLink
                            to="photos"
                            className={activeStyles}
                        >
                            Photos
                        </NavLink>
                    </nav>
                    <Outlet context={data.product}/>
                </div>
            }
        </div>
    )
}