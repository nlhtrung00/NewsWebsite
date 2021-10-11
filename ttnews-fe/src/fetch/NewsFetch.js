import react from "react";
import { useState, useEffect } from "react";
import apiSettings from "../API";

export const useNewsFetch=(NewsId) =>{
    const [state, setState] = useState({});
    const [loading, setLoading]= useState(true);
    const [error, setError] = useState(false);

    useEffect( ()=>{
        const fetchData = async()=>{
        try{
            setLoading(true);
            setError(false);
            const News = await apiSettings.fetchNewsById(NewsId);
            console.log(News)
            setState({
                ...News,

            })
            }
        catch(error){
            setError(true);
            }
        }
        
    },[NewsId]);
    return {state, loading, error};

}