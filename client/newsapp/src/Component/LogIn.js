import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/login.module.css';
function LogIn()
{
const [login,setLogIn]=React.useState('');
const [password,setPass]=React.useState("");
const submit=()=>{
    
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
    <h2>LogIn To the world of Trending News</h2>
    <hr></hr>
    <label htmlFor="username">Username/Email</label>
    <input type="text" name="username" value={login} onChange={handleChange}></input>
    <label htmlFor="pass">Password</label>
    <input type="password" name="pass" value={password} onChange={handleChange}></input>
    <button type='submit' onClick={submit}>LogIn</button>
    <NavLink to="/register" className={({isActive})=>isActive? style.navLink:style.navLink}>Register?</NavLink>
    </div>
)
}

export default LogIn;