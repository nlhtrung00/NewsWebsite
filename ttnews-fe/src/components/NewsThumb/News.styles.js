import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;  
    margin: 30px auto 30px ;
    background-color: #f2f5f0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow:1px 1px 1px 1px rgba(0,0,0,0.2);
    width: 95%;
    .wrapper-img{
        height: 240px;
        width: 300px;
        overflow: hidden;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    /* max-width: 320px; */
    object-fit: cover;
`;

export const Content = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    width: 70%;
    p{
        font-size: 18px;
    }
    .title{
        font-size: 22px;
        font-weight: 600;
    }

    .readmore{
        font-size: 17px;
        font-weight: 500;
        color: red;
        margin-left:5px;
    }
    a{
        text-decoration: none;
        color: black;
        font-size: 20px;
    }
`;