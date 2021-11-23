import apiSettings from "../../../API";
import { Container,Wrapper,Content } from "./DetailDecline.styles";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
// import dotenv from  'dotenv';

const initialState ={
    news:[],
 }
export const DetailDeclineNews =()=>{

    const [redirect,setRedirect] = useState(false);
    const [state,setState] = useState(initialState);
    const [error,setError] = useState(false);
    const [author,setAuthor] = useState({});
    const [topic,setTopic] = useState({});
    const [subtopic,setSubtopic] = useState({});
    const {Newsid} = useParams();

    const fetchNews = async()=>{
        try{
            setError(false);          
            const news = await apiSettings.fetchNewsById(Newsid);
            console.log(news);
            const authorfetch = news.author;
            const topicfetch = news.topic;
            const subtopicfetch = news.subtopic;
            
            setAuthor(()=>({
                ...authorfetch,
            }));
            setTopic(()=>({
                ...topicfetch,
            }));
            setSubtopic(()=>({
                ...subtopicfetch,
            }));
            setState(() => ({
                news,
            }));
        }
        catch(error){
            setError(true);
        }
    };
    useEffect(()=>{
        setState(initialState);
        fetchNews();
    },[]);

    const Back=()=>(setRedirect(true));
    if(redirect){
        return <Redirect  to="/admin"/>
    }

    if(error){
        return(
            <>
            <Container> 
                <Wrapper>
                    <Content>
                        <p>Something wrong happened</p>
                    </Content>   
                </Wrapper>
                     
            </Container>
            </>
        )
    }
    else if(state.news!=null)
    return(
        <>
        <Container> 
            <Wrapper>
                <Content>
                    <div className="topic">
                        <h4 className="topicname">Chủ đề: {topic.topicname}<span> <i className="fas fa-chevron-right icon"></i></span> <span>{subtopic.subtopicname}</span></h4>
                    </div>
                    <div className="title-news">
                        <p>{state.news.title}</p>    
                    </div>
                    <div className="info-author">
                        <p className="name-author">Được viết bởi: {author.fullname}</p>
                        <i>ID tác giả: {author.id}</i>
                    </div>
                    
                    <div className="description-news">
                        <p>{state.news.descriptions}</p>
                    </div>
                    <div className="img-news">
                       <img src={state.news.imageName}/> 
                    </div>
                    <div className="content">
                        <p dangerouslySetInnerHTML={{__html:state.news.content}}></p>
                        
                    </div>
                    
                    <div className="footer-decline">
                        <button className="back" onClick={Back}><i className="fas fa-angle-left icon"></i>Trở về</button>    
                    </div>
                </Content>   
            </Wrapper>
                 
        </Container>
        </>
    )
}