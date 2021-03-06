import React, { useState,useEffect, useRef } from "react";
//styles
import { Container, Content } from "./Subtopicpage.styles";
// api
import apiSettings from "../../API";
//components
import { Header } from "../Header";
import { useParams } from "react-router";
import GroupNews from "../GroupNews";
import { NewsThumb } from "../NewsThumb";
import { Link } from "react-router-dom";
import searchIcon from "../../image/search-icon.png";
const initialSubtopic ={
    subtopic:[]
 }
 const initialtopic ={
    topic:[]
 }
 const initialNews ={
    articles:[]
 }
export const Subtopicpage=()=>{
    // state Subtopic
    const [subtopic, setSubtopic] = useState(initialSubtopic);
    const [errorSubtopic, setErrorSubtopic] = useState(false);
    // state news by Subtopic
    const [news, setNews] = useState(initialNews);
    const [errorNews, setErrorNews] = useState(false);
    const [listPage, setListPage] = useState({});
    const [topic, setTopic] = useState(initialtopic);
    const [search, setSearch] = useState('');
    const [searchTmp, setSearchTmp] = useState('');
    const initial = useRef(true);
    const {Subtopicid} = useParams();
    const pageSize = 3;
    var {page} = useParams();
    
    if(page==null || page<1){
        page = 1;
    }

    const handleSearchTerm = (e) =>{
        setSearchTmp(e.currentTarget.value);
    }

    useEffect(()=>{
        // fetch topic by url
        const fetchSubtopic = async()=>{
            try{
                setErrorSubtopic(false);
                const SubtopicFetch = await apiSettings.fetchSubTopicsById(Subtopicid);
                
                var topicFetch = SubtopicFetch.topic;
                setTopic(()=>({
                    ...topicFetch
                }));
                setSubtopic(() => ({
                    subtopic: SubtopicFetch
                }));
            }
            catch(error){
                setErrorSubtopic(true);
            }
        }
        fetchSubtopic();
    },[Subtopicid]);

    useEffect(()=>{
        // fetch news by topic
        const fetchNewsBySubtopic= async(Subtopicid, page)=>{
            try{
                setErrorNews(false);
                // const newsFetch = await apiSettings.fetchNewsApprovedBySubtopic(Subtopicid);
                const newsFetchByPage = await apiSettings.fetchNewsPaginationApprovedBySubtopic(Subtopicid, page, pageSize);
                const newsFetchTotal = await apiSettings.fetchNewsApprovedBySubtopic(Subtopicid);
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
        fetchNewsBySubtopic(Subtopicid, page);
    },[Subtopicid, page]);

    useEffect(()=>{
        const searchNews = async()=>{
            let News = await apiSettings.fetchNewsApprovedBySubtopic(Subtopicid);
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
    },[search, Subtopicid])

    const iduser = localStorage.getItem('iduser');
    
    useEffect(() =>{
        // check ??i???u ki???n l???n ?????u ti??n khi ch??a nh???p g??, h??? th???ng kh??ng search g?? c???
        if(initial.current)
        {
            //set false, nh???ng l???n sau, h??? th???ng s??? c?? th??? t??m bth
            initial.current=false;
            return;
        }
        
        // thi???t l???p sau 0.5 gi??y, s??? th???c hi???n l???nh setSearchTerm b???ng state
        //hi???n t???i, cleartimeout d??ng x??a timeout tr?????c khi n?? di???n ra
        const timer = setTimeout( ()=>{
            setSearch(searchTmp);
        },500)
        return () => clearTimeout(timer)
    }, [searchTmp])

    if(errorSubtopic){
        return(
            <div>
                <h2>
                    Something wrong while fetch SubTopic
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
    if(!errorSubtopic && subtopic.subtopic !=null && news!=null){
        return(
            <>  
                <Header user={iduser}/>
                <Container>
                    <Content>
                    <div className="wrapper-formsearch">
                            <div className="form-search">
                                <input type='text' placeholder='T??m ki???m tin t???c' 
                                    onChange={handleSearchTerm} 
                                />
                                <img src={searchIcon} alt='search-icon' className="search"/>
                            </div>
                    </div>
                    <GroupNews header={subtopic.subtopic.subtopicname != null && "Ch??? ?????: " + subtopic.subtopic.subtopicname}>
                        <h2>Thu???c nh??m: {topic.topicname != null && topic.topicname}</h2>
                        {   news !=null && 
                            news.articles.map(news =>(
                                <NewsThumb
                                key = {news.id}
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

                                            <Link to={`/subtopic/${subtopic.subtopic.id}/page/${pageNumber}/pageSize/3`} key={subtopic.subtopic.id + pageNumber}>
                                                {pageNumber}
                                            </Link>
                                        </button>
                                    )
                                    }
                                else{
                                    return(
                                        
                                        <button className="active-page" key={pageNumber}>

                                            <Link to={`/subtopic/${subtopic.subtopic.id}/page/${pageNumber}/pageSize/3`} key={subtopic.subtopic.id + pageNumber}>
                                                {pageNumber}
                                            </Link>
                                        </button>
                                    )
                                }
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