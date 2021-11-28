import React, { useState,useEffect } from "react";
//styles
import { Container, Content } from "./Topicpage.styles";
// api
import apiSettings from "../../API";
//components
import { Header } from "../Header";
import { useParams } from "react-router";
import GroupNews from "../GroupNews";
import { NewsThumb } from "../NewsThumb";
const initialTopic ={
    topic:[]
 }
 const initialNews ={
    articles:[]
 }
export const Topicpage=()=>{
    // state topic
    const [topic, setTopic] = useState(initialTopic);
    const [loadingTopic, setLoadingTopic] = useState(false);
    const [errorTopic, setErrorTopic] = useState(false);
    // state news by topic
    const [news, setNews] = useState(initialNews);
    const [loadingNews, setLoadingNews] = useState(false);
    const [errorNews, setErrorNews] = useState(false);


    const {Topicid} = useParams();
    

    // fetch topic by url
    const fetchTopic = async()=>{
        try{
            setErrorTopic(false);
            setLoadingTopic(true);    
            const topicFetch = await apiSettings.fetchTopicById(Topicid);
            setTopic(() => ({
                topic: topicFetch
            }));
        }
        catch(error){
            setErrorTopic(true);
        }
        setLoadingTopic(false);
    }
    // fetch news by topic
    const fetchNewsByTopic= async()=>{
        try{
            setErrorNews(false);
            setLoadingNews(true);    
            const newsFetch = await apiSettings.fetchNewsApprovedByTopic(Topicid);
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
        setTopic(initialTopic);
        fetchTopic();
    },[Topicid]);

    useEffect(()=>{
        setNews(initialNews);
        fetchNewsByTopic();
    },[topic]);

    console.log(news.articles);
    let iduser;
    iduser = localStorage.getItem('iduser');
    if(errorTopic){
        return(
            <div>
                <h2>
                    Something wrong while fetch Topic
                </h2>
            </div>
        )
    }
    
    if(!errorTopic  && topic !=null && news!=null){
        return(
            <>  
                <Header user={iduser}/>
                <Container>
                    <Content>
                    <GroupNews header={topic.topic.topicname != null && "Nhóm chủ đề: " +topic.topic.topicname}>
                    {   news != null && 
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