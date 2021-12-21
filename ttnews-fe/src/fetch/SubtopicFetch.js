
//API 
import apiSettings from "../API";
import { useEffect, useState } from "react";
const initialState ={
    subtopics:[],
    status:"ok"
 }
export const useSubTopicFetchByTopic=(idtopic)=>{
    const [subtopics, setSubTopics] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [errorFetchSubtopic, setErrorFetchSubtopic] = useState(false);
    useEffect(()=>{
        const fetchsubTopics = async()=>{
            try{
                setErrorFetchSubtopic(false);
                setLoading(true);
                const subtopics = await apiSettings.fetchSubTopicsByTopic(idtopic);
                setSubTopics(() => ({
                    subtopics: subtopics,
                }));
            }
            catch(error){
                setErrorFetchSubtopic(true);
            }
            setLoading(false);
        }
        fetchsubTopics();
    },[idtopic])
    return {subtopics, loading, errorFetchSubtopic} ;
}