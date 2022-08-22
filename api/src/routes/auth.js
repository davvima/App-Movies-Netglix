const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const pool = require('../database');

//LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local.login',  
     async (err, user, info) => {
        try{
            if(err || !user){
                const error = new Error(info)
                return next(error);
            }
            req.login(
                user,
                { session: false },
                async (error) => {
                  if (error) return next(error);
                  console.log(req.user)
    
                  const userForToken = { id: user.id,name:user.name, role: user.role };
                  const token = jwt.sign(userForToken, 'mySecret');
                  
                  return res.json({ 
                    name:user.name,
                    role:user.role,
                    token });
                }
              );
        } catch (error) {
              return next(error);
            }
   })(req, res, next);
})

router.get('/login',(req,res)=>{
  console.log(req.user)
  if(req.user){
    res.json({loggedIn:true, user:req.user})
  }else{
    res.json({loggedIn:false})
  }
})

    

//REGISTER
router.post('/signup', async (req, res, next)=>{

  const {email} = req.body

  let users = await pool.query('SELECT * FROM users')
  console.log(email)

  const verificarEmail = users.find(u => u.email === email)

  if(!verificarEmail){

    passport.authenticate('local.signup')(req, res, next);

    return res.json(`Usuario ${email} creado correctamente`)
  }

  const error = new Error('El usuario ya existe') 
  return res.status(400).json(error.message)
}

// passport.authenticate('local.signup')(req, res, next);
//     res.json({
//     message: 'Registro exitoso',
//   });

)

router.get('/profile',(req,res) =>{
    res.send('this is your profile')
})

module.exports = router