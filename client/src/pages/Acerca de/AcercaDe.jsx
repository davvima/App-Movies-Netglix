import React from 'react';
import './acercade.css'


function AcercaDe() {
    return (
        <div className="about-container">
            <br />
            <p>Aplicación Web para buscar y descubrir películas y series de TV.
                Desarrollada con React.js y conectada a la API de <a href="https://www.themoviedb.org/documentation/api">The Movie DataBase</a>
            </p>
            <br />
            <h3>Base de Datos:</h3>
            <p> Base de datos modelada con MySQL, que contiene las entidades users, content y category. Hay 2 usuarios creados por defecto que tienen acceso a distintos elementos en el FrontEnd.</p>
                <ul>
                    <li><p>Los usuarios se crean en la base de datos por medio de una solicitud POST que se genera en el formulario de registro y en el panel de administración.</p></li>

                    <li>
                        <p>Las series y películas son traidos de la API "The Movie DataBase" y del contenido creado por el usuario administrador en el panel de administración</p>
                    </li>

                    <li>
                        <p>Las categorias están en princio vacías y son traidas tambien de la API "The Movie DataBase"</p>
                    </li>
                </ul>
                
                
            
            

            <h3>Front-End: </h3>
            <p>Se desarrollo una SPA con React.js.</p>

            <ul>
                    <li><p>Contiene un componente de registro y uno de login para la autenticación del usuario, utilizando Json Web Token para la la gestión de sesiones.</p></li>

                    <li>
                        <p>Un Home donde se renderiza toda la información de peliculas y series de la APi y la Base de datos.</p>
                    </li>

                    <li>
                        <p>Una página de detalles, donde se ver más información sobre el contenido seleccionado.</p>
                    </li>
                    <li>
                        <p>Una sección de favoritos para guardar el contenido preferido por el usuario.</p>
                    </li>
                </ul>
             
            <h3>Back-End: </h3>
            <p>API desarrollada con Express.js que permite la conexión con la API y la base de datos para consultar, agregar y modificar usuarios y contenido.</p>
            <br />
            <br />
             
            <h4>Desarrollado por: <strong>David Freites</strong> </h4>
            <div className='about-links my-3'>
            <button className="button" onClick={()=>window.open('https://www.linkedin.com/in/david-freites-frontend-developer','_blank')}> LinkedIn
            </button>

            <button className="button" onClick={()=>window.open('https://github.com/davvima','_blank')}> Github
            </button>

            </div>
            
        </div>
    );
}

export default AcercaDe;