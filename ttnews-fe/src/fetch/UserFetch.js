import React from "react";
//API 
import apiSettings from "../API";
import { useEffect, useState } from "react";

export const useUserFetch=(userid)=>{
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const fetchUser = async()=>{
        try{
            setError(false);
            setLoading(true);
            const User = await apiSettings.fetchUserById(userid);
            //console.log(User);
            setState(() => ({
                User: User,
            }));
        }
        catch(error){
            setError(true);
        }
        setLoading(false);
    }
    useEffect(()=>{
        setState('');
        fetchUser();
    },[])
    return {state, loading, error} ;
}