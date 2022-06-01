const express=require("express");
const mysql=require('mysql');
app=express();
const cors=require("cors");
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const db=mysql.createConnection({
host:"localhost",
port:3306,
user: "root",
password:"password",
database:"newsapp"

}
) 

app.post("/adduser",(req,res)=>{
    console.log(req.body);
    const {name,username,email,password}=req.body;
    const quert="INSERT INTO `newsapp`.`users` (`username`, `email`, `name`, `password`) VALUES (?,?,?,?);";
    db.query(quert,[name,username,email,password],(err,result)=>{
        if(result)
        res.send(req.body);
        else{
            console.log(result+err);
        res.send(result);
        }
    })
    
   
});

app.listen(3001,()=>{
    console.log("Hey, I am running on 3001 port");
})