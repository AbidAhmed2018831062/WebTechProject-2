import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/login.module.css';
import Navigate1 from './Navigate';
function LogIn()
{
const [login,setLogIn]=React.useState('');
const [password,setPass]=React.useState("");
const [what,setWhat]=React.useState(false);
const [error,setError]=React.useState(true);
const submit=()=>{
  axios.post("http://localhost:3001/login",{
   login, password
  }).then((data)=>{
    //console.log(data);
    if(data.status===200){
      localStorage.setItem('token',data.data);
      localStorage.setItem("username",login);
    setWhat(true);
    }
 }).catch(err=>
   {
   if(err)
   setError(false);
   });
}
const handleChange= (e)=>{
  const change=e.target.value;
  if(e.target.name==='username')
  setLogIn(change);
  else
  setPass(change);
}
return(
    <div className={style.login}>
    {what||<div><h2>LogIn To the world of Trending News</h2>
    <hr></hr>
    <label htmlFor="username">Username/Email</label>
    <input type="text" name="username" value={login} onChange={handleChange}></input>
    <label htmlFor="pass">Password</label>
    <input type="password" name="pass" value={password} onChange={handleChange}></input>
   {!error&& <p className={style.error}>Username and Password combination is not right</p>}
    <button type='submit' onClick={submit}>LogIn</button>
    <NavLink to="/register" className={({isActive})=>isActive? style.navLink:style.navLink}>Register?</NavLink></div>}
    {what && <Navigate1 to={{to:"/home"}}text="You have been successfully logged in"/>}
    </div>
)
}

export default LogIn;