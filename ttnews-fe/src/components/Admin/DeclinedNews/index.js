import { Wrapper,Content,Container } from "./DeclinedNews.styles";
import apiSettings from "../../../API";
import { useState,useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";

const initialState ={
    articles:[],
 }
const DeclinedNews=({statusApprove})=>{
    const[state,setState] = useState(initialState);
    const[approve,setApprove] = useState(false);
    const [error,setError] = useState(false);
    const fetchNews = async()=>{
        try{
            setError(false);          
            const news = await apiSettings.fetchNewsByStatus(statusApprove);
            console.log(news);
            setState(() => ({
                articles: [...news.articles]
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


    if(state.articles==null){
        return (
            <h2>Empty </h2>
        )
    }
    else if(state.articles!=null)
    return(
        <>
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
                            <Link to={`/admin/news/viewdetaildecline/${itemnews.id}`}>
                                <button className="btn-detail">Xem chi tiết</button>
                            </Link>
                            
                        </div>                    
                        <p>Sửa đổi lần cuối: {itemnews.time_update_news!=null ? itemnews.time_update_news : "N/A"}</p>
                       
                    </div>
                </Content>
                </Wrapper>
                )
            
        })}
        </Container>
        </>
    )
};
export default DeclinedNews