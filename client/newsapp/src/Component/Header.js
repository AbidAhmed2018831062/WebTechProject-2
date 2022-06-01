import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../asset/css/nav.module.css';
import { appName } from './Global';
//import styles from '../assets/css/specific.module.css';
function Header()
{
   

    //let activeClassName = "underline";
return(
   <nav className={styles.nav}>
     <h3>{appName}</h3>
     <div className={styles.ul}>
     <ul>
       <li className={styles.li}>
       <NavLink end className={({isActive})=> isActive?styles.link:styles.inactive} to='/home' >Home</NavLink>
       </li>
       <li className={styles.li}>
       <NavLink  className={({isActive})=> isActive?styles.link:styles.inactive}to='/profile'>Profile</NavLink>
       </li>
       <li className={styles.li}>
       <NavLink className={({isActive})=> isActive?styles.link:styles.inactive} to='/about'>About</NavLink>
       </li>
       </ul>
       </div>
       </nav>
)
}

export default Header;