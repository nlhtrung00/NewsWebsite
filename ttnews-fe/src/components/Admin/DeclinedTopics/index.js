import { EmptyContainer, Container,Wrapper,Content } from "./DeclinedTopics.styles";
import apiSettings from "../../../API";
import { useState,useEffect } from "react/cjs/react.development";
import NoneofWork from "../../../image/background/Checklist.jpg";
const initialState ={
    subtopics:[],
 }
const DeclinedTopic=()=>{
    
    const[state,setState] = useState(initialState);
    const [error,setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    const fetchsubTopics = async(statusApprove)=>{
        try{
            setError(false);          
            const subtopics = await apiSettings.fetchSubtopicByStatus(statusApprove);
            setState(() => ({
                subtopics,
            }));
            if(subtopics.length === 0){
                setEmpty(true);
            }
        }
        catch(error){
            setError(true);
        }
    }
    useEffect(()=>{
        fetchsubTopics('declined');
    },[])

    // Approve topic again
    const Approve =async(e)=>{
        const subTopicId = e.target.value ? e.target.value : e.target.parentNode.value;
        if(state.subtopics!=null){
           state.subtopics.map(async(subtopic)=>{
            if(subtopic.id===subTopicId){
                const id = subtopic.id;
                const subtopicname = subtopic.subtopicname;
                const status = "approved";
                const topic ={
                    id:subtopic.topic.id,
                    topicname:subtopic.topic.topicname
                };
                const dataPost ={id,subtopicname,status,topic};
                var datajson = JSON.stringify(dataPost);
                await fetch(`https://localhost:44387/api/Subtopics/${id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'accept': '*/*'  
                    },
                    body:datajson
                    }
                    )
            }
           }) 
           const subtopics = state.subtopics.filter(subtopic => subtopic.id !== subTopicId);
           setState(() => ({
               subtopics
           }));    
           if(subtopics.length === 0){
            setEmpty(true);
        }        
        }
    } 
    // delete topic declined
    const Delete = async(e) => {
        const subTopicId = e.target.value ? e.target.value : e.target.parentNode.value;
        if(subTopicId!==null){
            await fetch(`https://localhost:44387/api/Subtopics/${subTopicId}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'accept': '*/*'  
                    }
                }
            )
            const subtopics = state.subtopics.filter(subtopic => subtopic.id !== subTopicId);
            setState(() => ({
                subtopics
            }));     
            if(subtopics.length === 0){
                setEmpty(true);
            }
        }
    }
    if(state.subtopics.length===0 && empty){
        return (
            <EmptyContainer>
                <h2>Danh sách chủ đề bị hủy hiện trống</h2>
                <img src={NoneofWork} alt="nothing need to approve" />
            </EmptyContainer>
        )
    }  
    if(error) return <div>Something wrong happen</div>;
    else
    return(
        <Container>
         {state.subtopics.length !==0 &&state.subtopics.map(subtopic =>{
            return(
            <Wrapper key={subtopic.id}>
                <Content >
                   
                    <div className="header">
                        <div className="title-subtopic">
                            <h4>{subtopic.subtopicname}</h4>
                        </div>
                        
                        <div className="topic-type">
                            <p>Thuộc nhóm chủ đề:</p>
                            <p>{subtopic.topic.topicname}</p>
                            <i>Trạng thái: Đã hủy</i>
                        </div>
                    </div>
                    <div className="footer-approve row">
                        <button className="no" value={subtopic.id}  onClick={Delete}><i className="fas fa-times icon"></i>Xóa</button>
                        <button className="yes" value={subtopic.id} onClick={Approve}><i className="fas fa-check icon"></i>Duyệt lại</button>    
                    </div>    
                </Content>
            </Wrapper>
           ) })}
           </Container>
    )
};
export default DeclinedTopic;