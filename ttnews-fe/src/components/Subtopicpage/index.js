import React from "react";
//styles
import { Container, Content } from "./Subtopicpage.styles";
//components
import { Header } from "../Header";
import { useParams } from "react-router";
export const Subtopicpage=()=>{
    const {Topicid} = useParams();
    console.log(Topicid);
    return(
        <>  
            <Header/>
            <Container>
                <Content>
                <h2>hello</h2>
                </Content>              
            </Container>
                
           
        </>
    )
}