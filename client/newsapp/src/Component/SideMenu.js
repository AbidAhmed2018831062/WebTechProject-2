import axios from 'axios';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/sidemenu.module.css';
import del from '../asset/images/delete.png';
import watch from '../asset/images/download.png';
import edit from '../asset/images/edit.png';
import fav from '../asset/images/fav.png';
import { context } from './ShowPosts';
function SideMenu({ed1,del1,id,post},inputRef)
{
    //console.log(post);
    const setPostsFromOutside=useContext(context);
    const [wat,setWat]=React.useState(false);
    const [fav1,setFav]=React.useState(false);
   const [text,setText]=React.useState("");
   const [del2,setDel]=React.useState(false);
   
   const [showDel,setShowDel]=React.useState(false);
  const hideWat=()=>{
       setTimeout(()=>{
         setWat(false);
       },5000)
   }
   const hideFav=()=>{
    setTimeout(()=>{
      setFav(false);
    },5000)
}
const hideShowDel=()=>{
    setTimeout(()=>{
      setShowDel(false);
      setPostsFromOutside(id);
    },5000)
}
    const watchLater=(e)=>{
            console.log(e);
            axios.post(`http://localhost:3001/add${e}Later`,{
                username:localStorage.getItem("username"),id,title:post.title,category:post.category,img:post.img,desc:post.desc
            }).then(data=>{
                console.log(data);
                if(data.status===200)
                {
                    setText(`The post has been successfully added to your ${e} list`);
                    if(e==="watch"){
                  
                    setWat(true);
                    }
                    else
                    setFav(true);
                    
                }
            }).catch((err)=>{
                console.log(err);
           if(err.response.status===400){
            
            setText(`The post has been already saved to your ${e} list`);
            if(e==="watch"){
                  
                setWat(true);
                }
                else
                setFav(true);
           }
           else
           {
            setText("Failed to save. Please try again later");
            if(e==="watch"){
                  
                setWat(true);
                }
                else
                setFav(true);
           }
             
            })
        }
    const deleteHandler=(e)=>{
console.log(e);
        if(e==="cancel")
        {
            setDel(false);
        }
        else if(e==="show")
        setDel(true);
        else
        {
            
            axios.delete("http://localhost:3001/deletepost",{
                params:{
                    id
                }
            }).then(data=>{
                console.log(data);
                if(data.status===200)
                {
                    setText("Your news has been deleted successfully");
                    setShowDel(true);
                    setDel(false);
                   
                }
            }).catch((err)=>{
                console.log(err);
           if(err.response.status===400){
            
            setText(`The post does not exist`);
            setShowDel(true);
           }
           else
           {
            setText("Failed to delete. Please try again later");
            if(e==="watch"){
                setShowDel(true);
            }
        }
             
            })
        }
    }
return(
    <div className={style.sideMenu} ref={inputRef}>
    <div className={style.item} onClick={()=> watchLater("watch")}>
        <img src={watch} width="20px" height="20px" alt="Watch Later"/>
    <span className={style.span}>Save to Watch Later</span>
    </div>
    <div className={style.item}  onClick={()=> watchLater("fav")}>
    <img src={fav} width="20px" height="20px" alt="Watch Later"/>
    <span className={style.span}>Save to Favorites</span>
    </div>
    {ed1?
    <NavLink className={style.spanNav}to={`/profile/newpost/${id}`}>
    <div className={style.item} >
    <img src={edit} width="20px" height="20px" alt="Watch Later"/>
     <span className={style.span}>Edit Post</span>
    </div></NavLink> :""}
    {del1?<div className={style.item} onClick={()=> deleteHandler("show")}>
    <img src={del} width="20px" height="20px" alt="Watch Later"/>
     <span className={style.span}>Delete Post</span>
    </div>:""}
    {wat&&<div className={style.watAndFav} >
        <p>{text}</p>
    </div>}
    {wat&&hideWat()}
    {fav1&&<div className={style.watAndFav} >
        <p>{text}</p>
    </div>}
    {fav1&&hideFav()}
      {del2&&<div className={style.delDiv}> <p className={style.styleP1}>Do You really want to delete the post?</p>
       <p className={style.styleP2}>Deleted posts cannot be restored and all the data of this post will be deleted along with the comments of this post</p>
       <hr className={style.hr}></hr>
       <button className={style.button1} onClick={()=> deleteHandler("cancel")}>Cancel</button>
       <button className={style.button}onClick={()=> deleteHandler("delete")}>Delete</button>
    </div>}
    {showDel&&<div className={style.watAndFav} >
        <p>{text}</p>
    </div>}
    {showDel&&hideShowDel()}
    </div>
)
}
const Forward=React.forwardRef(SideMenu);
export default Forward;