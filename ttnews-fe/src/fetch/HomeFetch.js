// import React from "react";
//API 
import apiSettings from "../API";
import { useEffect, useState } from "react";
const initialState ={
   Newest:[],
   Hottest:[]
}
export const useHomeFetch=(search)=>{
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const fetchNews = async()=>{
        try{
            setError(false);
            setLoading(true);
            // let News = await apiSettings.fetchNewsByStatus('approved');
            // let articles = News.articles;
            // if (search.trim()) {
            //     articles = articles.filter((news) => {
            //         search = search.toLowerCase();
            //         let title = news.title.toLowerCase();
            //         let descriptions = news.descriptions.toLowerCase();
            //         return (title.search(search) >= 0 || descriptions.search(search) >=0);
            //     }
            //     )
            // }
            // setState(prev => ({
            //     articles: [...articles]
                
            // }));
            const New = await apiSettings.fetchNewstNews();
            console.log(New);
            const Hot = await apiSettings.fetchHottest();
            console.log(Hot);
            setState({
                Newest: New,
                Hottest: Hot
            });
        }
        catch(error){
            setError(true);
        }
        setLoading(false);
    }
    useEffect(()=>{
        setState(initialState);
        fetchNews();
    },[search])
    return {state, loading, error} ;
}