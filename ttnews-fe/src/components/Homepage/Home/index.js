import React from "react";
//components
import { Container,Content } from "./Home.styles";
import Newest from "../NewestNews";
import { useHomeFetch } from "../../../fetch/HomeFetch";
import { News } from "../Newsdemo";
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
                        // eslint-disable-next-line
                        state.articles.map(news =>(
                            <News
                            key = {news.url}
                            title = {news.title}
                            description ={news.description}
                            author ={news.author}
                            url = {news.url}
                            content ={news.content}
                            image = {news.urlToImage}
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