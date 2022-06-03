import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/profile.module.css';
import iu from '../asset/images/iu.jpg';
import ShowPosts from './ShowPosts';
function Profile()
{
    let [posts,setPosts]=React.useState([]);
    useEffect(()=>{
        (
            async ()=>{
      const res =await axios.get(`http://localhost:3001/getPosts`,
        { params: { username: localStorage.getItem("username") } 
      });
      
      const status=res.status;
      console.log(res.data);
      if(status===200)
     setPosts(res.data);
            })();
    },[]);

return(
    <div className={style.profile}>
    <div className={style.pro}>
        <div className={style.flex1}>
     <img className={style.pic} src={iu} alt="Profile" width="150px" height="150px"/>
     <h2>{localStorage.getItem("username")}</h2>
     </div>
     <div className={style.flex2}>
     <NavLink to='/profile/newpost/false' className={({isActive})=> isActive? style.active: style.link}>Create Post</NavLink>
         <NavLink to='/editprofile' className={({isActive})=> isActive? style.active1: style.link1}>Edit Profile</NavLink>
     </div>
     </div>
     <ShowPosts posts={posts}/>;
    </div>
)
}

export default Profile;