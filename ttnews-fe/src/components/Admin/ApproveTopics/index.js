import { Container,Wrapper,Content } from "./ApproveTopics.styles";
import TempApproveImg from '../../../image/temp_approve.jpg';
// import { useSubTopicFetchByTopic } from "../../../fetch/FetchSubByStatus";
import apiSettings from "../../../API";
import { useState,useEffect } from "react/cjs/react.development";

const initialState ={
    subtopics:[],
 }
const ApproveTopic=({statusApprove})=>{
    //const {state, errorFetchSubtopic} = useSubTopicFetchByTopic(status)
    const[state,setState] = useState(initialState);
    const[approve,setApprove] = useState(false);
    const [error,setError] = useState(false);
    const fetchsubTopics = async()=>{
        try{
            setError(false);          
            const subtopics = await apiSettings.fetchSubtopicByStatus(statusApprove);
            console.log(subtopics);
            setState(() => ({
                subtopics,
            }));
        }
        catch(error){
            setError(true);
        }
        setApprove(false);
    }
    useEffect(()=>{
        setState(initialState);
        fetchsubTopics();
    },[approve])

    const Approve =async(e)=>{
        console.log(e.target.value);
        if(state.subtopics!=null){
           state.subtopics.map(async(subtopic)=>{
            if(subtopic.id===e.target.value){
                const id = subtopic.id;
                const subtopicname = subtopic.subtopicname;
                const status = "approved";
                const topic ={
                    id:subtopic.topic.id,
                    topicname:subtopic.topic.topicname
                };
                const dataPost ={id,subtopicname,status,topic};
                var datajson = JSON.stringify(dataPost);
                console.log(datajson);
                await fetch(`https://localhost:44387/api/Subtopics/${id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'accept': '*/*'  
                    },
                    body:datajson
                    }
                    ).then(
                        setApprove(true)
                    )
                    
                    .catch(err => console.log(err))
            }
           })        
        }
    }  
    const Decline =async(e)=>{
        console.log(e.target.value);
        if(state.subtopics!=null){
           state.subtopics.map(async(subtopic)=>{
            if(subtopic.id===e.target.value){
                const id = subtopic.id;
                const subtopicname = subtopic.subtopicname;
                const status = "declined";
                const topic ={
                    id:subtopic.topic.id,
                    topicname:subtopic.topic.topicname
                };
                const dataPost ={id,subtopicname,status,topic};
                var datajson = JSON.stringify(dataPost);
                console.log(datajson);
                await fetch(`https://localhost:44387/api/Subtopics/${id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'accept': '*/*'  
                    },
                    body:datajson
                    }
                    ).then(
                        setApprove(true)
                    )
                    
                    .catch(err => console.log(err))
            }
           })        
        }
    }      
                
                  
        
    


    return(
        <>
        
        <Container>
         {state.subtopics!=null&&state.subtopics.map(subtopic =>{
            return(
            <Wrapper key={subtopic.id}>
                <Content >
                   
                    <div >
                        <div className="title-subtopic">
                            <h4>{subtopic.subtopicname}</h4>
                        </div>
                        
                        <div className="topic-type">
                            Thuộc nhóm chủ đề:
                            <p>{subtopic.topic.topicname}</p>
                        </div>
                    </div>
                    <img className="img" src={TempApproveImg} alt="tempimg"/>
                    <hr/>
                    
                    <div className="footer-approve row">
                    <button className="no" value={subtopic.id} onClick={Decline} ><i className="fas fa-times icon"></i>Hủy</button>
                    <button className="yes" value={subtopic.id} onClick={Approve}><i className="fas fa-check icon"></i>Duyệt</button>    
                    </div>    
                </Content>
            </Wrapper>
           ) })}
           </Container>
        </>
    )
};
export default ApproveTopic;