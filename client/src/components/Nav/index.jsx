import {Link, useLocation} from 'react-router-dom'
import Buscador from 'components/Buscador'

//Styles
import './nav.css';

const headerNav = [
    {
        display: 'Peliculas',
        path: '/peliculas'
    },
    {
        display: 'Series',
        path: '/series'
    },
    {
        display: 'Favoritos',
        path: '/favoritos'
    },
    {
        display: 'Acerca de',
        path: '/about'
    }
];

function handleOnClick () {
    const navGroup = document.querySelector('.nav-group')
    navGroup.classList.toggle('nav_visible')
}

function Header (){

    const { pathname } = useLocation();
    const active = headerNav.findIndex(e => e.path === pathname);


return(
    <nav className="nav-bar">
        <div className="nav-content">
            
            <Link className="brand" to = "/"> NETGLIX </Link>
            
            <div className='nav-group'>
               <ul className="navbar-menu">
                   {
                        headerNav.map ((e,i) => (
                        <li key={i} className={`nav-item ${i === active ? 'active' : ''}`}>
                        <Link className="nav-link" to ={e.path} > {e.display} </Link>  
                        </li>   
                        )) 
                    }         
                </ul> 

                <Buscador />
           </div>

            <button className="toggle"
                    onClick={handleOnClick} >
                <i className="fa-solid fa-bars"></i>
            </button>  
       </div>                               
    </nav>
    )
}

export default Header