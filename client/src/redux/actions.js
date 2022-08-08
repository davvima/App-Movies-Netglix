import axiosClient from 'api/axiosClient'
////////////////////////////////////////GET MOVIES
export const getContent = (category, type) => {
    return async function(dispatch) {
        const response  = await axiosClient.get(`http://localhost:4000/movies?category=${category}&type=${type}`)
      
        return dispatch({
            type: 'GET_MOVIES',
            payload: {category,
                content:response.results}
        });
    };
};

export const getTrailer = (category, id)=>{
    return async function(dispatch){
        const response  = await axiosClient.get(`http://localhost:4000/videos?category=${category}&id=${id}`)
        
        return dispatch({
            type:'GET_TRAILER',
            payload: {id,path:response}
        })
    }
}

////////////////////////////////////////FAVORITES
export const addFavorites = (obj) =>{
    return{
        type:'ADD_FAVORITE',
        payload:obj
    }
}

export const removeFavorites = (id) =>{
    return{
        type:'REMOVE_FAVORITE',
        payload:id
    }
}

////////////////////////////////////////DETAILS

export const getDetails = (id,category) => {
   
    return async (dispatch)=>{
        if(id && category){
    const response = await axiosClient.get(`http://localhost:4000/movies/${id}?category=${category}`)
    return dispatch ({
        type:'GET_DETAILS',
        payload:response
    })
    }else{    
        return dispatch ({
            type:'GET_DETAILS',
            payload:{}
        })
    }
}}