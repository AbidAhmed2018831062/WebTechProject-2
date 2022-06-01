import axios from 'axios';
import React from 'react';
import style from '../asset/css/newpost.module.css';
import code1 from '../asset/images/code1.jpg';
import './Global';
import Navigate1 from './Navigate';
function NewPost()
{
    console.log(global.username);
    const [what,setWhat]=React.useState(false);
const [title,setTitle]=React.useState('');
const [desc,setDes]=React.useState('');
const [cat,setCat]=React.useState('React');
const submit=()=>{
    axios.post("http://localhost:3001/newpost",{
      title,desc,category:cat,username:global.username,img:code1
    }).then(()=>{
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
                    <option value="React">React</option>
                    <option value="Angular">Angular</option>
                    <option value="Vue">Vue</option>
                </select>
                <button type='submit' onClick={submit}>Submit</button>
                </div>}
            {what&&<Navigate1 text="Your news has been posted"/>}    
    </div>
)
}

export default NewPost;