import { useLoaderData, type LoaderFunctionArgs, Link } from 'react-router-dom'
import { requireAuth } from '../util'
import { getProducts, type ProductsResponse } from '../api'

interface loaderResponse {
    name: string;
    data: ProductsResponse;
}
export async function loader({ params }: LoaderFunctionArgs){
    await requireAuth();
    const { id , name } = params;
    if(!id){
        throw new Response("Category ID is required", { status: 400 });
    }
    const data = await getProducts(id)

    return {name, data}
}

export default function CategoryDetail(){
    const {name, data } = useLoaderData<loaderResponse>();

    const renderProducts = (data: ProductsResponse) => {
        if(data.error || !data.products) return;

        const products = data.products.map(product => (
            <Link
                key={product.id}
                to={`${product.id}`}
                className='decoration-0 unset'
            >
                <div className='w-3xs flex flex-col item-start bg-white mb-4 p-5 pl-6'>
                    <img src={product.images[0]} alt={`Photo of ${product.title}`} />
                    <p className=' text-xl text-gray-800 mt-4'>${product.price}</p>
                    <p className='text-xl text-gray-800 mt-2'>{product.title}</p>
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
        <div className='p-6 flex gap-5 flex-wrap overflow-hidden'>
            <h1 className="text-3xl font-bold">{name}</h1>
            {data.error && <h3 className="text-red-400 text-xl">{data.error}</h3>}
            {!data.error && data.products && renderProducts(data)}
        </div>
    )
}