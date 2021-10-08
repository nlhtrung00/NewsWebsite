import React from "react";
import { Wrapper, Content, Image } from "./News.styles";
import testImg from "../../../image/testimg_news.jpg";
export const News =({title, description, author, url, content})=>(
    <Wrapper>
        <Image src={testImg}/>
        <Content>
            <h2>{title}</h2>
            <i>Author:{author}</i>
            <p>{description}</p>
            <h3>Content:</h3>
            <p>{content}</p>
            
            <a href={url}>Xem thêm</a>
        </Content>
        
    </Wrapper>
)