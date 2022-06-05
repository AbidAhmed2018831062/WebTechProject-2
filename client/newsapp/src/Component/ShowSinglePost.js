import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import style from '../asset/css/showsinglepost.module.css';
function ShowSinglePost()
{
   let savedPost= JSON.parse(localStorage.getItem("savePost"));
   if(savedPost===null)
   savedPost=[];
  if(savedPost!==null&&savedPost.length===4)
   savedPost.pop();
    const savePost={};
        const {id}=useParams();
    const [post,setPost]=React.useState([]);
    const [sidePost,setSidePost]=React.useState([]);
    let [what,setState]=useState(false);
    useEffect( ()=>{
       
    axios.get("http://localhost:3001/showsinglepost",{
   params: {
    id,
   }
 }).then((res)=>{const status=res.status;
    console.log(res);
    if(status===200){
    setPost(res.data);
    let d=false;
        for(let i=0;i<savedPost.length;i++){
            if(res.data[0].id===savedPost[i].id){
                d=true;
            }
        }
    if(d===false)
    {
        savePost.title=res.data[0].title;
        savePost.img=res.data[0].img;
        savePost.id=res.data[0].id;
        console.log(savedPost);
        savedPost.push(savePost);
        localStorage.setItem("savePost",JSON.stringify(savedPost));
    }
    
    axios.get("http://localhost:3001/showsidepost",{
   params: {
    category:res.data[0].category,
   }}).then(data=>{
if(data.status===200)
{
    setSidePost(data.data.slice(0,7));
    console.log(data);
    setState(true);
  
}
   })
  
    }
    //console.log(res.data+"Abid");
});
    },[id,what]);
//console.log(post[0].title);
return(
    <> {what&&<div className={style.cona}>
    <div className={style.mainPosts}>
     <h3>{post[0].title}</h3>
     <span className={style.span}>{post[0].date}</span>
     <span className={style.span1}>Author: {post[0].username}</span>
     <img src={`http://127.0.0.1:8887/${post[0].img}`} className={style.img} alt="Pro"/>
     <pre className={style.para}>{post[0].desc}</pre>
    </div>
    <div className={style.sidePosts}>
    <h3>Recent Posts</h3>
        {sidePost.map((element,i)=>{
       if(element.id===post[0].id)
      return(<></>);
       return (
       <NavLink to={`/post/${element.id}`}key={element.id} className={({isActive})=> isActive?style.navLink:style.navLink}>
       <div key={element.id}>
        <div className={style.posts}>
            <img src={`http://127.0.0.1:8887/${element.img}`}alt="Pro"/>
            <h4>{element.title}</h4>
        </div>
    </div>
    </NavLink>
       )
        })
    }
    </div>
  </div>
}
  </>
  
)
}

export default ShowSinglePost;