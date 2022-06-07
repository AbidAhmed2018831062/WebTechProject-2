import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/profile.module.css';
import ShowPosts from './ShowPosts';
const location=localStorage.getItem("image");
function Profile()
{
    let [posts,setPosts]=React.useState([]);
    useEffect(()=>{
        (
            async ()=>{
      const res =await axios.get(`http://localhost:3001/getPosts`,
      {headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
          username:localStorage.getItem("username")
      }});
      
      const status=res.status;
      console.log(res.data);
      if(status===200)
     setPosts(res.data);
            })();
    },[]);
console.log(`../asset/images/${location}`);
return(
    <div className={style.profile}>
    <div className={style.pro}>
        <div className={style.flex1}>
     <img className={style.pic} src={`http://127.0.0.1:8887/${location}`} alt="Profile" width="150px" height="150px"/>
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