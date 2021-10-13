import react from "react";
import { useLocation } from "react-router";

import { Wrapper,Content } from "./CreateTopic.styles";

const CreateTopics=()=>{
    
    return(
            <Wrapper>
                <Content>
                    <h2 className="header-title">Tạo chủ đề bản tin</h2>
                    <form className="form-create-news row-display-column">
                        <div className="row-item-input">
                            <label htmlFor="titlesubtopics" className="col-1">Tên chủ đề</label>
                            <input name="titlesubtopics" id="titlesubtopics" placeholder="Nhập tên" className="col-2"/>
                        </div>
        
                        <div className="row-item-input">
                            <label htmlFor="topicnews"className="col-1">Thuộc nhóm chủ đề</label>
                            <select name="topicnews" className="col-2">
                                <option value="option1">Chủ đề 1</option>
                                <option value="option2">Chủ đề 2</option>
                                <option value="option3">Chủ đề 3</option>
                            </select>
                        </div>
        
                        <div className="row-item-input">
                            <label htmlFor="des_subtopic"className="col-1">Mô tả chủ đề</label>
                            <textarea name="des_subtopic" className="col-2"></textarea>
                        </div>
                        <div className="row confirm-form">
                            
                            <button className="btn btn-cancel">Trở về</button> 
                            <button className="btn btn-register">Đăng ký chủ đề</button>  
                        </div>
                        
                    </form>
                </Content>
            </Wrapper>
    )
}
export default CreateTopics;