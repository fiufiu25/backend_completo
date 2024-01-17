const jwt= require("jsonwebtoken") 
 const requiretoken=(req,res,next)=>{
    try {
   let token=req.headers?.authorization;
   if(!token){
   throw new Error("no existe el toke")
   }     

  token=token.split(" ")[1]

  const {uid}= jwt.verify(token,"clave")
  req.uid=uid
  next()
    } catch (error) {
        console.log(error.message)
        return res.json({error:error})
    }
}
module.exports={requiretoken}