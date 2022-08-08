import React from 'react';
import axiosClient from 'api/axiosClient';

const Registro = () => {

    const[body, setBody] = useState({ name:'',email: '', password: '' })

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }

    const submitHandler = e =>{
        e.preventDefault()
        var response = await axiosClient({
            method: 'post',
            url: 'http://localhost:4000/signup',
            data: body
        })
        console.log(response)
    }

    return (
        <>
        <h2 className ="my-3">Formulario de Registro</h2>
        
        <form onSubmit={submitHandler} className="d-flex flex-column align-items-center">
    
         <br/>
          <div className="mb-2">
             <label className="form-label">Nombre
                 <br/>
                 <input 
                     type="text" 
                     value={body.name}
                     onChange={inputChange}
                     name='email'
                    />
             </label>
         </div>

         <div className="mb-2">
             <label className="form-label">Email
                 <br/>
                 <input 
                     type="email" 
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
        <button className="btn btn-success" type="submit">Registrarme</button>        
    </form>
            
        </>
    );
};

export default Registro;