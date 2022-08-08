import React from 'react';
import Listado from 'components/Listado';
import { category, type } from 'api/tmdbApi';
import { Navigate } from 'react-router-dom';

const Peliculas = () => {
    let token = sessionStorage.getItem('token');

    return(         
     <>
     {!token && <Navigate to='/login' />}
     {token && 
         <div>
             <Listado category={category.movie} type={type.popular} />            
         </div>
        }
     </>
    );
};

export default Peliculas;