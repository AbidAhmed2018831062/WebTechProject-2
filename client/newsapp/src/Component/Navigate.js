import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import right from '../asset/images/right.jpg';
function Navigate1({text,to})
{
    let element=null;
    if(to.to==="LogIn")
    element="/login";
    else if(to.to==="post")
    element=`/post/${to.id}`;
    else 
    element="/home";

    let [time, setTime]=React.useState(5);

   useEffect(()=>{
      const  int=setInterval(()=>{
            setTime((prev)=> prev-1);
           
         },1000);
         if(time<=0)
            clearInterval(int)
        return ()=> clearInterval(int);
   });
return(
    <div>
        <img src={right} alt="Successful"></img>
        <h1>{text}. In {time} you will be redirected to the home page.</h1>
       {time<=0?<Navigate  replace to={element} />:""}
    </div>
)
}

export default Navigate1;