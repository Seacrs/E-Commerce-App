import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import Login, { action as loginAction, loader as loginLoader } from './Pages/Login.tsx'
import NotFound from './Pages/NotFound.tsx'
import Error from './Components/Error.tsx'

export default function App(){
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' errorElement={<Error/>}>
      <Route index element={<Login />} loader={loginLoader} action={loginAction}/>
      
      <Route path="*" element={<NotFound />}/>
    </Route>
  ))

  return (
    <RouterProvider router = {router} />
  )
}