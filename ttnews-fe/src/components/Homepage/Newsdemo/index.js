import React from "react";
import { Wrapper, Content, Image } from "./News.styles";
import testImg from "../../../image/testimg_news.jpg";
import { Link } from "react-router-dom";
export const News =({title, description, author, url,image, clickable})=>(
    <Wrapper>
        <Image src={image}/>
        <Content>
            {clickable ?<Link to={`/${title}`}>
            <h2>{title}</h2>
            </Link>
            :
            <h2>{title}</h2>
             }   
            
            <i>Author:{author}</i>
            <p>{description}</p>
            <a href={url}>Xem thêm</a>
        </Content>
        
    </Wrapper>
)