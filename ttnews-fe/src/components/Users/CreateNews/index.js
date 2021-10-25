import react,{useState,useRef, useEffect} from "react";
import JoditEditor from "jodit-react";
import { Wrapper,Content } from "./CreateNews.styles";
import {Link} from 'react-router-dom';
// import Editor from "../Editor/Editor";
const CreateNews=()=>{
    const editor = useRef(null);
    var date = new Date();
    var today = date.getFullYear() +"-"+(date.getMonth()+1)+"-"+date.getDate();
    //console.log(today);
    const [content, setContent] = useState("");
    const [formnews, setFormNews] = useState({
        title:'',
        descriptions:'',
        image:'',
        //topic:'',
        //subtopic:'',
        content:'',
        author:'Hoai Tan - author temp',
        time_update_news: ""
    })
    const [ispeding, setIsPending] = useState(false)

    useEffect(()=>{
        setContent()
    },[]);
    const config ={
        readonly: false
    }
    const handleBlur=()=>{
        setContent(editor.current.value);
        setFormNews(prev=>({
            ...prev,
            content:editor.current.value
        }))
    }
    const onHandleChange=(e)=>{
        const {name, value} = e.currentTarget
        setFormNews(prev =>({
            ...prev,
            [name]:value
        }))
    }
    const handleSubmit=async(e)=>{
        setIsPending(true);
        e.preventDefault();
        // const title = formnews.title;
        // const descriptions = formnews.descriptions;
        // const image = formnews.image;
        // const topic = formnews.topic;
        // const subtopic = formnews.subtopic;
        // const content = formnews.content;
        // const author = formnews.author;
        // const time_update_news =  formnews.time_update_news;
        // const data = {title,descriptions,image,topic,subtopic,content,author,time_update_news};
        formnews.time_update_news = today;
        const data = formnews;
        console.log(JSON.stringify(data));
        const response = await fetch('https://localhost:44387/api/News',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json'
                
            },
            body:JSON.stringify(data)
        }).then((res)=>{
            console.log(res.json());
            setIsPending(false);
        }).catch(err=>{
            console.log(err);
        })
        
        
        
    
        
        
        
    }

    return(
    <Wrapper>
        <Content>
            <h2 className="header-title">Tạo bài viết</h2>
            <form className="form-create-news row-display-column">
                <div className="row-item-input">
                    <label htmlFor="title" className="col-1">Tiêu đề bài viết</label>
                    <input name="title" id="titlenews" onChange={onHandleChange}   placeholder="Nhập tiêu đề" className="col-2"/>
                </div>

                <div className="row-item-input">
                    <label htmlFor="topic"className="col-1">Thuộc nhóm chủ đề</label>
                    <select name="topic" className="col-2"  value={formnews.topic} >
                                <option value="">Chọn chủ đề...</option>
                                <option value="chủ đề 1">Chủ đề 1</option>
                                <option value="chủ đề 2">Chủ đề 2</option>
                                <option value="chủ đề 3">Chủ đề 3</option>
                            </select>
                </div>

                <div className="row-item-input">
                    <label htmlFor="subtopic"className="col-1">Chủ đề chính</label>
                    <select name="subtopic"className="col-2" value={formnews.subtopic}>
                        <option value="">Chọn chủ đề...</option>
                        <option value="Chủ đề 1">Chủ đề 1</option>
                        <option value="Chủ đề 2">Chủ đề 2</option>
                        <option value="Chủ đề 3">Chủ đề 3</option>
                    </select>
                </div>
                <div className="row-item-input">
                    <label htmlFor="descriptions"className="col-1">Mô tả</label>
                    <textarea name="descriptions" onChange={onHandleChange}></textarea>
                </div>
                <div className="row-item-input">
                    <label htmlFor="image"className="col-1">Ảnh bài viết</label>
                    <input type="file" name="image" id="imgnews"className="col-2"/>
                </div>
                <div className="row-item-input">
                    <label htmlFor="content"className="col-1">Nội dung bài viết</label>
                    <div className="col-2">
                        <JoditEditor
                            ref={editor}
                            name="content"
                            config={config}
                            onBlur={handleBlur}
                            onChange={newContent => {}}
                        />
                    </div>
                </div>
                <div className="row confirm-form">  
                    <Link to="/profile"><button className="btn btn-cancel">Trở về</button></Link>        
                     
                    
                    {!ispeding && <button className="btn btn-register" onClick={handleSubmit}>Tạo tin</button>}     
                    {ispeding && <button className="btn btn-register" disabled>Đang tạo...</button>}
                    
                      
                </div>

                

                
                
            </form>
        </Content>
    </Wrapper>
    )
}

export default CreateNews;