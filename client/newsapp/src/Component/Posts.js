import React from 'react';
import style from '../asset/css/posts.module.css';
function Posts({post})
{
    const {img,desc,id,title}=post;
return(
    <div key={id} className={style.post}>
        <img src={img} alt="News"/>
        <h3>{title}</h3>
        <p>{desc}</p>
    </div>
)
}

export default Posts;