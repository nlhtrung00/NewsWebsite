import React, { useState,useEffect } from "react";
import { Wrapper, NavBar, User, News } from "./Header.styles";
//image
import UserIcon from '../../image/non_user_icon.png';
import { Link } from "react-router-dom";
import { useTopicFetch } from "../../fetch/TopicFetch";
import apiSettings from "../../API";


const initialState ={
    list:[],
 }
export const Header =(props)=>{
    
    const {state, error} = useTopicFetch();
    const [subtopics, setSubtopics] = useState(initialState);
    const [errorFetch, setError] = useState(false);
    const fetchsubTopics = async()=>{
        try{       
            setError(false);   
            const subtopics = await apiSettings.fetchSubtopicByStatus('approved');
            setSubtopics(() => ({
                list:subtopics,
            }));
        }
        catch(error){
            setError(true);
        }
        
    }

    useEffect(()=>{
        setSubtopics(initialState);
        fetchsubTopics();
    },[])


    if(error){
        return(
            <>
                something wrong with Topic fetch
            </>
        )
    }
    let button;
    const handleLogout=()=>{
        localStorage.clear();
        window.location.reload();
        button = (<Link to="/login"><button>Login</button></Link>);
    }
    //console.log(props.user);
    button = (<Link to="/login"><button>Login</button></Link>);
    if(props.user==null)
        button = (<Link to="/login"><button>Login</button></Link>)
    else{
        button = (<>
        <Link to="/"><button onClick={handleLogout}>Logout</button></Link><div>
            <Link to='/profile'>
                <User src={UserIcon} />
            </Link>
        </div></>
        )    
    }
    if(state!=null)
    return(
        <>
        
        <Wrapper>
            <Link to='/'>
            <News>
                <h1>News</h1>
            </News>
            </Link>
            <NavBar>
                <ul className="topic-list">
                    {state.topics.map(topic=>{
                        return(
                            <Link to={`/topic/${topic.id}`}>
                            <li key={topic.id} className="topic-item">{topic.topicname}
                                <ul className="subtopic-list">
                                    {subtopics.list!=null&&subtopics.list.map(subtopic=>{
                                        
                                        if(subtopic.topic.id==topic.id)
                                        return(
                                            
                                            <li className="subtopic-item" key={subtopic.id}>
                                                <Link to={`/subtopic/${subtopic.id}`}>
                                                {subtopic.subtopicname}
                                                </Link>
                                            </li>
                                         
                                        )
                                    })}           
                                </ul>
                            
                            </li>
                            </Link>
                        )
                    })}
            
                </ul>
            </NavBar>
            <div className="user-option">
                {button}
                
                
            </div>
            
                
           

        </Wrapper>
        </>
    )
}