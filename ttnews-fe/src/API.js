import { TOP_HEADLINES_URL } from "./config";

//test fake api

const apiSettings = {
    
    fetchPopularNews : async() =>{
        //const endpoint = "https://localhost:44387/api/News";
        const endpoint = TOP_HEADLINES_URL;
        return await ( await fetch(endpoint)).json();
    },
    fetchTopNews : async() =>{
        const endpoint = "https://localhost:44387/api/News";
        return await(await fetch(endpoint)).json();
    },
    fetchNewsById : async NewsId=>{
        const endpoint= `https://localhost:44387/api/News`;
        return await(await fetch(endpoint)).json();
    },
    fetchUserById : async Userid=>{
        const endpoint=`https://localhost:44387/api/Newsusers/${Userid}`;
        return await(await fetch(endpoint)).json();
    }
};
export default apiSettings;