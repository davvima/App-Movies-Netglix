import { useNavigate} from "react-router-dom";
import swal from '@sweetalert/with-react';

function Buscador(){
const navigate = useNavigate();

const submitHandler = e =>{
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

if(keyword.length === 0){
    swal({
        title:"Tienes que escribir una palabra clave",
        icon: "error"
       });
 }else if(keyword.length<4){
    swal({
        title:"Escribe más de 3 caracteres",
        icon: "error"
       })
 }else{
     e.currentTarget.keyword.value = "";
     navigate(`/resultados/${keyword}`)
 }
}

    return(
        <>       
          <form className="d-flex align-items-center mx-2" onSubmit={submitHandler}>
              <label className="form-label mb-0 mx-2">
                 <input className="form-control" type="text" name="keyword" placeholder="Busqueda..." />
             </label>
             <button className="btn btn-outline-light" type="submit">Buscar</button>
         </form> 
      </>
    )
    }

export default Buscador;