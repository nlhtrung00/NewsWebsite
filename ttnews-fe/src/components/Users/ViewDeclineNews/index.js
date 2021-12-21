import apiSettings from "../../../API";
import { Container,Wrapper,Content } from "./DetailDecline.styles";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";

const initialState ={
    news:[],
}

export const DetailDeclineNewsUser =()=>{

    const [redirect,setRedirect] = useState(false);
    const [state,setState] = useState(initialState);
    const [error,setError] = useState(false);
    const [author,setAuthor] = useState({});
    const [topic,setTopic] = useState({});
    const [subtopic,setSubtopic] = useState({});
    const {Newsid} = useParams();

   
    useEffect(()=>{
        const fetchNews = async()=>{
            try{
                const news = await apiSettings.fetchNewsById(Newsid);
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
                    news
                }));
            }
            catch(error){
                setError(true);
            }
        };
        fetchNews(Newsid);
    },[Newsid]);

    // xóa
    
    const Delete = async(e) =>{
        var id = e.target.value;
        if(id!==null){
            await fetch(`https://localhost:44387/api/News/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'accept': '*/*'  
                    }
                }
                )
            alert("Xóa thành công");
            setRedirect(true);  
            
        }
    }
    // trở về trang chủ
    const Back=()=>(setRedirect(true));
    if(redirect){
        return <Redirect  to="/profile/declined"/>
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
                       {state.news.imageName !==null && <img src={state.news.imageName} alt="news"/>} 
                    </div>
                    <div className="content">
                        <p dangerouslySetInnerHTML={{__html:state.news.content}}></p>
                        
                    </div>
                    
                    <div className="footer-decline">
                        <button className="back" onClick={Back}><i className="fas fa-angle-left icon"></i>Trở về</button> 
                        <button className="no"value={state.news.id} onClick={Delete}>Xóa</button>
                        {/* <button className="yes"value={state.news.id} onClick={Approve}>Duyệt lại</button>    */}
                    </div>
                    
                </Content>   
            </Wrapper>
                 
        </Container>
        </>
    )
}