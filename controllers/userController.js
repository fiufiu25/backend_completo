const services=require("../services/userServices")
const infoUser=async(req,res)=>{
const result= await services.userInfo(res)
res.json({data:result})
}
const resgisterUser=async(req,res)=>{
    const {correo,password,nombre}=req.body
    const {mimetype,originalname,filename}=req.file
    const newUser={
        correo,password,nombre
    }
    const imageFile={
        mimetype,originalname,filename
    }
const result=await services.resgisterUser(newUser,imageFile)
res.json({data:result})
}
const loginUser=async(req,res)=>{
    const {correo,password}=req.body
    const user={correo,password}
 const result=await services.loginUser(user)
 return res.json(result)}

const mensajeUser=async(req,res)=>{
 const {mensaje}= req.body
 const userinfo={
    mensaje,
    uid:req.uid
 }
 const result=await services.mensajeUser(userinfo)
 return res.json(result)
}
const infoMensaje=async(req,res)=>{
  const result=await services.infoMensaje()
  return res.json(result)
}
module.exports={infoUser,resgisterUser,mensajeUser,loginUser,infoMensaje}