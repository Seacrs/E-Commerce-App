import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import { requireAuth } from "./util.ts"

import Login, { action as loginAction, loader as loginLoader } from './Pages/Login.tsx'
import Categories, { loader as categoriesLoader } from './Pages/Categories.tsx'
import CategoryDetail, { loader as categoryLoader } from "./Pages/CategoryDetail.tsx"
import Product, { loader as ProductLoader } from "./Pages/Product/Product.tsx"
import NotFound from './Pages/NotFound.tsx'
import Error from './Components/Error.tsx'

// localStorage.clear();

export default function App(){
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' errorElement={<Error/>}>
      <Route index element={<Login />} loader={loginLoader} action={loginAction} errorElement={<Error/>}/>
      <Route path="categories" element={<Categories/>} loader={categoriesLoader} errorElement={<Error/>}/>
      <Route path="categories/:id/:name" element={<CategoryDetail />} loader={categoryLoader} errorElement={<Error/>}/>
      <Route path="products/:productId" element={<Product />} loader={ProductLoader} errorElement={<Error/>} />
      <Route path="*" element={<NotFound />}/>
    </Route>
  ))

  return (
    <RouterProvider router = {router} />
  )
}