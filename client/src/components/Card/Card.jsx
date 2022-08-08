import React, { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import './card.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, getTrailer, removeFavorites } from '../../redux/actions';


function Card({title,id,poster_path,overview,backdrop_path,category}){

    const [isHovered, setIsHovered] = useState(false);
    const iframeRef = useRef(null);

    const dispatch = useDispatch()

    const {favorites,trailers} = useSelector(state=>state)

    let trailerPath =null   
    if(trailers.length>0){
        const findPath = trailers.find(e=>e.id===id)
        if(findPath && typeof(findPath.path)==='string'){
        trailerPath = findPath.path
     }else{
        trailerPath = null
     }
    }

    


    let isInFavs = favorites.find(e=> {return String(e.id)===String(id)}) 
    if (!isInFavs){
        isInFavs=false
    }else{
        isInFavs=true        
    }

    useEffect(() => {
        dispatch(getTrailer(category, id))    
    },[dispatch,id,category]);

 /////////////////////////////////////////////HANDLE CLICK
    const handleClick = (e)=>{
        e.preventDefault()
        const btn = e.currentTarget;

        const movieData ={
            id, 
            title,
            poster_path,
            overview,
            category,
            backdrop_path
       
        }

        if(!isInFavs){
        btn.innerText = "❤️Añadido a Favoritos";
        dispatch(addFavorites(movieData));
        localStorage.setItem("favs", JSON.stringify(favorites));
        }else{
        btn.innerText = "🖤Removido de favoritos";
        dispatch(removeFavorites(id))
        localStorage.setItem("favs", JSON.stringify(favorites));
        }
    }  


    return (
        <>   

     <div
     className='posterCard'
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
        >     

         <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
         alt="poster"
         className='poster'
         style={{ display:isHovered?'none':'block'}}
         />

         {isHovered && (
            <div>
                {!trailerPath &&
                <img src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt="poster"
                className='posterHover' />                
                }
                {trailerPath &&

                 <iframe
                src={trailerPath}
                ref={iframeRef}
                title="video"             
            ></iframe>
                }

                 
             <div className="itemInfo">
             <Link to={`/detalle/${id}`} >  
                 <span className='title'>{title}</span>
                 </Link> 
                 <div className="icons">
                    <button onClick={handleClick} 
                    className='favs'                
                    >{isInFavs? '❤️Remover de Favoritos' :
                    '🖤Agregar a Favoritos'}  </button>
                  </div>
                 <div className="desc">
                     {overview.substring(0,200)+'...'} <Link to={`/detalle?movieID=${id}`} >  
                 Ver más
                 </Link> 
                 </div>
                 <div className="genre">Action</div>
             </div>
            </div>
         
            
            )}
     </div>
       </>
    );
}

export default Card