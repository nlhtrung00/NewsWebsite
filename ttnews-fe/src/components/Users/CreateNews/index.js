import {useState,useRef, useEffect} from "react";
import JoditEditor from "jodit-react";
import { Wrapper,Content } from "./CreateNews.styles";
import {Link} from 'react-router-dom';
import {useTopicFetch} from '../../../fetch/TopicFetch'
import { useUserFetch } from "../../../fetch/UserFetch";
import { Header } from "../../Header";
const CreateNews=()=>{
    

    const [ispeding, setIsPending] = useState(false)
    const {state} = useTopicFetch();
    const [subTopics, setSubtopics] = useState();
    const [subtopic, setSuctopic] =useState();
    const [topic,setTopic] = useState();
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState();
    const {user} = useUserFetch(localStorage.getItem('iduser'));
    const [formnews, setFormNews] = useState({
        title:'',
        descriptions:'',
        image:'',
        content:'',
        time_update_news: ""
    })

    
    const editor = useRef(null);
    var date = new Date();
    var today = date.getFullYear() +"-"+(date.getMonth()+1)+"-"+date.getDate();
    

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
        }));
      
    }

    const handleChangeTopic=async(e)=>{
        const topicid = e.target.value; 
        const topicFetch = await (await fetch(`https://localhost:44387/api/Topics/${topicid}`)).json();
        setTopic(()=>({
            ...topicFetch
        }));
        const subtopicFetch = await (await fetch(`https://localhost:44387/api/Subtopics/Topic/${topicid}`)).json();
        setSubtopics(subtopicFetch);
        setAuthor(user.User);
    }
    const handleChangeSubtopic=async(e)=>{
        const subtopicid = e.target.value; 
        const subtopicFetch = await (await fetch(`https://localhost:44387/api/Subtopics/GetById/${subtopicid}`)).json();
        setSuctopic(()=>({
            ...subtopicFetch
        }));
    }

    
    
                                    
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsPending(true);   
        
        formnews.time_update_news = today;
        const title = formnews.title;
        const description = formnews.descriptions;
        const content = formnews.content;
        const time_update = today;

        const data = {
            title,
            description,
            content,
            time_update,
            topic,
            subtopic,
            author
        };
        console.log(JSON.stringify(data))
        const response = await fetch('https://localhost:44387/api/News',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json'
                
            },
            body:JSON.stringify(data)
        }).then((res)=>{
            console.log(res.json());
        }).catch(err=>{
            console.log(err);
        })
        setIsPending(false);
        
        
    
        
        
        
    }

    return(
    <>
        <Header/>
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
                        <select name="topic" className="col-2" onChange={handleChangeTopic} >
                                    <option value="">Chọn chủ đề...</option>
                                    {state.topics.map(topic => {
                                        
                                        return(
                                            
                                            <option value={topic.id} key={topic.id}>
                                            {topic.topicname}
                                            </option>
                                        )
                                    
                                    
                                    })}
                            </select>
                    </div>

                    <div className="row-item-input">
                        <label htmlFor="subtopic"className="col-1">Chủ đề chính</label>
                        <select name="subtopic"className="col-2" onChange={handleChangeSubtopic}>
                            <option value="">Chọn chủ đề...</option>
                                {subTopics!=null && subTopics.map(subtopic => {
                                    return (
                                        <option value={subtopic.id} key={subtopic.id}>
                                            {subtopic.subtopicname}
                                        </option>
                                    )
                                })}
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
    </>
    )
}

export default CreateNews;