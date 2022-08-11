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

//   switchPlan: function (email) {
//   // Alterna el plan del usuario: si es 'regular' lo convierte a 'premium' y viceversa.
//   // Retorna el mensaje '<Nombre_de_usuario>, ahora tienes el plan <nuevo_plan>'
//   // Ej: 'Martu, ahora tienes el plan premium'
//   // Si el usuario no existe, arroja el Error ('Usuario inexistente')
//     const findUser = users.find(u => u.email === email)
//     if(findUser){
//       if(findUser.plan === 'regular'){
//         findUser.plan='premium'
//         return `${findUser.name}, ahora tienes el plan premium`
//       }
//       findUser.plan = 'regular'
//       return `${findUser.name}, ahora tienes el plan regular`

//     }else throw new Error ('Usuario inexistente')
//   },

//   addSerie: function (name, seasons, category, year) {
//     // Agrega una nueva serie al catálogo.
//     // Si la serie ya existe, no la agrega y arroja un Error ('La serie <nombre_de_la_serie> ya existe')
//     // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.
//     // Debe devolver el mensaje 'La serie <nombre de la serie> fue agregada correctamente'
//     // Debe guardar la propiedad <category> de la serie (regular o premium)
//     // Debe guardar la propiedade <rating> inicializada 0
//     // Debe guardar la propiedade <reviews> que incialmente es un array vacío.
    
//     const categoryInSeries = series.find(s => s.category ===category)
//     if(category === 'premium' || category === 'regular'){
//       const nameInSeries = series.find(s => s.name ===name)      
//       if(!nameInSeries){
        
//         const newSerie = {
//           name: name,
//           category:category,
//           seasons:seasons,
//           year:year,
//           rating:0,
//           reviews:[]
//         }
//         series.push(newSerie)

//         return  `La serie ${name} fue agregada correctamente`

//       }throw new Error (`La serie ${name} ya existe`)
      
//     } throw new Error (`La categoría ${category} no existe`)

//   },

//   listSeries: function (category) {
//     // Devuelve un arreglo con todas las series.
//     // Si recibe una categoría como parámetro, debe filtrar sólo las series pertenecientes a la misma (regular o premium).
//     // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.
//     if (category){
//       if(category === 'regular' || category === 'premium'){
//         const categories = series.filter(s => s.category === category)
//         return categories 

//       }else throw new Error (`La categoría ${category} no existe`)
//     } 
//     return series
//   },

//   play: function (serie, email) {
//     // Con esta función, se emula que el usuario comienza a reproducir una serie.
//     // Si el usuario no existe, arroja el Error ('Usuario inexistente')
//     // Si la serie no existe, arroja el Error ('Serie inexistente')
//     // Debe validar que la serie esté disponible según su plan. Usuarios con plan regular sólo pueden reproducir series de dicha categoría, usuario premium puede reproducir todo.
//     // En caso de contrario arrojar el Error ('Contenido no disponible, contrata ahora HenryFlix Premium!')
//     // En caso exitoso, añadir el nombre (solo el nombre) de la serie a la propiedad <watched> del usuario.
//     // Devuelve un mensaje con el formato: 'Reproduciendo <nombre de serie>'
//     const findUser = users.find(u => u.email === email)
//     if(findUser){
//       const findSerie = series.find(s => s.name === serie)
//       if(findSerie){

//         if(findUser.plan === 'regular' && findSerie.category === 'premium'){
//           throw new Error ('Contenido no disponible, contrata ahora HenryFlix Premium!')
//         }else{
//         findUser.watched = [...findUser.watched,serie]
//         return `Reproduciendo ${serie}`
//         }

//       }throw new Error ('Serie inexistente')
      
//    } throw new Error ('Usuario inexistente')


//   },

//   watchAgain: function (email) {
//     // Devuelve sólo las series ya vistas por el usuario
//     // Si el usuario no existe, arroja el Error ('Usuario inexistente')
//     const findUser = users.find(u => u.email === email)
//     if(findUser){
//       return findUser.watched

//     } throw new Error ('Usuario inexistente')

//   },

//   rateSerie: function (serie, email, score) {
//     // Asigna un puntaje de un usuario para una serie:
//     // Actualiza la propiedad <reviews> de la serie, guardando en dicho arreglo un objeto con el formato { email : email, score : score } (ver examples.json)
//     // Actualiza la propiedad <rating> de la serie, que debe ser un promedio de todos los puntajes recibidos.
//     // Devuelve el mensaje 'Le has dado <puntaje> puntos a la serie <nombre_de_la_serie>'
//     // Si el usuario no existe, arroja el Error ('Usuario inexistente') y no actualiza el puntaje.
//     // Si la serie no existe, arroja el Error ('Serie inexistente') y no actualiza el puntaje.
//     // Debe recibir un puntaje entre 1 y 5 inclusive. En caso contrario arroja el Error ('Puntaje inválido') y no actualiza el puntaje.
//     // Si el usuario no reprodujo la serie, arroja el Error ('Debes reproducir el contenido para poder puntuarlo') y no actualiza el puntaje. >> Hint: pueden usar la función anterior
//     const findUser = users.find(u => u.email === email)
//     if(findUser){
//       const findSerie = series.find(s => s.name === serie)
//       if(findSerie){
//         if(score >=1 && score <=5){
//           const watched = findUser.watched.find(s => s === serie)
          
//           if(watched){

//             findSerie.reviews.push({
//               email:email,
//               score:score
//             })

//             if(findSerie.rating === 0) findSerie.rating = score
//             else{
//             findSerie.rating = Math.floor((findSerie.rating + score) /2)            
//             }
//             return `Le has dado ${score} puntos a la serie ${serie}`
            
//           }throw new Error ('Debes reproducir el contenido para poder puntuarlo')
//         }throw new Error('Puntaje inválido')
//       }throw new Error ('Serie inexistente')
//     }throw new Error ('Usuario inexistente')

//   }

module.exports =  {listUsers,addUser,deleteUser}