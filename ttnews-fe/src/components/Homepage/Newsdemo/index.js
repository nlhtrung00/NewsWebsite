import React from "react";
import { Wrapper, Content, Image } from "./News.styles";
import testImg from "../../../image/testimg_news.jpg";
import { Link } from "react-router-dom";
export const News =({title, description, author, topic,image, clickable,timeCreate})=>(
    <Wrapper>
        <Image src={image}/>
        <Content>
            {clickable ?<Link to={`/${author}`}>
            <h2>{title}</h2>
            </Link>
            :
            <h2>{title}</h2>
             }   
            <p>Time: {timeCreate}</p>
            <i>Author:{author}</i>
            <p>Topic: {topic}</p>
            <p>Description news: {description}</p>
            
        </Content>
        
    </Wrapper>
)