import React from 'react';
import Listado from 'components/Listado';
import { category, type } from 'api/tmdbApi';
import { Navigate } from 'react-router-dom';

const Series = () => {

    let token = sessionStorage.getItem('token');

    return (
        <>
     {!token && <Navigate to='/login' />}
     {token && 
         <div>
             <Listado category={category.tv} type={type.popular} />            
         </div>
        }
     </>
    );
};

export default Series;