const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');

//LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local.login',  
     async (err, user, info) => {
      console.log(err,user,info)
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
                  console.log(user)
    
                  const userForToken = { id: user.id,name:user.name, role: user.role };
                  const token = jwt.sign(userForToken, 'mySecret');
    
                  return res.json({ 
                    name:user.name,
                    token });
                }
              );
        } catch (error) {
              return next(error);
            }
   })(req, res, next);
})

    

//REGISTER
router.post('/signup', (req, res, next)=>{

passport.authenticate('local.signup')(req, res, next);
    res.json({
    message: 'Registro exitoso',
  });
}
)

router.get('/profile',(req,res) =>{
    res.send('this is your profile')
})

module.exports = router