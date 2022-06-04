import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/home.module.css';
import ShowPosts from './ShowPosts';
const location=localStorage.getItem("image");
function Home()
{
    let [posts,setPosts]=React.useState([]);
    useEffect(()=>{
        (
            async ()=>{
      const res =await axios.get("http://localhost:3001/getAllPosts");
      
      const status=res.status;
      console.log(res.data);
      if(status===200)
     setPosts(res.data);
            })();
    },[]);


return(
    <div className={style.home}>
        <div className={style.profile}>
            <img  src={`http://127.0.0.1:8887/${location}`}  alt="Profile"></img>
            <NavLink to='/profile/newpost' className={({isActive})=> isActive? style.button: style.button}>Write a new news</NavLink>
        </div>
        <ShowPosts posts={posts}/>
    </div>
)
}

export default Home;