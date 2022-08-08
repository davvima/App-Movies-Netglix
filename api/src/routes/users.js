const express = require('express');
const passport = require('passport');
const pool = require('../database');
const { checkAuth } = require('../lib/auth');
const router = express.Router();


/////////////////////////////////////////Consultar Usuarios

router.get('/',checkAuth(['admin']), async (req, res)=>{

    let response = await pool.query('SELECT * FROM users')
    const users = response.filter(e=>{
        return {
            id:e.id,
            name:e.name,
            email:e.email,
            password:e.password,
            role:e.role
        }
    })

    res.json(users)
})

/////////////////////////////////////////////Agregar Usuarios

router.post('/',checkAuth(['admin']), async (req, res,next)=>{
    passport.authenticate('local.signup')(req, res, next);
    res.json({
    message: 'Registro exitoso',
  });
}
)

///////////////////////////////////////////Eliminar Usuarios

router.delete('/',checkAuth(['admin']), async (req, res)=>{
    
})

module.exports = router