import react,{useState, useEffect} from "react";


import { Wrapper,Content } from "./CreateTopic.styles";

const CreateTopics=()=>{
    
    const [formvalues, setFormValues] = useState({
        topic:'',
        subtopicname:'',
        describe:''
    });
    
    
    const handleChange=(e)=>{
        const {name, value} = e.currentTarget;
        setFormValues(prevState=>({
            ...prevState,
            [name] : value
        })
        )
        
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const describe = formvalues.describe;
        const subtopicname = formvalues.subtopicname;
        const topic = formvalues.topic;

        const dataPost ={subtopicname,topic};
        
        const response = await fetch('https://localhost:44387/api/Subtopics',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'accept': 'text/plain'
                
            },
            body:JSON.stringify(dataPost)
        }
        ).then(()=>{
            console.log('topic added');
        })
    
        
        
        
    }

    return(
            <Wrapper>
                <Content>
                    <h2 className="header-title">Tạo chủ đề bản tin</h2>
                    <form className="form-create-news row-display-column">
                        <div className="row-item-input">
                            <label htmlFor="subtopicname" className="col-1">Tên chủ đề</label>
                            <input name="subtopicname" id="subtopic" 
                            placeholder="Nhập tên" 
                            className="col-2"
                            onChange={handleChange}
                            />
                        </div>
        
                        <div className="row-item-input">
                            <label htmlFor="topic"className="col-1" >Thuộc nhóm chủ đề</label>
                            <select name="topic" className="col-2" onChange={handleChange} value={formvalues.topic} >
                                <option value="">Chọn chủ đề...</option>
                                <option value="chủ đề 1">Chủ đề 1</option>
                                <option value="chủ đề 2">Chủ đề 2</option>
                                <option value="chủ đề 3">Chủ đề 3</option>
                            </select>
                        </div>
        
                        <div className="row-item-input">
                            <label htmlFor="describe"className="col-1">Mô tả chủ đề</label>
                            <textarea name="describe" className="col-2" onChange={handleChange}></textarea>
                        </div>
                        <div className="row confirm-form">
                            
                            <button className="btn btn-cancel">Trở về</button> 
                            <button className="btn btn-register" onClick={handleSubmit}>Đăng ký chủ đề</button>  
                        </div>
                        
                    </form>
                </Content>
            </Wrapper>
    )
}
export default CreateTopics;