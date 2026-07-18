import { useLoaderData, type LoaderFunctionArgs, Link, Await } from 'react-router-dom'
import { requireAuth } from '../util'
import { getProducts, type ProductsResponse } from '../api'
import { Suspense } from 'react';

export async function loader({ params }: LoaderFunctionArgs){
    await requireAuth();
    const { id , name } = params;
    if(!id){
        throw new Response("Category ID is required", { status: 400 });
    }

    return {
        name,
        data: getProducts(id)
    }
}

export default function CategoryDetail(){
    const {name, data } = useLoaderData<{
        name: string;
        data: Promise<ProductsResponse>
    }>();

    const renderProducts = (data: ProductsResponse) => {
        if(data.error){
            return (
                <p className="text-red-400 text-xl p-6">{data.error}</p>
            )
        }

        if(!data.products || data.products.length === 0){
            return (
                <p className="text-gray-500 dark:text-white mt-4 p-6">No products found</p>
            )
        }

        const products = data.products.map(product => (
            <Link
                key={product.id}
                to={`/products/${product.id}`}
                className='decoration-0 unset'
            >
                <div className='w-3xs flex flex-col items-start  mb-4 p-5 pl-6'>
                    <img src={product.images[0]} alt={`Photo of ${product.title}`}  className='rounded-3xl'/>                    
                    <p className='text-xl text-gray-900 dark:text-white mt-2'>{product.title}</p>
                </div>
            </Link>
        ))

        return (
            <div className='p-6 flex gap-4 flex-wrap overflow-hidden'>
                    {products}
            </div>
        )
    }

    return (
        <div className='m-6 p-6'>
            <h1 className="text-3xl font-bold dark:text-white">{name}</h1>
            <Suspense fallback={<h3 className='text-xl text-gray-800 dark:text-white mt-10 p-6'>Loading...</h3>}>
                <Await
                resolve={ data }>
                    {renderProducts}
                </Await>
            </Suspense>
        </div>
    )
}