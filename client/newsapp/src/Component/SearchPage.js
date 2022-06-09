import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import style from '../asset/css/search.module.css';
import ShowPosts from './ShowPosts';

function SearchPage()
{
    const [show,setShow]=useState(true);
let {search}=useParams();
const [posts,setPosts]=useState([]);
useEffect(()=>{
    (
        async ()=>{
  const res =await axios.get("http://localhost:3001/getAllPosts",{headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
  }});
  
  const status=res.status;
 
  if(status===200){
      let po=[];
for(let i=0;i<res.data.length;i++){
    search=search.toLowerCase();
    if(res.data[i].title.toString().toLowerCase().includes(search)||res.data[i].desc.toString().toLowerCase().includes(search)||res.data[i].category.toString().toLowerCase().includes(search))
po.push(res.data[i]);
  }
  if(po.length===0)
  setShow(false);
 setPosts(po);
        }
      }  )();
},[search]);
return(
    <div className={style.search}>
        <h1>Your search results for keyword {search}</h1>
        <hr></hr>
      {show?<ShowPosts posts={posts}/>:<div>
          <p className={style.p}>Sorry nothing could be found for your search. Kindly look for any misplaced keywords!

          </p>
     <NavLink className={({isActive})=> isActive?style.navLink1:style.navLink1} to="/home">Go To Home</NavLink>
      </div>}
    </div>
)
}

export default SearchPage;