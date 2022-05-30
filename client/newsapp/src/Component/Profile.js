import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/profile.module.css';
import iu from '../asset/images/iu.jpg';
import Posts from './Posts';
function Profile()
{
    const category=['All','Sports','Movies','Tv Series','Crime',"Programming"];
    console.log(category);
    let filterPost=[];
    const {posts,setPosts}=useState([]);
    const handleCatClick=useCallback((e)=>{
     posts.forEach((post)=>{
         console.log(e)
         if(e==="All")
         filterPost=posts;
        else if(post.category===e)
         filterPost.push(post);
     })  
    },[filterPost]);
    useEffect(()=>{
        handleCatClick("All");
    },[handleCatClick]);
    const addNewPost=(post1)=>{
        setPosts((prev)=> [...prev,post1]);
    }

return(
    <div className={style.profile}>
    <div className={style.pro}>
        <div className={style.flex1}>
     <img className={style.pic} src={iu} alt="Profile" width="150px" height="150px"/>
     <h2>Ahmed Abid</h2>
     </div>
     <div className={style.flex2}>
     <NavLink to='/profile/newpost' className={({isActive})=> isActive? style.active: style.link}>Create Post</NavLink>
         <NavLink to='/editprofile' className={({isActive})=> isActive? style.active1: style.link1}>Edit Profile</NavLink>
     </div>
     </div>
    <div className={style.catpo}>
    <div className={style.cat}>
        <h4>Categories</h4>
        <ul>
        {
            category.map((e,id)=>{
              return  <li key={id} onClick={()=>handleCatClick(e)}>{e}</li>
            })
        }
        </ul>
        
    </div>
     <div className={style.posts}>
         {
           posts.map((element)=>{
              return  <Posts post={element}/>
           })
         }
     </div>
     </div>
    </div>
)
}

export default Profile;