import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const CreateContent = () => {

  const [role, setRole] = useState('')

  useEffect(()=>{
    setRole(sessionStorage.getItem('role'))      
 },[])

    let token = sessionStorage.getItem('token');

    const [input,setInput]=useState({
        title:'',
        poster_path:'',
        overview:'',
        category:'',
        backdrop_path:''
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

    
        axios.post('http://localhost:4000/content',input,config)
        .then(response=>{
          console.log(response)
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
        if(!input.title){
          errors.title = 'Se requiere un Nombre'
        }else if(input.title.length<3 || input.title.length>125 ){
          errors.title = 'El título debe tener entre 3 y 125 caracteres'

        }else if(!input.overview){
          errors.overview = 'Debes agregar una descripción'
        }else if(input.poster_path.length>500){
          errors.poster_path = 'La URL no debe ser mayor a 500 caracteres'

        }else if(!input.category){
          errors.category = 'Selecciona una Categoría'
        }
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
      <h1 className='text-center my-3'>¡Crea tu Contenido!</h1>

      <div className='d-flex justify-content-center'>
         <form onSubmit={handleSubmit}>
            <fieldset>
            <div  className="form-group">
              <label><strong>Título:</strong>  
                <input
                className="form-control" 
                type="text" 
                name="title" 
                value={input.title}
                onChange={handleChange} 
                />
              </label>
             {errors.title && (
             <p className='error'>{errors.title}</p>
             )}
            </div>

            <br />

            <div className="form-group">
            <label><strong>Descripción: <br /></strong>

            <textarea 
            className="form-control" 
            name="overview" 
            rows="3" 
            cols="30" 
            value={input.overview} 
            placeholder="La mejor película de la historia..."
            onChange={handleChange}>
            </textarea>
                </label>
            {errors.overview && (
            <p className='error'>{errors.overview}</p>
            )}
            </div> 
        </fieldset>

        <br />

            <div className="form-group">
                <label><strong>Imagen:</strong> <br />  <input 
                className="form-control" 
                type="text" 
                name="poster_path"
                value={input.poster_path}
                onChange={handleChange} />
                </label>
                {errors.poster_path && (
            <p className='error'>{errors.poster_path}</p>
            )}
            </div>

            <br />

            <div>
            <label><strong>Categoría:</strong> <br /> 

                <div className="form-check">
                    <label className="form-check-label">
                        <input 
                            name="category"
                            className="form-check-input" 
                            type="radio" 
                            value='tv'
                            onChange={handleChange}
                            />
                        TV
                    </label>
                </div>

                <div className="form-check">
                    <label className="form-check-label">
                        <input 
                            name="category"
                            className="form-check-input" 
                            type="radio" 
                            value='movie'
                            onClick={handleChange}
                        />
                        Movie
                    </label>
                </div>        
                
                {errors.category && (
                <p className='error'>{errors.category}</p>
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

export default CreateContent;