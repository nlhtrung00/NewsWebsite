import styled from "styled-components";
export const Wrapper = styled.div`
    background-color: var(--White);
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px 0 20px;
    
    .user-option{
        display: flex;
        align-items: center;
    }
    a{
        text-decoration: none;
        color: black;
        margin-right: 5px;
    }
`
export const NavBar = styled.div`
    ul{
        list-style-type: none;
        margin: 0 auto;
        padding: 0;
        
    }
    li{
        min-width: 130px;
        text-align: center;
        float: left;
        padding: 20px;
        font-size: var(--fontMed);
        cursor: pointer;
        
    }
    li:hover{
        background-color: #48b8a9;
    }
    
 
    
`
export const User = styled.img`
    height: 100%;
    width: 30px;
    cursor: pointer;
 

    
    
`

export const News = styled.div`
    
`