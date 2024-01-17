const express=require("express")
const router=express.Router()
const controllers=require("../controllers/userController")
const fileUpload = require("../utils/configMulter")
const { requiretoken } = require("../middlewares/requireToken")
router.get("/home",controllers.infoUser)
router.post("/register",fileUpload,controllers.resgisterUser)
router.post("/login",controllers.loginUser)
router.post("/mensaje",requiretoken,controllers.mensajeUser)
router.get("/mensaje",requiretoken,controllers.infoMensaje)
module.exports=router