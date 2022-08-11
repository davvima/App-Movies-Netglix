import React from 'react';

const UserCard = ({name,email,id,role,handleDelete}) => {


    return (
     <div className="card my-3 mx-auto col-10 text-bg-light" >
         <div className="card-header">
               <strong>{name}</strong>
         </div>
     <ul className="list-group list-group-flush">
        <li className="list-group-item"><strong>Id: </strong>{id}</li>
        <li className="list-group-item"><strong>Email: </strong>{email}</li>
        <li className="list-group-item"><strong>Role: </strong>{role}</li>
     </ul>
     <div className='my-2 d-flex justify-content-evenly' >
         <button className="btn btn-danger" onClick={e=>handleDelete(e,id)} >Eliminar Usuario</button></div>  
     </div>
    );
};

export default UserCard;