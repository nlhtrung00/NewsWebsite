import styled from "styled-components";

export const Wrapper=styled.div`
    width: 100%;
    height: 100%;
    background-color: f9f9f9;
    border-radius: 20px;
    margin-left: 20px;
    box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.3);
`
export const NavTop=styled.div`
    width: 100%;
    height: 50px;
    background-color: #b9e2cd;
    border-radius: 19px 19px 0 0;
    position: relative;

    .welcome{
        max-width: 300px;
        min-width: fit-content;
        position: absolute;
        top: 50%;
        left: 90%;
        transform: translate(-70%,-50%);
        margin: 0;
    }
`
export const Content=styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    
`