const express = require('express');
const router = express.Router();
const {getContentList,getVideos, details} = require('./models')

router.get('/movies', async (req, res)=>{
    const {category, type} = req.query
    const response = await getContentList(category,type)
    res.json(response)
})

router.get('/movies/:id', async (req, res)=>{
    const {id} = req.params
    const {category} = req.query
    try{
    const response = await details(category,id)
    console.log(response)
    res.json(response)
    }catch(e){}
})

router.get('/videos', async (req, res) =>{
    const {category, id} = req.query
    const response = await getVideos(category, id);
    res.send(response)
})

module.exports = router