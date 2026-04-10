import { useLoaderData, type LoaderFunctionArgs, Await } from 'react-router-dom';
import { Suspense } from 'react'
import { requireAuth } from '../util';
import { getProduct, type ProductResponse } from "../api";

export async function loader({ params }: LoaderFunctionArgs){
    await requireAuth();
    const { productId } = params;

    if(!productId){
        throw new Response("Category productId is required", { status: 400 });
    }

    return {
        data: getProduct(productId)
    };
}
export default function Product(){
    const { data } = useLoaderData<{data: ProductResponse}>();   

    const renderProductDetails = (data: ProductResponse) => {
        if(data.error){
            return (
                <p className="text-red-400 text-xl p-6">{data.error}</p>    
            )
        }
        if(!data.product){
            return (
                <p className="text-gray-500 mt-4 p-6">Can't find the product</p>
            )
        }

        const displayImages = data.product.images.map(image => <img src={image} alt="" className='rounded-2xl' /> );

        return (
            <div className='p-10 mx-7 my-6 bg-white grid grid-cols-2'>
                <div className='flex flex-col item-start bg-white'>
                    <div className='w-md'>
                        <img src={data.product.images[0]} alt="" className='rounded-3xl'/>
                    </div>
                    <div className='w-3xs grid grid-cols-3 gap-2 mt-5'>
                        {displayImages}
                    </div>
                </div>
                <div>
                    <h3 className='mt-6 mb-1 text-xl font-bold text-gray-900'>{data.product.title}</h3>
                    <h4 className='text-lg text-gray-900'>
                        <span style={{ fontSize: '0.75em', verticalAlign: 'super', lineHeight: 0 }}>$</span>
                        <span style={{ fontSize: '1.5em', fontWeight: 600 }}>{Math.floor(data.product.price)}</span>
                        <span style={{ fontSize: '0.75em', verticalAlign: 'super', lineHeight: 0 }}>
                            {String(data.product.price.toFixed(2)).split('.')[1]}
                        </span>
                    </h4>
                    <hr />
                    <h3 className='font-semibold text-xl mt-3 mb-3'>About This Item</h3>
                    <h4 className='text-lg font-normal text-gray-600'>{data.product.description}</h4>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Suspense fallback={<h3 className='text-xl text-gray-800 mt-10 p-6'>Loading...</h3>}>
                <Await
                    resolve={data}
                >
                    {renderProductDetails}
                </Await>
            </Suspense>
        </div>
    )
}