import axios from 'axios';
import React from 'react';
import style from '../asset/css/newpost.module.css';
import code1 from '../asset/images/code1.jpg';
import './Global';
import Navigate1 from './Navigate';
function NewPost()
{
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
                <button type='submit' onClick={submit}>Submit</button>
                </div>}
            {what&&<Navigate1 to={{
              to:"post",
              id
            }} text="Your news has been posted"/>}    
    </div>
)
}

export default NewPost;