import axios from 'axios';
import React, { useEffect } from 'react';
import style from '../asset/css/login.module.css';
import { validateEdit } from '../asset/js/validateForm';
import Navigate1 from './Navigate';

function EditProfile()
{
const [name,setName]=React.useState('');
const [email,setEmail]=React.useState('');
const [password,setPass]=React.useState('');
const [what, setWhat]=React.useState(false);
const [fileName,setFileName]=React.useState("");
const [file,setFile]=React.useState("");
const [errors,setErrors]=React.useState({});
const [errorFree,setFree]=React.useState(false);
const username=localStorage.getItem("username");
let img="";
const handleChange= (e)=>{
  const change=e.target.value;
  if(e.target.name==="name")
  setName(change);
  else if(e.target.name==="email")
  setEmail(change);
}
const imageChange=(e)=>{
    setFileName(e.target.files[0].name);
  setFile(e.target.files[0]);
}
useEffect(()=>{
    axios.get("http://localhost:3001/getUser",{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        username
      }
    }).then(data=>{
        img=data.data[0].img;
        console.log(data);
        setEmail(data.data[0].email);
        setFileName(data.data[0].img);
        setName(data.data[0].name);
    }).catch((err)=>{
        console.log(err);
    })
},[username,fileName]);
const submit=(e)=>{
  e.preventDefault();
  setErrors(validateEdit({name,username,email,password,file}));
  setFree(true);
  if(Object.keys(errors).length===0&&errorFree){
    console.log("hi");
    const data1=new FormData();
    data1.append("name",name);
    data1.append("email",email);
    data1.append("username",username);
    if(Object.keys(file).length!==0)
    data1.append("file",file);
    else
    data1.append("fileNa",fileName);
 //   console.log(file);
    axios.put("http://localhost:3001/updateuser",data1,{headers:{
      'Content-type':"multipart/form-data"
    }}).then((data)=>{
      console.log(data);
      if(data.status===200){
    //console.log(data);
      setWhat(true);
      }
      
   }).catch(err=>
     {
       console.log(err);
      if(err.response.data?.username)
      {
       // console.log("Hey I am Abid")
        setErrors({username:"Username Already exists"});
      }
      else if(err.response.data?.email)
      {
        setErrors({email:"Email Already exists"});
      }
      else if(err.response.data?.imError)
      {
        setErrors({image:err.response.data.imError});
      }
     });
   }

}
useEffect(()=>{
 // console.log(errorFree);
  if(Object.keys(errors).length===0)
  console.log(errors);
},[errors]);
let element="";
if(what===false)
element=<div>
 <label htmlFor="image">Profile Picture</label> 
<input className={style.fileSelector}
  type='file'
  name="image"
  style={{ display: 'block' }}
  onChange={imageChange}
  />
<p className={style.error}>{errors.image}</p>
<label htmlFor="name">Name</label>
<input type="text" name="name" value={name} onChange={handleChange}></input> 
<p className={style.error}>{errors.name}</p>
<label htmlFor="email">Email</label>
<input type="email" name="email" value={email} onChange={handleChange}></input>
<p className={style.error}>{errors.email}</p>
<button type='submit' onClick={submit}>Update</button>
</div> 
return(
    <div className={style.login}>
      {what||element}
   {what && <Navigate1 to={{to:"Profile"}} text="Your account has been created successfully"/>}
    </div>
)
}

export default EditProfile;