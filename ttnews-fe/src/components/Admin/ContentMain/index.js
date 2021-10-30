import { NavTop, Wrapper,Content } from "./Content.styles";
import ApproveNews from "../ApproveNews";
import ApproveTopic from "../ApproveTopics"
import { useUserFetch } from "../../../fetch/UserFetch";
import { Redirect } from "react-router";
import { useState } from "react/cjs/react.development";
export const ContentMain=({option})=>{
    const [role, setRole] = useState('');
    let iduser;
    iduser = localStorage.getItem('iduser');
    if(iduser==null){
        <Redirect to='/' />
    }
    const {user} = useUserFetch(iduser);
    let userfullname='NA', userdateofbirth='NA';
    if(user.User != null){
        userfullname = user.User.fullname;
        userdateofbirth = user.User.dateofbirth;

    }

    return(
        <>
        <Wrapper>
            <NavTop>
                <h2 className="welcome">Xin chào {userfullname}</h2>
            </NavTop>
            <Content>
                {option==='topic_approve' && <ApproveTopic
                    statusApprove='disapprove'
                    />} 
                {option==='news_approve' && <ApproveNews
                    statusApprove="disapprove"
                    />} 
                {option==='news_disapprove' && <h2>Duyệt tin đã hủy</h2>} 
                {option==='topic_disapprove' && <h2>Duyệt chủ đề đã hủy</h2>} 
            </Content>
          
        </Wrapper>
        </>
    )
}