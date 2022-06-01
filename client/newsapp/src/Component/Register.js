import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import style from '../asset/css/login.module.css';
function Register()
{
  let int="";
const [name,setName]=React.useState('');
const [username,setUserName]=React.useState("");
const [email,setEmail]=React.useState('');
const [password,setPass]=React.useState('');
const [what, setWhat]=React.useState(false);
let [time, setTime]=React.useState(5);
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
const submit=()=>{
   axios.post("http://localhost:3001/adduser",{
     name,username,email,password
   }).then(()=>{
     setWhat(true);
  }).catch(err=>
    {
      console.log(err);
    });
}
const showTime=()=>{
int= setInterval(()=>{
   setTime((prev)=> prev-1);
   if(time<=-1)
   clearInterval(int);
 },1000);
 return time;
}
useEffect(()=>{
  return ()=> clearInterval(int);
})
let element="";
if(what===false)
element=<div>
<label htmlFor="name">Name</label>
<input type="text" name="name" value={name} onChange={handleChange}></input> 
<label htmlFor="username">Username</label>
<input type="text" name="username" value={username} onChange={handleChange}></input>
<label htmlFor="email">Email</label>
<input type="email" name="email" value={email} onChange={handleChange}></input>
<label htmlFor="pass">Password</label>
<input type="password" name="pass" value={password} onChange={handleChange}></input>
<button type='submit' onClick={submit}>Register</button>
<NavLink to="/login" className={({isActive})=>isActive? style.navLink:style.navLink}>LogIn?</NavLink></div> 
else
element=<div><h3>Your account has been created successfully. In {
 showTime()} you will be redirected to the Home Page</h3></div>
return(
    <div className={style.login}>
      {what||element}
   {what && element}
   {time<=0?<Navigate replace to="/" />:""};
    </div>
)
}

export default Register;