const jwt=require("jsonwebtoken")
 const generatetoken=(uid)=>{
    const expiresIn=60*60
    try {
       const token= jwt.sign({uid},"clave",{expiresIn})
        return {token,expiresIn}
    } catch (error) {
        console.log(error)
    }
}
module.exports={generatetoken}