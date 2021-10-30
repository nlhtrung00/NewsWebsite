import React from "react";
import { Wrapper, Content, Image } from "./News.styles";
import { Link } from "react-router-dom";
import Tempimg from '../../../image/tempImg.jpg'

export const News =({news,clickable})=>{
    const topic = news.topic;
    const author = news.author;
    const subtopic = news.subtopic;
    console.log(subtopic);
    return(
        <Wrapper>
            <Image src={Tempimg} alt="temp"/>
            <Content>
                {clickable ?<Link to={'/'}>
                <h2>{news.title}</h2>
                </Link>
                :
                <h2>{news.title}</h2>
                }   
                <p>Time: {news.time_update_news}</p>
                {author!=null&&<p>Tác giá: {author.fullname}</p>}
                {topic!=null&&<p>Nhóm chủ đề: {topic.topicname}</p>}
                {subtopic!=null&&<p>Chủ đề: {subtopic.subtopicname}</p>}
                <p>Description news: {news.descriptions}</p>
                <p>Content:</p>
                <p dangerouslySetInnerHTML={{__html:news.content}}></p>
            </Content>
        
        </Wrapper>
    )
    
}