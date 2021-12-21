// import React from "react";
//API 
import apiSettings from "../API";
import { useEffect, useState } from "react";
const initialState ={
   Newest:[],
   Hottest:[]
}
export const useHomeFetch=()=>{
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(false);
    const fetchNews = async () =>{
        try{
            setError(false)
            const New = await apiSettings.fetchNewstNews();
            const Hot = await apiSettings.fetchHottest();
            setState({
                Newest: New,
                Hottest: Hot
            });
        }
        catch{
            setError(true);
        }
    }
    useEffect(()=>{
        fetchNews();
    },[])
    return {state, error};
}