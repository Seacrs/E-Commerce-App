import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import Login, { action as loginAction } from './Pages/Login.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'>
    <Route index element={<Login />} action={loginAction}/>
  </Route>
))

export default function App(){
  return (
    <RouterProvider router = {router} />
  )
}