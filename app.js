const express=require("express")
const cors=require("cors")
const env=require("dotenv")
env.config()
const PORT=  9000|| process.env.PORT
const path=require("path")
const router = require("./routes/user")
const app=express()
app.get("/",(req,res)=>{
    res.json({msg:"ola"})
})
app.use(cors({methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"dbimages")))
app.use("/api",router)
app.listen(PORT,()=>console.log("escuchando"))