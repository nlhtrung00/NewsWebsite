import React from "react";
import { Wrapper, Content, Image } from "./News.styles";
import { Link } from "react-router-dom";

export const News =({news,clickable})=>{
    const topic = news.topic;
    const author = news.author;
    
    return(
        <Wrapper>
        
            <Content>
                {clickable ?<Link to={'/'}>
                <h2>{news.title}</h2>
                </Link>
                :
                <h2>{news.title}</h2>
                }   
                <p>Time: {news.time_update_news}</p>
                {author!=null&&<p>Tác giá:{author.fullname}</p>}
                {topic!=null&&<p>Chủ đề{topic.topicname}</p>}
                <p>Description news: {news.descriptions}</p>
                
            </Content>
        
        </Wrapper>
    )
    
}