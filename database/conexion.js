const mysql=require("mysql2/promise");
const  connection=mysql.createConnection({
    //host: 'localhost',
    //port: '3306',
    //user:"root",
    //password:"",

    //database: 'proyecto1'


	 host:"bjwofdm3taavhi9boe4k-mysql.services.clever-cloud.com",
    port: 3306,
    user:"ugkzo5sgabprjerl",
    password:"LwXoTbbfYltE00BsmTUD",

    database:"bjwofdm3taavhi9boe4k"
 })



module.exports=connection