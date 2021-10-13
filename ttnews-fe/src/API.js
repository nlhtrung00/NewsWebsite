import { API_KEY, API_URL, POPULAR_URL, TOP_HEADLINES_URL } from "./config";

//test fake api
const apiSettings = {
    fetchPopularNews : async() =>{
        const endpoint = POPULAR_URL;
        return await ( await fetch(endpoint)).json();
    },
    fetchTopNews : async() =>{
        const endpoint = TOP_HEADLINES_URL;
        return await(await fetch(endpoint)).json();
    },
    fetchNewsById : async NewsId=>{
        const endpoint= `${API_URL}top-headlines?country=us&${API_KEY}`;
        return await(await fetch(endpoint)).json();
    }
};
export default apiSettings;