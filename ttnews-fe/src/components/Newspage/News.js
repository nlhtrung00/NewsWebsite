
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiSettings from "../../API";
import { ReadingNews } from "./ReadingNews";
export const News=()=>{
    const {NewsId} = useParams(); 
    const [view, setView] = useState(null);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        (async()=>{
            const View = await apiSettings.fetchViewByIdNews(NewsId);
            setView(View);
        })
        ()
    }, [NewsId])
    
    useEffect(()=>{
        const updateView=async()=>{
            if (view ===  null) return;
            try{
                let id = view.id;
                var totalView = view.totalView + 1;
                var idNews = view.idNews;
                const data = {id, idNews, totalView};
                await fetch(`https://localhost:44387/api/Views/${id}`,{
                        method:'PUT',
                        headers:{
                            'Content-Type':'application/json',
                            'accept': '*/*'  
                        },
                        body:JSON.stringify(data)
                        }
                        ).catch(()=>{
                            setError(true);
                        }) 
            }catch{
                setError(true);
            }
        }
        updateView();
    },[view])
    
    if(error) return <div>Something wrong happened</div>
    else
    return(
        <>
            {view!==null && <ReadingNews NewsId={NewsId} view={view} />}
        </>
    )
}

