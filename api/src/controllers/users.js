const passport = require("passport")
const pool = require("../database")

const categories = ['regular', 'premium']

let users = []
let series = []

const addUser = async (req, res, next) => {
    // Agrega un nuevo usuario, verificando que no exista anteriormente en base a su email.
    // En caso de existir, no se agrega y debe arrojar un Error ('El usuario ya existe')
    const {email} = req.body

    let users = await pool.query('SELECT * FROM users')
    console.log(users)

    const verificarEmail = users.find(u => u.email === email)

    if(!verificarEmail){

      passport.authenticate('local.signup')(req, res, next);
      
      return `Usuario ${email} creado correctamente`
    }
    throw new Error('El usuario ya existe') 
  }


  const listUsers = async (role='') => {
    // Si no recibe parámetro, devuelve un arreglo con todos los usuarios.
    // En caso de recibir el parámetro <plan>, devuelve sólo los usuarios correspondientes a dicho plan ('regular' o 'premium').
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
    
    if(role === 'user' || role === 'admin') {
      const findUsers = users.filter(u => u.plan === plan)
      return findUsers
    }

    return users

  }

  const deleteUser = async(id)=>{

    const response = await pool.query('DELETE FROM users WHERE id='+id)
    console.log(response)


  }

module.exports =  {listUsers,addUser,deleteUser}