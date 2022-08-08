import{useEffect, useState} from "react";
import {tmdbApi} from 'api/tmdbApi'

//Libraries
import {useParams} from "react-router-dom";
// import swal from "@sweetalert/with-react";

//Styles
import './resultados.css'
import Grid from "components/Grid/Grid";

function Resultados(props) {
    let { keyword } = useParams();

    const [moviesResult, setMoviesResult] = useState([]);


    useEffect(()=>{
        
      const search = async () => {
         let response = null;
         const params = {
             query: keyword
            }
         response = await tmdbApi.search({params});
         setMoviesResult(response.results)     
        }        
        search()
    },[props.category, keyword])
    console.log(moviesResult)


return(
    <div className="container">
     <br />
     <h2>Resultados de tu Búsqueda</h2>
     <p>Palabra clave: {keyword}</p>

     {moviesResult.length === 0 && <h3>No hay resultados.</h3> }
     {moviesResult.length >0 && <Grid list={moviesResult}></Grid>}

    </div>
)
}

export default Resultados;