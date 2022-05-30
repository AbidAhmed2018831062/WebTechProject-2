import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../asset/css/nav.module.css';
//import styles from '../assets/css/specific.module.css';
function Header()
{
    let activeStyle = {
        textDecoration: "none",
      };

    //let activeClassName = "underline";
return(
   <nav className={styles.nav}>
       <li className={styles.li}>
       <NavLink end className={({isActive})=> isActive?styles.link:styles.inactive} to='/' >Home</NavLink>
       </li>
       <li className={styles.li}>
       <NavLink  className={({isActive})=> isActive?styles.link:styles.inactive}to='/profile'>Profile</NavLink>
       </li>
       <li className={styles.li}>
       <NavLink className={({isActive})=> isActive?styles.link:styles.inactive} to='/about'>About</NavLink>
       </li>
       </nav>
)
}

export default Header;