interface User {
    email: string;
    password: string;
}
export interface usersResponse {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    creationAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    foundUser: usersResponse | null;
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

        const users: usersResponse[] = await res.json();

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