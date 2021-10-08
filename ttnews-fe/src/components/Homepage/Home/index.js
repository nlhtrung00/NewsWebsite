import React from "react";
//components
import { Header } from '../../Header';
import { Container,Content } from "./Home.styles";
import Newest from "../NewestNews";
import { useHomeFetch } from "../../../fetch/NewsFetch";
import { News } from "../News";
const Home = () => {
    const {state, loading, error} = useHomeFetch();
    console.log(state);
    if(error) return <div>Something wrong happened</div>
    else
    return (
        <>
        <Header /> 
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