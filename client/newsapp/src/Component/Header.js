import React, { useRef } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import styles from '../asset/css/nav.module.css';
import searchButton from '../asset/images/search.png';
import { appName } from './Global';
import Home from './Home';
//import styles from '../assets/css/specific.module.css';
function Header()
{
  const element=<Navigate to={<Home/>}/>;
  const ref=useRef(null);
  const [search,setSearch]=React.useState("Search");
  const [goSearch,setGo]=React.useState(false);
   const searchHandler=(e)=>{
    //ref.current.focus.style.border="none";
    setSearch(e.target.value)
    
   }
  
    //let activeClassName = "underline";
return(
   <nav className={styles.nav}>
     <h3>{appName}</h3>
     <div className={styles.sea}>
       <div className={styles.flex4}>
     <input ref={ref}className={styles.int} value={search} onChange={searchHandler}type="search"></input>
     <NavLink to={`/search/${search}`}>
     <img src={searchButton} alt="Search"/>
     </NavLink>
     </div>
     </div>
     {goSearch&&element}
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