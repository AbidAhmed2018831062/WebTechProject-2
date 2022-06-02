import React from 'react';
import style from '../asset/css/posts.module.css';
function Posts({post})
{
    const {img,desc,id,title,date}=post;
    const des=desc.substring(0, 200)+"...read more";
return(
    <div key={id} className={style.post}>
        <img src={img} alt="News"/>
        <h3>{title}</h3>
        <span>{date}</span>
        <p>{des}</p>
    </div>
)
}

export default Posts;