
//API 
import apiSettings from "../API";
import { useEffect, useState } from "react";

export const useUserFetch=()=>{

    const [user, setUser] = useState('');
    const [error, setError] = useState(false);
    const fetchUser = async(userid)=>{
        try{
            setError(false);
            
            const User = await apiSettings.fetchUserById(userid);
            
            setUser(() => ({
                ...User
            }));
            
        }
        catch(error){
            setError(true);
        }
    }
    useEffect(()=>{
        fetchUser(localStorage.getItem('iduser'));
    },[])
    return {user, error} ;
}