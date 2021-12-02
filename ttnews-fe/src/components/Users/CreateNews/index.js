import {useState,useRef} from "react";
import JoditEditor from "jodit-react";
import { Wrapper,Content } from "./CreateNews.styles";
import {Link} from 'react-router-dom';
import {useTopicFetch} from '../../../fetch/TopicFetch'
import { useUserFetch } from "../../../fetch/UserFetch";
import { Header } from "../../Header";
import { Redirect } from "react-router-dom";
const CreateNews=()=>{
    

    // const [ispeding, setIsPending] = useState(false)
    const {state} = useTopicFetch();
    const [subTopics, setSubtopics] = useState();
    const [subtopic, setSubtopic] =useState();
    const [topic,setTopic] = useState();
    const [author, setAuthor] = useState(); 
    const [uploadFile, setUploadFile] = useState();
    const [redirect, setRedirect] = useState(false);
    const [formnews, setFormNews] = useState({
        title:'',
        descriptions:'',
        content:'',
        time_update_news: ""
    })  

    
    const {user} = useUserFetch(localStorage.getItem('iduser'));  
    
    const editor = useRef(null);
    var date = new Date();
    var today = date.getFullYear() +"-"+(date.getMonth()+1)+"-"+date.getDate();
    if(redirect){
        return <Redirect to="/profile" />
    }
    
    
    const config ={
        readonly: false
    }
    const handleBlur=()=>{
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
        let subtopic = [];
        for(const element of subtopicFetch){
            if (element.status === 'approved') subtopic.push(element);
        }
        setSubtopics(subtopic);
        setAuthor(user);
    }
    const handleChangeSubtopic=async(e)=>{
        const subtopicid = e.target.value; 
        const subtopicFetch = await (await fetch(`https://localhost:44387/api/Subtopics/GetById/${subtopicid}`)).json();
        setSubtopic(()=>({
            ...subtopicFetch
        }));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        //setIsPending(true);   
        let dataArray = new FormData();
        dataArray.append('title',formnews.title);
        dataArray.append('descriptions',formnews.descriptions);
        dataArray.append('content',formnews.content);
        dataArray.append('time_update_news',today);
        dataArray.append('topic.id',topic.id);
        dataArray.append('topic.topicname',topic.topicname);
        dataArray.append('subtopic.id',subtopic.id);
        dataArray.append('subtopic.subtopicname',subtopic.subtopicname);
        dataArray.append('subtopic.topic.id',subtopic.topic.id);
        dataArray.append('subtopic.topic.name',subtopic.topic.topicname);
        dataArray.append('subtopic.status',subtopic.status);
        dataArray.append('author.id',author.id);
        dataArray.append('author.fullname',author.fullname);
        dataArray.append('author.dateofbirth',author.dateofbirth);
        dataArray.append('author.role',author.role);
        dataArray.append('image',uploadFile);

        const response = await fetch('https://localhost:44387/api/News',{
            method:'POST',
            body:dataArray
        }).then((res)=>{
            console.log(res.json());
            setRedirect(true);
            alert('Thêm thành công');
        }).catch(err=>{
            console.log(err);
        })
        //setIsPending(false);
   
    }
    
    if(user == null){
        return <Redirect to="/" />
    }
    else{
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
                                <input type="file" name="image" id="imgnews"className="col-2" onChange={(e)=>setUploadFile(e.target.files[0])}/>
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
                                
                                
                                {<button className="btn btn-register" onClick={handleSubmit}>Tạo tin</button>}     
                                {<button className="btn btn-register" disabled>Đang tạo...</button>}
                                
                                
                            </div>
        
                            
        
                            
                            
                        </form>
                    </Content>
                </Wrapper>
            </>
            )
    }
    
}

export default CreateNews;