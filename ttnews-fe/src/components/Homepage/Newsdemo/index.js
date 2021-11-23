import React from "react";
import { Wrapper, Content, Image } from "./News.styles";
import { Link } from "react-router-dom";
import Tempimg from '../../../image/tempImg.jpg'

export const News =({news,clickable})=>{
    const topic = news.topic;
    const author = news.author;
    const subtopic = news.subtopic;
    console.log(news);
    if (news.imageName == null) news.imageName = Tempimg
    return(
        <Wrapper>
            <Image src={news.imageName} alt="temp"/>
            <Content>
                {clickable ?<Link to={`/News/${news.id}`}>
                <h2>{news.title}<span className="readmore"> xem thêm...</span></h2>
                </Link>
                :
                <h2>{news.title}</h2>
                }   
                <p>Thời gian: {news.time_update_news}</p>
                {author!=null&&<p>Tác giả: {author.fullname}</p>}
                {topic!=null&&<p>Nhóm chủ đề: {topic.topicname}</p>}
                {subtopic!=null&&<p>Chủ đề: {subtopic.subtopicname}</p>}
            </Content>
        
        </Wrapper>
    )
    
}