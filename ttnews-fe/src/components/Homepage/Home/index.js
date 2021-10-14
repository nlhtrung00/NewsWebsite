import React from "react";
//components
import { Container,Content } from "./Home.styles";
import Newest from "../NewestNews";
import { useHomeFetch } from "../../../fetch/HomeFetch";
import { News } from "../Newsdemo";

//image temp 
import TempImg from "../../../image/tempImg.jpg"
const Home = () => {
    const {state, loading, error} = useHomeFetch();
    console.log(state);
    if(error) return <div>Something wrong happened</div>
    else
    return (
        <>
        <Container>
            <Content>
                <Newest header='Tin mới nhất'>
                    {
                        
                        state.articles.map(news =>(
                            <News
                            key = {news.id}
                            title = {news.title}
                            description ={news.description}
                            author ={news.author}
                            url = {news.url}
                            content ={news.content}
                            image = {TempImg}
                            clickable
                            />

                           
                        ))
                    }
                </Newest>
            </Content>    
        </Container>
        </>
    )
};
export default Home;