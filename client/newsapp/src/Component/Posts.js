import React from 'react';
import style from '../asset/css/posts.module.css';
import menu from '../asset/images/menu.png';
import SideMenu from './SideMenu';
function Posts({post})
{
    const [sideMenu,setSideMenu]=React.useState(false);
    const {img,desc,id,title,date}=post;
    const des=desc.substring(0, 200)+"...read more";

   const handleSideMenu=()=>{
     setSideMenu((prev)=> prev?false:true);
      console.log("clicked")
   }
return(
    <div key={id} className={style.post}>
        <img src={img} alt="News"/>
        <div className={style.side}>
        <div className={style.side2}>
        <h3>{title}</h3>
        <span className={style.span}>{date}</span>
        </div>
            <div className={style.side1}>
            <img src={menu} width="20px" height="20px" onClick={handleSideMenu} alt="Menu"/>
            </div>
        </div>
        {sideMenu&&<SideMenu id={id} ed1={true} del1={true}></SideMenu>}
        <p>{des}</p>
    </div>
)
}

export default Posts;