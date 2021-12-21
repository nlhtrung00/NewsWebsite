
//API 
import apiSettings from "../API";
import { useEffect, useState } from "react";
const initialState ={
    topics:[],
}
export const useTopicFetch=()=>{
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(false);
    const fetchTopics = async()=>{
        try{
            setError(false);
            const topics = await apiSettings.fetchTopics();
            setState(() => ({
                topics: topics
            }));
        }
        catch(error){
            setError(true);
        }
    }
    useEffect(()=>{
        setState(initialState);
        fetchTopics();
    },[])
    return {state, error} ;
}