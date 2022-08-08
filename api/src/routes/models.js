const apiConfig = require('../apiTmdb/apiConfig')
// const axiosClient = require ('../apiTmdb/apiConfig')
const {category, tmdbApi} = require ('../apiTmdb/tmdbApi')

const getContentList = async (ClientCategory,type) =>{
    const params = {}
    let response
    try{
        switch(ClientCategory) {
            case category.movie:
                response = await tmdbApi.getMovies(type, {params});
                break;
            default:
                response = await tmdbApi.getTv(type, {params});
         }    
    }catch(e){ console.log('error',e)}
    return response
}

const getVideos = async(category, id)=>{
    const response = await tmdbApi.getVideos(category, id);
    let trailerPath
    if(response.results[0]) {
     trailerPath = apiConfig.videos(response.results[0].key)  
    }else{
        trailerPath=''
    }
    return trailerPath
}

const details = async(category,id)=>{
    const response = await tmdbApi.detail(category,id)
    return response

}
    
module.exports =  {getContentList,getVideos,details}