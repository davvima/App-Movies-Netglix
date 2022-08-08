import React from 'react';
import Listado from 'components/Listado';
import { category, type } from 'api/tmdbApi';
import Hero from 'components/Hero/Hero';
import { Link} from 'react-router-dom';

const Home = () => {

    let token = sessionStorage.getItem('token');

    return(         
     <>
        <Hero />
        {!token && 
        <div className='container d-flex flex-column align-items-center  my-3 mx-auto'> 
            <h3 >Debes Iniciar sesión para ver todo el contenido</h3>
            <Link className='btn btn-primary col-2' to='/login'>Login</Link>
            <Link to='/signup'>Crear Cuenta</Link>
        </div> 
        }
        {token && 
        <>              
            <br />
            <div className="container">
            
            <h2> Las Pelis Más populares...</h2> 

            <Listado category={category.movie} type={type.popular} />

            <br />
            
            <h2>Las Mejores Series...</h2> 
            <Listado category={category.tv} type={type.popular} />
            </div>
        </>
         }
   </>           
    )
            
};

export default Home;