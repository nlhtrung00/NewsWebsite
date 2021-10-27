import { useState, useEffect, useRef } from "react";
import { Wrapper } from "./NavSidebar.styles"
import logoAdmin from "../../../image/adminlogo.png"
export const NavSidebar=({setOption})=>{
    const [state,setState] = useState('');
    const initial = useRef(true);
    useEffect(()=>{
        // if(initial.current)
        // {
        //     initial.current = false;
        //     return;
        // }
        setOption(state)

    },[setOption,state])
  
    return(
        <Wrapper>
            <div className="row">
                <div className="logo-wrapper">
                    <img src={logoAdmin} className="logo"/>
                </div>
                <h1>Administrator</h1>
            </div>
            <hr/>
            <h2>Tác vụ quản lí</h2>
            <ul className="list-tasks">
                <li value="topic_approve" onClick={(e)=>setState('topic_approve')}>Duyệt chủ đề</li>
                <li value="news_approve"onClick={(e)=>setState('news_approve')}>Duyệt bản tin</li>
                <li value="news_disapprove"onClick={(e)=>setState('news_disapprove')}>Danh sách tin đã hủy duyệt</li>
                <li value="topic_disapprove"onClick={(e)=>setState('topic_disapprove')}>Danh sách chủ đề đã hủy duyệt</li>
            </ul>
        </Wrapper>
    )
}