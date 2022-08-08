import Grid from "components/Grid/Grid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Favoritos(){

    let token = sessionStorage.getItem('token');

    const favs = useSelector(state=>state.favorites)
    console.log(favs)
   
    return(
    <>
    {!token && 
        <div className='container d-flex flex-column align-items-center  my-3 mx-auto'> 
            <h3 >Debes Iniciar sesión para guardar y ver tus favoritos</h3>
            <Link className='btn btn-primary col-2' to='/login'>Login</Link>
            <Link to='/signup'>Crear Cuenta</Link>
        </div> 
        }
        {token && 
        <>         
        <br />
        {favs.length === 0 && 
            <h2>Aún no has agregado Favoritos</h2>
        }

        {favs.length> 0 &&
            <Grid list={favs}></Grid>    
        }    
        </>
        }
     </>
    
    )
}

export default Favoritos;