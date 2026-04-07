interface User {
    email: string;
    password: string;
}
export interface users {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    creationAt: string;
    updatedAt: string;
}

export interface categories {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    foundUser: users | null;
    error: string | null;
}

export interface CategoryResponse {
    categories: categories[] | null;
    error: string | null;
}

export async function loginUser(user: User): Promise<LoginResponse>{
    if(!user.email || !user.password){
        return { foundUser: null, error: "Please fill in all fields"};
    }

    try{
        const res = await fetch('https://api.escuelajs.co/api/v1/users');

        if(!res.ok){
            throw new Error("Failed to fetch users");
        }

        const users: users[] = await res.json();

        const foundUser = users.find((u) => u.email === user.email && u.password === user.password);

        if(foundUser){
            return { foundUser, error: null};
        } else {
            throw new Error("Invalid Credentials");
        }

    } catch (err) {
        if(err instanceof Error){
            return {foundUser: null,  error: err.message};
        }
        return {foundUser: null, error: "Something went wrong"};
    }
}

function isValidCategory(name: string): boolean{
    if (!name || name.trim().length < 3) return false;

    const safePattern = /^[A-Za-z\s]+$/;

    return safePattern.test(name);
}

export async function getCategories():Promise<CategoryResponse>{
    try{
        const res = await fetch('https://api.escuelajs.co/api/v1/categories')
        if(!res.ok){
            throw new Error("Failed to fetch categories")
        }
        const allcategories: categories[] = await res.json();

        if (!Array.isArray(allcategories)) {
            throw new Error("Invalid data format");
        }

        const filteredCategories: categories[] = allcategories.filter(category=> isValidCategory(category.name))


        return {categories: filteredCategories, error: null}
    
    } catch (err) {
        if(err instanceof Error){
            return {categories: null, error: err.message}
        }
        return {categories: null, error: "Something went wrong"};
    }
}