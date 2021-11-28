import React, { useState,useEffect } from "react";
//styles
import { Container, Content } from "./Subtopicpage.styles";
// api
import apiSettings from "../../API";
//components
import { Header } from "../Header";
import { useParams } from "react-router";
import GroupNews from "../GroupNews";
import { NewsThumb } from "../NewsThumb";
const initialSubtopic ={
    subtopic:[]
 }
 const initialtopic ={
    topic:[]
 }
 const initialNews ={
    articles:[]
 }
export const Subtopicpage=()=>{
    // state Subtopic
    const [subtopic, setSubtopic] = useState(initialSubtopic);
    const [loadingSubtopic, setLoadingSubtopic] = useState(false);
    const [errorSubtopic, setErrorSubtopic] = useState(false);
    // state news by Subtopic
    const [news, setNews] = useState(initialNews);
    const [loadingNews, setLoadingNews] = useState(false);
    const [errorNews, setErrorNews] = useState(false);

    const [topic, setTopic] = useState(initialtopic);
    const {Subtopicid} = useParams();
    

    // fetch topic by url
    const fetchSubtopic = async()=>{
        try{
            setErrorSubtopic(false);
            setLoadingSubtopic(true);    
            const SubtopicFetch = await apiSettings.fetchSubTopicsById(Subtopicid);
            console.log(SubtopicFetch.topic);
            var topicFetch = SubtopicFetch.topic;
            setTopic(()=>({
                ...topicFetch
            }));
            setSubtopic(() => ({
                subtopic: SubtopicFetch
            }));
        }
        catch(error){
            setErrorSubtopic(true);
        }
        setLoadingSubtopic(false);
    }
    // fetch news by topic
    const fetchNewsBySubtopic= async()=>{
        try{
            setErrorNews(false);
            setLoadingNews(true);    
            const newsFetch = await apiSettings.fetchNewsApprovedBySubtopic(Subtopicid);
            setNews(() => ({
                ...newsFetch
            }));
        }
        catch(error){
            setErrorNews(true);
        }
        setLoadingNews(false);
    }
    useEffect(()=>{
        setSubtopic(initialSubtopic);
        fetchSubtopic();
    },[Subtopicid]);

    useEffect(()=>{
        setNews(initialNews);
        fetchNewsBySubtopic();
    },[subtopic]);
    let iduser;
    iduser = localStorage.getItem('iduser');
    
    if(errorSubtopic){
        return(
            <div>
                <h2>
                    Something wrong while fetch SubTopic
                </h2>
            </div>
        )
    }
    // if(loadingSubtopic) {
    //     return(
    //         <>  
    //             <Header user={iduser}/>
    //             <Container>
    //                 <Content>
    //                     <h2>Loading page</h2>
    //                 </Content>              
    //             </Container>
                    
               
    //         </>
    //     )
    // }
    if(!errorSubtopic  && subtopic.subtopic !=null && news!=null){
        return(
            <>  
                <Header user={iduser}/>
                <Container>
                    <Content>
                    <GroupNews header={subtopic.subtopic.subtopicname != null && "Chủ đề: " + subtopic.subtopic.subtopicname}>
                        <h2>Thuộc nhóm: {topic.topicname != null && topic.topicname}</h2>
                        {   news !=null && 
                            news.articles.map(news =>(
                                <NewsThumb
                                key = {news.id}
                                news = {news}
                                clickable
                                />   
                        ))}
                        
                    </GroupNews>
                    </Content>              
                </Container>
                    
               
            </>
        )
    }
    
}