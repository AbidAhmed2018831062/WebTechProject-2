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
app.post("/validateuser",(req,res)=>{
    const {username,email}=req.query;
    if(username!=null)
    {
        const sql= "SELECT * FROM users WhERE username=?";
         db.query(sql,[username],(err,result)=>{
             if(err!=null)
             {
                 res.status(200).send({msg:"Valid Username"});
             }
             else
             res.status(500).send("Username exists"); 
         })
    }
    else
    {
        const sql= "SELECT * FROM users WhERE email=?";
        db.query(sql,[email],(err,result)=>{
            if(err!=null)
            {
                res.status(200).send({msg:"Valid email"});
            }
            else
            res.status(500).send("Email exists"); 
        })
    }
})
app.get("/getPosts",(req,res)=>{
    const sql= "SELECT * FROM posts WhERE username=?";
   const username=req.query.username;
    db.query(sql,[username],(err,result)=>{
        if(err===null)
        {
            res.status(200).send(result.reverse());
        }
        else
        res.status(500).send("Server Error"); 
    })
});
app.get("/showsinglepost",(req,res)=>{
    console.log("Abid");

    const id= req.query.id;
    console.log(id);
    const sql= "SELECT * FROM posts WHERE id=?";
    db.query(sql,[id],(err,result)=>{
        if(err===null)
        {
            console.log(result);
            res.status(200).send(result);
        }
        else{
            console.log(result);
        res.status(500).send("Server Error");
        }
        

    })
})
app.get("/getAllPosts",(req,res)=>{
    const sql= "SELECT * FROM posts";
    db.query(sql,(err,result)=>{
        if(err===null)
        {
            res.status(200).send(result.reverse());
        }
        else
        res.status(500).send("Server Error");

    })
})

app.post("/adduser",async(req,res)=>{
    //console.log(req.body);
    const {name,username,email,password,img}=req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const quert="INSERT INTO `newsapp`.`users` (`username`, `email`, `name`, `password`) VALUES (?,?,?,?);";
    db.query(quert,[username,email,name,hashedPassword,img],(err,result)=>{
        if(err===null)
        res.status(200).send(result);
        else{
         if(err.sqlMessage.includes("username")){
             console.log("Hey I am Abid")
         res.status(400).send({username:err.sqlMessage});
         }
     else if(err.sqlMessage.includes("email"))
         res.status(400).send({email:"Email already exists"});
         else
         res.status(500).send("Server Error");
        }
    })
    
   
});

app.post("/newpost",checkLogin,(req,res)=>{
    console.log(req.body);
    const {title,desc,category,img}=req.body;
    const date=new Date(Date.now());
    const quert="INSERT INTO `newsapp`.`posts` (`title`, `desc`, `date`, `id`,`category`,`username`,`img`) VALUES (?,?,?,?,?,?,?);";
    db.query(quert,[title,desc,date.toLocaleString(),Date.now(),category,req.username,img],(err,result)=>{
        if(result){
            console.log("Abid");
        res.status(200).send(req.body);
        }
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
                   expiresIn:"36000s"
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
app.get("/showsidepost",(req,res)=>{
    const sql= "SELECT * FROM posts where category=?";
    db.query(sql,[req.query.category],(err,result)=>{
        if(err===null)
        {
            res.status(200).send(result.reverse());
        }
        else
        res.status(500).send("Server Error");

    })
})
app.get("/profile",checkLogin,async(req,res)=>{
    console.log("I am abid123");
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