import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import right from '../asset/images/right.jpg';
function Navigate1({text})
{

    let [time, setTime]=React.useState(5);
    let int="";
    const showTime=()=>{
        int= setInterval(()=>{
           setTime((prev)=> prev-1);
           if(time<=-1)
           clearInterval(int);
         },1000);
         return time;
        }
        useEffect(()=>{
          return ()=> clearInterval(int);
        },[int]);
return(
    <div>
        <img src={right} alt="Successful"></img>
        <h1>{text}. In {showTime()} you will be redirected to the home page.</h1>
        {time<=0?<Navigate replace to="/" />:""};
    </div>
)
}

export default Navigate1;