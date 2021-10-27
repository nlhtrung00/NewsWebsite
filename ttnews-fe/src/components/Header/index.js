import React from "react";
import { Wrapper, NavBar, User, News } from "./Header.styles";
//image
import UserIcon from '../../image/non_user_icon.png';
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";


export const Header =(props)=>{
    
    let button;
    const handleLogout=()=>{
        localStorage.clear();
        window.location.reload();
        button = (<Link to="/login"><button>Login</button></Link>);
    }
    console.log(props.user);
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
                    <li>Xã hội</li>
                    <li>Sức khỏe</li>
                    <li>Giải trí</li>
                    <li>Công nghệ</li>
                    <li>Du lịch</li>
                    <li>Ẩm thực</li>
                    <li>Đời sống</li>
                </ul>
            </NavBar>
            <div className="user-option">
                {button}
                
                
            </div>
            
                
           

        </Wrapper>
        </>
    )
}