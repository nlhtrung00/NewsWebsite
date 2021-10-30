import { NavSidebar } from "./NavSidebar"
import { Container } from "./HomeStyles"
import { ContentMain } from "./ContentMain"
import { useState } from "react"
export const HomeAdmin=()=>{
    const [option, setOption] = useState('');
    console.log(option);
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