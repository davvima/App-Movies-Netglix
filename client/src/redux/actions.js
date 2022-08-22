import axiosClient from 'api/axiosClient'
////////////////////////////////////////GET MOVIES
export const getContent = (category, type) => {
    return async function(dispatch) {
        const response  = await axiosClient.get(`https://netglix-api-deploy.herokuapp.com/movies?category=${category}&type=${type}`)
      
        return dispatch({
            type: 'GET_MOVIES',
            payload: {category,
                content:response}
        });
    };
};

export const getTrailer = (category, id)=>{
    return async function(dispatch){
        
        const response  = await axiosClient.get(`https://netglix-api-deploy.herokuapp.com/videos?category=${category}&id=${id}`)
                
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
    const response = await axiosClient.get(`https://netglix-api-deploy.herokuapp.com/movies/${id}?category=${category}`)
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

////////////////////////////////////////OBTENER CATEGORIAS

export const getCategories = () => {
    return async function(dispatch) {
        const response = await axiosClient.get('https://netglix-api-deploy.herokuapp.com/categories')
            return dispatch({
                type: 'GET_CATEGORIES',
                payload: response
            });
    };
};
