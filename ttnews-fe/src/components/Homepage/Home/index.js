import React from "react";
//components
import { Container,Content } from "./Home.styles";
import { useHomeFetch } from "../../../fetch/HomeFetch";
import GroupNews from "../../GroupNews";
import { NewsThumb } from "../../NewsThumb";
import { Header } from "../../Header";
//image temp 
// import TempImg from "../../../image/tempImg.jpg"
// import { useState } from "react/cjs/react.development";


const Home = () => {
    const {state, error} = useHomeFetch();
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
                <GroupNews header='Tin mới nhất'>
                    { 
                        state.articles.map(news =>(
                            <NewsThumb
                            key = {news.id}
                            news = {news}
                            clickable
                            />   
                    ))}
                    
                </GroupNews>
            </Content>    
        </Container>
        </>
    )
};
export default Home;