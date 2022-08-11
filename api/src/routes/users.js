const express = require('express');
const { addUser, listUsers, deleteUser } = require('../controllers/users');
const { checkAuth } = require('../lib/auth');
const router = express.Router();


/////////////////////////////////////////Consultar Usuarios

router.get('/',checkAuth(['admin']), async (req, res)=>{

     const users = await listUsers()
     return res.json(users)
})

/////////////////////////////////////////////Agregar Usuarios

router.post('/',checkAuth(['admin']), async(req, res,next)=>{
    try{
        const response = await addUser(req, res, next)
        res.send(response)
    }catch(e){
        console.log(e)
        return res.status(400).json({ error: e.message })
    }
  });


///////////////////////////////////////////Modificar Usuarios

// router.

// ///////////////////////////////////////////Eliminar Usuarios

router.delete('/:id',checkAuth(['admin']), async (req, res)=>{
    const {id} = req.params
    try{
        const response = await deleteUser(id)
        console.log(response)
        res.json('Usuario eliminado exitosamente')

    }catch(e){
        console.log(e)
        return res.status(400).json(e.message)
    }
    
    
})

module.exports = router