import React from "react";
//components
import { Container,Content } from "./Home.styles";
import Newest from "../NewestNews";
import { useHomeFetch } from "../../../fetch/HomeFetch";
import { News } from "../Newsdemo";
import { Header } from "../../Header";
//image temp 
import TempImg from "../../../image/tempImg.jpg"
import { useState } from "react/cjs/react.development";


const Home = () => {
    const {state, loading, error} = useHomeFetch();
    let iduser;
    iduser = localStorage.getItem('iduser');
    //console.log('home'+user);
    // console.log(localStorage);
    // console.log(state.articles);
    
    if(error) return <div>Something wrong happened</div>
    else
    return (
        <>
        <Header user={iduser} /> 
        <Container>
            <Content>
                <Newest header='Tin mới nhất'>
                    { 
                        state.articles.map(news =>(
                            <News
                            key = {news.id}
                            // title = {news.title}
                            // description ={news.descriptions}
                            news = {news}
                            // author ={news.author}
                            // topic = {news.topic}
                            // image = {TempImg}
                            // timeCreate = {news.time_update_news}
                            clickable
                            />   
                    ))}
                    
                </Newest>
            </Content>    
        </Container>
        </>
    )
};
export default Home;