import React from 'react';
import { Route, Routes } from 'react-router-dom';

// PAGES

import Home from 'pages/Home';
import Series from 'pages/Series';
import Peliculas from 'pages/Peliculas';
import AcercaDe from 'pages/Acerca de/AcercaDe';
import Detalle from 'pages/Detalle';
import Favoritos from 'pages/Favoritos';
import Resultados from 'pages/Resultados';
import SignUp from 'components/SignUp';
import Login from 'components/Login'
import AdminPanel from 'pages/AdminPanel';
import CreateContent from 'pages/AdminPanel/CreateContent';
import CreateUser from 'pages/AdminPanel/CreateUser';


function AppRoutes() {
    

    return (
     <Routes>  
            <Route exact path="/" element = {<Home />} />
            <Route path="/signup" element = {<SignUp />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/detalle/:movieID" element = {<Detalle />} />
            <Route path="/resultados/:keyword" element = {<Resultados category='movie' />} />
            <Route path="/favoritos" element = {< Favoritos /> } />
            <Route path="/about" element = {<AcercaDe />} />
            <Route path="/series" element = {<Series />} />
            <Route path="/peliculas" element = {<Peliculas />} />        
            <Route path="/admin" element = {<AdminPanel />} />    
            <Route path="/createContent" element = {<CreateContent />} />  
            <Route path="/createUser" element = {<CreateUser />} />     
     </Routes>
    );
}

export default AppRoutes;