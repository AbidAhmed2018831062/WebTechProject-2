import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import style from '../asset/css/profile.module.css';
import logout from '../asset/images/logout.png';
import Posts from './Posts';
const context=React.createContext();
export { context };
function ShowPosts({posts})
{
    let element=(<div>
        <h1>I am Abid</h1>
    <Navigate to="/login"/>
    </div>
    )
    const [del2,showDel]=React.useState(false);
    const [login,setLogIn]=React.useState(false);
    const deleteHandler=(e)=>{
        if(e==="cancel")
        showDel(false);
        else
        {
            localStorage.clear();

            setLogIn(true);
        }
    }
    const logOut=()=>{
        showDel(true);
    }
    const category=['All','Sports','Movies','Series','Trending','Crime',"Programming"];

    let filterPost=[];
   const [posts1,setPosts]=useState([]);
   useEffect(()=>{
       setPosts(posts);
   },[setPosts,posts]);
    const handleCatClick=(e)=>{
        if(e==="All"){
            filterPost=posts;
        }
        else{
        posts.forEach((post)=>{
            
           if(post.category===e)
            {
                filterPost.push(post);
            }
        })
    }
    setPosts(filterPost);
    }
       const addNewPost=(post1)=>{
          // setPosts((prev)=> [...prev,post1]);
       }
       
       const setPostsFromOutside=((uid)=>{
        setPosts(prev=> {
            const preToDo=prev.filter((post)=> post.id !== uid);
            return preToDo;
         })
    });
return(
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
        <h4>Shortcuts</h4>
        <div onClick={logOut} className={style.log}>
        <img src={logout} alt="Logout"/>
        <span>LogOut</span>
        </div>
        {del2&&<div className={style.delDiv1}> <p className={style.styleP1}>Do You really want to logout?</p>
       <p className={style.styleP2}>Once logout all of your data on this browser will be deleted and you will be needed to login once again in this browser</p>
       <hr className={style.hr}></hr>
       <button className={style.button1} onClick={()=> deleteHandler("cancel")}>Cancel</button>
       <button className={style.button}onClick={()=> deleteHandler("delete")}>LogOut</button></div>}
    </div>
    {login&&element}
    <context.Provider value={setPostsFromOutside}>
     <div className={style.pos}>
         {
             
           posts1.map((element)=>{
              return ( <div key={element.id}>
              <Posts  post={element}/>
              </div>
              )
           })
         }
     </div>
     </context.Provider>
     </div>
)
}

export default ShowPosts;