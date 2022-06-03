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
const submit=(e)=>{
  console.log(errorFree);
  e.preventDefault();
  setErrors(validateForm({name,username,email,password}));
  //setFree(true);
  if(Object.keys(errors).length===0&&errorFree){
    axios.post("http://localhost:3001/adduser",{
      name,username,email,password
    }).then((data)=>{
      console.log(data);
      if(data.status===200){
    //console.log(data);
      setWhat(true);
      }
      
   }).catch(err=>
     {
       console.log(err);
      if(err.response.data.username!=null)
      {
       // console.log("Hey I am Abid")
        setErrors({username:"Username Already exists"});
      }
      else if(err.response.data.email!=null)
      {
        setErrors({email:"Email Already exists"});
      }
     });
   }

}
useEffect(()=>{
  if(Object.keys(errors).length===0)
  setFree(true);
},[errors,setFree,errorFree]);
let element="";
if(what===false)
element=<div>
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