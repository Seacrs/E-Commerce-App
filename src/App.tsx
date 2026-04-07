import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import Login, { action as loginAction } from './Pages/Login.tsx'

export default function App(){
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} action={loginAction}/>
    </Route>
  ))

  return (
    <RouterProvider router = {router} />
  )
}