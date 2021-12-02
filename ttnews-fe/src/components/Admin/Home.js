import { NavSidebar } from "./NavSidebar"
import { Container } from "./HomeStyles"
import { ContentMain } from "./ContentMain"
import { useState } from "react"
import { Redirect } from "react-router-dom";
import { useUserFetch } from "../../fetch/UserFetch";

export const HomeAdmin=()=>{
    const [option, setOption] = useState('');   
    const idadmin = localStorage.getItem('iduser');
    const role = localStorage.getItem('role');
    const {user,error} = useUserFetch(idadmin);
    
    if(role !=="boss"&&role!=="admin" || idadmin==null){
        return(
            <Redirect to='/' />
        )
        
    }
    
    if(error){
        return(
            <>
                <h2>
                    Error
                </h2>
            </>
        )
    }
    else{
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
    
    
    // else if(user!=null && user.role==="admin"){
    //     
    // }
   
   
    
}