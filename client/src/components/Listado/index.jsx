import{useEffect, useState} from "react";
import Loading from "components/Loading"
import { useDispatch, useSelector } from 'react-redux';

//Styles
import './listado.css'
import Grid from "components/Grid/Grid";
import { getCategories, getContent } from "../../redux/actions";

function Listado({category,type}){
 
 const [moviesList, setMoviesList] = useState([]);
 const [categories, setCategories] = useState([]);
 const dispatch =  useDispatch()
 const contentList=useSelector(state=>state.contentList[category])
 const StateCategories=useSelector(state=>state.categories)


useEffect(()=>{
    if(contentList.length===0) dispatch(getContent(category, type))
  setMoviesList(contentList)            
},[dispatch, contentList])  

useEffect(()=>{
  if(categories.length===0) dispatch(getCategories(category, type))   
  setCategories(StateCategories)     
},[dispatch, StateCategories]) 

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