import React from "react";
import { Wrapper, Content, Image } from "./News.styles";
import { Link } from "react-router-dom";
import Tempimg from '../../image/tempImg.jpg'

export const NewsThumb =({news,clickable})=>{
    const topic = news.topic;
    const author = news.author;
    const subtopic = news.subtopic;
    if (news.imageName == null) news.imageName = Tempimg
    return(
        <Wrapper>
            <Image src={news.imageName} alt="temp"/>
            <Content>
                {clickable ?<Link to={`/News/${news.id}`}>
                <p className="title">{news.title}<br/><span className="readmore"> xem thêm...</span></p>
                </Link>
                :
                <p className="title">{news.title}</p>
                }   
                <p>Thời gian: {news.time_update_news}</p>
                {author!=null&&<p>Tác giả: {author.fullname}</p>}
                {topic!=null&&<p>Nhóm chủ đề: {topic.topicname}</p>}
                {subtopic!=null&&<p>Chủ đề: {subtopic.subtopicname}</p>}
            </Content>
        
        </Wrapper>
    )
    
}