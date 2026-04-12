import { useLoaderData, Link, Await } from 'react-router-dom'
import { Suspense } from 'react';
import { requireAuth } from "../util";
import { getCategories } from '../api'
import type { CategoryResponse } from '../api'

export async function loader(){
    await requireAuth();
    return {
        categories: getCategories()
    }
}

export default function Categories(){
    const { categories } = useLoaderData<{ categories: Promise<CategoryResponse>}>();

    function renderCategories(data: CategoryResponse){
        if(data.error || !data.categories) return;

        const categories = data.categories.map(category => (
            <Link
                key={category.id}
                to={`${category.id}/${category.name}`}
                className='decoration-0 unset'
            >
                <div className='w-3xs flex flex-col items-center mb-4 p-5 pl-6'>
                    <img src={category.image} alt={`Photo of ${category.name}`}  className='rounded-3xl'/>
                    <p className='text-xl text-gray-800 mt-4 dark:text-white'>{category.name}</p>
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
            <h1 className='text-3xl font-bold dark:text-white'> Categories</h1>
            <Suspense fallback={<h3 className='text-xl text-gray-800 dark:text-white mt-10 p-6'>Loading...</h3>}>
                <Await
                resolve={categories}
                >
                    {renderCategories}
                </Await>
            </Suspense>
        </div>
    )
}