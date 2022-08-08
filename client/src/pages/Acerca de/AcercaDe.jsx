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
            <br />
            <br />
             
            <h4>Desarrollado por: <strong>David Freites</strong> </h4>
            <br />
            <br />
            <div className='about-links'>
            <button class="button" onClick={()=>window.open('https://www.linkedin.com/in/david-freites-frontend-developer','_blank')}> LinkedIn
            </button>

            <button class="button" onClick={()=>window.open('https://github.com/davvima','_blank')}> Github
            </button>

            </div>
            
        </div>
    );
}

export default AcercaDe;