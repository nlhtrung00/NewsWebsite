import styled from "styled-components";

export const Wrapper=styled.div`
    width: 220px;
    min-height: 300px;
    background-color: #ebebeb;
    padding: 5px 0 5px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);

    
`

export const Content=styled.div`




    .img{
        max-width: 100%;
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
        background-color: #22ad22;
        border: none;
        padding: 5px 10px 5px;
        font-size: 17px;
        cursor: pointer;
        color: white;
    }
    .no{
        background-color: #f12b2b;
        border: none;
        padding: 5px 10px 5px;
        font-size: 17px;
        cursor: pointer;
        color:white;
    }
`