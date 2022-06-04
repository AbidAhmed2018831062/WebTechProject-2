import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../asset/css/posts.module.css';
import menu from '../asset/images/menu.png';
import Forward from './SideMenu';
function Posts({post})
{
    const user=localStorage.getItem("username");

    const ed1=post.username===user?false:true,del1=post.username===user?false:true;
    const ref=useRef(null);
    const sideRef=useRef(null);
    const [sideMenu,setSideMenu]=React.useState(false);
    const {img,desc,id,title,date}=post;
    const des=desc.substring(0, 200)+"...read more";
    /*useEffect(()=>{
        const closeSide=(e)=>{
            if(e.path[0]!==ref.current&&e.path[2]!==sideRef)
            {
                console.log(e);
                console.log(sideRef);
                setSideMenu(false);
                setButton={()=> setSideMenu((prev)=>prev?false:true)}
            }
            
        }
        document.body.addEventListener("click",closeSide);
        return ()=> document.body.removeEventListener("click",closeSide);
    },[])*/
   const handleSideMenu=()=>{
     setSideMenu((prev)=> prev?false:true);
      console.log("clicked")
   }
return(
    <>
    <div key={id} className={style.post}>
    <NavLink to={`/post/${post.id}`}className={({isActive})=> isActive?style.navLink:style.navLink}> 
    </NavLink>
    <img className={style.image} src={`http://127.0.0.1:8887/${img}`}alt="Pro"/>
        <div className={style.side}>
        <div className={style.side2}>
        <h3>{title}</h3>
        <span className={style.span}>{date}</span>
        </div>
            <div className={style.side1}>
            <img src={menu} width="20px" height="20px" ref={ref}  onClick={handleSideMenu} alt="Menu"/>
            </div>
        </div>
        {sideMenu&&<Forward ref={sideRef}id={id} ed1={ed1} del1={del1}></Forward>}
        <NavLink to={`/post/${post.id}`}className={({isActive})=> isActive?style.navLink:style.navLink}>
        <p>{des}</p>
        </NavLink>
    </div>
    </>
)
}

export default Posts;