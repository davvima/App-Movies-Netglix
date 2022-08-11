import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ContentCard from './ContentCard';


const ContentList = () => {
    let token = sessionStorage.getItem('token');
    const [content, setContent] = useState([])
    console.log(content)
    const [deleteContent,setDelete] = useState(false)

    const handleDelete = (e,id) => {
        e.preventDefault()
        let token = sessionStorage.getItem('token');
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
    
        axios.delete('http://localhost:4000/content/'+id,config)
        .then(response=>{
            console.log(response)
            setDelete(!deleteContent)
            swal({
                title:response.data,
                icon: "success"
               })
        })
        
    }
   
   

    useEffect(()=>{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get('http://localhost:4000/content',config)
        .then(response=>{
            console.log(response)
            setContent(response.data)
        })
    },[token,deleteContent])


    return (
        <>

            <Link to='/createContent'><h3 className='text-center'>Crear Contenido</h3></Link>
            <div className="card-group">

            {content.length>0 &&
            (
                content.map((el,i)=>                
                <ContentCard

                key={i}
                category={el.category}
                title={el.title}
                id={el.id}
                poster_path={el.poster_path}
                overview={el.overview}
                backdrop_path={el.backdrop_path}
                handleDelete={handleDelete}
                ></ContentCard>
            )
            
            )
            }          
           </div>
        </>
    );
};

export default ContentList;