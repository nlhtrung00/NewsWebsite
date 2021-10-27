
import { useParams } from "react-router";

import { NewsInfo } from "./NewsInfo";
import { useNewsFetch } from "../../fetch/NewsFetch";
export const News=()=>{
    const {NewsId} = useParams();
    const {state,loading, error} = useNewsFetch(NewsId);
    console.log(NewsId);
    return(
        <>
        <NewsInfo />
        </>
    )
}

