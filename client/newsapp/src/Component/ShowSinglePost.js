import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from '../asset/css/showsinglepost.module.css';
var k=0;
function ShowSinglePost()
{
        const {id}=useParams();
    const [post,setPost]=React.useState([]);
    let what=false;

    useEffect( ()=>{
    
    axios.get("http://localhost:3001/showsinglepost",{
   params: {
    id:id,
   }
 }).then((res)=>{const status=res.status;
    console.log(res);
    if(status===200){
    setPost(res.data);
    what=true;
    }
    //console.log(res.data+"Abid");
});
    },[id,what]);
//console.log(post[0].title);
return(
    <> <div className={style.cona}>
    <div className={style.mainPosts}>
     <h3>{post[0].title}</h3>
     <span className={style.span}>{post[0].date}</span>
     <img src={post[0].img} className={style.img} alt="Pro"/>
     <p className={style.para}>{post[0].desc}</p>
    </div>
    <div className={style.sidePosts}>
        <h3>Recent Posts</h3>
        <div className={style.posts}>
            <img src={post[0].img}alt="Pro"/>
            <h4>Recent</h4>
        </div>
    </div>
  </div>
  </>
  
)
}

export default ShowSinglePost;