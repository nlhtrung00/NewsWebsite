import React from "react";
//components
import { Container,Content } from "./Home.styles";
import { useHomeFetch } from "../../../fetch/HomeFetch";
import GroupNews from "../../GroupNews";
import { NewsThumb } from "../../NewsThumb";
import { Header } from "../../Header";

const Home = () => {
    const {state, error} = useHomeFetch();
    const iduser = localStorage.getItem('iduser');
    if(error) return <div>Something wrong happened</div>
    else
    return (
        <>
        <Header user={iduser} /> 
        <Container>
            <Content>
                <GroupNews header='Tin mới nhất'>
                    {   state.Newest.articles!=null &&
                        state.Newest.articles.map(news =>(
                            <NewsThumb
                                key = {news.id}
                                newsid = {news.id}
                                clickable
                            /> 
                    ))}
                </GroupNews>
                <GroupNews header='Tin được xem nhiều'>
                    {   state.Hottest.views!=null && 
                        state.Hottest.views.map(view =>(
                            <NewsThumb
                                key = {view.idNews}
                                newsid = {view.idNews}
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