const connection = require("./conexion");
const path=require("path")
const fs=require("fs");
const { generatetoken } = require("../utils/generateToken");

const useInfo=async()=>{

    const [rows, fields] = await  (await connection).execute("SELECT * FROM usuarios");
    console.log(rows,"-",fields)
        return rows

}
const resgisterUser=async(newUser,imageFile)=>{
    const { mimetype, originalname, filename } = imageFile;
    const {nombre,correo,password}=newUser
    
    try {
        const [rows, fields] = await  (await connection).execute("SELECT * FROM usuarios WHERE correo=?",[correo]);

         if(rows.length>0){
            return("usuario existe")

         }
         else{
            const query="INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)"
            const [rows, fields] = await (await connection).execute(query, [nombre, correo, password]);
            const usuarioID = rows.insertId;
            const type = mimetype;
            const name = originalname;
            const data = fs.readFileSync(path.join(__dirname, "../imagenes/" + filename));
           const imgInfo={usuarioID,type,name,data}
           const insertarImagen= await insertImg(imgInfo)
           return insertarImagen
         }
        
    } catch (error) {
         console.log(error)
    }
  
 
    
}
const mensajeUser=async(userinfo)=>{
    const {mensaje,uid}=userinfo
    const query="SELECT  * FROM usuarios WHERE usuarioID=?"
    const queryInsert="INSERT INTO mensajes(mensaje,usuarioID,fecha_mensaje) VALUES (?,?,?)"
    const usuarioID=uid
    const fecha_mensaje=new Date()
  try {
      const [rows]=await (await connection).execute(query,[uid])
      if(rows<1){
        return("error no se encontro")
      }
      else{
      const [rows]=await (await connection).execute(queryInsert,[mensaje,usuarioID,fecha_mensaje])
      return({msg:"mensaje exitoso",rows})
      }
      
  } catch (error) {
     return error
  }

}
const loginUser=async(user)=>{
 const {correo,password}=user
 console.log(correo,password)
 const query="SELECT * FROM usuarios WHERE correo=?"
 try {
    const [rows]=await(await connection).execute(query,[correo])
    console.log(rows)
    if(rows.length<1){
    return("credenciales incorrecto")
    }
    if(rows[0].password!==password){
      return("credenciales incorrecto")
    }
    const {token,expirenIn}=generatetoken(rows[0].usuarioID)
    const usuarioID=rows[0].usuarioID
    return({msg:"autenticacion exitoso",token,expirenIn,usuarioID,nombre:rows[0].nombre})  

   

 } catch (error) {
    console.log(error)
    return error
 }
}
const infoMensaje=async()=>{
  const query="SELECT * FROM mensajes"
try {
  
     const [rows]=await(await connection).execute(
    
        `
    SELECT mensajes.mensaje, imagenes.imagen,usuarios.nombre,mensajes.fecha_mensaje,mensajes.usuarioID
    FROM mensajes
    JOIN usuarios ON mensajes.usuarioID = usuarios.usuarioID
    JOIN imagenes ON usuarios.usuarioID = imagenes.usuarioID
    ORDER BY mensajes.fecha_mensaje DESC;
    `
    
    
    )
    console.log(rows)
    const mensajesConImagenes = rows.map((row) => {
      // Convertir la imagen blob a base64
      const imagenBase64 = row.imagen.toString('base64');
  
      return {
        mensaje: row.mensaje,
        imagen: imagenBase64,
        correo: row.correo,
        nombre:row.nombre,
        fecha:row.fecha_mensaje,
        usuarioID:row.usuarioID
      };
     
    });
return mensajesConImagenes


    
} catch (error) {
     console.log(error)
}

}




const insertImg=async(imageFile)=>{
    const {  usuarioID,name,data,type} = imageFile;
    const imagen=data;
    const tipo=type;
    const query="INSERT INTO imagenes (usuarioID, name, tipo,imagen) VALUES (?, ?, ?,?)"

    const [rows, fields] = await (await connection).execute(query, [usuarioID, name,tipo,imagen]);
    return("imagen guardado")
}


module.exports={useInfo,resgisterUser,mensajeUser,loginUser,infoMensaje}