import react,{useState,useRef, useEffect} from "react";
import JoditEditor from "jodit-react";
import { Wrapper,Content } from "./CreateNews.styles";
// import Editor from "../Editor/Editor";
const CreateNews=()=>{
    const editor = useRef(null);
    const [content, setContent] = useState("");
    useEffect(()=>{
        setContent()
    },[]);
    const config ={
        readonly: false
    }
    const handleBlur=()=>{
        setContent(editor.current.value);
    }
    
    return(
    <Wrapper>
        <Content>
            <h2 className="header-title">Tạo bài viết</h2>
            <form className="form-create-news row-display-column">
                <div className="row-item-input">
                    <label htmlFor="titlenews" className="col-1">Tiêu đề bài viết</label>
                    <input name="titlenews" id="titlenews" placeholder="Nhập tiêu đề" className="col-2"/>
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
                    <label htmlFor="subtopicnews"className="col-1">Chủ đề chính</label>
                    <select name="subtopicnews"className="col-2">
                        <option value="option1">Chủ đề 1</option>
                        <option value="option2">Chủ đề 2</option>
                        <option value="option3">Chủ đề 3</option>
                    </select>
                </div>
                <div className="row-item-input">
                    <label htmlFor="imgnews"className="col-1">Ảnh bài viết</label>
                    <input type="file" name="imgnews" id="imgnews"className="col-2"/>
                </div>
                <div className="row-item-input">
                    <label htmlFor="contentnews"className="col-1">Nội dung bài viết</label>
                    <div className="col-2">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            onBlur={handleBlur}
                            onChange={newContent => {}}
                        />
                    </div>
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

export default CreateNews;