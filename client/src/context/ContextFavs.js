import React, { useState } from "react";

const Context = React.createContext({})

export const ContextFavsProvider = ({children}) => {

    let tempMovies
    const favMovies = localStorage.getItem("favs");
    
   
   if(favMovies === null){
    tempMovies =[];
   } else{
    tempMovies = JSON.parse(favMovies);
   } 

    const [favs, setFavs] = useState(tempMovies)

    return (
        <Context.Provider value={{favs, setFavs}}>
        {children}
    </Context.Provider>
    );
};

export default Context;