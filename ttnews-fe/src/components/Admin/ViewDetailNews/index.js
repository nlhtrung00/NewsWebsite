import apiSettings from "../../../API";
import { Container,Wrapper,Content } from "./Detail.styles";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import dotenv from  'dotenv';

const initialState ={
    news:[],
 }
export const DetailNews =()=>{

    const [redirect,setRedirect] = useState(false);
    const [state,setState] = useState(initialState);
    const [error,setError] = useState(false);
    const [author,setAuthor] = useState({});
    const [topic,setTopic] = useState({});
    const [subtopic,setSubtopic] = useState({});
    const {Newsid} = useParams();
    const url = process.env.REACT_APP_URL_IMAGE_NEWS;
    console.log(url);

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

    const Approve =async(e)=>{
        console.log(e.target.value);
        if(state.news!=null){
            const itemnews = state.news;
            if(itemnews.id==e.target.value){
                const id = itemnews.id;
                const title = itemnews.title;
                const descriptions = itemnews.descriptions;
                const content = itemnews.content;
                const status = "approved";
                const topic = itemnews.topic
                const subtopic = itemnews.subtopic;
                const author = itemnews.author;
                const dataPost ={id,title, descriptions, content, topic,subtopic,author, status};
                var datajson = JSON.stringify(dataPost);
                console.log(datajson);
                // await fetch(`https://localhost:44387/api/News/${id}`,{
                //     method:'PUT',
                //     headers:{
                //         'Content-Type':'application/json',
                //         'accept': '*/*'  
                //     },
                //     body:datajson
                //     }
                //     ).then(
                //         setApprove(true)
                //     )
                    
                //     .catch(err => console.log(err))
            }
                  
        }
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
                    <div className="title-news">
                        <h1>{state.news.title}</h1>    
                    </div>
                    <div className="info-author">
                        <p className="name-author">Written by: {author.fullname}</p>
                        <i>ID author: {author.id}</i>
                    </div>
                    <div className="topic">
                        <h4>{topic.topicname}<span> <i classNam="fas fa-chevron-right icon"></i></span> <span>{subtopic.subtopicname}</span></h4>
                    </div>
                    <div className="description-news">
                        <p>{state.news.descriptions}</p>
                    </div>
                    <div className="img-news">
                        
                       <img src={require("D://Project//NienLuan//NewsProject//NewsWebsite//ttnews-fe//src//image//tempImg.jpg").default} /> 
                    </div>
                    <div>
                        <p dangerouslySetInnerHTML={{__html:state.news.content}}></p>
                    </div>
                    <div className="footer-approve">
                        <button className="no"><i className="fas fa-times icon"></i>Decline</button>
                        <button className="yes"value={state.news.id} onClick={Approve}><i className="fas fa-check icon"></i>Approve</button>    
                    </div>
                </Content>   
            </Wrapper>
                 
        </Container>
        </>
    )
}