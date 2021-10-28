import React from "react";
//API 
import apiSettings from "../API";
import { useEffect, useState } from "react";
const initialState ={
   articles:[],
}
export const useHomeFetch=()=>{
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const fetchNews = async()=>{
        try{
            setError(false);
            setLoading(true);
            const News = await apiSettings.fetchTopNews();
            console.log(News);
            
            setState(prev => ({
                articles: [...News.articles]
                
            }));
        }
        catch(error){
            setError(true);
        }
        setLoading(false);
    }
    useEffect(()=>{
        setState(initialState);
        fetchNews();
    },[])
    return {state, loading, error} ;
}