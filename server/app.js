const express=require("express");
const mysql=require('mysql');
const fs=require("fs");
const checkLogin=require("./checkAuth")
const bcrypt=require('bcrypt');
const fileUpload=require("express-fileupload");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const {promisify}=require("util");
const pipeline=promisify(require("stream").pipeline);
const validateUser=require("./validateUser");
const imageUpload=require("./imageUpload");
require('dotenv').config();
app=express();
app.use(fileUpload());
const cors=require("cors");
const { devNull } = require("os");
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
app.get("/getfav",checkLogin,(req,res)=>{
    const sql= "SELECT * FROM fav WhERE username=?";
const username=req.headers.username;
//console.log(username);
 db.query(sql,[username],(err,result)=>{
     if(err===null)
     {
         const sq="SELECT * FROM posts WhERE username=?";
         res.status(200).send(result);
     }
     else{ if(err.sqlMessage!==null)
         res.status(400).send(err.sqlMessage);
         else
         res.status(500).status("Internal Server Error");
     }
 })
})
app.get("/getwatchlater",checkLogin,(req,res)=>{
    const sql= "SELECT * FROM watchlater WhERE username=?";
const username=req.headers.username;
//console.log(username);
 db.query(sql,[username],(err,result)=>{
     if(err===null)
     {
         res.status(200).send(result);
     }
     else{ if(err.sqlMessage!==null)
         res.status(400).send(err.sqlMessage);
         else
         res.status(500).status("Internal Server Error");
     }
 })
})
app.put("/updateuser",async (req,res)=>{
    //  console.log(req.files.file);
    let imageErrors={};
      const {name,username,email}=req.body;
      if(req.files!==null)
      imageErrors = imageUpload(req.files.file);
    else{
      //  console.log(req.body);
        const {fileNa}=req.body;
        // console.log(fileNa);
    imageErrors.fileNa = fileNa;
    imageErrors.imageErrors=false;
    }
   // console.log(imageErrors)
     // console.log(imageErrors.fileNa+"Abid");
      if(!imageErrors.imageErrors){
          console.log(imageErrors.fileNa)
      const quert="UPDATE users set `name`=?, `email`=?, `img`=? where username=?;";
      db.query(quert,[name,email,imageErrors.fileNa,username],(err,result)=>{
          if(err===null)
          res.status(200).send(result);
          else{
              console.log(err);
           if(err.sqlMessage.includes("username")){
               //console.log("Hey I am Abid")
           res.status(400).send({username:err.sqlMessage});
           }
       else if(err.sqlMessage.includes("email"))
           res.status(400).send({email:"Email already exists"});
           else
           res.status(500).send("Server Error");
          }
      })
    //  console.log(req.files);
  }
  else
  {
      console.log(imageErrors);
      errors.imError=imageErrors.imageErrors;
      res.status(400).send(errors);
  }
     
  });
app.get("/getuser",checkLogin,(req,res)=>{
const sql= "SELECT * FROM users WhERE username=?";
const username=req.headers.username;
//console.log(username);
 db.query(sql,[username],(err,result)=>{
     if(err===null)
     {
         res.status(200).send(result);
     }
     else{ if(err.sqlMessage!==null)
         res.status(400).send(err.sqlMessage);
         else
         res.status(500).status("Internal Server Error");
     }
 })
});
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
        else{ if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
        }
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
        else{ if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
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
        else{ if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
        }

    })
})
app.post("/adduser",async (req,res)=>{
  //  console.log(req.files.file);
    const {name,username,email,password}=req.body;
    const errors=validateUser({name,username,email,password});
  let imageErrors= imageUpload(req.files.file);
 // console.log(imageErrors)
   // console.log(imageErrors.fileNa+"Abid");
    if(Object.keys(errors).length===0&&!imageErrors.imageErrors){
    const hashedPassword = await bcrypt.hash(password,10);
    const quert="INSERT INTO `newsapp`.`users` (`username`, `email`, `name`, `password`,`img`) VALUES (?,?,?,?,?);";
    db.query(quert,[username,email,name,hashedPassword,imageErrors.fileNa],(err,result)=>{
        if(err===null)
        res.status(200).send(result);
        else{
            console.log(err);
         if(err.sqlMessage.includes("username")){
             //console.log("Hey I am Abid")
         res.status(400).send({username:err.sqlMessage});
         }
     else if(err.sqlMessage.includes("email"))
         res.status(400).send({email:"Email already exists"});
         else
         res.status(500).send("Server Error");
        }
    })
  //  console.log(req.files);
}
else
{
    console.log(imageErrors);
    errors.imError=imageErrors.imageErrors;
    res.status(400).send(errors);
}
   
});
app.post ("/addWatchLater",(req,res)=>{
    const sql="INSERT INTO `newsapp`.`watchlater` (`username`, `id`,`title`,`category`,`img`,`desc`) VALUES (?,?,?,?,?,?)";
    db.query(sql,[req.body.username,req.body.id,req.body.title,req.body.category,req.body.img,req.body.desc],(err,result)=>{
        if(err===null)
        {
           
            res.status(200).send(`The post has been saved to your watch later successfully`);
        }
        else
        {
            if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
        }
    })
})
app.post ("/addfavLater",(req,res)=>{
    const sql="INSERT INTO `newsapp`.`fav` (`username`, `id`,`title`,`category`,`img`,`desc`) VALUES (?,?,?,?,?,?)";
    db.query(sql,[req.body.username,req.body.id,req.body.title,req.body.category,req.body.img,req.body.desc],(err,result)=>{
        if(err===null)
        {
           
            res.status(200).send(`The post has been saved to your fav list successfully`);
        }
        else
        {
            if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
        }
    })
});

app.get("/findPost",(req,res)=>{
   // console.log(req.body);
    const sql="SELECT * FROM posts WHERE id=?";
    db.query(sql,[req.query.id],(err,result)=>{
        if(err===null)
        {
            
           
            res.status(200).send(result);
        }
        else
        {
            if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
        }
    })
})
app.post("/newpost",checkLogin,(req,res)=>{
    console.log(req.body);
    const imageErrors=imageUpload(req.files.file);
    const {title,desc,category,username}=req.body;
    const date=new Date(Date.now());
    const id=Date.now();
    if(!imageErrors.imageErrors){
    const quert="INSERT INTO `newsapp`.`posts` (`title`, `desc`, `date`, `id`,`category`,`username`,`img`) VALUES (?,?,?,?,?,?,?);";
    db.query(quert,[title,desc,date.toLocaleString(),id,category,username,imageErrors.fileNa],(err,result)=>{
        if(err===null){
            console.log("Abid");
        res.status(200).send({id});
        }
        else{
            if(err.sqlMessage!==null)
        res.status(400).send(err.sqlMessage);
        else
        res.status(500).status("Internal Server Error");
        }
    })
}
else
{
    const err=imageErrors.imageErrors;
  res.status(400).send({image:err});
}
    
});
app.post("/login",async(req,res)=>{
    const {login,password}=req.body;
    const sql="SELECT * FROM users WHERE username=?";
    db.query(sql,[login],async (err,result)=>{
        if(err===null&&result.length>0)
        {
            console.log(result);
           const pass=result[0].password;
           const isRightPassword=await bcrypt.compare(password,pass);
           if(isRightPassword){
               const token=await jwt.sign({
                   username:login,
                   name:result[0].name
               },process.env.JWT_SECRET)
               console.log(token+"abid");
           res.status(200).send({token:token,img:result[0].img});
            }
           else
           res.status(401).send({what:"Username and password combination is not right"})
        }
        else
        res.send("Username and password combination is not right")
    })
   // const pass=bcrypt.compare()
});
app.put("/updatePost",(req,res)=>{
    const {title,desc,category,userId}=req.body;
    let imageErrors={};
    console.log(req.files);
    if(req.files!==null&&req.files!==undefined)
      imageErrors = imageUpload(req.files.file);
    else{
      //  console.log(req.body);
        const {fileNa}=req.body;
         console.log(fileNa+"abid");
    imageErrors.fileNa = fileNa;
    imageErrors.imageErrors=false;
    }
    if(!imageErrors.imageErrors){
    const sql= "UPDATE posts SET `desc`=?, `title`=? ,  `category`=? , `img`=?  where `id`=?";
    db.query(sql,[desc,title,category,imageErrors.fileNa,userId],(err,result)=>{
        if(err===null)
        {
            res.status(200).send(result);
        }
        else
        {
            if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
    }

    })
}
else
{
    const err=imageErrors.imageErrors;
  res.status(400).send({image:err});
}
})
app.get("/showsidepost",(req,res)=>{
    const sql= "SELECT * FROM posts where category=?";
    db.query(sql,[req.query.category],(err,result)=>{
        if(err===null)
        {
            res.status(200).send(result.reverse());
        }
        else{ if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
        }

    })
})
app.get("/profile",checkLogin,async(req,res)=>{
    //console.log("I am abid123");
res.status(200).send(req.username);
});

app.delete("/deletepost",(req,res)=>{
    const sql= "DELETE FROM posts where id=?";
    db.query(sql,[req.query.id],(err,result)=>{
        console.log(req.query.id);
        console.log(result);
        if(err===null)
        {
            res.status(200).send(result);
        }
        else{ if(err.sqlMessage!==null)
            res.status(400).send(err.sqlMessage);
            else
            res.status(500).status("Internal Server Error");
        }

    })
})

const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }
  
  app.use(errorHandler);
app.listen(3001,()=>{
    console.log("Hey, I am running on 3001 port");
});