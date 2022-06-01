import React, { useCallback, useEffect } from 'react';
import style from '../asset/css/profile.module.css';
import code1 from '../asset/images/code1.jpg';
import code2 from '../asset/images/code2.jpg';
import Posts from './Posts';
function ToDo()
{
    const category=['All','Sports','Movies','Tv Series','Crime',"Programming"];
    console.log(category);
    let filterPost=[];
  //  const {posts,setPosts}=useState([]);
  const posts=[
      {
          img:code1,
          id:1,
          title:"Lorem Ispum",
          desc:"Voluptua rebum stet et vero sed. Labore stet tempor ipsum at dolore aliquyam rebum, eos amet lorem nonumy eos diam. Lorem eos at nonumy et sea invidunt. Ut gubergren ea sadipscing stet eos kasd et. Et et lorem lorem elitr sea sadipscing clita. Nonumy accusam.",
          category:"Sports"
      },
      {
          img:code2,
        id:1,
        title:"Lorem Ispum",
        desc:"Voluptua rebum stet et vero sed. Labore stet tempor ipsum at dolore aliquyam rebum, eos amet lorem nonumy eos diam. Lorem eos at nonumy et sea invidunt. Ut gubergren ea sadipscing stet eos kasd et. Et et lorem lorem elitr sea sadipscing clita. Nonumy accusam.",
        category:"Sports"
    }
  ]
    const handleCatClick=useCallback((e)=>{
        posts.forEach((post)=>{
            console.log(e)
            if(e==="All")
            filterPost=posts;
           else if(post.category===e)
            filterPost.push(post);
        })  
       },[filterPost]);
       useEffect(()=>{
           handleCatClick("All");
       },[handleCatClick]);
       const addNewPost=(post1)=>{
          // setPosts((prev)=> [...prev,post1]);
       }
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
     <div>
         {
           posts.map((element)=>{
              return  <Posts post={element}/>
           })
         }
     </div>
     </div>
)
}

export default ToDo;