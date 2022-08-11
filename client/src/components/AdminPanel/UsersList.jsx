import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const UsersList = () => {
    let token = sessionStorage.getItem('token');
    const [users, setUsers] = useState([])
    const [deleteUser,setDelete] = useState(false)
    console.log(users)

    const handleDelete = (e,id) => {
        e.preventDefault()
        let token = sessionStorage.getItem('token');
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
    
        axios.delete('http://localhost:4000/users/'+id,config)
        .then(response=>{
            console.log(response)
        })
        setDelete(!deleteUser)
    }
   

    useEffect(()=>{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get('http://localhost:4000/users',config)
        .then(response=>{
            setUsers(response.data)
        })
    },[token,deleteUser])


    return (
        <>
        <Link to='/createUser'><h3 className='text-center my-3'>Crear Usuario</h3></Link>
            {users.length>0 &&
            (

                users.map((user,i)=>                
                <UserCard

                key={i}
                name={user.name}
                email={user.email}
                id={user.id}
                role={user.role}
                handleDelete={handleDelete}
                ></UserCard>
            )
            
            )
            }          
        </>
    );
};

export default UsersList;