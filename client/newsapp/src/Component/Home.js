import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/home.module.css';
import iu from '../asset/images/iu.jpg';
import ShowPosts from './ShowPosts';
function Home()
{


return(
    <div className={style.home}>
        <div className={style.profile}>
            <img src={iu} alt="Profile"></img>
            <NavLink to='/profile/newpost' className={({isActive})=> isActive? style.button: style.button}>Write a new news</NavLink>
        </div>
        <ShowPosts />;
    </div>
)
}

export default Home;