import{useEffect, useState} from "react";
import Loading from "components/Loading"
import { useDispatch, useSelector } from 'react-redux';

//Styles
import './listado.css'
import Grid from "components/Grid/Grid";
import { getContent } from "../../redux/actions";

function Listado({category,type}){
 
 const [moviesList, setMoviesList] = useState([]);
 const dispatch =  useDispatch()
 const contentList=useSelector(state=>state.contentList[category])


useEffect(()=>{

    if(contentList.length===0) dispatch(getContent(category, type))
     
  setMoviesList(contentList)        
        
},[dispatch, contentList])  

console.log('content',contentList)

console.log('soy movies', moviesList)


 return(
   <>

     {moviesList.length<=0 && 
     <Loading></Loading> }

     {moviesList.length>0 &&
     <>

     <Grid 
       list={moviesList}
       category={category}
     ></Grid>

    
     </>
        }
        
   </>  
    )
}

export default Listado