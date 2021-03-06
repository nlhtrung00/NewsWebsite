import { EmptyContainer,Container,Wrapper,Content } from "./ApproveTopics.styles";
import TempApproveImg from '../../../image/temp_approve.jpg';
// import { useSubTopicFetchByTopic } from "../../../fetch/FetchSubByStatus";
import apiSettings from "../../../API";
import { useState,useEffect } from "react/cjs/react.development";
import NoneofWork from "../../../image/background/Checklist.jpg";
const initialState ={
    subtopics:[],
 }
const ApproveTopic=()=>{
    const [state,setState] = useState(initialState);
    const [error,setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    const fetchsubTopics = async(statusApprove)=>{
        try{
            const subtopics = await apiSettings.fetchSubtopicByStatus(statusApprove);
            
            setState(() => ({
                subtopics
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
        fetchsubTopics('disapprove');
    },[])

    const Approve = async(e)=>{
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
                    ).catch(() => alert('L???i duy???t ch??? ?????! Vui l??ng th??? l???i!'))
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
    const Decline = async(e)=>{
        const subTopicId = e.target.value ? e.target.value : e.target.parentNode.value;
        if(state.subtopics!=null){
            state.subtopics.map(async(subtopic)=>{
                if(subtopic.id===subTopicId){
                    const id = subtopic.id;
                    const subtopicname = subtopic.subtopicname;
                    const status = "declined";
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
                        ).catch(() => alert('L???i h???y ch??? ?????! Vui l??ng th??? l???i!'))
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
                
                  
    
    if(error) return <div>Something wrong happen</div>;
    else
    if(state.subtopics.length===0 && empty){
        return (
            <EmptyContainer>
                <h2>Kh??ng ch??? ????? n??o c???n duy???t</h2>
                <img src={NoneofWork} alt="nothing need to approve" />
            </EmptyContainer>
        )
    }    
    else
    return(
        <Container>
         {state.subtopics.length !== 0&&state.subtopics.map(subtopic =>{
            return(
            <Wrapper key={subtopic.id}>
                <Content >
                   
                    <div >
                        <div className="title-subtopic">
                            <h4>{subtopic.subtopicname}</h4>
                        </div>
                        
                        <div className="topic-type">
                            Thu???c nh??m ch??? ?????:
                            <p>{subtopic.topic.topicname}</p>
                        </div>
                    </div>
                    <img className="img" src={TempApproveImg} alt="tempimg"/>
                    <hr/>
                    
                    <div className="footer-approve row">
                        <button className="no" value={subtopic.id} onClick={Decline}><i className="fas fa-times icon"></i>H???y</button>
                        <button className="yes" value={subtopic.id} onClick={Approve}><i className="fas fa-check icon"></i>Duy???t</button>    
                    </div>    
                </Content>
            </Wrapper>
           ) })}
           </Container>
    )
};
export default ApproveTopic;