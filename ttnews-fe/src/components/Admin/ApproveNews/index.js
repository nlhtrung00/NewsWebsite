import { Wrapper,Content,Container } from "./ApproveNews.styles";
//import TempApproveImg from '../../../image/temp_approve.jpg';
import apiSettings from "../../../API";
import { useState,useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { DetailNews } from "../ViewDetailNews";

const initialState ={
    news:[],
 }
const ApproveNews=({statusApprove})=>{
    const[state,setState] = useState(initialState);
    const[approve,setApprove] = useState(false);
    const [error,setError] = useState(false);
    const fetchNews = async()=>{
        try{
            setError(false);          
            const news = await apiSettings.fetchNewsByStatus(statusApprove);
            console.log(news);
            setState(() => ({
                news,
            }));
        }
        catch(error){
            setError(true);
        }
        setApprove(false);
    }
    useEffect(()=>{
        setState(initialState);
        fetchNews();
    },[approve])


    const Approve =async(e)=>{
        console.log(e.target.value);
        if(state.news!=null){
           state.news.map(async(itemnews)=>{
            if(itemnews.id==e.target.value){
                const id = itemnews.id;
                const title = itemnews.title;
                const descriptions = itemnews.descriptions;
                const content = itemnews.content;
                const status = "approved";
                const topic ={
                    id:itemnews.topic.id,
                    topicname:itemnews.topic.topicname
                };
                const subtopic = itemnews.subtopic;
                const author = itemnews.author;
                const dataPost ={id,title, descriptions, content, topic,subtopic,author, status};
                var datajson = JSON.stringify(dataPost);
                console.log(datajson);
                await fetch(`https://localhost:44387/api/News/${id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'accept': '*/*'  
                    },
                    body:datajson
                    }
                    ).then(
                        setApprove(true)
                    )
                    
                    .catch(err => console.log(err))
            }
           })        
        }
    } 
    
    
    const Decline =async(e)=>{
        console.log(e.target.value);
        if(state.news!=null){
           state.news.map(async(itemnews)=>{
            if(itemnews.id==e.target.value){
                const id = itemnews.id;
                const title = itemnews.title;
                const descriptions = itemnews.descriptions;
                const content = itemnews.content;
                const status = "declined";
                const topic ={
                    id:itemnews.topic.id,
                    topicname:itemnews.topic.topicname
                };
                const subtopic = itemnews.subtopic;
                const author = itemnews.author;
                const dataPost ={id,title, descriptions, content, topic,subtopic,author, status};
                var datajson = JSON.stringify(dataPost);
                console.log(datajson);
                await fetch(`https://localhost:44387/api/News/${id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'accept': '*/*'  
                    },
                    body:datajson
                    }
                    ).then(
                        setApprove(true)
                    )
                    
                    .catch(err => console.log(err))
            }
           })        
        }
    }  


    return(
        <>
        <Container>
        {state.news!=null&&state.news.map(itemnews =>{
            return(
                <Wrapper key={itemnews.id}>
                <Content>
                    <div className="header-approve">
                        <div className="title-news">
                            <h3>Title: {itemnews.title}</h3>
                            <p>Topic: {itemnews.topic.topicname}</p>
                            <p>SubTopic: {itemnews.subtopic.subtopicname}</p>
                            <Link to={`/admin/news/viewdetail/${itemnews.id}`}>
                                <button>Xem chi tiết...</button>
                            </Link>
                            
                        </div>                    
                        <p>Writen by: {itemnews.author.fullname}</p>
                        <p>Id author: {itemnews.author.id}</p>
                    </div>
                 
                    <div className="footer-approve row">
                        <button className="no"value={itemnews.id} onClick={Decline}><i className="fas fa-times icon"></i>Decline</button>
                        <button className="yes"value={itemnews.id} onClick={Approve}><i className="fas fa-check icon"></i>Approve</button>    
                    </div>
                    
                </Content>
                </Wrapper>
                )
            
        })}
        </Container>
        </>
    )
};
export default ApproveNews