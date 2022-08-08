import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { tmdbApi } from 'api/tmdbApi.js';

const Hero = () => {
    
    const [moviesList, setMoviesList] = useState([]);
   
   
   useEffect(()=>{
     const params={};
     let response = null;
   
     const list = async () => {
         response = await tmdbApi.getMovies('popular', {params});         
         setMoviesList(response.results)     
       }    
           
      list()
   },[])


    return (
        <section className="hero">
        
    <div className="scroll">
    {moviesList.filter((e,idx)=>idx<5).map((oneMovie, idx)=>{         
      return(
        
         <Link className ="movie-slider" key={idx} to={`/detalle/${oneMovie.id}`}>
                <h2 className="heroTitle">{oneMovie.title}</h2>
                <img className="poster-slider" src={`https://image.tmdb.org/t/p/w500/${oneMovie.backdrop_path}`}  alt="poster" />                
         </Link>
         
       )
      })
     }
     </div>
    </section>
    );
};

export default Hero;