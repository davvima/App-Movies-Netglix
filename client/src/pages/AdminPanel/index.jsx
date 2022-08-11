import ContentList from 'components/AdminPanel/ContentList';
import UsersList from 'components/AdminPanel/UsersList';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {

    const [list, setList] = useState('usersList')
    const [role, setRole] = useState('')

    useEffect(()=>{
        setRole(sessionStorage.getItem('role'))
        
   },[])

   const handleClick = (e)=>{
    e.preventDefault()
    setList(e.target.name)

}


    return (
        <div>
            {role !== 'admin' &&
            <>
                <h3>No tienes autorización para ver esta sección</h3>
                <Link to='/'>Volver al inicio</Link>
            </>
            }
            {role==='admin' &&
            <>
         <h1 className="text-center my-3">Panel de Administración</h1>

         <div className='my-2 d-flex justify-content-evenly' >
                <button name="usersList" className="btn btn-secondary" onClick={handleClick} >Lista de Usuarios</button>
                <button name="contentList" className="btn btn-secondary" onClick={handleClick} >Contenido Creado</button>
         </div>         

         {list==='usersList' && <UsersList ></UsersList>}
         {list === 'contentList' && <ContentList></ContentList>}
         </>
            }
        </div>
    );
};

export default AdminPanel;