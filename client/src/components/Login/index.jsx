import axios from 'axios';
import swal from '@sweetalert/with-react'
import {Link, Navigate, useNavigate} from "react-router-dom";
import { useState } from 'react';

function Login(){

const[body, setBody] = useState({ email: '', password: '' })

    let navigate = useNavigate()
    let token =  sessionStorage.getItem('token');

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }
    
    const submitHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail=
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(email==='' || password ===''){
            swal({
                title: "Lo campos no pueden estar vacios",
                icon: "warning"
        })
          return;
        }

        if(email !== '' && !regexEmail.test(email)){
            swal({
                title: "Debes escribir una dirección de correo electrónico válida",
                icon: "warning"
        })
        return;
        }

        // if(email !== 'challenge@alkemy.org' || password !== 'react'){
        //     swal({
        //      title:"Credenciales invalidas",
        //      icon: "error"
        // })
        //     return;
        // }
        
        axios.post('http://localhost:4000/login', body)
        .then(({ data }) => {
            console.log(data)
            if(data.token){
                swal({
                    title:"Ingresaste correctamente",
                    icon: "success"
                })
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('name', data.name)
                navigate("/");
            }
            
        })
        .catch(({ response }) => {
            swal({
                title: response.data,
                icon: "error"
            })
            console.log(response.data)
        })
    }

    return(
    <>
    {token && <Navigate to='/' />}
    {!token &&

    <>
    
    <form onSubmit={submitHandler} className="d-flex flex-column align-items-center">
    <h2 className ="my-3">Iniciar sesión</h2>
    <br/>
         <div className="mb-2">
             <label className="form-label">Nombre de Usuario
                 <br/>
                 <input 
                     type="text" 
                     value={body.email}
                     onChange={inputChange}
                     name='email'
                    />
             </label>
         </div>

         <div className="mb-2">
             <label 
                 className="col-sm-2 col-form-label" 
                 placeholder='react'>Contraseña
                 <br/>
                 <input 
                     type="password" 
                     name="password" 
                     value={body.password}
                     onChange={inputChange}
                 />
             </label>
         </div>
     <br/>
        <button className="btn btn-success" type="submit">Ingresar</button>  
        <Link className='mt-3' to='/signup'>Crear Cuenta</Link>      
    </form>
    <br />
    <p>Usuarios por defecto: </p>
    <p><strong>Usuario regular: </strong> email:user@gmail.com || contraseña:123456</p>
    <p><strong>Usuario administrador: </strong>email: admin@gmail.com || contraseña: admin </p>
    
    </>
    }

    </>
    )   

}

export default Login;