//React
import React, { useState } from "react";
import{useEffect} from "react";

//Libraries
import { Link, Navigate, useParams} from "react-router-dom";

//Styles
import './detalle.css'


//Variables
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "api/apiConfig";
import { getDetails } from "redux/actions";

function Detalle(){

    let token = sessionStorage.getItem('token');

    const {movieID} = useParams();
    const {params} = useParams();
    console.log(params)
    const [details, setDetails] = useState({});
    const stateDetails = useSelector(state=>state.details)
    console.log(stateDetails)

    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getDetails(movieID,'movie'))
        setDetails(stateDetails)
      },[dispatch,stateDetails,movieID])

    return(
    <>
        {!token && <Navigate to='/login' />}
        {token && 
        <>
         <div className="back"> <Link to="/"><i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i></Link> </div>
     

            { Object.entries(details).length === 0 && <div className="text-center">
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            </div> }

            { Object.entries(details).length>0 && 
            <>
                <div className="background" 
                    style={{backgroundImage: `url(${apiConfig.originalImage(details.backdrop_path)})`}}>
                </div> 

                <div className="detail-container container">
                    <figure className='col-md-4'>             
                        <img src={apiConfig.originalImage(details.poster_path)} className='img-fluid poster' alt='details poster' />
                    </figure>    

                    <div className="col-md-8 text-container" style={{color:'white'}}>
                        <br />
                        <h1><strong>{details.title}</strong> ({details.release_date.substring(0,4)}) </h1>
                        <h5>{`Título Original: ${details.original_title}`}</h5>
                        <h5>{`⭐ ${details.vote_average} / 10 (${details.vote_count} votos)`}</h5>
                        <br />
                        <h5>Descripción:</h5>
                        <p>{details.overview}</p>
                        <h5>Géneros</h5>
                        <ul>
                            {details.genres.map(oneGenre => <li key={oneGenre.name}>{oneGenre.name}</li>)}
                        </ul>
                    </div>
                </div>
            </>
            }   
       </>
        }
  </>
)}

export default Detalle;