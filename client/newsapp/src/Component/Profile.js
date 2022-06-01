import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/profile.module.css';
import iu from '../asset/images/iu.jpg';
import { returnUserName } from './Global';
import ShowPosts from './ShowPosts';
function Profile()
{

return(
    <div className={style.profile}>
    <div className={style.pro}>
        <div className={style.flex1}>
     <img className={style.pic} src={iu} alt="Profile" width="150px" height="150px"/>
     <h2>{returnUserName()}</h2>
     </div>
     <div className={style.flex2}>
     <NavLink to='/profile/newpost' className={({isActive})=> isActive? style.active: style.link}>Create Post</NavLink>
         <NavLink to='/editprofile' className={({isActive})=> isActive? style.active1: style.link1}>Edit Profile</NavLink>
     </div>
     </div>
     <ShowPosts />;
    </div>
)
}

export default Profile;