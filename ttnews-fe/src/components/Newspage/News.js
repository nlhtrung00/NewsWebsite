
import { useParams } from "react-router";

import { NewsInfo } from "./NewsInfo";
import { useNewsFetch } from "../../fetch/NewsFetch";
export const News=()=>{
    const {NewsId} = useParams();
    
    console.log(NewsId);
    return(
        <>
        <NewsInfo />
        </>
    )
}

