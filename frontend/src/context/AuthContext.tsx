import { createContext, ReactNode, useState,useEffect, useContext } from "react";
import { loginUser } from "../helpers/api-communicator";


type User={
    name: string;
    email: string;
}

type UserAuth={
    isLoggedIn: boolean;
    user : User | null;
    login: (email: string, password: string) => Promise<void>;
    signup : (name:string,email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<UserAuth | null>(null)

export  const AuthProvider = ({children}:{children:ReactNode}) =>{
    const [user,setUser]=useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn]=useState(false)

    useEffect(() =>{
        //fetch if the user cookie is valid
    },[])

    //login
    const login = async(email: string, password: string) => {
        //call login api
        const data=await loginUser(email, password)
        //store user data and set isLoggedIn to true
        if(data){
            setUser({email:data.email,name:data.name})
            setIsLoggedIn(true)
        }
        //set cookies
    }
    
    //signup
    const signup = async(name:string,email: string, password: string) => {
        //call signup api
        //store user data and set isLoggedIn to true
        //set cookies
    }
    //logout
    const logout = () => {
        //clear cookies
        //set isLoggedIn to false
        setUser(null)
    }
    const value={
        user,
        isLoggedIn,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth =()=> useContext(AuthContext)