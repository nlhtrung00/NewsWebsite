import { EmptyContainer,Wrapper,Content,Container } from "./ApproveNews.styles";
import apiSettings from "../../../API";
import { useState,useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import NoneofWork from "../../../image/background/Checklist.jpg";
const initialState ={
    articles:[]
 }
const ApproveNews=()=>{
    const [state,setState] = useState(initialState);
    const [error,setError] = useState(false);
    const [empty, setEmpty] = useState(false);

    const fetchNews = async(statusApprove)=>{
        try{
            setError(false);          
            const news = await apiSettings.fetchNewsByStatus(statusApprove);
            
            setState(() => ({
                articles: [...news.articles]
            }));
            if(news.articles.length === 0){
                setEmpty(true);
            }
        }
        catch(error){
            setError(true);
        }
    }
    useEffect(()=>{
        fetchNews('disapprove');
    },[])


    const Approve =async(e)=>{
        const NewsId = e.target.value ? e.target.value : e.target.parentNode.value;
        if(state.articles!==null){
            state.articles.map(async(itemnews)=>{
            if(itemnews.id===NewsId){
                const id = itemnews.id;
                const title = itemnews.title;
                const descriptions = itemnews.descriptions;
                const content = itemnews.content;
                const status = "approved";
                const topic = itemnews.topic!=null ?{
                    id:itemnews.topic.id,
                    topicname:itemnews.topic.topicname
                } : null;
                const time_update_news = itemnews.time_update_news;
                const imageName = itemnews.imageName;
                const subtopic = itemnews.subtopic;
                const author = itemnews.author;
                const dataPost ={id,title, descriptions, content,time_update_news,imageName, topic,subtopic,author, status};
                var datajson = JSON.stringify(dataPost);
                
                await fetch(`https://localhost:44387/api/News/${id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'accept': '*/*'  
                    },
                    body:datajson
                    }
                    ).catch(() => alert('Lỗi duyệt tin! Vui lòng thử lại!'))
                    let totalView = 0;
                    let idNews = id;
                    let dataview = {totalView, idNews};
                    await fetch('https://localhost:44387/api/Views',{
                            method: 'POST',
                            headers:{
                                'Content-Type':'application/json',
                                'accept': 'text/plain'    
                            },
                            body:JSON.stringify(dataview)
                        }).catch(()=>alert('Lỗi tạo lượt xem! Vui lòng thử lại!'))
                }
            }) 
            const articles = state.articles.filter(article => article.id !== NewsId);
            setState(() => ({
                articles: articles
            }));
            if(articles.length === 0){
                setEmpty(true);
            }
        }
    } 
    
    
    const Decline =async(e)=>{
        const NewsId = e.target.value ? e.target.value : e.target.parentNode.value;
        if(state.articles!=null){
            state.articles.map(async(itemnews)=>{
            if(itemnews.id===NewsId){
                const id = itemnews.id;
                const title = itemnews.title;
                const descriptions = itemnews.descriptions;
                const content = itemnews.content;
                const status = "declined";
                const topic = itemnews.topic!=null ?{
                    id:itemnews.topic.id,
                    topicname:itemnews.topic.topicname
                } : null;
                const time_update_news = itemnews.time_update_news;
                const imageName = itemnews.imageName;
                const subtopic = itemnews.subtopic;
                const author = itemnews.author;
                const dataPost ={id,title, descriptions, content,time_update_news,imageName, topic,subtopic,author, status};
                var datajson = JSON.stringify(dataPost);
                
                await fetch(`https://localhost:44387/api/News/${id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'accept': '*/*'  
                    },
                    body:datajson
                    }
                    ).catch(() => alert('Lỗi hủy tin! Vui lòng thử lại!'))
            }
            })
            const articles = state.articles.filter(article => article.id !== NewsId);
            setState(() => ({
                articles: articles
            }));
            if(articles.length === 0){
                setEmpty(true);
            }
        }
    } 
     
    if(error) return <div>Something wrong happen</div>;
    else 
    if(state.articles.length===0 && empty){
        return (
            <EmptyContainer>
                <h2>Không bản tin nào cần duyệt</h2>
                <img src={NoneofWork} alt="nothing need to approve" />
            </EmptyContainer>
        )
    }    
    else
    if(state.articles!==null){
        return(
            <Container>
            {state.articles!=null&&state.articles.map(itemnews =>{
                return(
                    <Wrapper key={itemnews.id}>
                    <Content>
                        <div className="header-approve">
                            <div className="title-news">
                                <h3>Tiêu đề: {itemnews.title}</h3>
                                <p>Nhóm chủ đề: {itemnews.topic!=null ? itemnews.topic.topicname :"N/A"}</p>
                                <p>Chủ đề: {itemnews.subtopic!=null ? itemnews.subtopic.subtopicname: "N/A"}</p>
                            </div> 
                            <Link to={`/admin/news/viewdetail/${itemnews.id}`}>
                                    <button className="btn-detail">Xem chi tiết</button>
                            </Link>                   
                            <p>Sửa đổi lần cuối: {itemnews.time_update_news!=null ? itemnews.time_update_news : "N/A"}</p>
                        </div>
                        
                        <div className="footer-approve row">
                            <button className="no"value={itemnews.id} onClick={Decline}><i className="fas fa-times icon"></i>Hủy</button>
                            <button className="yes"value={itemnews.id} onClick={Approve}><i className="fas fa-check icon"></i>Duyệt</button>    
                        </div>
                        
                    </Content>
                    </Wrapper>
                    )
                
            })}
            </Container>
        )
    }else
    if(state.articles.length===0){
        return (
            <EmptyContainer>
                <h2>Không bảng tin nào cần duyệt</h2>
                <img src={NoneofWork} alt="nothing need to approve" />
            </EmptyContainer>
        )
    }
};
export default ApproveNews