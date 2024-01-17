const userRepository=require("../database/userRepository")
const userInfo=async(res)=>{
  return await userRepository.useInfo(res)
}
const resgisterUser=async(newUser,imageFile)=>{
 return await userRepository.resgisterUser(newUser,imageFile)
}
const mensajeUser=async(userinfo)=>{
 return await userRepository.mensajeUser(userinfo)
}
const loginUser=async(user,res)=>{
    return await userRepository.loginUser(user,res)
   }
   const infoMensaje=async(user,res)=>{
   return await userRepository.infoMensaje()
   }
module.exports={userInfo,resgisterUser,mensajeUser,loginUser,infoMensaje}