import React, { useState,useEffect, useRef } from "react";
//styles
import { Container, Content } from "./Topicpage.styles";
// api
import apiSettings from "../../API";
//components
import { Header } from "../Header";
import { useParams } from "react-router";
import GroupNews from "../GroupNews";
import { NewsThumb } from "../NewsThumb";
import { Link } from "react-router-dom";
import searchIcon from "../../image/search-icon.png";
const initialTopic ={
    topic:[]
 }
 const initialNews ={
    articles:[]
 }
export const Topicpage=()=>{
    // state topic
    const [topic, setTopic] = useState(initialTopic);
    const [errorTopic, setErrorTopic] = useState(false);
    // state news by topic
    const [news, setNews] = useState(initialNews);
    const [errorNews, setErrorNews] = useState(false);
    const [listPage, setListPage] = useState({});
    const [search, setSearch] = useState('');
    const [searchTmp, setSearchTmp] = useState('');

    const initial = useRef(true);
    const {Topicid} = useParams();
    const pageSize = 3;
    let {page} = useParams();
    if(page==null || page<1){
        page = 1;
    }
    
    // fetch news by topic
    
    

    const handleSearchTerm = (e) =>{
        setSearchTmp(e.currentTarget.value);
    }
    
    useEffect(()=>{
        // fetch topic by url
        const fetchTopic = async()=>{
        try{
            const topicFetch = await apiSettings.fetchTopicById(Topicid);
            setTopic(() => ({
                topic: topicFetch
            }));
        }
        catch(error){
            setErrorTopic(true);
        }
    }
        fetchTopic();
    }, [Topicid]);

    useEffect(()=>{
        const fetchNewsByTopic= async()=>{
            try{
                const newsFetchByPage = await apiSettings.fetchNewsPaginationApprovedByTopic(Topicid, page, pageSize);
                const newsFetchTotal = await apiSettings.fetchNewsApprovedByTopic(Topicid);
                setNews(() => ({
                    ...newsFetchByPage
                }));
                var totalPage = (Math.ceil(newsFetchTotal.articles.length / pageSize));
                var listofpage = [];
                for(let i=0;i<totalPage;i++){
                    listofpage[i] = i+1;
                }
                setListPage(
                    listofpage
                );
                
            }
            catch(error){
                setErrorNews(true);
            }
        }
        fetchNewsByTopic(Topicid, page);
    },[Topicid, page]);

    useEffect(()=>{
        const searchNews = async()=>{
            let News = await apiSettings.fetchNewsApprovedByTopic(Topicid);
            if (search.trim()) {
                News.articles = News.articles.filter((newsfilter) => {
                    var searchtxt = search.toLowerCase();
                    let title = newsfilter.title.toLowerCase();
                    return (title.search(searchtxt) >= 0);
                }
                )
            }
            setNews({
                ...News
            })
            
        }
        searchNews();

    },[search, Topicid])

    const iduser = localStorage.getItem('iduser');
    useEffect(() =>{
        // check điều kiện lần đầu tiên khi chưa nhập gì, hệ thống không search gì cả
        if(initial.current)
        {
            //set false, những lần sau, hệ thống sẽ có thể tìm bth
            initial.current=false;
            return;
        }
        
        // thiết lập sau 0.5 giây, sẽ thực hiện lệnh setSearchTerm bằng state
        //hiện tại, cleartimeout dùng xóa timeout trước khi nó diễn ra
        const timer = setTimeout( ()=>{
            setSearch(searchTmp);
        },1000);
        return () => clearTimeout(timer)
    }, [searchTmp, setSearch])

    if(errorTopic){
        return(
            <div>
                <h2>
                    Something wrong while fetch Topic
                </h2>
            </div>
        )
    }
    else
    if(errorNews){
        return(
            <div>
                <h2>
                    Something wrong while fetch News
                </h2>
            </div>
        )
    }
    else
    if(news!==null){
        return(
            <>  
                <Header user={iduser}/>
                <Container>
                    <Content>
                        <div className="wrapper-formsearch">
                            <div className="form-search">
                                <input type='text' placeholder='Tìm kiếm tin tức' 
                                    onChange={handleSearchTerm} 
                                />
                                <img src={searchIcon} alt='search-icon' className="search"/>
                            </div>
                        </div>
                        <GroupNews header={"Nhóm chủ đề: " +topic.topic.topicname}>
                            {   news !== {} && 
                                news.articles.map(news =>(
                                    <NewsThumb 
                                        key={news.id}
                                        newsid = {news.id}
                                        clickable
                                    />   
                            ))}
                            <div className="pagination-footer">
                            {   listPage.length > 0 &&
                                listPage.map(pageNumber =>{
                                    pageNumber=pageNumber.toString();
                                    if(page!==pageNumber){
                                        return(
                                            <button key={pageNumber}>
                                                <Link to={`/topic/${Topicid}/page/${pageNumber}/pageSize/3`} key={Topicid + pageNumber}>
                                                    {pageNumber}
                                                </Link>
                                            </button>
                                        )
                                    }

                                    return(
                                        <button className="active-page" key={pageNumber}>

                                            <Link  to={`/topic/${Topicid}/page/${pageNumber}/pageSize/3`} key={Topicid + pageNumber}>
                                                {pageNumber}
                                            </Link>
                                        </button>
                                    )
                                    })
                                }
                            </div>
                        </GroupNews>
                    </Content>              
                </Container>
            </>
        )
    }
    
}