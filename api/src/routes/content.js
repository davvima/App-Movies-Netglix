const express = require('express');
const router = express.Router();
const {getContentList,getVideos, getDbList, deleteContent, getGenres, getApiDetail, getDbDetail} = require('../controllers/content');
const pool = require('../database');
const { checkAuth } = require('../lib/auth');

///////////////////////////////////Obtener Contenido

router.get('/movies', async (req, res)=>{
    const {category, type} = req.query
    const response = await getContentList(category,type)
    res.json(response)
})

///////////////////////////////////Obtener Contenido po id

router.get('/movies/:id', async (req, res)=>{
    const {id} = req.params
    const {category} = req.query
    try{
    const response = await details(category,id)
    res.json(response)
    }catch(e){}

    try{
        if(id.length > 16) {
            const foundDetail = await getDbDetail(id);
            console.log(foundDetail)
            foundDetail ? res.json(foundDetail[0]):
        res.send('Contenido no encontrado')
        } else {
            const foundDetail = await getApiDetail(category,id);
            foundDetail ? res.json(foundDetail):
        res.send('Contenido no encontrado')
        };
        
    }catch(e){
        return res.status(400).json({ error: e.message })
    }
})

///////////////////////////////////Obtener Videos

router.get('/videos', async (req, res) =>{
    const {category, id} = req.query
    const response = await getVideos(category, id);
    res.send(response)
})

///////////////////////////////////Obtener Contenido de la base de datos

router.get('/content',checkAuth(['admin']), async (req,res)=>{
    try{
        const response = await getDbList()
        res.json(response)
    }catch(e){
        res.status(400).json(e.message)
    }
})

////////////////////////////////////////Obtener Categorias
router.get('/categories', async (req,res)=>{
    try{
        const categories = await getGenres()
        console.log(categories)
        res.json(categories)
       }catch(e){
           return res.status(400).json({ error: e.message })
       }
})

///////////////////////////////////Crear Contenido

router.post('/content',checkAuth(['admin']), async (req,res)=>{
    const {
        title,
        poster_path,
        overview,
        category,
        backdrop_path,
    } = req.body

    try{
        const newContent = {
            title,
            poster_path,
            overview,
            category,
            backdrop_path:'',
        }

        const result = await pool.query('INSERT INTO content SET ? ', newContent);
        res.json(`${title} Creado Correctamente`)

     }catch(e){
        return res.status(400).json({ error: e.message })
    }
})

///////////////////////////////////Eliminar Contenido

router.delete('/content/:id',checkAuth(['admin']), async (req, res)=>{
    const {id} = req.params
    try{
        const response = await deleteContent(id)
        res.json('Contenido eliminado exitosamente')

    }catch(e){
        console.log(e)
        return res.status(400).json(e.message)
    }
    
    
})

module.exports = router