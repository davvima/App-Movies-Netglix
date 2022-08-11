import React, { useState } from 'react';
import axiosClient from 'api/axiosClient';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

const Registro = () => {

    const[body, setBody] = useState({ name:'',email: '', password: '' })
    const[errors,setErrors] =useState({disabled:'true'})
    let navigate = useNavigate()

    const bodyChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
        setErrors(validate({
            ...body,
            [name] : value
          }))
    }

    const submitHandler = async (e) =>{
        e.preventDefault()
        try{
        var response = await axiosClient({
            method: 'post',
            url: 'http://localhost:4000/signup',
            data: body,
        })
        console.log(response)
        setBody({ name:'',email: '', password: '' })
        return navigate('/login')
        }catch(e){
            console.log(e)
            swal({
                title:e.response.data,
                icon: "error"
               })
        }
    }

    const validate = body =>{
        let errors ={}
        if(!body.name){
          errors.name = 'Se requiere un Nombre'
        }else if(body.name.length<3){
          errors.name = 'El nombre debe tenr minimo 3 caracteres'
  
        }else if(!body.email){
          errors.email = 'Debes indicar un email'
  
        }else if(!body.password){
          errors.password = 'Debes indicar una contraseña'
        }else if(body.password.length<8 || body.password.length>20){
          errors.password = 'La contraseña debe tener entre 8 y 20 caracteres'
  
        }
        console.log(errors)
        return errors
      }


    return (
        <>
        <h2 className ="my-3 text-center">Formulario de Registro</h2>
        
        <form onSubmit={submitHandler} className="d-flex flex-column align-items-center">
    
         <br/>
          <div className="mb-2">
             <label className="form-label">Nombre
                 <br/>
                 <input 
                     type="text" 
                     value={body.name}
                     onChange={bodyChange}
                     name='name'
                     autoFocus
                    />
             </label>
             {errors.name && (
              <p className='error'>{errors.name}</p>
              )}
         </div>

         <div className="mb-2">
             <label className="form-label">Email
                 <br/>
                 <input 
                     type="email" 
                     value={body.email}
                     onChange={bodyChange}
                     name='email'
                    />
             </label>
             {errors.email && (
              <p className='error'>{errors.email}</p>
              )}
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
                     onChange={bodyChange}
                 />
             </label>
             {errors.password && (
              <p className='error'>{errors.password}</p>
              )}
         </div>
     <br/>
        <button className="btn btn-success" type="submit">Registrarme</button>        
    </form>
            
        </>
    );
};

export default Registro;