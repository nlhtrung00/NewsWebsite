import React, { useState } from "react";
//components
import { Container,Content } from "./Home.styles";
import { useHomeFetch } from "../../../fetch/HomeFetch";
import GroupNews from "../../GroupNews";
import { NewsThumb } from "../../NewsThumb";
import { Header } from "../../Header";
import searchIcon from "../../../image/search-icon.png";
//image temp 
// import TempImg from "../../../image/tempImg.jpg"
// import { useState } from "react/cjs/react.development";


const Home = () => {
    const [search, setSearch] = useState('');
    // console.log(search);
    const {state, error} = useHomeFetch(search);
    let iduser;
    iduser = localStorage.getItem('iduser');
    
    
    if(error) return <div>Something wrong happened</div>
    else
    return (
        <>
        <Header user={iduser} /> 
        <Container>
            <Content>
                
                <GroupNews header='Tin mới nhất'>
                    <div className="form-search">
                        <input type='text' placeholder='Tìm kiếm tin tức' 
                            onChange={e => setSearch(e.currentTarget.value)} 
                        />
                        <img src={searchIcon} alt='search-icon' className="search"/>
                    </div>
                
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