
//API 
import apiSettings from "../API";
import { useEffect, useState } from "react";

export const useUserFetch=(userid)=>{
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const fetchUser = async()=>{
        try{
            setError(false);
            setLoading(true);
            const User = await apiSettings.fetchUserById(userid);
            //console.log(User);
            setUser(() => ({
                User: User,
            }));
        }
        catch(error){
            setError(true);
        }
        setLoading(false);
    }
    useEffect(()=>{
        setUser('');
        fetchUser();
    },[])
    return {user, loading, error} ;
}