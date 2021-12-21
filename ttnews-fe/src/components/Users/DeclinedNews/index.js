import { Wrapper,Content, News, Image, ContentNews } from "./DeclinedNews.styles";
import { Header } from "../../Header";
import { useEffect, useState } from "react";
import apiSettings from "../../../API";
import { Link, Redirect } from "react-router-dom";
import noImg from "../../../image/noImage.jpg";

export const DeclinedNews = () =>{
    const [news, setNews] = useState(null);
    const [error, setError] = useState(false);
    let iduser;
    iduser = localStorage.getItem('iduser');
    useEffect(()=>{
        const fetchNewsApprovedByAuthor = async() =>{
            try{
                const newsfetch = await apiSettings.fetchNewsDeclinedByAuthor(iduser)
                setNews({
                    ...newsfetch
                })

            }
            catch{
                setError(true);
            }
        }
        fetchNewsApprovedByAuthor();
    },[iduser]) 

    const handleDelete =async(e) =>{
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
            const articles = news.articles.filter(article => article.id !== id);
            setNews({ articles: articles});
        }
    }
    if(iduser==null){
        return (
            <Redirect to="/"/>
        )
    }
    if(error) return <div>Something wrong happen</div>;
    else
    return(
        <>
            <Header user={iduser} />
            <Wrapper>
                <Content>
                    <h2>Các bài viết đã bị hủy do không đảm bảo quy chuẩn một bài viết</h2>
                    {news!==null && news.articles.map((newsitem)=>{
                        return(
                            <News key={newsitem.id}>
                                <div className="wrapper-img">
                                    {newsitem.imageName!==null && <Image src={newsitem.imageName} alt="temp"/> }
                                    {newsitem.imageName===null && <Image src={noImg} alt="temp"/> }
                                </div>
                                <ContentNews>
                                    
                                    <p className="title">{newsitem.title}</p>
                                    <Link to={`/profile/declined/viewdetail/${newsitem.id}`}>
                                        <span className="readmore"> xem thêm...</span>
                                    </Link>
                                    {newsitem.topic!=null&&<p>Nhóm chủ đề: {newsitem.topic.topicname}</p>}
                                    {newsitem.subtopic!=null&&<p>Chủ đề: {newsitem.subtopic.subtopicname}</p>}
                                    <button className="deleteNews" value={newsitem.id} onClick={handleDelete}>Xóa</button>
                                </ContentNews>
                                
                            </News>
                        )
                    })}
                </Content>
            </Wrapper>
        </>
    )
}