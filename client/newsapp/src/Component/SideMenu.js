import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/sidemenu.module.css';
import del from '../asset/images/delete.png';
import watch from '../asset/images/download.png';
import edit from '../asset/images/edit.png';
import fav from '../asset/images/fav.png';
function SideMenu({ed1,del1,id})
{
    const [wat,setWat]=React.useState(false);
    const [fav1,setFav]=React.useState(false);
   const [text,setText]=React.useState("");
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
    const watchLater=(e)=>{
            console.log(e);
            axios.post(`http://localhost:3001/add${e}Later`,{
                username:localStorage.getItem("username"),id
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
    
return(
    <div className={style.sideMenu}>
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
    <div className={style.item}>
    <img src={del} width="20px" height="20px" alt="Watch Later"/>
    {del1? <span className={style.span}>Delete Post</span>:""}
    </div>
    {wat&&<div className={style.watAndFav} >
        <p>{text}</p>
    </div>}
    {wat&&hideWat()}
    {fav1&&<div className={style.watAndFav} >
        <p>{text}</p>
    </div>}
    {fav1&&hideFav()}
    </div>
)
}

export default SideMenu;