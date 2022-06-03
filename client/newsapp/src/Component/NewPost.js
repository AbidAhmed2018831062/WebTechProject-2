import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from '../asset/css/newpost.module.css';
import code1 from '../asset/images/code1.jpg';
import './Global';
import Navigate1 from './Navigate';
function NewPost()
{
 const {userId}=useParams();
  console.log(userId+"Abid");
    const [what,setWhat]=React.useState(false);
const [title,setTitle]=React.useState('');
const [desc,setDes]=React.useState('');
const [cat,setCat]=React.useState('Sports');
const [id,setId]=React.useState("");
const submit=()=>{
    axios.post("http://localhost:3001/newpost",{
      title,desc,category:cat,img:code1
    },{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    }).then((res)=>{
      console.log(res);
      setId(res.data.id);
     setWhat(true);
   }).catch(err=>
     {
       console.log(err);
     });
 }
const handleChange= (e)=>{
  const change=e.target.value;
 if(e.target.name==="title")
 {
     console.log(e);
     setTitle(change);
 }
 else if(e.target.name==="desc")
 {
     setDes(change);
 }
 else if(e.target.name==="cat")
 {
     setCat(change);
 }

}

const update=()=>{
  axios.put("http://localhost:3001/updatePost",{
    title,desc,category:cat,img:code1,userId
  },{
    headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`
    }
  }).then((res)=>{
    console.log(res);
    setId(userId);
   setWhat(true);
 }).catch(err=>
   {
     console.log(err);
   });
}
useEffect(()=>{
   if(userId!=="false")
   {
     axios.get("http://localhost:3001/findPost",
     {params:{id:userId}}).then((data)=>{
       console.log(data);
       if(data.status===200)
       {
         setCat(data.data[0].category);
         setDes(data.data[0].desc);
         setTitle(data.data[0].title);
       }
     }).catch((err)=>{
       console.log(err);
     })
   }
},[userId])
return(
    <div className={style.newpost}>
      {what||
      <div>
      <h2>Create a New News</h2>
        <hr></hr>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleChange}></input>
        <label htmlFor="des">Description</label>
        <textarea type="text" name="desc" value={desc} onChange={handleChange}></textarea>
        <label htmlFor="cat">Category</label>
        <select name="cat" value={cat} onChange={handleChange}>
                    <option value="Sports">Sports</option>
                    <option value="Programming">Programming</option>
                    <option value="Movies">Movies</option>
                    <option value="Series">Series</option>
                    <option value="Crime">Crime</option>
                    <option value="Trending">Trending</option>
                    <option value="Others">Others</option>
                </select>
                {userId==="false"?<button type='submit' onClick={submit}>Submit</button>:<button type='submit' onClick={update}>Update</button>}
                </div>}
            {what&&<Navigate1 to={{
              to:"post",
              id
            }} text="Your news has been posted"/>}    
    </div>
)
}

export default NewPost;