import React from "react";
import { Wrapper, NavBar, User, News } from "./Header.styles";
//image
import UserIcon from '../../image/non_user_icon.png';
import { Link } from "react-router-dom";
export const Header =()=>{
    return(
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
            <User src={UserIcon}/>
                
           

        </Wrapper>
    )
}