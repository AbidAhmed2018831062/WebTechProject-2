import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from '../asset/css/newpost.module.css';
import validatePostData from '../asset/js/validatePostData';
import './Global';
import Navigate1 from './Navigate';
function NewPost()
{
 const {userId}=useParams();
  console.log(userId+"Abid");
  const [fileName,setFileName]=React.useState("");
  const [error,setError]=React.useState([]);
const [file,setFile]=React.useState("");
    const [what,setWhat]=React.useState(false);
const [title,setTitle]=React.useState('');
const [desc,setDes]=React.useState('');
const [cat,setCat]=React.useState('Sports');
const [id,setId]=React.useState("");
const submit=()=>{
  setError(validatePostData({title,desc,file}));
  if(Object.keys(error).length===0){
    axios.post("http://localhost:3001/newpost",{
      title,desc,category:cat,username:localStorage.getItem("username"),file
    },{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        'Content-type':"multipart/form-data"
      }
    }).then((res)=>{
      console.log(res);
      setId(res.data.id);
     setWhat(true);
   }).catch(err=>
     {
       console.log(err);
       if(err.response.data?.image);
       error.image=err.response.data.image;
      setError(error);
     });
  }
}
 const imageChange=(e)=>{
  console.log(e);
  setFileName(e.target.files[0].name);
  setFile(e.target.files[0]);
  console.log(file);
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
  const data1=new FormData();
  data1.append("title",title);
  data1.append("desc",desc);
  data1.append("category",cat);
  console.log(file===null);
  if(file!==null){
    console.log(file);
  data1.append("file",file);
  }
  else
  data1.append("fileNa",fileName);
  data1.append("userId",userId);
  axios.put("http://localhost:3001/updatePost",data1,{
    headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`,
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
   {headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`,
        id:userId
    }}).then((data)=>{
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
        <label htmlFor="image">Profile Picture</label> 
<input className={style.fileSelector}
  type='file'
  name="image"
  style={{ display: 'block' }}
  onChange={imageChange}
/>
<p className={style.error}>{error.image}</p>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleChange}></input>
        <p className={style.error}>{error.title}</p>
        <label htmlFor="des">Description</label>
        <textarea type="text" name="desc" value={desc} onChange={handleChange}></textarea>
        <p className={style.error}>{error.desc}</p>
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