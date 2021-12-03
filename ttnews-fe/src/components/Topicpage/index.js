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
import { Link } from "react-router-dom";
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
    const [listPage, setListPage] = useState({});
    const {Topicid} = useParams();
    const pageSize = 3;
    
    var {page} = useParams();
    
    if(page==null || page<1){
        page = 1;
    }
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
            const newsFetchByPage = await apiSettings.fetchNewsPaginationApprovedByTopic(Topicid, page, pageSize);
            const newsFetchTotal = await apiSettings.fetchNewsApprovedByTopic(Topicid);
            setNews(() => ({
                ...newsFetchByPage
            }));
            var totalPage = (Math.ceil(newsFetchTotal.articles.length / pageSize));
            var listofpage = [];
            for(let i=0;i<totalPage;i++){
                listofpage[i] = i+1;
            }
            
            setListPage(
                listofpage
            );
            
        }
        catch(error){
            setErrorNews(true);
        }
        setLoadingNews(false);
    }
    useEffect(()=>{
        setTopic(initialTopic);
        fetchTopic();
    },[Topicid,page]);

    useEffect(()=>{
        setNews(initialNews);
        fetchNewsByTopic();
    },[topic]);

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
                                newsid = {news.id}
                                clickable
                                />   
                        ))}
                        <div className="pagination-footer">
                        {   listPage.length > 0 &&
                            listPage.map(pageNumber =>{
                                console.log(page==pageNumber);
                                if(page!=pageNumber){
                                    return(
                                        
                                        <button key={pageNumber}>

                                            <Link to={`/topic/${topic.topic.id}/page/${pageNumber}/pageSize/3`} key={topic.topic.id + pageNumber}>
                                                {pageNumber}
                                            </Link>
                                        </button>
                                    )
                                    }
                                else{
                                    return(
                                        
                                        <button className="active-page" key={pageNumber}>

                                            <Link to={`/topic/${topic.topic.id}/page/${pageNumber}/pageSize/3`} key={topic.topic.id + pageNumber}>
                                                {pageNumber}
                                            </Link>
                                        </button>
                                    )
                                }
                            })
                        }
                        </div>
                    </GroupNews>
                    </Content>              
                </Container>
                    
               
            </>
        )
    }
    
}