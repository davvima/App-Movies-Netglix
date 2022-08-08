const { verifyToken } = require("./helpers");

module.exports = {
    checkAuth : (roles) => async (req, res, next)=>{
        try{
            const token = req.headers.authorization? req.headers.authorization.split(' ').pop():null
            let tokenData
               if(token){
                 tokenData = await verifyToken(token)
                 if(tokenData.id){
                        if(roles.includes(tokenData.role)){
                            next()
                        }else{
                            res.status(409)
                            res.send({error:'No tienes Autorización para ver este contenido'})
                        }
                    }            
                }else{
                res.status(409)
                res.send({error:'Debes iniciar sesión para ver este contenido'})
            }
        }catch(e){
            res.status(409)
            res.send({error:'No has podido acceder a este contenido'})
        }
    },
};