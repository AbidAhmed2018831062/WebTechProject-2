const express=require("express");
const mysql=require('mysql');
const bcrypt=require('bcrypt');
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

app.post("/newpost",(req,res)=>{
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

app.listen(3001,()=>{
    console.log("Hey, I am running on 3001 port");
})