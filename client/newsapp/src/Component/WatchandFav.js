import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import style from '../asset/css/watchandfav.module.css';
import nothing from '../asset/images/nothing.jpg';
import ShowPosts from './ShowPosts';
function WatchandFav()
{
    const [posts,setPosts]=React.useState([]);
    
  const {what}=(useParams());
  useEffect(()=>{
      if(what==="watch"){
      axios.get("http://localhost:3001/getwatchlater",{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        username:localStorage.getItem("username")
      }
    }).then((data)=>{
        console.log(data);
        if(data.status===200)
        {
            setPosts(data.data);
        }
    }).catch(err=>{
        console.log(err);
    })
}
else
{
    axios.get("http://localhost:3001/getfav",{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        username:localStorage.getItem("username")
      }
    }).then((data)=>{
        console.log(data);
        if(data.status===200)
        {
            setPosts(data.data);
        }
    }).catch(err=>{
        console.log(err);
    })
}
  },[what]);
  console.log(posts);
return(
    <div>
     {posts.length===0?<div className={style.main}>
         <img src={nothing} className={style.img} alt="Nothing"></img>
         <p className={style.sorry}>Sorry! Your {what} list is empty! You have not added anything in your {what} list. Add some news to your {what} list and then come back again!</p>
         <NavLink to="/home" className={style.navLi}>Go to Home Page ={'>'}</NavLink>

         </div>: <div className={style.main}>
       <h2>Here is your {what} list</h2>
     <ShowPosts posts={posts}/>;
    </div>}
    </div>

)
}

export default WatchandFav;