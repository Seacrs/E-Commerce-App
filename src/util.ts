import { redirect } from 'react-router-dom'

export async function requireAuth(){
    const isLoggedIn = localStorage.getItem("user");

    if(!isLoggedIn){
        throw redirect("/?message=You must be logged in to access this page")
    }
}