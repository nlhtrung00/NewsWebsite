import React from "react";
//components
import { Header } from "../components/Header";
import { Container,Content } from "./Home.styles";
import Newest from "../components/NewestNews";

export const Home = () => {
    
    return (
        <>
        <Header /> 
        <Container>
            <Content>
                <Newest header='Tin mới nhất'>
                    Tin
                </Newest>
            </Content>    
        </Container>
        </>
    )
}