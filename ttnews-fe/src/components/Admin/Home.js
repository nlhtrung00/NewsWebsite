import { NavSidebar } from "./NavSidebar"
import { Container } from "./HomeStyles"
import { ContentMain } from "./ContentMain"
import { useState } from "react"
import { Redirect } from "react-router-dom";


export const HomeAdmin=()=>{
    const [option, setOption] = useState();   
    const idadmin = localStorage.getItem('iduser');
    const role = localStorage.getItem('role');  
    if(role === "user" || idadmin == null){
        return(
            <Redirect to='/' />
        )
    }
    return(
        <>
            <Container>
                <NavSidebar setOption={setOption}/>
                <ContentMain
                    option = {option}
                />    
            </Container>
        </>
    )
}