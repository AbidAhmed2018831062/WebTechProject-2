import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/login.module.css';
function Register()
{
const [name,setName]=React.useState('');
const [username,setUserName]=React.useState("");
const [email,setEmail]=React.useState('');
const [password,setPass]=React.useState('');
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
    
}
return(
    <div className={style.login}>
         <label htmlFor="name">Name</label>
    <input type="text" name="name" value={name} onChange={handleChange}></input> 
    <label htmlFor="username">Username</label>
    <input type="text" name="username" value={username} onChange={handleChange}></input>
    <label htmlFor="email">Email</label>
    <input type="email" name="email" value={email} onChange={handleChange}></input>
    <label htmlFor="pass">Password</label>
    <input type="password" name="pass" value={password} onChange={handleChange}></input>
    <button type='submit' onClick={submit}>Register</button>
    <NavLink to="/login" className={({isActive})=>isActive? style.navLink:style.navLink}>LogIn?</NavLink>
    </div>
)
}

export default Register;