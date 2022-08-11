import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const CreateUser = () => {

  const [role, setRole] = useState('')

  useEffect(()=>{
    setRole(sessionStorage.getItem('role'))      
 },[])

  let token = sessionStorage.getItem('token');

  const [input,setInput]=useState({
      name:'',
      email:'',
      password:'',
      role:'',
  })

  const [errors, setErrors]=useState({disabled:'true'})

  

      //ONCHANGE

      const handleChange = e=>{
    
      setInput({...input,
        [e.target.name] : e.target.value})
        setErrors(validate({
          ...input,
          [e.target.name] : e.target.value
        }))

    }

    //ONSUBMIT

    const handleSubmit = (e)=>{
      e.preventDefault()
      const config = {
          headers: { Authorization: `Bearer ${token}` },
      };

  
      axios.post('http://localhost:4000/users',input,config)
      .then(response=>{
        swal({
          title:response.data,
          icon: "success"
         })
      })
      .catch(e=>{
        console.log(e.response.data)
        swal({
          title:e.response.data.error,
          icon: "error"
         })
      })
    }

    //Función para validar inputs 

    const validate = input =>{
      let errors ={}
      if(!input.name){
        errors.name = 'Se requiere un Nombre'
      }else if(input.name.length<3){
        errors.name = 'El nombre debe tenr minimo 3 caracteres'

      }else if(!input.email){
        errors.email = 'Debes indicar un email'

      }else if(!input.password){
        errors.password = 'Debes indicar una contraseña'
      }else if(input.password.length<8 || input.password.length>20){
        errors.password = 'La contraseña debe tener entre 8 y 20 caracteres'

      }else if(!input.role){
        errors.release = 'Selecciona un rol para el usuario'
      }
      console.log(errors)
      return errors
    }



  return (
    <>
     {role !== 'admin' &&
            <>
                <h3>No tienes autorización para ver esta sección</h3>
                <Link to='/'>Volver al inicio</Link>
            </>
            }
            {role==='admin' &&
            <>
      <Link to='/admin'><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
      <h1 className='text-center my-3'>¡Crea un Usuario!</h1>

      <div className='d-flex justify-content-center'>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div  className="form-group">
              <label><strong>Nombre:</strong>  
                <input
                  className="form-control" 
                  type="text" 
                  name="name" 
                  value={input.name}
                  onChange={handleChange} 
                />
              </label>
              {errors.name && (
              <p className='error'>{errors.name}</p>
              )}
            </div>

            <br />

            <div className="form-group">
              <label><strong>Email: <br /></strong>
                <input 
                  className="form-control" 
                  name="email"  
                  type="email"
                  value={input.email} 
                  placeholder="correo@gmail.com"
                  onChange={handleChange}
                />
              </label>
              {errors.email && (
              <p className='error'>{errors.email}</p>
              )}
            </div>   
          </fieldset>

          <br />

          <div className="form-group">
            <label><strong>Password:</strong> <br />  <input 
              className="form-control" 
              type="password" 
              name="password"
              value={input.password}
              onChange={handleChange} />
            </label>
            {errors.password && (
              <p className='error'>{errors.password}</p>
              )}
          </div>

          <br />

          <div>
          <label><strong>Role:</strong> <br /> 

              <div className="form-check">
                  <label className="form-check-label">
                      <input 
                          name="role"
                          className="form-check-input" 
                          type="radio" 
                          value='user'
                          onChange={handleChange}
                          />
                      User
                  </label>
              </div>

              <div className="form-check">
                  <label className="form-check-label">
                      <input 
                          name="role"
                          className="form-check-input" 
                          type="radio" 
                          value='admin'
                          onClick={handleChange}
                      />
                      Admin
                  </label>
              </div>        
              
              {errors.role && (
              <p className='error'>{errors.role}</p>
              )}
              </label>
          </div>
          <br />
          <br />     

          <input disabled={Object.entries(errors).length === 0?false:true} type="submit" value="Submit" />
        </form>
      </div>
      </>}
    </>
  );
};

export default CreateUser;