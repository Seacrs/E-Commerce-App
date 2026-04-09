import { useLoaderData, Link, useNavigation } from 'react-router-dom'
import { requireAuth } from "../util";
import { getCategories } from '../api'
import type { CategoryResponse } from '../api'

export async function loader(){
    await requireAuth();
    const data = await getCategories();
    return data;
}

export default function Categories(){
    const loaderData = useLoaderData<CategoryResponse>();
    const navigation = useNavigation();

    const isLoading = navigation.state === "submitting"

    function renderCategories(loaderData: CategoryResponse){
        if(loaderData.error || !loaderData.categories) return;

        const categories = loaderData.categories.map(category => (
            <Link
                key={category.id}
                to={`${category.id}/${category.name}`}
                className='decoration-0 unset'
            >
                <div className='w-3xs flex flex-col items-center bg-white mb-4 p-5 pl-6'>
                    <img src={category.image} alt={`Photo of ${category.name}`}  className='rounded-3xl'/>
                    <p className='text-xl text-gray-800 mt-4'>{category.name}</p>
                </div>
            </Link>
        ))

        return (
            <div className='p-6 flex gap-4 flex-wrap overflow-hidden'>
                    {categories}
            </div>
        )
    }

    return (
        <div className='m-6 p-6'>
            <h1 className='text-3xl font-bold'> Categories</h1>
            { isLoading && <p>Loading Categories...</p> }
            {loaderData.error && <h3 className="text-red-400 text-xl">{loaderData.error}</h3>}
            {!loaderData.error && loaderData.categories &&renderCategories(loaderData)}
        </div>
    )
}