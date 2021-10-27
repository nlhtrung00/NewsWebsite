import { NavTop, Wrapper,Content } from "./Content.styles";
import ApproveNews from "../ApproveNews";
export const ContentMain=({option})=>{
    return(
        <>
        <Wrapper>
            <NavTop>
                <h2 className="welcome">Hello Nguyen Hoai Tan </h2>
            </NavTop>
            <Content>
                {option=='topic_approve' && <ApproveNews/>} 
                {option=='news_approve' && <ApproveNews/>} 
                {option=='news_disapprove' && <h2>Duyệt tin đã hủy</h2>} 
                {option=='topic_disapprove' && <h2>Duyệt chủ đề đã hủy</h2>} 
            </Content>
          
        </Wrapper>
        </>
    )
}