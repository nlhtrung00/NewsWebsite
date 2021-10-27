import styled from "styled-components";

export const Wrapper=styled.div`
    height: 100%;
    width: 400px;
    background-color: #fddb9f96;
    border-radius: 20px;
    padding: 10px;
    
    .row{
        display: flex;
        align-items: center;
        
    }
    .logo-wrapper{
        width: 80px;
    }
    .logo{
        width: 100%;
    }

    .list-tasks{
        list-style-type: none;
        margin: 0;
        padding: 0;
        
    }
    .list-tasks li{
       
       font-size: 19px;
       padding: 10px;
       cursor: pointer;
       margin: 5px;
        
    }
    .list-tasks li:hover{
        border-bottom: 2px solid black;
        
    }
`