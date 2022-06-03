import React, { useEffect, useState } from 'react';
import style from '../asset/css/profile.module.css';
import Posts from './Posts';
function ShowPosts({posts})
{
    const category=['All','Sports','Movies','Series','Trending','Crime',"Programming"];
   // console.log(category);
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
       //  <NavLink to={`/post/${element.id}`}className={({isActive})=> isActive?style.navLink:style.navLink}> 
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
        
    </div>
     <div className={style.pos}>
         {
             
           posts1.map((element)=>{
              return ( <div>
              <Posts post={element}/>
              </div>
              )
           })
         }
     </div>
     </div>
)
}

export default ShowPosts;