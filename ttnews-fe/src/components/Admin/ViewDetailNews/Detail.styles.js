import styled from "styled-components";
export const Container = styled.div`
    width: 100%;
    height:1000px;
    background-color: #e7e7e7;
    padding:10px;
    display: flex;
    overflow: hidden;
    padding-top: 50px;
    
`
export const Wrapper=styled.div`
    width: 1000px;
    height: 100%;
    background-color: white;
    margin: 0 auto;
    border-radius: 5px;
`;
export const Content=styled.div`


    .footer-approve{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    button{
        margin: 20px;
    }
    .row{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .icon{
        margin-right: 5px;
    }
    .yes{
        background-color: #359335;
        border: none;
        padding: 5px 10px 5px;
        font-size: 25px;
        cursor: pointer;
        color: white;
        border-radius: 20px;
        width: 140px;
    }
    .no{
        background-color: #f12b2b;
        border: none;
        padding: 5px 10px 5px;
        font-size: 25px;
        cursor: pointer;
        color:white;
        border-radius: 20px;
        width: 140px;
    }
    .yes:hover{
        background-color: #08b708;
    }
    .no:hover{
        background-color: #ff0606;
    }
`;