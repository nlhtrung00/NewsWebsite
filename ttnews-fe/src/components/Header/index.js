import React from "react";
import { Wrapper, NavBar, User, News } from "./Header.styles";
//image
import UserIcon from '../../image/non_user_icon.png';
import { Link } from "react-router-dom";
import { useTopicFetch } from "../../fetch/TopicFetch";


export const Header =(props)=>{
    
    const {state, error} = useTopicFetch();
    console.log(state);
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
                <ul>
                    {state.topics.map(topic=>{
                        return(
                            <li key={topic.id}>{topic.topicname}</li>
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