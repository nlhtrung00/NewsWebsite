
import { useParams } from "react-router";

import { ReadingNews } from "./ReadingNews";
import { useNewsFetch } from "../../fetch/NewsFetch";
export const News=()=>{
    const {NewsId} = useParams();   
    console.log(NewsId);
    return(
        <>
        <ReadingNews Newsid={NewsId} />
        </>
    )
}

