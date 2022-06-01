const express=require("express");
const mysql=require('mysql');
const checkLogin=require("./checkAuth")
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
require('dotenv').config();
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

app.post("/adduser",async(req,res)=>{
    console.log(req.body);
    const {name,username,email,password,img}=req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const quert="INSERT INTO `newsapp`.`users` (`username`, `email`, `name`, `password`) VALUES (?,?,?,?);";
    db.query(quert,[username,email,name,hashedPassword,img],(err,result)=>{
        if(result)
        res.send(req.body);
        else{
            console.log(result+err);
        res.send(result);
        }
    })
    
   
});

app.post("/newpost",checkLogin,(req,res)=>{
    console.log(req.body);
    const {title,desc,category,username,img}=req.body;
    const date=new Date(Date.now());
    const quert="INSERT INTO `newsapp`.`posts` (`title`, `desc`, `date`, `id`,`category`,`username`,`img`) VALUES (?,?,?,?,?,?,?);";
    db.query(quert,[title,desc,date.toLocaleTimeString(),Date.now(),category,username,img],(err,result)=>{
        if(result)
        res.send(req.body);
        else{
            console.log(result+err);
        res.send(result);
        }
    })
    
});
app.post("/login",async(req,res)=>{
    const {login,password}=req.body;
    const sql="SELECT * FROM users WHERE username=?";
    db.query(sql,[login],async (err,result)=>{
        if(err===null&&result.length>0)
        {
           const pass=result[0].password;
           const isRightPassword=await bcrypt.compare(password,pass);
           if(isRightPassword){
               const token=await jwt.sign({
                   username:login,
                   name:result[0].name
               },process.env.JWT_SECRET,{
                   expiresIn:"1h"
               });
               console.log(token);
           res.status(200).send(token);
            }
           else
           res.status(401).send({what:"Username and password combination is not right"})
        }
        else
        res.send("Username and password combination is not right")
    })
   // const pass=bcrypt.compare()
})
app.get("/profile",checkLogin,async(req,res)=>{
    console.log("I am abid");
res.status(200).send(req.username);
});

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }
  
  app.use(errorHandler);
app.listen(3001,()=>{
    console.log("Hey, I am running on 3001 port");
});