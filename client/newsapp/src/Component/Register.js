import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/login.module.css';
import validateForm from '../asset/js/validateForm';
import Navigate1 from './Navigate';


function Register()
{
const [name,setName]=React.useState('');
const [username,setUserName]=React.useState("");
const [email,setEmail]=React.useState('');
const [password,setPass]=React.useState('');
const [what, setWhat]=React.useState(false);
const [fileName,setFileName]=React.useState("");
const [file,setFile]=React.useState("");
const [errors,setErrors]=React.useState({});
const [errorFree,setFree]=React.useState(false);
const handleChange= (e)=>{
  const change=e.target.value;
  if(e.target.name==="name")
  setName(change);
  else if(e.target.name==="email")
  setEmail(change);
  else if(e.target.name==="username")
  setUserName(change);
   else 
  setPass(change);
}
const imageChange=(e)=>{
  setFileName(e.target.files[0].name);
  setFile(e.target.files[0]);
}
const submit=(e)=>{
  e.preventDefault();
  setErrors(validateForm({name,username,email,password,file}));
  setFree(true);
  if(Object.keys(errors).length===0&&errorFree){
  
    const data1=new FormData();
    data1.append("name",name);
    data1.append("username",username);
    data1.append("email",email);
    data1.append("password",password);
    data1.append("file",file);
    axios.post("http://localhost:3001/adduser",data1,{headers:{
      'Content-type':"multipart/form-data"
    }}).then((data)=>{
      
      if(data.status===200){
    
      setWhat(true);
      }
      
   }).catch(err=>
     {
     
      if(err.response.data?.username)
      {
    
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
<label htmlFor="username">Username</label>
<input type="text" name="username" value={username} onChange={handleChange}></input>
<p className={style.error}>{errors.username}</p>
<label htmlFor="email">Email</label>
<input type="email" name="email" value={email} onChange={handleChange}></input>
<p className={style.error}>{errors.email}</p>
<label htmlFor="pass">Password</label>
<input type="password" name="pass" value={password} onChange={handleChange}></input>
<p className={style.error}>{errors.password}</p>
<button type='submit' onClick={submit}>Register</button>
<NavLink to="/login" className={({isActive})=>isActive? style.navLink:style.navLink}>LogIn?</NavLink></div> 
return(
    <div className={style.login}>
      {what||element}
   {what && <Navigate1 to={{to:"LogIn"}} text="Your account has been created successfully"/>}
    </div>
)
}

export default Register;