const express=require("express");
const mysql=require('mysql');
const db=mysql.createConnection({
host:"localhost",
port:3306,
user: "root",
password:"password",
database:"newsapp"

}
) 
console.log(db);
app=express();

app.get("/",(req,res)=>{
    const quert="INSERT INTO `newsapp`.`users` (`Id`, `username`, `email`, `name`, `password`) VALUES ('2', 'ahmedabid1', 'ahmed1abid3409@gmail.com', 'ahmed', 'ahmedabid');";;
    db.query(quert,(err,result)=>{
        console.log(err);
        res.send(result);
    });

   
})

app.listen(3001,()=>{
    console.log("Hey, I am running on 3001 port");
})