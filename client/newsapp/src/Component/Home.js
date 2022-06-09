import axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/home.module.css';
import watch from '../asset/images/download.png';
import fav from '../asset/images/fav.png';
import ShowPosts from './ShowPosts';
const location=localStorage.getItem("image");
function Home()
{
    let [posts,setPosts]=React.useState([]);
    let savedPost=[];
    if(localStorage.getItem("savePost")!==null)
    savedPost=JSON.parse(localStorage.getItem("savePost"));
    useEffect(()=>{
        (
            async ()=>{
      const res =await axios.get("http://localhost:3001/getAllPosts",{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
      }});
      
      const status=res.status;
      if(status===200)
     setPosts(res.data);
            })();
    },[]);


return(
    <div className={style.home}>
            <div className={style.sidebar}>
            <h4>Shortcuts</h4>
                <ul>
                    <NavLink to='/profile'>
                    <li className={style.short}>
                    <img  src={`http://127.0.0.1:8887/${location}`}  alt="Profile"></img>
                    <span>{localStorage.getItem("username")}</span>
                    </li>
                    </NavLink>
                    <NavLink to="/watchandfav/watch">
                    <li>
                        <img src={watch} alt="Watch"/>
                        <span>Watch Later</span>
                    </li>
                    </NavLink>
                    <NavLink to="/watchandfav/fav">
                    <li>
                        <img src={fav} alt="Watch"/>
                        <span>Favorites</span>
                    </li>
                    </NavLink>
                </ul>
                <hr></hr>
                <h4>Recently Viewed</h4>
                <ul className={style.recent}>
                 {savedPost.map(element=>{
                     return(
                         <NavLink to={`/post/${element.id}`}>
                         <li>
                             <img src={`http://127.0.0.1:8887/${element.img}`} alt="/profile"></img>
                             <span>{element.title}</span>
                         </li>
                         </NavLink>
                     )
                 })}   
                </ul>
            </div>
            <div className={style.main}>
        <div className={style.profile}>
            <img  src={`http://127.0.0.1:8887/${location}`}  alt="Profile"></img>
            <NavLink to='/profile/newpost/false' className={({isActive})=> isActive? style.button: style.button}>Write a new news</NavLink>
        </div>
        <ShowPosts posts={posts}/>
        </div>
    </div>
)
}

export default Home;