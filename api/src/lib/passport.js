const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy
const helpers = require('../lib/helpers')
const pool = require('../database');

//Login
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true,
}, async (req,username,password,done)=>{
    try{
    const rows = await pool.query('SELECT * FROM users WHERE email = ?', [username])
    console.log(rows)
    if(rows.length >0){
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword){
            done(null,user, 'Has ingresado correctamente')
        }else{
            done(null,false, 'Contraseña incorrecta')           
        }
    }else{
        return done(null,false, 'Usuario incorrecto')

    }
}catch(e){
    console.log('error login', e)
}
}))

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Register

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true,
}, async (req,username, password, done)=>{
    const {name,role} =req.body
    const newUser = {
        name,
        email:username,
        password,
        role:role?role:'user'
    }
    //Encriptar contraseña
    newUser.password = await helpers.encryptPassword(password)
    //Guardar en base de datos
    const result = await pool.query('INSERT INTO users SET ? ', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
    
    // console.log(newUser.password)
}));

passport.serializeUser((user, done)=>{
 done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    const rows = await pool.query('SELECT * FROM users Where id =?',[id])
    done(null, rows[0])
}) 