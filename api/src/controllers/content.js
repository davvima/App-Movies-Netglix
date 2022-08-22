const apiConfig = require('../apiTmdb/apiConfig')
const {category, tmdbApi} = require ('../apiTmdb/tmdbApi')
const pool = require("../database")

// const getDbList = async ()=>{
//     const response =  await pool.query('SELECT * FROM content')
//     return response
// } 

const getApiList = async (ClientCategory,type) =>{
    const params = {}
    let response
    try{       
        
        if(ClientCategory===category.movie){
            response = await tmdbApi.getMovies(type, {params});
        }else{
            response = await tmdbApi.getTv(type, {params});
        }

    }catch(e){ console.log('error',e)}
    return response.results
}

// const getContentList = async (category,type) =>{
//     const apiInfo = await getApiList(category,type)
//     const dbInfo = await getDbList()
//     const info = [...dbInfo,...apiInfo]
//     return info
// }

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

// const getDbDetail = async(id)=>{
//     const response = pool.query(`SELECT * FROM content WHERE id='${id}'`)
//     return response
// }

const getApiDetail = async(category,id)=>{
    const response = await tmdbApi.detail(category,id)
    console.log(response)
    return response

}

const deleteContent = async(id)=>{
    const response = await pool.query('DELETE FROM content WHERE id='+id)
    console.log(response)
}

const getGenres = async()=>{
    const dbCategory = await pool.query('SELECT * FROM category')
    let categories
    if(dbCategory.length>0){
        categories = dbCategory
    }else{
     const apiGenres = await tmdbApi.getGenres()
     
     categories = apiGenres.genres
     console.log(categories)

     categories.map(e=>
        pool.query(`INSERT INTO category (id,nombre) values (${e.id}, '${e.name}')`)
     )    

    }    
    return categories 
}
    
module.exports =  {getApiList,getVideos,getApiDetail,deleteContent,getGenres}